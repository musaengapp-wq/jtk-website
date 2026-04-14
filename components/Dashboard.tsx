import React from 'react';
import { StudentStats, Achievement } from '../types';
import { MOCK_STUDENT_STATS, MOCK_ACHIEVEMENTS } from '../constants';
import { ProgressBar, BadgeComponent, Button, Card } from './UIComponents';
import { LogOut, BookOpen, Calendar, Clock, User } from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

export const ParentDashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const stats: StudentStats = MOCK_STUDENT_STATS;
  const achievements: Achievement[] = MOCK_ACHIEVEMENTS;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Top Bar */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-brand-teal p-2 rounded-xl text-white">
              <BookOpen size={24} strokeWidth={3} />
            </div>
            <span className="font-display font-bold text-xl text-slate-800 hidden sm:inline">Progress Tracker (Preview)</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-700">Welcome, Parent</p>
              <p className="text-xs text-slate-500">Student: {stats.studentName}</p>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white shadow-sm">
               <img src="https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=150&auto=format&fit=crop" alt="Student Avatar" className="w-full h-full object-cover block" />
            </div>
            <button onClick={onLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        
        {/* Welcome & Quick Stats */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-slate-800 mb-2">Student Progress Tracker</h1>
          <p className="text-slate-600">Overview for <span className="font-bold text-brand-teal">{stats.studentName}</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-full text-brand-blue"><BookOpen size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Current Level</p>
              <p className="text-xl font-bold text-slate-800">{stats.level}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded-full text-brand-green"><Calendar size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Attendance Rate</p>
              <p className="text-xl font-bold text-slate-800">{stats.attendance}%</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="bg-purple-50 p-3 rounded-full text-brand-purple"><Clock size={24} /></div>
            <div>
              <p className="text-sm text-slate-500 font-medium">Next Class</p>
              <p className="text-xl font-bold text-slate-800">{stats.nextClass}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Progress Charts */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="p-8">
              <h3 className="font-bold text-xl text-slate-800 mb-6">Skill Proficiency</h3>
              <div className="space-y-6">
                <ProgressBar label="Qur'an Reading & Fluency" value={stats.progress.reading} color="bg-brand-teal" />
                <ProgressBar label="Tajwid Rules Application" value={stats.progress.tajwid} color="bg-brand-orange" />
                <ProgressBar label="Memorization Retention" value={stats.progress.memorization} color="bg-brand-purple" />
                <ProgressBar label="Arabic Vocabulary" value={stats.progress.vocabulary} color="bg-brand-blue" />
              </div>
            </Card>

            {/* Memorization Log */}
            <Card className="p-0 overflow-hidden">
              <div className="p-6 border-b border-slate-50">
                <h3 className="font-bold text-xl text-slate-800">Recent Surahs</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {stats.recentSurahs.map((surah, i) => (
                  <div key={i} className="p-4 px-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        surah.status === 'Completed' ? 'bg-green-500' : 
                        surah.status === 'In Progress' ? 'bg-blue-500' : 'bg-orange-400'
                      }`}></div>
                      <span className="font-medium text-slate-700">{surah.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                         surah.status === 'Completed' ? 'bg-green-100 text-green-600' : 
                         surah.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {surah.status}
                      </span>
                      <span className="text-xs text-slate-400">{surah.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Teacher's Note */}
            <Card className="bg-yellow-50 border-yellow-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow-sm flex-shrink-0 overflow-hidden bg-slate-100">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/png?seed=UstadhAhmed&top=turban&hatColor=ffffff&facialHair=beardMajestic&facialHairColor=000000&clothing=collarSweater&clothingColor=777777&skinColor=f2d3b1"
                    alt="Ustadh Ahmed" 
                    className="w-full h-full object-cover block"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Teacher's Note - Ustadh Ahmed</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    "Masha'Allah, Hamza has shown great improvement in his Tajweed this week. We focused on the rules of Noon Saakin, and he is applying them correctly in Surah Al-Fajr. Keep up the daily revision!"
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-8">
            {/* Achievements */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6">
              <h3 className="font-bold text-xl text-slate-800 mb-6">Recent Badges</h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((badge, idx) => (
                  <BadgeComponent 
                    key={idx} 
                    icon={badge.icon} 
                    title={badge.title} 
                    date={badge.date} 
                    color={badge.color} 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};