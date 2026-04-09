import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { mockLanguages, mockCourses } from '../data/mockData';
import Navbar from '../components/Navbar';
import LanguageCard from '../components/LanguageCard';
import CourseCard from '../components/CourseCard';
import { Search, Filter, BookOpen } from 'lucide-react';

export default function Courses() {
  const navigate = useNavigate();
  const { languages, courses, currentLanguage, setCurrentLanguage, setLanguages, setCourses } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  useEffect(() => {
    setLanguages(mockLanguages);
    setCourses(mockCourses);
  }, [setLanguages, setCourses]);

  const filteredCourses = courses.filter(course => {
    const matchesLanguage = !currentLanguage || course.languageId === currentLanguage.id;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    return matchesLanguage && matchesSearch && matchesLevel;
  });

  const levelLabels = {
    beginner: '入门',
    intermediate: '进阶',
    advanced: '高级'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            课程中心
          </h1>
          <p className="text-lg text-gray-600">
            探索精选课程，找到最适合你的学习内容
          </p>
        </div>

        <div className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            选择语言
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => setCurrentLanguage(null)}
              className={`relative overflow-hidden rounded-2xl p-6 transition-all duration-300 group ${
                !currentLanguage
                  ? 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-xl'
                  : 'bg-white border-2 border-gray-100 hover:border-blue-200 hover:shadow-lg'
              }`}
            >
              <div className="relative z-10">
                <div className={`text-5xl mb-4`}>🌍</div>
                <h3 className={`text-xl font-bold mb-2 ${
                  !currentLanguage ? 'text-white' : 'text-gray-900'
                }`}>
                  全部语言
                </h3>
                <div className={`text-sm ${
                  !currentLanguage ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  浏览所有课程
                </div>
              </div>
            </button>
            {languages.map((language) => (
              <LanguageCard
                key={language.id}
                language={language}
                isSelected={currentLanguage?.id === language.id}
                onClick={() => setCurrentLanguage(language)}
              />
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="搜索课程..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value as any)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
              >
                <option value="all">全部级别</option>
                <option value="beginner">入门</option>
                <option value="intermediate">进阶</option>
                <option value="advanced">高级</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            找到 <span className="font-semibold text-gray-900">{filteredCourses.length}</span> 门课程
          </p>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onClick={() => navigate(`/courses/${course.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              没有找到相关课程
            </h3>
            <p className="text-gray-600">
              试试调整搜索条件或筛选器
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
