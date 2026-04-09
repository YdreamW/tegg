import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { mockLanguages, mockCourses } from '../data/mockData';
import Navbar from '../components/Navbar';
import LanguageCard from '../components/LanguageCard';
import CourseCard from '../components/CourseCard';
import { GraduationCap, BookOpen, Trophy, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { setLanguages, setCourses, currentLanguage, setCurrentLanguage } = useStore();

  useEffect(() => {
    setLanguages(mockLanguages);
    setCourses(mockCourses);
  }, [setLanguages, setCourses]);

  const featuredCourses = currentLanguage
    ? mockCourses.filter(c => c.languageId === currentLanguage.id)
    : mockCourses;

  const features = [
    {
      icon: BookOpen,
      title: '分级课程',
      description: '从入门到高级，系统化的课程体系'
    },
    {
      icon: GraduationCap,
      title: '互动学习',
      description: '单词记忆、语法练习、口语跟读、听力训练'
    },
    {
      icon: Trophy,
      title: '进度追踪',
      description: '实时记录学习数据，成就系统激励'
    },
    {
      icon: Users,
      title: '社区交流',
      description: '与全球学习者分享笔记，共同进步'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-blue-400/10 to-orange-400/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-200 mb-6">
              <span className="text-sm font-medium text-gray-600">
                🎉 新用户注册送 7 天 VIP 体验
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              开启你的
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                多语言学习之旅
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              沉浸式语言学习体验，覆盖英语、日语、韩语等主流语言。
              系统化课程、互动练习、实时追踪，让学习更高效有趣。
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/courses')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-600 transition-all transform hover:-translate-y-0.5"
              >
                开始学习
              </button>
              <button
                onClick={() => navigate('/learn')}
                className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg shadow-sm hover:shadow-md border border-gray-200 transition-all flex items-center space-x-2"
              >
                <span>了解更多</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              选择你想学习的语言
            </h2>
            <p className="text-lg text-gray-600">
              支持多种主流语言，找到最适合你的学习内容
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockLanguages.map((language) => (
              <LanguageCard
                key={language.id}
                language={language}
                isSelected={currentLanguage?.id === language.id}
                onClick={() => {
                  setCurrentLanguage(language);
                  navigate('/courses');
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                热门课程推荐
              </h2>
              <p className="text-lg text-gray-600">
                精选优质课程，助你快速入门
              </p>
            </div>
            <button
              onClick={() => navigate('/courses')}
              className="hidden md:flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <span>查看全部</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.slice(0, 6).map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => navigate(`/courses/${course.id}`)}
              />
            ))}
          </div>
          
          <div className="md:hidden mt-8 text-center">
            <button
              onClick={() => navigate('/courses')}
              className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium shadow-sm hover:shadow-md border border-gray-200 transition-all"
            >
              查看全部课程
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              为什么选择我们
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              我们致力于提供最优质的语言学习体验
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            准备好开始学习了吗？
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            加入我们，与全球数百万语言学习者一起进步
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              免费注册
            </button>
            <button
              onClick={() => navigate('/courses')}
              className="px-8 py-4 bg-blue-500/20 text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-blue-500/30 transition-all"
            >
              浏览课程
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">PolyGlot</span>
              </div>
              <p className="text-sm">
                让语言学习更简单、更有趣
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">课程</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">英语课程</a></li>
                <li><a href="#" className="hover:text-white transition-colors">日语课程</a></li>
                <li><a href="#" className="hover:text-white transition-colors">韩语课程</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">公司</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">关于我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
                <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">关注我们</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-lg">📱</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-lg">💬</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <span className="text-lg">📺</span>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2024 PolyGlot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
