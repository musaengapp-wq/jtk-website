const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const ts = require('typescript');
const source = fs.readFileSync('App.tsx', 'utf8');
const pricing = source.slice(source.indexOf('const PRICING ='), source.indexOf('const FAQS ='));
const handler = source.slice(source.indexOf('  const handleSubmit ='), source.indexOf('\n  return (', source.indexOf('  const handleSubmit =')));
for (const [id, expected, learner, level] of [
  ['30-2', 'Two 30-minute lessons each week — £30/month', 'Myself', "Complete beginner (I don't know the letters yet)"],
  ['60-4', 'Four 60-minute lessons each week — £95/month', 'My child', 'I know the letters but read slowly'],
  ['', 'Not sure yet', 'Myself', 'I know some Arabic and want to go further'],
]) {
  let opened, tracked = 0, prevented = false;
  const context = { name: 'Test & name', interest: 'Arabic-reading foundations (Nooraniyah)', learner, level, times: '18:00 UK', message: 'Question? A+B & C', selectedPlan: id, WHATSAPP_NUMBER: '447933395159', trackWhatsAppClick: () => tracked++, window: {open: (...args) => opened = args}, event: {preventDefault: () => prevented = true}};
  vm.runInNewContext(ts.transpileModule(pricing + handler + '\nhandleSubmit(event);', {compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText, context);
  const url = new URL(opened[0]);
  assert.equal(url.origin + url.pathname, 'https://wa.me/447933395159');
  assert.equal(opened[2], 'noopener,noreferrer');
  assert(url.searchParams.get('text').includes('Preferred lesson option: ' + expected));
  assert(url.searchParams.get('text').includes('Name: Test & name'));
  assert(url.searchParams.get('text').includes('Lessons for: ' + learner));
  assert(url.searchParams.get('text').includes('Interested in: Arabic-reading foundations (Nooraniyah)\nLevel: ' + level));
  assert(!url.searchParams.get('text').toLowerCase().includes('assessment'));
  assert(url.searchParams.get('text').includes('Question? A+B & C'));
  assert.equal(tracked, 1); assert(prevented);
}
console.log('PASS: adult, parent and undecided enquiries preserve plan, learner, level and special characters; no messages sent.');
