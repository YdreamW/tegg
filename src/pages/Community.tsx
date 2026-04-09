import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { mockNotes } from '../data/mockData';
import Navbar from '../components/Navbar';
import { MessageSquare, Heart, Plus, User, Clock } from 'lucide-react';

export default function Community() {
  const navigate = useNavigate();
  const { notes, setNotes, isAuthenticated } = useStore();
  const [likedNotes, setLikedNotes] = useState<string[]>([]);

  useEffect(() => {
    setNotes(mockNotes);
  }, [setNotes]);

  const handleLike = (noteId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setLikedNotes(prev => {
      if (prev.includes(noteId)) {
        return prev.filter(id => id !== noteId);
      }
      return [...prev, noteId];
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">社区</h1>
            <p className="text-lg text-gray-600">与全球学习者分享学习心得</p>
          </div>
          <button
            onClick={() => isAuthenticated ? navigate('/community/new') : navigate('/login')}
            className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>发布笔记</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div
              key={note.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                  {note.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{note.username}</div>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(note.createdAt).toLocaleDateString('zh-CN')}</span>
                  </div>
                </div>
              </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {note.content}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleLike(note.id)}
                    className={`flex items-center space-x-2 transition-colors ${
                      likedNotes.includes(note.id)
                        ? 'text-red-500'
                        : 'text-gray-500 hover:text-red-500'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${likedNotes.includes(note.id) ? 'fill-current' : ''}`}
                    />
                    <span className="font-medium">
                      {note.likes + (likedNotes.includes(note.id) ? 1 : 0)}
                    </span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                    <MessageSquare className="w-5 h-5" />
                    <span className="font-medium">{note.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {notes.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">还没有笔记</h3>
            <p className="text-gray-600 mb-6">成为第一个分享笔记的人吧！</p>
            <button
              onClick={() => isAuthenticated ? navigate('/community/new') : navigate('/login')}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold"
            >
              发布第一篇笔记
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
