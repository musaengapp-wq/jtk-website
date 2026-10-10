// Checks the WhatsApp enquiry message without sending anything: window.open and tracking are stubs.
// Run: node verify-enquiry.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');

function load(file, context, stubs) {
  const source = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const js = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS },
  }).outputText;
  const module = { exports: {} };
  vm.runInNewContext(js, {
    ...context,
    module,
    exports: module.exports,
    require: (name) => {
      if (!(name in stubs)) throw new Error(`Unexpected import ${name} in ${file}`);
      return stubs[name];
    },
  });
  return module.exports;
}

function setup(search) {
  const store = new Map();
  const opened = [];
  const tracked = [];
  const window = {
    location: { search },
    sessionStorage: { getItem: (k) => store.get(k) ?? null, setItem: (k, v) => store.set(k, String(v)) },
    open: (...args) => opened.push(args),
  };
  const context = { window, URLSearchParams, encodeURIComponent };
  const whatsapp = load('whatsapp.ts', context, {});
  const tracking = { trackWhatsAppClick: (location) => tracked.push(location) };
  const enquiry = load('enquiry.ts', context, { './whatsapp': whatsapp, './tracking': tracking });
  whatsapp.initVisitSource();
  return { whatsapp, enquiry, opened, tracked, window, store };
}

const base = {
  name: 'Test & name',
  learner: 'Myself',
  childAge: '',
  interest: 'Reading Arabic from the start (Noorani Qaida)',
  level: "Complete beginner (I don't know the letters yet)",
  times: '',
  message: '',
};

function sendAndRead(search, enquiry, page = 'home') {
  const s = setup(search);
  const returned = s.enquiry.sendEnquiry(enquiry, page);
  assert.equal(s.opened.length, 1, 'WhatsApp opened once');
  assert.equal(s.tracked.length, 1, 'trackWhatsAppClick called once');
  assert.equal(s.tracked[0], `${page}:form_submit`);
  const [href, target, features] = s.opened[0];
  assert.equal(href, returned, 'fallback link matches the opened link');
  assert.equal(target, '_blank');
  assert.equal(features, 'noopener,noreferrer');
  const url = new URL(href);
  assert.equal(url.origin + url.pathname, 'https://wa.me/447933395159');
  return { text: url.searchParams.get('text'), s };
}

// 1. Adult, no optional fields, no source.
{
  const { text } = sendAndRead('', base);
  assert.equal(text, [
    "Assalamu alaikum! I'd like to book a free trial lesson.",
    '',
    'Name: Test & name',
    'Lessons for: Myself',
    'Interested in: Reading Arabic from the start (Noorani Qaida)',
    "Level: Complete beginner (I don't know the letters yet)",
  ].join('\n'));
  assert(!/plan|lesson option/i.test(text), 'no plan line');
  assert(!text.includes("Child's age"), 'no child age when not given');
  assert(!text.includes('Found you on'), 'no source line without a source');
}

// 2. Parent from a Google ad, with every field and special characters.
{
  const { text } = sendAndRead('?gclid=SECRET123&utm_campaign=x', {
    ...base,
    learner: 'My child',
    childAge: '7',
    interest: '',
    level: 'I know the letters but read slowly',
    times: 'Sundays & after 4pm',
    message: 'Question? A+B & C #1 100% "quotes" é ع',
  }, 'kids');
  assert.equal(text, [
    "Assalamu alaikum! I'd like to book a free trial lesson.",
    '',
    'Name: Test & name',
    'Lessons for: My child',
    "Child's age: 7",
    'Interested in: Not sure yet',
    'Level: I know the letters but read slowly',
    'Preferred times: Sundays & after 4pm',
    'Message: Question? A+B & C #1 100% "quotes" é ع',
    'Found you on: Google',
  ].join('\n'));
  assert(!text.includes('SECRET123') && !text.includes('gclid'), 'click IDs never go in the message');
}

