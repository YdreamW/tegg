import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { mockWords } from '../data/mockData';
import Navbar from '../components/Navbar';
import { ArrowLeft, Check, X, RotateCcw, Trophy } from 'lucide-react';

export default function Vocabulary() {
  const navigate = useNavigate();
  const { currentLanguage, addXP, unlockAchievement } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [wordsLearned, setWordsLearned] = useState(0);

  const filteredVocabulary = currentLanguage
    ? mockWords.filter(v => v.languageId === currentLanguage.id)
    : mockWords;

  const currentWord = filteredVocabulary[currentIndex];

  useEffect(() => {
    if (filteredVocabulary.length === 0 && currentLanguage) {
      navigate('/courses');
    }
  }, [filteredVocabulary.length, currentLanguage, navigate]);

  const handleKnow = () => {
    setScore(s => s + 10);
    setWordsLearned(w => w + 1);
    nextWord();
  };

  const handleDontKnow = () => {
    nextWord();
  };

  const nextWord = () => {
    setIsFlipped(false);
    if (currentIndex < filteredVocabulary.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      finishSession();
    }
  };

  const finishSession = () => {
    setShowResult(true);
    if (wordsLearned > 0) {
      addXP(score);
      if (wordsLearned >= 1) {
        unlockAchievement('ach-1');
      }
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore(0);
    setShowResult(false);
    setWordsLearned(0);
  };

  if (filteredVocabulary.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">请先选择语言</h2>
          <button
            onClick={() => navigate('/courses')}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-medium"
          >
            选择语言
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">学习完成！</h2>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">{score}</div>
                <div className="text-gray-600">获得 XP</div>
              </div>
              <div className="bg-green-50 rounded-2xl p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">{wordsLearned}</div>
                <div className="text-gray-600">学习单词</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={restart}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>继续学习</span>
              </button>
              <button
                onClick={() => navigate('/learn')}
                className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold text-lg shadow-sm hover:shadow-md border border-gray-200 transition-all"
              >
                返回学习中心
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/learn')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-gray-600">
              进度: {currentIndex + 1} / {filteredVocabulary.length}
            </div>
            <div className="text-blue-600 font-semibold">
              {score} XP
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-gradient-to-r from-blue-500 to-orange-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex + 1) / filteredVocabulary.length) * 100}%` }}
          />
        </div>

        <div className="perspective-1000">
          <div
            className={`relative w-full aspect-[4/3] cursor-pointer transform-style-preserve-3d transition-transform duration-600 ${isFlipped ? 'rotate-y-180' : ''}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="absolute inset-0 w-full h-full backface-hidden">
              <div className="w-full h-full bg-white rounded-3xl shadow-xl border border-gray-100 flex flex-col items-center justify-center p-8">
                <div className="text-2xl text-gray-500 mb-4">点击卡片查看翻译</div>
                <div className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
                  {currentWord.word}
                </div>
                {currentWord.pronunciation && (
                  <div className="text-lg text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                    {currentWord.pronunciation}
                  </div>
                )}
              </div>
            </div>
            
            <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-white">
                <div className="text-2xl text-blue-100 mb-4">翻译</div>
                <div className="text-5xl md:text-6xl font-bold mb-6">
                  {currentWord.translation}
                </div>
                {currentWord.example && (
                  <div className="text-lg text-blue-100 text-center bg-white/10 px-6 py-4 rounded-xl">
                    "{currentWord.example}"
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            onClick={handleDontKnow}
            className="flex-1 px-8 py-4 bg-white text-red-600 border-2 border-red-200 rounded-xl font-semibold text-lg hover:bg-red-50 transition-all flex items-center justify-center space-x-2"
          >
            <X className="w-6 h-6" />
            <span>不认识</span>
          </button>
          <button
            onClick={handleKnow}
            className="flex-1 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            <Check className="w-6 h-6" />
            <span>认识</span>
          </button>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
