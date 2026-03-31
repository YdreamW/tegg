import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a2b3c] text-white font-pixel">
      {/* 游戏标题 */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-bold text-[#ff3333] mb-4 animate-pulse">
          像素风机甲对战
        </h1>
        <div className="w-32 h-32 mx-auto bg-[#ff3333] rounded-full flex items-center justify-center">
          <div className="w-24 h-24 bg-[#1a2b3c] rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-[#ff3333] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* 开始按钮 */}
      <button
        onClick={handleStartGame}
        className="bg-[#ffcc00] text-[#1a2b3c] text-2xl font-bold py-4 px-12 rounded-md hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg mb-12"
      >
        开始游戏
      </button>

      {/* 游戏规则说明 */}
      <div className="bg-black/50 p-6 rounded-lg max-w-md">
        <h2 className="text-xl font-bold mb-4 text-[#ffcc00]">游戏规则</h2>
        <div className="text-left space-y-2">
          <p><span className="text-[#ff3333]">玩家1</span>：WASD移动，F攻击，G防御</p>
          <p><span className="text-blue-400">玩家2</span>：方向键移动，K攻击，L防御</p>
          <p>击败对方机甲，使其生命值为0即可获胜</p>
          <p>防御可以减少受到的伤害</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;