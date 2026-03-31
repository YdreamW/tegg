import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Player {
  x: number;
  y: number;
  health: number;
  isDefending: boolean;
  direction: 'left' | 'right';
}

interface Bullet {
  x: number;
  y: number;
  direction: 'left' | 'right';
  player: 1 | 2;
}

const GamePage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const [player1, setPlayer1] = useState<Player>({
    x: 100,
    y: 250,
    health: 100,
    isDefending: false,
    direction: 'right'
  });
  const [player2, setPlayer2] = useState<Player>({
    x: 700,
    y: 250,
    health: 100,
    isDefending: false,
    direction: 'left'
  });
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<number | null>(null);
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({});

  // 游戏循环
  useEffect(() => {
    if (gameOver) return;

    const gameLoop = () => {
      // 更新玩家位置
      updatePlayerPositions();
      // 更新子弹位置
      updateBullets();
      // 检测碰撞
      checkCollisions();
      // 检测游戏结束
      checkGameOver();
      // 渲染游戏
      renderGame();
      // 继续游戏循环
      requestAnimationFrame(gameLoop);
    };

    const gameLoopId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(gameLoopId);
  }, [player1, player2, bullets, keys, gameOver]);

  // 处理键盘输入
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.key]: true }));
      
      // 处理攻击和防御
      if (e.key === 'f') {
        // 玩家1攻击
        fireBullet(1);
      } else if (e.key === 'g') {
        // 玩家1防御
        setPlayer1(prev => ({ ...prev, isDefending: true }));
      } else if (e.key === 'k') {
        // 玩家2攻击
        fireBullet(2);
      } else if (e.key === 'l') {
        // 玩家2防御
        setPlayer2(prev => ({ ...prev, isDefending: true }));
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [e.key]: false }));
      
      // 取消防御
      if (e.key === 'g') {
        setPlayer1(prev => ({ ...prev, isDefending: false }));
      } else if (e.key === 'l') {
        setPlayer2(prev => ({ ...prev, isDefending: false }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 更新玩家位置
  const updatePlayerPositions = () => {
    // 玩家1移动
    setPlayer1(prev => {
      let newX = prev.x;
      let newY = prev.y;
      let newDirection = prev.direction;

      if (keys['w']) newY = Math.max(50, newY - 5);
      if (keys['s']) newY = Math.min(450, newY + 5);
      if (keys['a']) {
        newX = Math.max(50, newX - 5);
        newDirection = 'left';
      }
      if (keys['d']) {
        newX = Math.min(450, newX + 5);
        newDirection = 'right';
      }

      return { ...prev, x: newX, y: newY, direction: newDirection };
    });

    // 玩家2移动
    setPlayer2(prev => {
      let newX = prev.x;
      let newY = prev.y;
      let newDirection = prev.direction;

      if (keys['ArrowUp']) newY = Math.max(50, newY - 5);
      if (keys['ArrowDown']) newY = Math.min(450, newY + 5);
      if (keys['ArrowLeft']) {
        newX = Math.max(550, newX - 5);
        newDirection = 'left';
      }
      if (keys['ArrowRight']) {
        newX = Math.min(850, newX + 5);
        newDirection = 'right';
      }

      return { ...prev, x: newX, y: newY, direction: newDirection };
    });
  };

  // 发射子弹
  const fireBullet = (player: 1 | 2) => {
    if (player === 1) {
      setBullets(prev => [...prev, {
        x: player1.x + 50,
        y: player1.y + 20,
        direction: player1.direction,
        player: 1
      }]);
    } else {
      setBullets(prev => [...prev, {
        x: player2.x,
        y: player2.y + 20,
        direction: player2.direction,
        player: 2
      }]);
    }
  };

  // 更新子弹位置
  const updateBullets = () => {
    setBullets(prev => prev
      .map(bullet => ({
        ...bullet,
        x: bullet.direction === 'right' ? bullet.x + 10 : bullet.x - 10
      }))
      .filter(bullet => bullet.x > 0 && bullet.x < 1000)
    );
  };

  // 检测碰撞
  const checkCollisions = () => {
    bullets.forEach(bullet => {
      if (bullet.player === 1) {
        // 玩家1的子弹击中玩家2
        if (
          bullet.x >= player2.x &&
          bullet.x <= player2.x + 50 &&
          bullet.y >= player2.y &&
          bullet.y <= player2.y + 40
        ) {
          // 计算伤害
          const damage = player2.isDefending ? 5 : 10;
          setPlayer2(prev => ({
            ...prev,
            health: Math.max(0, prev.health - damage)
          }));
          // 移除子弹
          setBullets(prev => prev.filter(b => b !== bullet));
        }
      } else {
        // 玩家2的子弹击中玩家1
        if (
          bullet.x >= player1.x &&
          bullet.x <= player1.x + 50 &&
          bullet.y >= player1.y &&
          bullet.y <= player1.y + 40
        ) {
          // 计算伤害
          const damage = player1.isDefending ? 5 : 10;
          setPlayer1(prev => ({
            ...prev,
            health: Math.max(0, prev.health - damage)
          }));
          // 移除子弹
          setBullets(prev => prev.filter(b => b !== bullet));
        }
      }
    });
  };

  // 检测游戏结束
  const checkGameOver = () => {
    if (player1.health === 0) {
      setGameOver(true);
      setWinner(2);
    } else if (player2.health === 0) {
      setGameOver(true);
      setWinner(1);
    }
  };

  // 渲染游戏
  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制背景
    ctx.fillStyle = '#1a2b3c';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制地面
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 500, canvas.width, 100);

    // 绘制玩家1
    ctx.fillStyle = player1.isDefending ? '#ff6666' : '#ff3333';
    ctx.fillRect(player1.x, player1.y, 50, 40);
    // 绘制玩家1的头部
    ctx.fillStyle = '#000';
    ctx.fillRect(player1.x + 20, player1.y - 10, 10, 10);

    // 绘制玩家2
    ctx.fillStyle = player2.isDefending ? '#6666ff' : '#3333ff';
    ctx.fillRect(player2.x, player2.y, 50, 40);
    // 绘制玩家2的头部
    ctx.fillStyle = '#000';
    ctx.fillRect(player2.x + 20, player2.y - 10, 10, 10);

    // 绘制子弹
    bullets.forEach(bullet => {
      ctx.fillStyle = bullet.player === 1 ? '#ff3333' : '#3333ff';
      ctx.fillRect(bullet.x, bullet.y, 10, 5);
    });
  };

  // 重新开始游戏
  const handleRestartGame = () => {
    setPlayer1({
      x: 100,
      y: 250,
      health: 100,
      isDefending: false,
      direction: 'right'
    });
    setPlayer2({
      x: 700,
      y: 250,
      health: 100,
      isDefending: false,
      direction: 'left'
    });
    setBullets([]);
    setGameOver(false);
    setWinner(null);
  };

  // 返回主页面
  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#1a2b3c] text-white font-pixel">
      {/* 生命值显示 */}
      <div className="flex justify-between p-4">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-[#ff3333] rounded-full flex items-center justify-center mr-4">
            <div className="w-12 h-12 bg-[#1a2b3c] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-[#ff3333] rounded-full"></div>
            </div>
          </div>
          <div>
            <div className="text-lg font-bold">玩家1</div>
            <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#ff3333] transition-all duration-300" 
                style={{ width: `${player1.health}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div>
            <div className="text-lg font-bold text-right">玩家2</div>
            <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-400 transition-all duration-300" 
                style={{ width: `${player2.health}%` }}
              ></div>
            </div>
          </div>
          <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center ml-4">
            <div className="w-12 h-12 bg-[#1a2b3c] rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 游戏场景 */}
      <div className="flex justify-center">
        <canvas 
          ref={canvasRef} 
          width={1000} 
          height={600} 
          className="border-2 border-white"
        ></canvas>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-between p-4 mt-4">
        <div className="bg-black/50 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2 text-[#ff3333]">玩家1控制</h3>
          <div className="grid grid-cols-3 gap-2">
            <button className="bg-gray-800 p-2 rounded">W</button>
            <button className="bg-gray-800 p-2 rounded">A</button>
            <button className="bg-gray-800 p-2 rounded">S</button>
            <button className="bg-gray-800 p-2 rounded">D</button>
            <button className="bg-[#ff3333] p-2 rounded">F</button>
            <button className="bg-[#ff3333] p-2 rounded">G</button>
          </div>
        </div>
        <div className="bg-black/50 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-2 text-blue-400">玩家2控制</h3>
          <div className="grid grid-cols-3 gap-2">
            <button className="bg-gray-800 p-2 rounded">↑</button>
            <button className="bg-gray-800 p-2 rounded">←</button>
            <button className="bg-gray-800 p-2 rounded">↓</button>
            <button className="bg-gray-800 p-2 rounded">→</button>
            <button className="bg-blue-400 p-2 rounded">K</button>
            <button className="bg-blue-400 p-2 rounded">L</button>
          </div>
        </div>
      </div>

      {/* 游戏结束弹窗 */}
      {gameOver && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#1a2b3c] p-8 rounded-lg text-center">
            <h2 className="text-4xl font-bold mb-6 text-[#ffcc00] animate-pulse">
              游戏结束
            </h2>
            <p className="text-2xl mb-8">
              {winner === 1 ? '玩家1获胜！' : '玩家2获胜！'}
            </p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={handleRestartGame}
                className="bg-[#ffcc00] text-[#1a2b3c] text-xl font-bold py-2 px-6 rounded-md hover:scale-110 active:scale-95 transition-all duration-200"
              >
                重新开始
              </button>
              <button
                onClick={handleBackToHome}
                className="bg-gray-700 text-white text-xl font-bold py-2 px-6 rounded-md hover:scale-110 active:scale-95 transition-all duration-200"
              >
                返回主页面
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;