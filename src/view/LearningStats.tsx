import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/LearningStats.css';
import BackIcon from "../assets/Back.svg";

interface PlayerRecord {
  id: number;
  timestamp: Date;
  location: number;
  locationName: string;
  action: string;
  details?: string;
}

interface Player {
  id: number;
  name: string;
  avatar: string;
  avatarImage?: string;
  round: number;
  status: string;
  location: number;
  locationName: string;
  record: string;
  records: PlayerRecord[];
  isCurrentPlayer: boolean;
  score: number;
  diceSum: number;
}

interface User {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  avatarImage?: string;
  loginTime: string;
  playerId: number;
}

const LearningStats: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  // 模擬獲取當前登入用戶
  useEffect(() => {
    // 這裡應該從登入系統獲取當前用戶
    const mockUser: User = {
      id: 'user_001',
      username: 'student_001',
      name: '小貓咪',
      avatar: '🐯',
      avatarImage: '/src/assets/小貓.png',
      loginTime: '2024-01-15 14:30',
      playerId: 2
    };
    setCurrentUser(mockUser);

    // 模擬玩家數據
    const mockPlayers: Player[] = [
      {
        id: 1,
        name: '彌豆子',
        avatar: '🐻',
        avatarImage: '/src/assets/小熊頭.png',
        round: 2,
        status: '正常',
        location: 15,
        locationName: '加油站',
        record: '完成挑戰',
        records: [
          { id: 1, timestamp: new Date(), location: 2, locationName: '挑戰格', action: '挑戰', details: '單字挑戰-成功' },
          { id: 2, timestamp: new Date(), location: 5, locationName: '挑戰格', action: '挑戰', details: '情境對話-失敗' },
          { id: 3, timestamp: new Date(), location: 8, locationName: '挑戰格', action: '挑戰', details: '單字挑戰-成功' },
        ],
        isCurrentPlayer: false,
        score: 0,
        diceSum: 25
      },
      {
        id: 2,
        name: '小貓咪',
        avatar: '🐯',
        avatarImage: '/src/assets/小貓.png',
        round: 1,
        status: '正常',
        location: 18,
        locationName: '火車站',
        record: '完成火車挑戰',
        records: [
          { id: 1, timestamp: new Date(), location: 2, locationName: '挑戰格', action: '挑戰', details: '交通工具單字挑戰-成功' },
          { id: 2, timestamp: new Date(), location: 5, locationName: '挑戰格', action: '挑戰', details: '交通工具情境對話-成功' },
          { id: 3, timestamp: new Date(), location: 8, locationName: '挑戰格', action: '挑戰', details: '植物單字挑戰-失敗' },
          { id: 4, timestamp: new Date(), location: 11, locationName: '挑戰格', action: '挑戰', details: '植物情境對話-失敗' },
          { id: 5, timestamp: new Date(), location: 18, locationName: '火車站', action: '火車挑戰', details: '交通工具火車挑戰-成功' },
        ],
        isCurrentPlayer: true,
        score: 0,
        diceSum: 32
      }
    ];
    setPlayers(mockPlayers);
  }, []);

  // 根據用戶找到對應的玩家
  useEffect(() => {
    if (currentUser && players.length > 0) {
      const player = players.find(p => p.id === currentUser.playerId);
      setCurrentPlayer(player || null);
    }
  }, [currentUser, players]);

  // 計算整體學習進度
  const getOverallProgress = (player: Player) => {
    const totalChallenges = player.records.filter(r => 
      r.details?.includes('挑戰') || r.details?.includes('成功') || r.details?.includes('失敗')
    ).length;
    const successfulChallenges = player.records.filter(r => 
      r.details?.includes('成功')
    ).length;
    return totalChallenges > 0 ? Math.round((successfulChallenges / totalChallenges) * 100) : 0;
  };

  // 計算挑戰類型統計
  const getChallengeTypeStats = (player: Player) => {
    const vocabularyRecords = player.records.filter(r => r.details?.includes('單字'));
    const dialogueRecords = player.records.filter(r => 
      r.details?.includes('情境') || r.details?.includes('火車')
    );

    const vocabularySuccess = vocabularyRecords.filter(r => r.details?.includes('成功')).length;
    const dialogueSuccess = dialogueRecords.filter(r => r.details?.includes('成功')).length;

    return {
      vocabulary: {
        success: vocabularySuccess,
        total: vocabularyRecords.length,
        rate: vocabularyRecords.length > 0 ? Math.round((vocabularySuccess / vocabularyRecords.length) * 100) : 0
      },
      dialogue: {
        success: dialogueSuccess,
        total: dialogueRecords.length,
        rate: dialogueRecords.length > 0 ? Math.round((dialogueSuccess / dialogueRecords.length) * 100) : 0
      }
    };
  };

  // 計算主題分類統計
  const getThemeStats = (player: Player) => {
    // 根據記錄中的主題分類統計
    const trafficRecords = player.records.filter(r => 
      r.details?.includes('交通工具') || r.details?.includes('交通王')
    );
    const plantRecords = player.records.filter(r => 
      r.details?.includes('植物') || r.details?.includes('植物大冒險')
    );

    const trafficSuccess = trafficRecords.filter(r => r.details?.includes('成功')).length;
    const plantSuccess = plantRecords.filter(r => r.details?.includes('成功')).length;

    return {
      traffic: { 
        rate: trafficRecords.length > 0 ? Math.round((trafficSuccess / trafficRecords.length) * 100) : 80,
        total: trafficRecords.length,
        success: trafficSuccess
      },
      plant: { 
        rate: plantRecords.length > 0 ? Math.round((plantSuccess / plantRecords.length) * 100) : 40,
        total: plantRecords.length,
        success: plantSuccess
      }
    };
  };

  // 計算學習趨勢
  const getLearningTrend = (player: Player) => {
    const recentRecords = player.records.slice(-5);
    const recentSuccess = recentRecords.filter(r => r.details?.includes('成功')).length;
    const recentRate = recentRecords.length > 0 ? Math.round((recentSuccess / recentRecords.length) * 100) : 0;
    
    const overallRate = getOverallProgress(player);
    const trend = recentRate >= overallRate ? '上升' : '下降';
    const improvement = Math.abs(recentRate - overallRate);
    
    return {
      trend,
      improvement,
      recentRate,
      overallRate
    };
  };

  // 獲取加強項目
  const getImprovementAreas = (player: Player) => {
    const challengeStats = getChallengeTypeStats(player);
    const themeStats = getThemeStats(player);
    const improvements = [];

    if (challengeStats.vocabulary.rate < 70) {
      improvements.push({
        area: '單字挑戰',
        current: challengeStats.vocabulary.rate,
        target: 80,
        priority: 'high'
      });
    }

    if (challengeStats.dialogue.rate < 70) {
      improvements.push({
        area: '情境對話',
        current: challengeStats.dialogue.rate,
        target: 80,
        priority: 'high'
      });
    }

    if (themeStats.traffic.rate < 70) {
      improvements.push({
        area: '交通工具',
        current: themeStats.traffic.rate,
        target: 80,
        priority: 'medium'
      });
    }

    if (themeStats.plant.rate < 70) {
      improvements.push({
        area: '植物主題',
        current: themeStats.plant.rate,
        target: 80,
        priority: 'medium'
      });
    }

    return improvements;
  };

  // 生成學習計畫
  const generateStudyPlan = (improvements: any[]) => {
    const plans = [];
    
    improvements.forEach(improvement => {
      switch (improvement.area) {
        case '單字挑戰':
          plans.push('加強單字學習，多練習單字大單挑');
          break;
        case '情境對話':
          plans.push('提升情境對話能力，多參與情境挑戰');
          break;
        case '交通工具':
          plans.push('深化交通工具主題，專注交通工具相關單字');
          break;
        case '植物主題':
          plans.push('加強植物主題學習，學習植物相關單字');
          break;
      }
    });
    
    return plans;
  };

  // 渲染進度條
  const renderProgressBar = (rate: number) => {
    const filledBars = Math.round(rate / 10);
    const emptyBars = 10 - filledBars;
    
    return (
      <div className="progress-bar">
        {'█'.repeat(filledBars)}
        {'░'.repeat(emptyBars)}
        <span className="progress-text">{rate}%</span>
      </div>
    );
  };

  if (!currentUser || !currentPlayer) {
    return <div className="loading">載入中...</div>;
  }

  const overallProgress = getOverallProgress(currentPlayer);
  const challengeStats = getChallengeTypeStats(currentPlayer);
  const themeStats = getThemeStats(currentPlayer);
  const learningTrend = getLearningTrend(currentPlayer);
  const improvements = getImprovementAreas(currentPlayer);
  const studyPlans = generateStudyPlan(improvements);

  return (
    <div className="learning-stats-container">
         <button
          type="button"
          className="back-button"
          aria-label="返回"
          onClick={() => navigate("/Learn")}
        >
          <img src={BackIcon} alt="返回" />
        </button>
      <div className="learning-stats-content">
        {/* 標題 */}
        <div className="stats-header">
          <h1>📚 台語學習成果統計</h1>
        </div>

        {/* 用戶資訊 */}
        <div className="user-info-section">
          <div className="user-header">
            <div className="user-avatar">
              {currentPlayer.avatarImage ? (
                <img src={currentPlayer.avatarImage} alt={currentPlayer.name} />
              ) : (
                <span>{currentPlayer.avatar}</span>
              )}
            </div>
            <div className="user-details">
              <h2>🎯 {currentPlayer.name}的台語學習成果</h2>
              <div className="user-meta">
                <span>👤 用戶：{currentUser.username}</span>
                <span>🕐 登入時間：{currentUser.loginTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 整體學習進度 */}
        <div className="progress-section">
          <h3>🎯 整體學習進度</h3>
          {renderProgressBar(overallProgress)}
        </div>

        {/* 挑戰類型表現 */}
        <div className="challenge-section">
          <h3>📊 挑戰類型表現</h3>
          <div className="challenge-stats">
            <div className="challenge-item">
              <span>📚 單字挑戰：</span>
              {renderProgressBar(challengeStats.vocabulary.rate)}
            </div>
            <div className="challenge-item">
              <span>💬 情境對話：</span>
              {renderProgressBar(challengeStats.dialogue.rate)}
            </div>
          </div>
        </div>

        {/* 主題分類表現 */}
        <div className="theme-section">
          <h3>🎨 主題分類表現</h3>
          <div className="theme-stats">
            <div className="theme-item">
              <span>🚗 交通工具：</span>
              {renderProgressBar(themeStats.traffic.rate)}
            </div>
            <div className="theme-item">
              <span>🌱 植物主題：</span>
              {renderProgressBar(themeStats.plant.rate)}
            </div>
          </div>
        </div>

        {/* 學習趨勢 */}
        <div className="trend-section">
          <h3>📈 學習趨勢</h3>
          <div className="trend-info">
            <div className="trend-item">
              <span>📈 最近表現：{learningTrend.trend}趨勢</span>
            </div>
            <div className="trend-item">
              <span>📊 進步幅度：+{learningTrend.improvement}%</span>
            </div>
          </div>
        </div>

        {/* 加強項目 */}
        <div className="improvement-section">
          <h3>🎯 加強項目</h3>
          <div className="improvement-list">
            {improvements.map((improvement, index) => (
              <div key={index} className={`improvement-item priority-${improvement.priority}`}>
                <span className="improvement-area">
                  {improvement.priority === 'high' ? '🔴' : '🟡'} {improvement.area}：
                </span>
                <span className="improvement-progress">
                  目前{improvement.current}% 目標{improvement.target}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 學習計畫 */}
        <div className="study-plan-section">
          <h3>📚 學習計畫</h3>
          <div className="study-plan-list">
            {studyPlans.map((plan, index) => (
              <div key={index} className="study-plan-item">
                {plan}
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default LearningStats;