// 3. Child's age typed but then switched to "Myself": age is left out.
{
  const { text } = sendAndRead('', { ...base, childAge: '9' });
  assert(!text.includes("Child's age"));
}

// 4. Every source rule, and the source surviving to the next page (sessionStorage).
for (const [search, expected] of [
  ['?gbraid=1', 'Google'], ['?wbraid=1', 'Google'], ['?utm_source=Google', 'Google'],
  ['?ttclid=1', 'TikTok'], ['?utm_source=tiktok', 'TikTok'],
  ['?fbclid=1', 'Facebook/Instagram'], ['?utm_source=facebook', 'Facebook/Instagram'], ['?utm_source=instagram', 'Facebook/Instagram'],
  ['?utm_source=newsletter', null], ['', null],
]) {
  const { s } = sendAndRead(search, base);
  assert.equal(s.whatsapp.getVisitSource(), expected, search);
  if (expected) {
    s.window.location.search = '';
    assert.equal(s.whatsapp.initVisitSource(), expected, `${search} remembered on the next page`);
  }
}

// 5. Page buttons: the page message plus the source as the last line.
{
  const s = setup('?utm_source=tiktok');
  const text = new URL(s.whatsapp.whatsappUrl("Assalamu alaikum, I'd like to book a free trial lesson.")).searchParams.get('text');
  assert.equal(text, "Assalamu alaikum, I'd like to book a free trial lesson.\nFound you on: TikTok");
}

// 5b. Every page's button message: the source goes above a last open question ("Child's age: ")
//     so the cursor lands there; otherwise it is the last line.
{
  const flags = load('flags.ts', {}, {});
  const content = load('content.ts', {}, { './flags': flags });
  const pages = ['home', ...Object.keys(content.PAGES)];
  assert(pages.includes('kids'), 'kids page found');
  for (const page of pages) {
    const message = content.pageMessage(page);
    for (const search of ['', '?gclid=1', '?ttclid=1', '?fbclid=1']) {
      const s = setup(search);
      const source = s.whatsapp.getVisitSource();
      const text = new URL(s.whatsapp.whatsappUrl(message)).searchParams.get('text');
      const lines = text.split('\n');
      if (!source) {
        assert.equal(text, message, `${page}: no source line without a source`);
      } else if (/: $/.test(lines[lines.length - 1])) {
        assert.equal(lines[lines.length - 2], `Found you on: ${source}`, `${page}: source just above the question`);
        assert.equal(lines.filter((l) => l.startsWith('Found you on')).length, 1, `${page}: one source line`);
      } else {
        assert.equal(text, `${message}\nFound you on: ${source}`, `${page}: source is the last line`);
      }
    }
  }
  const kids = new URL(setup('?gclid=1').whatsapp.whatsappUrl(content.pageMessage('kids'))).searchParams.get('text');
  assert.equal(kids, "Assalamu alaikum, I'd like to book a free trial Qur'an lesson for my child.\nFound you on: Google\nChild's age: ");
  assert.equal(content.pageMessage('kids'), "Assalamu alaikum, I'd like to book a free trial Qur'an lesson for my child.\nChild's age: ");
}

// 5c. A typed form message ending in a colon never moves the source line.
{
  const { text } = sendAndRead('?gclid=1', { ...base, message: 'Two questions\nWhen can we start:' });
  assert(text.endsWith('Message: Two questions\nWhen can we start:\nFound you on: Google'), 'source stays last on the form');
}

// 6. Storage blocked (private browsing): still works, nothing thrown.
{
  const s = setup('?fbclid=1');
  s.window.sessionStorage.setItem = () => { throw new Error('blocked'); };
  s.window.sessionStorage.getItem = () => { throw new Error('blocked'); };
  assert.equal(s.whatsapp.initVisitSource(), 'Facebook/Instagram');
}

console.log('PASS: form message format, child age, level, source line (above a last open question on every page), special characters and one conversion per submit. No messages sent.');
