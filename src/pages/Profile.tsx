import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import Navbar from '../components/Navbar';
import { User, Mail, Settings, LogOut, ArrowLeft, Camera } from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  if (!isAuthenticated || !user) {
    navigate('/login');
    return null;
  }

  const handleSave = () => {
    updateUser({
      username: editForm.username,
      email: editForm.email
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </button>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-orange-500 h-32 relative">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-5xl font-bold shadow-xl border-4 border-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
                  <Camera className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-20 pb-8 px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
              <div>
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="text-3xl font-bold text-gray-900 border-b-2 border-blue-500 focus:outline-none bg-transparent"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="text-lg text-gray-600 border-b border-gray-300 focus:border-blue-500 focus:outline-none bg-transparent"
                    />
                  </div>
                ) : (
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.username}</h1>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Mail className="w-5 h-5" />
                      <span>{user.email}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-6 md:mt-0 flex space-x-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditForm({ username: user.username, email: user.email });
                      }}
                      className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      取消
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
                  >
                    <Settings className="w-4 h-4" />
                    <span>编辑资料</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8 pt-6 border-t border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">{user.level}</div>
                <div className="text-gray-600">等级</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1">{user.xp}</div>
                <div className="text-gray-600">经验值</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {new Date(user.createdAt).toLocaleDateString('zh-CN', { month: 'short', year: 'numeric' })}
                </div>
                <div className="text-gray-600">加入时间</div>
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-100">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Settings className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-900">学习设置</span>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-900">账号安全</span>
                </div>
                <ArrowLeft className="w-5 h-5 text-gray-400 rotate-180" />
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl hover:bg-red-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="font-medium text-red-600">退出登录</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
