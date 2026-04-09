import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { BookOpen, GraduationCap, Trophy, Users, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: '首页', icon: BookOpen },
    { path: '/courses', label: '课程', icon: GraduationCap },
    { path: '/learn', label: '学习', icon: BookOpen },
    { path: '/progress', label: '进度', icon: Trophy },
    { path: '/community', label: '社区', icon: Users }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                PolyGlot
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-orange-50 px-3 py-1.5 rounded-full">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.level}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.xp} XP</span>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium">{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden lg:inline">退出</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
                >
                  注册
                </Link>
              </div>
            )}
          </div>

          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
          
          <div className="border-t px-4 py-3">
            {isAuthenticated && user ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                    {user.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{user.username}</div>
                    <div className="text-sm text-gray-500">等级 {user.level} · {user.xp} XP</div>
                  </div>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg"
                >
                  <User className="w-5 h-5" />
                  <span>个人中心</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="w-5 h-5" />
                  <span>退出登录</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 text-gray-600 hover:text-gray-900 font-medium rounded-lg"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium"
                >
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
