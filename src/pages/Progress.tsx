import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { mockAchievements, mockCourses, mockLanguages } from '../data/mockData';
import Navbar from '../components/Navbar';
import { Trophy, BookOpen, Clock, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function Progress() {
  const { user, achievements, setAchievements } = useStore();

  useEffect(() => {
    setAchievements(mockAchievements);
  }, [setAchievements]);

  const stats = [
    { label: '学习天数', value: '7', icon: Calendar, color: 'from-blue-500 to-blue-600' },
    { label: '学习时长', value: '12h', icon: Clock, color: 'from-green-500 to-green-600' },
    { label: '掌握单词', value: '156', icon: BookOpen, color: 'from-orange-500 to-orange-600' },
    { label: '完成课程', value: '3', icon: CheckCircle2, color: 'from-purple-500 to-purple-600' }
  ];

  function Calendar(props: any) {
    return <div {...props}>📅</div>;
  }

  const weeklyProgress = [
    { day: '周一', hours: 2.5 },
    { day: '周二', hours: 1.8 },
    { day: '周三', hours: 3.2 },
    { day: '周四', hours: 1.5 },
    { day: '周五', hours: 2.8 },
    { day: '周六', hours: 3.5 },
    { day: '周日', hours: 2.0 }
  ];

  const maxHours = Math.max(...weeklyProgress.map(d => d.hours));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user && (
          <div className="bg-gradient-to-br from-blue-600 to-orange-500 rounded-3xl p-8 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-6 md:mb-0">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                  <div className="flex items-center space-x-4 text-white/90">
                    <span>等级 {user.level}</span>
                    <span>·</span>
                    <span>{user.xp} XP</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="white"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(user.xp % 100) / 100 * 352} 352`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{user.xp % 100}</div>
                      <div className="text-sm opacity-80">/ 100</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-gray-900">本周学习</h2>
            </div>
            <div className="flex items-end justify-between h-48 px-2">
              {weeklyProgress.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="text-sm text-gray-500 mb-2">{day.hours}h</div>
                  <div
                    className="w-full max-w-12 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500"
                    style={{ height: `${(day.hours / maxHours) * 100}%` }}
                  />
                  <div className="text-sm text-gray-600 mt-2">{day.day}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-6">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-bold text-gray-900">成就</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement) => {
                const isUnlocked = achievement.unlocked;
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200 opacity-50'
                    }`}
                  >
                    <div className="text-4xl mb-2">{achievement.icon}</div>
                    <div className="font-semibold text-gray-900 mb-1">{achievement.title}</div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                    {isUnlocked && (
                      <div className="text-xs text-yellow-600 mt-2 font-medium">
                        +{achievement.xpReward} XP
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-6">学习中的课程</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{course.title}</h3>
                    <div className="text-sm text-gray-600">{course.lessons} 课时</div>
                  </div>
                  <div className="text-2xl">{mockLanguages.find(l => l.id === course.languageId)?.flag}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>进度</span>
                    <span>35%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-orange-500 h-2 rounded-full"
                      style={{ width: '35%' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
