import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { GraduationCap, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(formData.email.split('@')[0], formData.password);
    setIsLoading(false);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
              PolyGlot
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            欢迎回来
          </h1>
          <p className="text-gray-600">
            登录你的账号继续学习
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="请输入邮箱"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-600">
                  记住我
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                忘记密码？
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-600 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">或者</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-xl mr-2">📱</span>
                <span className="font-medium text-gray-700">微信</span>
              </button>
              <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <span className="text-xl mr-2">💬</span>
                <span className="font-medium text-gray-700">QQ</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-8 text-gray-600">
          还没有账号？{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-semibold">
            立即注册
          </Link>
        </p>
      </div>
    </div>
  );
}
