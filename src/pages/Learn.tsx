import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BookOpen, ScrollText, Mic, Headphones, ArrowRight } from 'lucide-react';

export default function Learn() {
  const navigate = useNavigate();

  const learningModules = [
    {
      id: 'vocabulary',
      title: '单词记忆',
      description: '通过闪卡、拼写练习和词义匹配来高效记忆单词',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      path: '/learn/vocabulary'
    },
    {
      id: 'grammar',
      title: '语法练习',
      description: '选择题、填空题，配合详细的知识点解析',
      icon: ScrollText,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      path: '/learn/grammar'
    },
    {
      id: 'speaking',
      title: '口语跟读',
      description: '播放标准发音，录音对比，获得实时发音评分',
      icon: Mic,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      path: '/learn/speaking'
    },
    {
      id: 'listening',
      title: '听力训练',
      description: '精选听力材料，支持速度调节，提升听力理解能力',
      icon: Headphones,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      path: '/learn/listening'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            学习中心
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            多元化的互动学习模块，让语言学习更有趣、更高效
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {learningModules.map((module) => {
            const Icon = module.icon;
            return (
              <div
                key={module.id}
                onClick={() => navigate(module.path)}
                className={`relative overflow-hidden rounded-3xl cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${module.bgColor}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${module.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${module.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors">
                    {module.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 group-hover:text-white/90 transition-colors">
                    {module.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 text-blue-600 group-hover:text-white transition-colors">
                    <span className="font-semibold">开始学习</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-br from-blue-600 to-orange-500 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              今日学习建议
            </h2>
            <p className="text-xl text-white/90 mb-8">
              每天坚持学习 30 分钟，效果更佳！
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => navigate('/learn/vocabulary')}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                开始今日学习
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
