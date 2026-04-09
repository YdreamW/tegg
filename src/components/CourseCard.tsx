import { Star, Clock, Users, CheckCircle2 } from 'lucide-react';
import type { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
  progress?: number;
}

export default function CourseCard({ course, onClick, progress = course.progress || 0 }: CourseCardProps) {
  const levelColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700'
  };

  const levelLabels = {
    beginner: '入门',
    intermediate: '进阶',
    advanced: '高级'
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
    >
      <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-500">
            <div className="text-4xl">📚</div>
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${levelColors[course.level]}`}>
            {levelLabels[course.level]}
          </span>
        </div>
        {progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm p-3">
            <div className="flex items-center justify-between text-white text-sm mb-1.5">
              <span>学习进度</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-400 to-orange-400 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium text-gray-700">{course.rating}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            {course.lessons} 课时
          </div>
          {progress === 100 && (
            <div className="flex items-center space-x-1 text-green-600">
              <CheckCircle2 className="w-4 h-4" />
              <span className="text-sm font-medium">已完成</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
