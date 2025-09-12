import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../style/Monopoly.css';
import "../App.css";
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
  location: number; // 改為數字位置 (0-35)
  locationName: string; // 位置名稱
  record: string; // 保留用於顯示最新記錄
  records: PlayerRecord[]; // 詳細記錄數組
  isCurrentPlayer: boolean;
}

interface Property {
  id: number;
  name: string;
  type: 'property' | 'challenge' | 'chance' | 'start' | 'go' | 'special' | 'shortcut';
  price?: number;
  rent?: number;
  description: string;
  color?: string;
  owner?: number; // 擁有者ID
  challenge?: {
    type: 'vocabulary' | 'culture' | 'story' | 'action' | 'train';
    title: string;
    content: string;
    reward: string;
  };
  chance?: {
    type: 'positive' | 'negative' | 'neutral';
    title: string;
    content: string;
    effect: string;
  };
  shortcut?: {
    target: number; // 跳轉到的位置
    description: string;
  };
}

interface GameAction {
  id: string;
  timestamp: Date;
  playerId: number;
  playerName: string;
  actionType: 'dice_roll' | 'move' | 'challenge' | 'bankruptcy' | 'shortcut';
  description: string;
  details?: any;
}

interface GameHistory {
  gameId: string;
  startTime: Date;
  endTime?: Date;
  actions: GameAction[];
  players: Player[];
}

const Monopoly: React.FC = () => {
    const navigate = useNavigate();
    const [showGameOver, setShowGameOver] = useState(false);
    const [showGameHistory, setShowGameHistory] = useState(false);
    const [showLocationDetail, setShowLocationDetail] = useState(false);
    const [currentLocationDetail, setCurrentLocationDetail] = useState<Property | null>(null);
    const [showRoundComplete, setShowRoundComplete] = useState(false);
    const [roundCompleteMessage, setRoundCompleteMessage] = useState('');
    const [showCouponPanel, setShowCouponPanel] = useState(false);
    const [couponType, setCouponType] = useState<'property' | 'gas_station' | 'road_construction'>('property');
  const [showChallengePanel, setShowChallengePanel] = useState(false);
  const [currentChallenge, setCurrentChallenge] = useState<any>(null);
  const [selectedChallengeType, setSelectedChallengeType] = useState<string | null>(null);
  const [challengeQuestion, setChallengeQuestion] = useState<string>('');
  const [playerAnswer, setPlayerAnswer] = useState<string>('');
  const [challengeResult, setChallengeResult] = useState<'success' | 'failure' | null>(null);
  
  // 優惠券挑戰獨立狀態
  const [showCouponChallengePanel, setShowCouponChallengePanel] = useState(false);
  const [selectedCouponChallengeType, setSelectedCouponChallengeType] = useState<string | null>(null);
  const [couponChallengeQuestion, setCouponChallengeQuestion] = useState<string>('');
  const [couponPlayerAnswer, setCouponPlayerAnswer] = useState<string>('');
  const [couponChallengeResult, setCouponChallengeResult] = useState<'success' | 'failure' | null>(null);
  
  const [showWordCard, setShowWordCard] = useState(false);
  const [currentWordCard, setCurrentWordCard] = useState<any>(null);
  const [isDrawingCard, setIsDrawingCard] = useState(false);
  
  // 遊戲主題狀態
  const [gameTheme, setGameTheme] = useState<string | null>(null);
  const [showThemeSelection, setShowThemeSelection] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  
  // 火車挑戰狀態 - 改為按玩家記錄
  const [playerShortcutPrivileges, setPlayerShortcutPrivileges] = useState<{[playerId: number]: {canUseShortcut: boolean, nextMoveToShortcut: boolean}}>({});
  
  // 暫停狀態
  const [playerSkipped, setPlayerSkipped] = useState<boolean>(false);
  // 道路施工專用暫停狀態
  const [roadConstructionSkip, setRoadConstructionSkip] = useState<{[playerId: number]: boolean}>({});
  // 暫停提示視窗狀態
  const [showSkipAlert, setShowSkipAlert] = useState(false);
  const [skipAlertMessage, setSkipAlertMessage] = useState('');
  // 追蹤玩家是否已經開始遊戲（用於判斷是否為第一次起點）
  const [playerGameStarted, setPlayerGameStarted] = useState<{[playerId: number]: boolean}>({});

  // 單字卡片數據庫 - 交通工具
  const wordCards = [
    {
      id: 1,
      word: "公車",
      pinyin: "kong-tshia",
      meaning: "(公車)",
      category: "交通工具",
      image: "/src/assets/交通工具單字卡/公車.png"
    },
    {
      id: 2,
      word: "卡車",
      pinyin: "khá-tshia",
      meaning: "(卡車)",
      category: "交通工具",
      image: "/src/assets/交通工具單字卡/卡車.png"
    },
    {
      id: 3,
      word: "客運",
      pinyin: "kheh-ūn",
      meaning: "(客運)",
      category: "交通工具",
      image: "/src/assets/交通工具單字卡/客運.png"
    },
    {
      id: 4,
      word: "挖土機",
      pinyin: "u̍t-thóo-ki",
      meaning: "(挖土機)",
      category: "交通工具",
      image: "/src/assets/交通工具單字卡/挖土機.png"
    },
    {
      id: 5,
      word: "汽車",
      pinyin: "khì-tshia",
      meaning: "(汽車)",
      category: "交通工具",
      image: "/src/assets/交通工具單字卡/汽車.png"
    },
    {
      id: 6,
      word: "火車",
      pinyin: "hué-tshia",
      meaning: "(火車)",
      category: "交通工具",
      image: "/src/assets/交通工具單字卡/火車.png"
    },
    {
      id: 7,
      word: "直升機",
      pinyin: "ti̍t-seng-ki",
      meaning: "(直升機)",
      category: "交通工具",
      image: "/src/assets/交通工具單字卡/直升機.png"
    },
    {
      id: 8,
      word: "計程車",
      pinyin: "kè-thîng-tshia",
      meaning: "(計程車)",
      category: "交通工具",
      image: "/src/assets/交通工具單字卡/計程車.png"
    }
  ];

  // 挑戰題庫數據
  const challengeQuestions = {
    traffic: [
      { question: "台灣最常見的交通工具是什麼？", correctAnswers: ["機車", "摩托車", "機車族"] },
      { question: "說出兩個輪子的交通工具？", correctAnswers: ["腳踏車", "機車", "蛇板", "滑板"] },
      { question: "台灣高鐵連接哪些主要城市？", correctAnswers: ["台北高雄", "台北到高雄", "北高"] }
    ],
    plant: [
      { question: "台灣的國花是什麼？", correctAnswers: ["梅花", "梅花"] },
      { question: "哪種植物是台灣特有種？", correctAnswers: ["台灣杉", "紅檜", "台灣紅檜"] },
      { question: "台灣最常見的果樹是什麼？", correctAnswers: ["芒果", "荔枝", "龍眼"] }
    ]
  };
    
    // 棋盤配置 - 根據你的實體遊戲設計
    const boardProperties: Property[] = [
      // 起始點
      { id: 0, name: "START", type: "start", description: "遊戲起始點" },
      
      // 右側 (垂直向下) - 位置 1-9
      { id: 1, name: "來學單字", type: "challenge", description: "單字學習挑戰", 
        challenge: { type: "vocabulary", title: "單字挑戰", content: "學習新的台語單字", reward: "抽取單字卡片" }},
      { id: 2, name: "文化路", type: "property", description: "文化地產" },
      { id: 3, name: "光明大道", type: "property", description: "光明地產" },
      { id: 4, name: "致用街", type: "property", description: "致用地產" },
      { id: 5, name: "凱旋大道", type: "property", description: "凱旋地產" },
      { id: 6, name: "挑戰", type: "challenge", description: "情境挑戰", 
        challenge: { type: "story", title: "情境挑戰", content: "完成故事情境挑戰", reward: "抽取情境卡片" }},
      { id: 7, name: "四維路", type: "property", description: "四維地產" },
      { id: 8, name: "機會卡", type: "chance", description: "機會卡", 
        chance: { type: "positive", title: "機會卡", content: "獲得意外獎勵", effect: "+150分" }},
      { id: 9, name: "加油站", type: "special", description: "支付100元", 
        challenge: { type: "action", title: "加油站", content: "支付100元過路費", reward: "-100分" }},
      
      // 底部 (水平向左) - 位置 10-18
      { id: 10, name: "光復路", type: "property", description: "光復地產" },
      { id: 11, name: "勝利路", type: "property", description: "勝利地產" },
      { id: 12, name: "機會卡", type: "chance", description: "機會卡", 
        chance: { type: "positive", title: "機會卡", content: "獲得意外獎勵", effect: "+150分" }},
      { id: 13, name: "學園路", type: "property", description: "學園地產" },
      { id: 14, name: "火車站前街", type: "property", description: "火車站地產" },
      { id: 15, name: "來學單字", type: "challenge", description: "單字學習挑戰", 
        challenge: { type: "vocabulary", title: "單字挑戰", content: "學習新的台語單字", reward: "抽取單字卡片" }},
      { id: 16, name: "總站廣場", type: "property", description: "總站地產" },
      { id: 17, name: "和平路", type: "property", description: "和平地產" },
      { id: 18, name: "火車挑戰", type: "challenge", description: "完成挑戰可以搭火車", 
        challenge: { type: "train", title: "火車挑戰", content: "完成挑戰可以搭火車", reward: "免費移動" }},
     
      
      // 左側 (垂直向上) - 位置 19-27
      { id: 19, name: "書香街",type: "property", description: "書香地產", },
      { id: 20, name: "港口路", type: "property", description: "港口地產" },
      { id: 21, name: "中正街", type: "property", description: "中正地產" },
      { id: 22, name: "機會卡", type: "chance", description: "機會卡", 
        chance: { type: "neutral", title: "機會卡", content: "隨機事件", effect: "隨機獎勵/懲罰" }},
      { id: 23, name: "健康路", type: "property", description: "健康地產" },
      { id: 24, name: "海山街", type: "property", description: "海山地產" },
      { id: 25, name: "來學單字", type: "challenge", description: "單字學習挑戰", 
        challenge: { type: "vocabulary", title: "單字挑戰", content: "學習新的台語單字", reward: "抽取單字卡片" }},
      { id: 26, name: "二聖路", type: "property", description: "二聖地產" },
      { id: 27, name: "道路施工", type: "special", description: "道路施工，暫時停用", 
        challenge: { type: "action", title: "道路施工", content: "道路施工，停一回合", reward: "停一回合" }},
      
      // 頂部 (水平向右) - 位置 28-36
      { id: 28, name: "椰林大道", type: "property", description: "椰林地產" },
      { id: 29, name: "六合街", type: "property", description: "六合地產" },
      { id: 30, name: "挑戰", type: "challenge", description: "情境挑戰", 
        challenge: { type: "story", title: "情境挑戰", content: "完成故事情境挑戰", reward: "+200分" }},
      { id: 31, name: "中山街", type: "property", description: "中山地產" },
      { id: 32, name: "八德路", type: "property", description: "八德地產" },
      { id: 33, name: "飛機場路", type: "property", description: "飛機場地產" },
      { id: 34, name: "機會卡", type: "chance", description: "機會卡", 
        chance: { type: "positive", title: "機會卡", content: "獲得意外獎勵", effect: "+150分" }},
      { id: 35, name: "成功街", type: "property", description: "成功地產" },
    
      
      // 內圈捷徑 - 位置 37-42
      { id: 37, name: "來學單字", type: "challenge", description: "單字學習挑戰", 
        challenge: { type: "vocabulary", title: "單字挑戰", content: "學習新的台語單字", reward: "抽取單字卡片" }},
        { id: 38, name: "建國路", type: "property", description: "建國地產" },
        { id: 39, name: "挑戰", type: "challenge", description: "捷徑挑戰", 
          challenge: { type: "action", title: "捷徑挑戰", content: "完成挑戰可以繼續", reward: "繼續前進" }},
          { id: 40, name: "中央商圈", type: "property", description: "中央地產" },
          { id: 41, name: "新生街", type: "property", description: "新生地產" },
          { id: 42, name: "幸福大道", type: "property", description: "幸福地產" },
       ];

    // 遊戲歷程狀態
    const [gameHistory, setGameHistory] = useState<GameHistory>({
      gameId: `game_${Date.now()}`,
      startTime: new Date(),
      actions: [],
      players: []
    });

  // 玩家狀態 - 動態管理
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      name: '彌豆子',
      avatar: '🐻',
      avatarImage: '/src/assets/小熊頭.png',
      round: 0,
      status: '正常',
      location: 0, // 從起始點開始
      locationName: 'START',
      record: '準備開始',
      records: [{
        id: 1,
        timestamp: new Date(),
        location: 0,
        locationName: 'START',
        action: '遊戲開始',
        details: '準備開始遊戲'
      }],
      isCurrentPlayer: true,
    },
    {
      id: 2,
      name: '小貓咪',
      avatar: '🐯',
      avatarImage: '/src/assets/小貓.png',
      round: 0,
      status: '正常',
      location: 0, // 從起始點開始
      locationName: 'START',
      record: '準備開始',
      records: [{
        id: 1,
        timestamp: new Date(),
        location: 0,
        locationName: 'START',
        action: '遊戲開始',
        details: '準備開始遊戲'
      }],
      isCurrentPlayer: false,
    },
    {
      id: 3,
      name: '老虎王',
      avatar: '🐘',
      avatarImage: '/src/assets/老虎.png',
      round: 0,
      status: '正常',
      location: 0, // 從起始點開始
      locationName: 'START',
      record: '準備開始',
      records: [{
        id: 1,
        timestamp: new Date(),
        location: 0,
        locationName: 'START',
        action: '遊戲開始',
        details: '準備開始遊戲'
      }],
      isCurrentPlayer: false,
    },
    {
      id: 4,
      name: '大象哥',
      avatar: '🐱',
      avatarImage: '/src/assets/大象.png',
      round: 0,
      status: '正常',
      location: 0, // 從起始點開始
      locationName: 'START',
      record: '準備開始',
      records: [{
        id: 1,
        timestamp: new Date(),
        location: 0,
        locationName: 'START',
        action: '遊戲開始',
        details: '準備開始遊戲'
      }],
      isCurrentPlayer: false,
    }
  ]);

  const currentPlayer = players.find(player => player.isCurrentPlayer);
  const diceValues = [3, 5, 1, 6, 2, 4]; // 隨機骰子值

  // 添加玩家記錄的函數
  const addPlayerRecord = (playerId: number, location: number, locationName: string, action: string, details?: string) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => {
        if (player.id === playerId) {
          const newRecord: PlayerRecord = {
            id: player.records.length + 1,
            timestamp: new Date(),
            location,
            locationName,
            action,
            details
          };
          return {
            ...player,
            records: [...player.records, newRecord],
            record: `${action} - ${locationName}` // 更新最新記錄顯示
          };
        }
        return player;
      })
    );
  };

  // 記錄遊戲動作的函數
  const recordGameAction = (
    playerId: number, 
    playerName: string, 
    actionType: GameAction['actionType'], 
    description: string, 
    details?: any
  ) => {
    const newAction: GameAction = {
      id: `action_${Date.now()}_${Math.random()}`,
      timestamp: new Date(),
      playerId,
      playerName,
      actionType,
      description,
      details
    };

    setGameHistory(prev => ({
      ...prev,
      actions: [...prev.actions, newAction]
    }));
  };

  // 處理骰子點擊 - 玩家實體擲骰子後點擊對應數字
  const handleDiceClick = (value: number) => {
    if (!currentPlayer) return;

    // 記錄擲骰子動作
    recordGameAction(
      currentPlayer.id,
      currentPlayer.name,
      'dice_roll',
      `${currentPlayer.name} 擲出 ${value} 點`,
      { diceValue: value, location: currentPlayer.location }
    );

    // 檢查是否應該使用捷徑路線（火車挑戰成功後）
    const currentPlayerShortcut = playerShortcutPrivileges[currentPlayer.id];
    if (currentPlayerShortcut?.nextMoveToShortcut) {
      // 不立即重置 nextMoveToShortcut，讓玩家走完捷徑路線
      
      // 按照骰子數字移動，但使用內圈捷徑路線 (37-42)
      let newLocation;
      if (currentPlayer.location >= 37 && currentPlayer.location <= 42) {
        // 已經在內圈，按照內圈路線移動
        newLocation = currentPlayer.location + value;
        // 如果超過 id42，則回到外圈並清除捷徑特權
        if (newLocation > 42) {
          newLocation = 0; // 回到起點
          
          // 檢查是否通過起點（捷徑路線）
          const hasPlayerStarted = playerGameStarted[currentPlayer.id] || false;
          if (hasPlayerStarted) {
            // 通過起點，增加回合數
            const newRoundNumber = currentPlayer.round + 1;
            recordGameAction(
              currentPlayer.id,
              currentPlayer.name,
              'move',
              `${currentPlayer.name} 通過捷徑回到起點，完成第${newRoundNumber}回合`,
              { passedStart: true, newRound: true, roundNumber: newRoundNumber, usedShortcut: true }
            );
            
            // 顯示回合完成慶祝訊息
            setRoundCompleteMessage(`${currentPlayer.name} 完成第 ${newRoundNumber} 回合！🎉`);
            setShowRoundComplete(true);
            
            // 3秒後自動隱藏慶祝訊息
            setTimeout(() => {
              setShowRoundComplete(false);
            }, 3000);
          }
          
          // 清除捷徑特權
          setPlayerShortcutPrivileges(prev => ({
            ...prev,
            [currentPlayer.id]: {
              ...prev[currentPlayer.id],
              nextMoveToShortcut: false,
              canUseShortcut: false // 走完捷徑後清除所有特權
            }
          }));
        }
      } else {
        // 從外圈進入內圈，從位置37開始移動骰子數字
        newLocation = 37 + value;
        // 如果超過 id42，則回到外圈並清除捷徑特權
        if (newLocation > 42) {
          newLocation = 0; // 回到起點
          
          // 檢查是否通過起點（捷徑路線）
          const hasPlayerStarted = playerGameStarted[currentPlayer.id] || false;
          if (hasPlayerStarted) {
            // 通過起點，增加回合數
            const newRoundNumber = currentPlayer.round + 1;
            recordGameAction(
              currentPlayer.id,
              currentPlayer.name,
              'move',
              `${currentPlayer.name} 通過捷徑回到起點，完成第${newRoundNumber}回合`,
              { passedStart: true, newRound: true, roundNumber: newRoundNumber, usedShortcut: true }
            );
            
            // 顯示回合完成慶祝訊息
            setRoundCompleteMessage(`${currentPlayer.name} 完成第 ${newRoundNumber} 回合！🎉`);
            setShowRoundComplete(true);
            
            // 3秒後自動隱藏慶祝訊息
            setTimeout(() => {
              setShowRoundComplete(false);
            }, 3000);
          }
          
          // 清除捷徑特權
          setPlayerShortcutPrivileges(prev => ({
            ...prev,
            [currentPlayer.id]: {
              ...prev[currentPlayer.id],
              nextMoveToShortcut: false,
              canUseShortcut: false // 走完捷徑後清除所有特權
            }
          }));
        }
      }
      
      recordGameAction(
        currentPlayer.id,
        currentPlayer.name,
        'shortcut',
        newLocation === 0 ? 
          `${currentPlayer.name} 擲出 ${value} 點，完成火車捷徑路線，回到起點` :
          `${currentPlayer.name} 擲出 ${value} 點，使用火車挑戰成功的權利，在捷徑路線移動到位置 ${newLocation}`,
        { diceValue: value, from: currentPlayer.location, to: newLocation, usedTrainShortcut: true, shortcutCompleted: newLocation === 0 }
      );

      // 獲取新位置的屬性
      const newProperty = boardProperties.find(prop => prop.id === newLocation);
      if (newProperty) {
      // 動態更新玩家狀態
      setPlayers(prevPlayers => 
        prevPlayers.map(player => 
          player.id === currentPlayer.id 
              ? {
                ...player,
                location: newLocation,
                locationName: newProperty.name,
                record: `${newProperty.name} - 捷徑路線`
              }
            : player
        )
      );

      // 添加玩家記錄
      addPlayerRecord(
        currentPlayer.id, 
        newLocation, 
        newProperty.name, 
        '移動到', 
        newLocation === 0 ? 
          `擲出${value}點，完成火車捷徑路線` : 
          `擲出${value}點，使用火車捷徑路線`
      );

        // 根據格子類型顯示不同的視窗
        if (newProperty.type === 'property') {
          // 地產格子顯示優惠券視窗
          setCouponType('property');
          setShowCouponPanel(true);
        } else if (newProperty.type === 'challenge') {
          // 檢查是否為"來學單字"格子
          if (newProperty.challenge?.type === 'vocabulary') {
            // 來學單字格子觸發單字卡片
            setIsDrawingCard(true);
            
            // 抽卡片動畫效果
            setTimeout(() => {
              // 根據遊戲主題過濾單字卡片
              const filteredCards = gameTheme === 'traffic' 
                ? wordCards.filter(card => card.category === '交通工具') // 交通王主題使用交通工具卡片
                : gameTheme === 'plant' 
                ? wordCards.filter(card => card.category === '植物') // 植物主題使用植物卡片
                : wordCards.filter(card => card.category === '交通工具'); // 預設使用交通工具卡片
              
              const randomIndex = Math.floor(Math.random() * filteredCards.length);
              const selectedCard = filteredCards[randomIndex];
              setCurrentWordCard(selectedCard);
              setIsDrawingCard(false);
              setShowWordCard(true);
              
              // 記錄遊戲動作
              const currentPlayer = players.find(p => p.isCurrentPlayer);
              if (currentPlayer) {
                recordGameAction(
                  currentPlayer.id,
                  currentPlayer.name,
                  'challenge',
                  `來學單字卡片: ${selectedCard.word}`,
                  { cardId: selectedCard.id, category: selectedCard.category, theme: gameTheme }
                );
              }
            }, 2000); // 2秒抽卡片動畫
          } else {
            // 其他挑戰格子顯示挑戰側邊面板
            setCurrentChallenge(newProperty.challenge);
            setShowChallengePanel(true);
          }
        } else {
          setCurrentLocationDetail(newProperty);
          setShowLocationDetail(true);
        }
      }
      return;
    }

    // 計算新位置
    let newLocation = (currentPlayer.location + value) % 37; // 37個外圈位置 (0-36)
    
    // 檢查是否進入內圈捷徑 - 只有通過火車挑戰的玩家才能使用捷徑
    const currentPlayerCanUseShortcut = playerShortcutPrivileges[currentPlayer.id]?.canUseShortcut || false;
    if (newLocation === 33 && currentPlayerCanUseShortcut) { // 飛機場路 - 需要捷徑權限
      newLocation = 37; // 進入內圈
      recordGameAction(
        currentPlayer.id,
        currentPlayer.name,
        'shortcut',
        `${currentPlayer.name} 使用火車捷徑進入：來學單字`,
        { from: 33, to: 37, usedTrainShortcut: true }
      );
    } else if (newLocation === 33 && !currentPlayerCanUseShortcut) {
      // 沒有捷徑權限，記錄原因
      recordGameAction(
        currentPlayer.id,
        currentPlayer.name,
        'move',
        `${currentPlayer.name} 到達飛機場路，但沒有火車挑戰成功權限，無法使用捷徑`,
        { location: 33, canUseShortcut: false }
      );
    }

    // 檢查是否通過起點 - 從id35或id42經過起點才算通過，但第一次起點不算
    let passedStart = false;
    const hasPlayerStarted = playerGameStarted[currentPlayer.id] || false;
    
    if ((currentPlayer.location === 35 && value >= 1) || 
        (currentPlayer.location === 42 && value >= 1) ||
        (currentPlayer.location + value >= 37 && currentPlayer.location < 37)) {
      
      // 如果玩家已經開始過遊戲，則算作通過起點
      if (hasPlayerStarted) {
        passedStart = true;
      } else {
        // 第一次經過起點，標記為已開始遊戲
        setPlayerGameStarted(prev => ({
          ...prev,
          [currentPlayer.id]: true
        }));
        
        // 記錄第一次經過起點
        recordGameAction(
          currentPlayer.id,
          currentPlayer.name,
          'move',
          `${currentPlayer.name} 第一次經過起點，遊戲開始`,
          { firstTimePassStart: true }
        );
      }
    }
    
    if (passedStart) {
      const newRoundNumber = currentPlayer.round + 1;
      
      // 更新玩家的回合數
      setPlayers(prevPlayers => 
        prevPlayers.map(player => 
          player.id === currentPlayer.id 
            ? { ...player, round: newRoundNumber }
            : player
        )
      );
      
      recordGameAction(
        currentPlayer.id,
        currentPlayer.name,
        'move',
        `${currentPlayer.name} 通過起點，完成第${newRoundNumber}回合，獲得獎勵`,
        { passedStart: true, newRound: true, roundNumber: newRoundNumber }
      );
      
      // 顯示回合完成慶祝訊息
      setRoundCompleteMessage(`${currentPlayer.name} 完成第 ${newRoundNumber} 回合！🎉`);
      setShowRoundComplete(true);
      
      // 3秒後自動隱藏慶祝訊息
      setTimeout(() => {
        setShowRoundComplete(false);
      }, 3000);
    }

    // 獲取新位置的屬性
    const newProperty = boardProperties.find(prop => prop.id === newLocation);
    if (newProperty) {
      recordGameAction(
        currentPlayer.id,
        currentPlayer.name,
        'move',
        `${currentPlayer.name} 移動到：${newProperty.name}`,
        { 
          from: currentPlayer.location, 
          to: newLocation, 
          propertyType: newProperty.type,
          property: newProperty
        }
      );

      // 動態更新玩家狀態
      setPlayers(prevPlayers => 
        prevPlayers.map(player => 
          player.id === currentPlayer.id 
              ? {
                ...player,
                location: newLocation,
                locationName: newProperty.name,
                // 只有通過起點時才增加回合數
                round: passedStart ? player.round + 1 : player.round,
                record: newProperty.type === 'challenge' 
                  ? `${newProperty.name} - 挑戰進行中`
                  : newProperty.type === 'chance'
                  ? `${newProperty.name} - 機會卡`
                  : `${newProperty.name} - 特殊格子`
              }
            : player
        )
      );

      // 添加玩家記錄
      const actionType = newProperty.type === 'challenge' ? '挑戰格子' : 
                        newProperty.type === 'chance' ? '機會卡' : 
                        newProperty.type === 'property' ? '地產格子' : '特殊格子';
      addPlayerRecord(currentPlayer.id, newLocation, newProperty.name, actionType, `擲出${value}點，移動到${newProperty.name}`);

      // 根據格子類型顯示不同的視窗
      if (newProperty.type === 'property') {
        // 地產格子顯示優惠券視窗
        setCouponType('property');
        setShowCouponPanel(true);
      } else if (newProperty.name === '加油站') {
        // 加油站顯示優惠券視窗
        setCouponType('gas_station');
        setShowCouponPanel(true);
      } else if (newProperty.name === '道路施工') {
        // 道路施工顯示優惠券視窗
        setCouponType('road_construction');
        setShowCouponPanel(true);
      } else if (newProperty.type === 'challenge') {
        // 檢查是否為"來學單字"格子
        if (newProperty.challenge?.type === 'vocabulary') {
          // 來學單字格子觸發單字卡片
          setIsDrawingCard(true);
          
          // 抽卡片動畫效果
          setTimeout(() => {
            // 根據遊戲主題過濾單字卡片
            const filteredCards = gameTheme === 'traffic' 
              ? wordCards.filter(card => card.category === '交通工具') // 交通王主題使用交通工具卡片
              : gameTheme === 'plant' 
              ? wordCards.filter(card => card.category === '植物') // 植物主題使用植物卡片
              : wordCards.filter(card => card.category === '交通工具'); // 預設使用交通工具卡片
            
            const randomIndex = Math.floor(Math.random() * filteredCards.length);
            const selectedCard = filteredCards[randomIndex];
            setCurrentWordCard(selectedCard);
            setIsDrawingCard(false);
            setShowWordCard(true);
            
            // 記錄遊戲動作
            const currentPlayer = players.find(p => p.isCurrentPlayer);
            if (currentPlayer) {
              recordGameAction(
                currentPlayer.id,
                currentPlayer.name,
                'challenge',
                `來學單字卡片: ${selectedCard.word}`,
                { cardId: selectedCard.id, category: selectedCard.category, theme: gameTheme }
              );
            }
          }, 2000); // 2秒抽卡片動畫
        } else if (newProperty.id === 18 && newProperty.challenge?.type === 'train') {
          // 只有到達id18火車挑戰格子才觸發火車挑戰
          setCurrentChallenge(newProperty.challenge);
          setShowChallengePanel(true);
        } else {
          // 其他挑戰格子顯示挑戰側邊面板
          setCurrentChallenge(newProperty.challenge);
          setShowChallengePanel(true);
        }
      } else {
        // 其他格子顯示位置詳情
        setCurrentLocationDetail(newProperty);
        setShowLocationDetail(true);
      }
    }
  };

  // 切換到下一玩家
  const switchToNextPlayer = () => {
    setPlayers(prevPlayers => {
      const currentIndex = prevPlayers.findIndex(p => p.isCurrentPlayer);
      let nextIndex = (currentIndex + 1) % prevPlayers.length;
      
      console.log('輪換玩家:', {
        currentPlayer: prevPlayers[currentIndex]?.name,
        nextPlayer: prevPlayers[nextIndex]?.name,
        currentIndex,
        nextIndex,
        playerSkipped,
        roadConstructionSkip
      });
      
      // 如果當前玩家被暫停，跳過一次
      if (playerSkipped) {
        setPlayerSkipped(false); // 重置暫停狀態
        return prevPlayers.map((player, index) => ({
          ...player,
          isCurrentPlayer: index === nextIndex
        }));
      }
      
      // 檢查下一個玩家是否有道路施工暫停狀態
      const nextPlayer = prevPlayers[nextIndex];
      if (nextPlayer && roadConstructionSkip[nextPlayer.id]) {
        // 顯示暫停提示視窗
        setSkipAlertMessage(`${nextPlayer.name} 因道路施工暫停一回合，換下一位玩家`);
        setShowSkipAlert(true);
        
        // 記錄跳過動作
        recordGameAction(
          nextPlayer.id,
          nextPlayer.name,
          'move',
          `${nextPlayer.name} 因道路施工暫停，本次輪到被跳過`,
          { skipped: true, roadConstructionSkip: true }
        );
        
        // 跳過這個玩家，到下下一個
        nextIndex = (nextIndex + 1) % prevPlayers.length;
        
        // 清除該玩家的道路施工暫停狀態
        setRoadConstructionSkip(prev => {
          const newState = { ...prev };
          delete newState[nextPlayer.id];
          return newState;
        });
      }
      
      return prevPlayers.map((player, index) => ({
        ...player,
        isCurrentPlayer: index === nextIndex
      }));
    });
  };

  // 更新玩家狀態
  const updatePlayerStatus = (playerId: number, updates: Partial<Player>) => {
    setPlayers(prevPlayers => 
      prevPlayers.map(player => 
        player.id === playerId 
          ? { ...player, ...updates }
          : player
      )
    );
  };

  // 處理破產
  const handleBankruptcy = () => {
    if (currentPlayer) {
      recordGameAction(
        currentPlayer.id,
        currentPlayer.name,
        'bankruptcy',
        `${currentPlayer.name} 選擇破產`,
        { location: currentPlayer.location, round: currentPlayer.round }
      );
      
      // 更新玩家狀態為破產
      updatePlayerStatus(currentPlayer.id, {
        status: '破產',
        record: '遊戲結束 - 破產'
      });
      
      // 切換到下一玩家
      switchToNextPlayer();
    }
    setShowGameOver(true);
  };


  // 處理挑戰完成
  const handleChallengeComplete = (challengeType: string, reward: string) => {
    if (!currentPlayer) return;
    
    recordGameAction(
      currentPlayer.id,
      currentPlayer.name,
      'challenge',
      `${currentPlayer.name} 完成 ${challengeType} 挑戰`,
      { challengeType, reward }
    );
    
    updatePlayerStatus(currentPlayer.id, {
      record: `${challengeType} 挑戰完成 - ${reward}`
    });
  };

  // 處理挑戰主題選擇 - 直接使用遊戲主題
  const handleChallengeTypeSelect = () => {
    if (!gameTheme) return;
    
    setSelectedChallengeType(gameTheme);
    setChallengeResult(null);
    setPlayerAnswer('');
    
    // 隨機選擇一個問題
    const questions = challengeQuestions[gameTheme as keyof typeof challengeQuestions];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setChallengeQuestion(randomQuestion.question);
  };

  // 處理玩家答案提交
  const handleAnswerSubmit = () => {
    if (!selectedChallengeType || !playerAnswer.trim()) return;
    
    const questions = challengeQuestions[selectedChallengeType as keyof typeof challengeQuestions];
    const currentQ = questions.find(q => q.question === challengeQuestion);
    
    if (currentQ) {
      const isCorrect = currentQ.correctAnswers.some(answer => 
        playerAnswer.toLowerCase().includes(answer.toLowerCase())
      );
      
      setChallengeResult(isCorrect ? 'success' : 'failure');
      
      // 檢查是否為火車挑戰
      if (currentChallenge?.type === 'train') {
        const currentPlayer = players.find(p => p.isCurrentPlayer);
        if (currentPlayer) {
          setPlayerShortcutPrivileges(prev => ({
            ...prev,
            [currentPlayer.id]: {
              canUseShortcut: isCorrect,
              nextMoveToShortcut: isCorrect // 如果挑戰成功，設置下一次移動到捷徑
            }
          }));
        }
        
        // 記錄火車挑戰結果
        if (currentPlayer) {
          recordGameAction(
            currentPlayer.id,
            currentPlayer.name,
            'challenge',
            `火車挑戰${isCorrect ? '成功' : '失敗'}: ${challengeQuestion} - ${isCorrect ? '下一次移動將在捷徑路線(36-41)' : '本次不能使用捷徑'}`,
            { answer: playerAnswer, correct: isCorrect, challengeType: 'train', nextMoveToShortcut: isCorrect }
          );
          
          // 添加玩家記錄
          addPlayerRecord(
            currentPlayer.id, 
            currentPlayer.location, 
            currentPlayer.locationName, 
            '火車挑戰', 
            `挑戰-${isCorrect ? '成功' : '失敗'}`
          );
        }
        
      } else {
        // 一般挑戰記錄
        const currentPlayer = players.find(p => p.isCurrentPlayer);
        if (currentPlayer) {
          recordGameAction(
            currentPlayer.id,
            currentPlayer.name,
            'challenge',
            `挑戰${isCorrect ? '成功' : '失敗'}: ${challengeQuestion}`,
            { answer: playerAnswer, correct: isCorrect }
          );
          
          // 添加玩家記錄
          addPlayerRecord(
            currentPlayer.id, 
            currentPlayer.location, 
            currentPlayer.locationName, 
            '情境挑戰', 
            `${isCorrect ? '成功' : '失敗'} - ${challengeQuestion.substring(0, 20)}...`
          );
        }
      }
    }
  };

  // 重置挑戰狀態
  const resetChallenge = () => {
    const wasTrainChallenge = currentChallenge?.type === 'train';
    
    setSelectedChallengeType(null);
    setChallengeQuestion('');
    setPlayerAnswer('');
    setChallengeResult(null);
    setShowChallengePanel(false);
    setCurrentChallenge(null);
    
    // 注意：不重置 playerShortcutPrivileges，因為這些是挑戰結果，按玩家記錄
    
    // 如果是火車挑戰，完成後自動切換到下一位玩家
    if (wasTrainChallenge) {
      switchToNextPlayer();
    }
  };

  // 處理優惠券挑戰主題選擇 - 直接使用遊戲主題
  const handleCouponChallengeTypeSelect = () => {
    if (!gameTheme) return;
    
    setSelectedCouponChallengeType(gameTheme);
    setCouponChallengeResult(null);
    setCouponPlayerAnswer('');
    
    // 隨機選擇一個問題
    const questions = challengeQuestions[gameTheme as keyof typeof challengeQuestions];
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCouponChallengeQuestion(randomQuestion.question);
  };

  // 處理優惠券挑戰答案提交
  const handleCouponAnswerSubmit = () => {
    if (!selectedCouponChallengeType || !couponPlayerAnswer.trim()) return;
    
    const questions = challengeQuestions[selectedCouponChallengeType as keyof typeof challengeQuestions];
    const currentQ = questions.find(q => q.question === couponChallengeQuestion);
    
    if (currentQ) {
      const isCorrect = currentQ.correctAnswers.some(answer => 
        couponPlayerAnswer.toLowerCase().includes(answer.toLowerCase())
      );
      
      setCouponChallengeResult(isCorrect ? 'success' : 'failure');
      
      // 記錄遊戲動作
      const currentPlayer = players.find(p => p.isCurrentPlayer);
      if (currentPlayer) {
        const result = isCorrect ? '成功' : '失敗';
        let reward;
        
        // 根據優惠券類型顯示不同的獎勵/懲罰消息
        if (couponType === 'road_construction') {
          reward = isCorrect ? '免於暫停一回合' : '暫停一回合';
        } else if (couponType === 'gas_station') {
          reward = isCorrect ? '免費加油一次' : '挑戰失敗請支付一百元';
        } else {
          reward = isCorrect ? '房地產減免100元' : '請付原價';
        }
        
        recordGameAction(
          currentPlayer.id,
          currentPlayer.name,
          'challenge',
          `優惠券挑戰${result}: ${couponChallengeQuestion} - ${reward}`,
          { answer: couponPlayerAnswer, correct: isCorrect, challengeType: 'coupon' }
        );
        
        // 道路施工挑戰邏輯：成功免於暫停，失敗暫停一回合
        if (couponType === 'road_construction') {
          if (!isCorrect) {
            // 挑戰失敗：設置暫停
            setRoadConstructionSkip(prev => ({
              ...prev,
              [currentPlayer.id]: true
            }));
          }
          // 挑戰成功：不需要設置暫停（免於暫停一回合）
        }
      }
    }
  };

  // 重置優惠券挑戰狀態
  const resetCouponChallenge = () => {
    setSelectedCouponChallengeType(null);
    setCouponChallengeQuestion('');
    setCouponPlayerAnswer('');
    setCouponChallengeResult(null);
    setShowCouponChallengePanel(false);
    
    const currentPlayer = players.find(p => p.isCurrentPlayer);
    if (currentPlayer) {
      // 加油站挑戰完成後暫停一次
      if (couponType === 'gas_station') {
        setPlayerSkipped(true);
        recordGameAction(
          currentPlayer.id,
          currentPlayer.name,
          'move',
          `${currentPlayer.name} 完成加油站挑戰，暫停一次`,
          { location: currentPlayer.location, skipped: true, couponType }
        );
      }
      // 道路施工挑戰完成後不需要額外設置暫停（已在挑戰結果中處理）
    }
    
    // 優惠券挑戰完成後自動切換到下一位玩家
    switchToNextPlayer();
  };

  // 處理台語大單挑 - 直接使用遊戲主題
  const handleWordChallenge = () => {
    setShowCouponPanel(false);
    setIsDrawingCard(true);
    
    // 抽卡片動畫效果
    setTimeout(() => {
      // 根據遊戲主題過濾單字卡片
      const filteredCards = gameTheme === 'traffic' 
        ? wordCards.filter(card => card.category === '交通工具') // 交通王主題使用交通工具卡片
        : gameTheme === 'plant' 
        ? wordCards.filter(card => card.category === '植物') // 植物主題使用植物卡片
        : wordCards.filter(card => card.category === '交通工具'); // 預設使用交通工具卡片
      
      const randomIndex = Math.floor(Math.random() * filteredCards.length);
      const selectedCard = filteredCards[randomIndex];
      setCurrentWordCard(selectedCard);
      setIsDrawingCard(false);
      setShowWordCard(true);
      
      // 記錄遊戲動作
      const currentPlayer = players.find(p => p.isCurrentPlayer);
      if (currentPlayer) {
        recordGameAction(
          currentPlayer.id,
          currentPlayer.name,
          'challenge',
          `抽取單字卡片: ${selectedCard.word}`,
          { cardId: selectedCard.id, category: selectedCard.category, theme: gameTheme }
        );
      }
    }, 2000); // 2秒抽卡片動畫
  };

  // 關閉單字卡片
  const closeWordCard = () => {
    setShowWordCard(false);
    setCurrentWordCard(null);
    switchToNextPlayer();
  };


  return (
    <div className="monopoly-container">
      {/* 主題選擇覆蓋層 */}
      {showThemeSelection && (
        <div className="theme-selection-overlay">
          <div className="theme-selection-panel">
            <h2 className="theme-selection-title">選擇遊戲主題</h2>
            
            <div className="theme-options">
              <button 
                className={`theme-option-btn ${selectedTheme === 'traffic' ? 'selected' : ''}`}
                onClick={() => setSelectedTheme('traffic')}
              >
                <img src="../src/assets/誰是交通王.png" alt="誰是交通王" />
                <span>誰是交通王</span>
              </button>
              <button 
                className={`theme-option-btn ${selectedTheme === 'plant' ? 'selected' : ''}`}
                onClick={() => setSelectedTheme('plant')}
              >
                <img src="../src/assets/植物百寶袋.png" alt="植物大冒險" />
                <span>植物大冒險</span>
              </button>
            </div>
            
            <button 
              className="start-game-button"
              onClick={() => {
                if (selectedTheme) {
                  setGameTheme(selectedTheme);
                  setShowThemeSelection(false);
                }
              }}
              disabled={!selectedTheme}
            >
              開始遊戲
            </button>
          </div>
        </div>
      )}
      {/* 頂部導航欄 */}
      <div className="top-bar">
        <button
          type="button"
          className="back-button"
          aria-label="返回"
          onClick={() => navigate("/Learn")}
        >
          <img src={BackIcon} alt="返回" />
        </button>
        <div className="game-title">
          <span className="controller-icon">🎮</span>
          <span className="title-text">
            遊戲中 - {currentPlayer ? `${currentPlayer.name} 的回合` : '等待中'}
          </span>
        </div>
        <div className="room-info">
          <button 
            className="history-button"
            onClick={() => setShowGameHistory(true)}
            title="查看遊戲歷程"
          >
            📊 歷程
          </button>
          <button 
            className="switch-player-button"
            onClick={switchToNextPlayer}
            title="手動切換玩家"
          >
            🔄 換人
          </button>
          <span className="room-label">房號：</span>
          <div className="room-number">1234</div>
        </div>
      </div>

      {/* 玩家頭像槽位 */}
      <div className="player-slots">
        {players.map((player) => (
          <div
            key={player.id}
            className={`player-slot ${player.isCurrentPlayer ? 'current-player' : ''}`}
          >
            <div className="player-avatar">
              {player.avatarImage ? (
                <img
                  src={player.avatarImage}
                  alt={player.name}
                  className="player-avatar-img"
                />
              ) : (
                <span>{player.avatar}</span>
              )}
            </div>
            <div className="player-label">玩家{player.id}</div>
          </div>
        ))}
      </div>

      {/* 玩家資訊面板和挑戰面板 */}
      {currentPlayer && (
        <div className="player-info-container">
          <div className="player-info-panel">
            <div className="player-header">
              <div className="player-avatar-large">
                {currentPlayer.avatarImage ? (
                  <img
                    src={currentPlayer.avatarImage}
                    alt={currentPlayer.name}
                    className="player-avatar-large-img"
                  />
                ) : (
                  <span>{currentPlayer.avatar}</span>
                )}
              </div>
              <div className="player-name">玩家{currentPlayer.id}:{currentPlayer.name}</div>
            </div>

            <div className="player-details">
              <div className="detail-row">
                <span className="detail-label">回合:</span>
                <div className="detail-value">
                  {currentPlayer.round} 
             
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-label">狀態:</span>
                <div className="detail-value">
                  {roadConstructionSkip[currentPlayer.id] ? '暫停一回合' : currentPlayer.status}
                </div>
              </div>
              <div className="detail-row">
                <span className="detail-label">位置:</span>
                <div className="detail-value">{currentPlayer.locationName}</div>
              </div>
              <div className="detail-row">
                <span className="detail-label">捷徑:</span>
                <div className="detail-value">
                  {((currentPlayer.location >= 37 && currentPlayer.location <= 42) || playerShortcutPrivileges[currentPlayer.id]?.nextMoveToShortcut) ? '🚂可' : '🚂否'}
                </div>
              </div>
             
            </div>

            <div className="player-record">
              <span className="record-label">紀錄:</span>
              <div className="record-list">
                {currentPlayer.records.slice(-3).reverse().map((record) => (
                  <div key={record.id} className="record-item">
                    <div className="record-content">
                      {record.details}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="player-actions">
             
              <button 
                className="bankruptcy-button"
                onClick={handleBankruptcy}
              >
                破產
              </button>
            </div>
          </div>

          {/* 挑戰卡側邊面板 */}
          {showChallengePanel && currentChallenge && (
            <div className="challenge-panel-side">
              <div className="challenge-header">
                <h2 className="challenge-title">
                  {currentChallenge?.type === 'train' ? '火車挑戰' : 
                   currentChallenge?.type === 'vocabulary' ? '單字挑戰' : 
                   currentChallenge?.type === 'story' ? '情境挑戰' : 
                   currentChallenge?.type === 'action' ? '動作挑戰' : 
                   '挑戰'}
                </h2>
             
              </div>
              <div className="challenge-content">
                <div className="challenge-question">
                  {!selectedChallengeType ? (
                    <div className="question-bubble">
                      正在準備挑戰...
                    </div>
                  ) : (
                    <div className="question-bubble">
                      {challengeQuestion}
                    </div>
                  )}
                  
                  {challengeResult && (
                    <>
                      <div className={`response-bubble ${challengeResult}`}>
                        {challengeResult === 'success' ? '🎉 挑戰成功！' : '❌ 挑戰失敗！'}
                      </div>
                      {/* 火車挑戰特殊獎勵信息 */}
                      {currentChallenge?.type === 'train' ? (
                        <div className={`reward-bubble ${challengeResult}`}>
                          {challengeResult === 'success' ? '🚂 火車挑戰成功！下次按骰子將在捷徑路線移動！' : '🚂 火車挑戰失敗！本次不能使用捷徑'}
                        </div>
                      ) : (
                        <div className={`reward-bubble ${challengeResult}`}>
                          {challengeResult === 'success' ? '🎁 請抽取一張獎勵卡' : '⚠️ 請抽取一張懲罰卡'}
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                <div className="challenge-buttons">
                  {!selectedChallengeType ? (
                    <div className="challenge-actions">
                      <button 
                        className="challenge-complete-btn" 
                        onClick={handleChallengeTypeSelect}
                      >
                        開始挑戰
                      </button>
                    </div>
                  ) : (
                    <div className="challenge-actions">
                      {challengeResult && (
                        <button className="challenge-complete-btn" onClick={resetChallenge}>
                          完成挑戰
                        </button>
                      )}
                    </div>
                  )}
                </div>
                {selectedChallengeType && !challengeResult && (
                  <div className="voice-input">
                    <div className="text-input-container">
                      <input 
                        type="text" 
                        placeholder="請輸入你的回答..." 
                        className="text-input"
                        value={playerAnswer}
                        onChange={(e) => setPlayerAnswer(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAnswerSubmit()}
                      />
                    </div>
                    <div className="microphone-icon">
                      <img src="/src/assets/麥克風 .svg" alt="麥克風" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 優惠券挑戰面板 */}
      {showCouponChallengePanel && (
        <div className="challenge-panel-side">
          <div className="challenge-header">
            <h2 className="challenge-title">情境挑戰</h2>
          </div>
          <div className="challenge-content">
            <div className="challenge-question">
              {!selectedCouponChallengeType ? (
                <div className="question-bubble">
                  正在準備挑戰...
                </div>
              ) : (
                <div className="question-bubble">
                  {couponChallengeQuestion}
                </div>
              )}
              
              {couponChallengeResult && (
                <>
                  <div className={`response-bubble ${couponChallengeResult}`}>
                    {couponChallengeResult === 'success' ? '🎉 挑戰成功！' : '❌ 挑戰失敗！'}
                  </div>
                  <div className={`reward-bubble ${couponChallengeResult}`}>
                    {couponType === 'road_construction' ? (
                      couponChallengeResult === 'success' ? '✅ 免於暫停一回合' : '⏸️ 暫停一回合'
                    ) : couponType === 'gas_station' ? (
                      couponChallengeResult === 'success' ? '⛽ 免費加油一次' : '💰 挑戰失敗請支付一百元'
                    ) : (
                      couponChallengeResult === 'success' ? '🏠 房地產減免100元' : '💰 挑戰失敗請付原價'
                    )}
                  </div>
                </>
              )}
            </div>
            
            <div className="challenge-buttons">
              {!selectedCouponChallengeType ? (
                <div className="challenge-actions">
                  <button 
                    className="challenge-complete-btn" 
                    onClick={handleCouponChallengeTypeSelect}
                  >
                    開始挑戰
                  </button>
                </div>
              ) : (
                <div className="challenge-actions">
                  {couponChallengeResult && (
                    <button className="challenge-complete-btn" onClick={resetCouponChallenge}>
                      完成挑戰
                    </button>
                  )}
                </div>
              )}
            </div>
            
            {selectedCouponChallengeType && !couponChallengeResult && (
              <div className="voice-input">
                <div className="text-input-container">
                  <input 
                    type="text" 
                    placeholder="請輸入你的回答..." 
                    className="text-input"
                    value={couponPlayerAnswer}
                    onChange={(e) => setCouponPlayerAnswer(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleCouponAnswerSubmit()}
                  />
                </div>
                <div className="microphone-icon">
                  <img src="/src/assets/麥克風 .svg" alt="麥克風" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 抽卡片動畫 */}
      {isDrawingCard && (
        <div className="card-drawing-overlay">
          <div className="card-drawing-animation">
            <div className="drawing-cards">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="floating-card" style={{
                  animationDelay: `${index * 0.1}s`,
                  left: `${20 + index * 10}%`,
                  top: `${30 + (index % 2) * 20}%`
                }}>
                  <div className="card-back">🎴</div>
                </div>
              ))}
            </div>
            <div className="drawing-text">正在抽取卡片...</div>
          </div>
        </div>
      )}

      {/* 單字卡片顯示 */}
      {showWordCard && currentWordCard && (
        <div className="word-card-overlay">
          <div className="word-card">
            <div className="word-card-content">
              <div className="word-title">{currentWordCard.word}</div>
              <div className="word-pinyin">{currentWordCard.pinyin}</div>
              <div className="word-meaning">{currentWordCard.meaning}</div>
              
              <div className="word-illustration">
                <img 
                  src={currentWordCard.image} 
                  alt={currentWordCard.word}
                  className="word-image"
                  onError={(e) => {
                    // 如果圖片載入失敗，顯示佔位符
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
                <div className="illustration-placeholder" style={{display: 'none'}}>
                  <div className="illustration-text">🎨 {currentWordCard.category}</div>
                </div>
              </div>
              
              <div className="word-microphone">
                <div className="microphone-icon-large">
                  <img src="/src/assets/麥克風 .svg" alt="麥克風" />
                </div>
              </div>
              
              <button className="close-card-button" onClick={closeWordCard}>
                完成
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 骰子區域 */}
      <div className="dice-area">
        <div className="dice-container">
          {diceValues.map((value, index) => (
            <button 
              key={index} 
              className="dice-button"
              onClick={() => handleDiceClick(value)}
              title={`擲出 ${value} 點`}
            >
              <div className="dice-face">
                {Array.from({ length: value }, (_, i) => (
                  <div key={i} className="dice-dot"></div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 遊戲結束覆蓋層 */}
      {showGameOver && (
        <div className="game-over-overlay">
          <div className="game-over-content">
            <h2 className="game-over-title">遊戲結束</h2>
            <button 
              className="close-button"
              onClick={() => {
                setShowGameOver(false);
                navigate('/Scoresummary', { 
                  state: { players: players } 
                });
              }}
            >
              成績總結
            </button>
          </div>
        </div>
      )}

      {/* 位置詳情覆蓋層 */}
      {showLocationDetail && currentLocationDetail && (
        <div className="location-detail-overlay">
          <div className="location-detail-content">
            <div className="location-header">
              <h2 className="location-title">{currentLocationDetail.name}</h2>
              <div className="header-right">
                <button 
                  className="close-button"
                  onClick={() => setShowLocationDetail(false)}
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="location-info">
              <div className="location-type">{currentLocationDetail.type}</div>
              <div className="location-description">{currentLocationDetail.description}</div>
              
              {/* 跳過按鈕 - 所有格子都有 */}
              <button 
                className="skip-button"
                onClick={() => {
                  setShowLocationDetail(false);
                  // 立即切換到下一玩家
                  switchToNextPlayer();
                }}
              >
                跳過 (換下一位玩家)
              </button>
              
              
              {currentLocationDetail.challenge && (
                <div className="challenge-details">
                  <div className="challenge-type">{currentLocationDetail.challenge.type}</div>
                  <div className="challenge-title">{currentLocationDetail.challenge.title}</div>
                  <div className="challenge-content">{currentLocationDetail.challenge.content}</div>
                  <div className="challenge-reward">{currentLocationDetail.challenge.reward}</div>
                  <button 
                    className="complete-challenge-button"
                    onClick={() => {
                      if (currentLocationDetail.challenge) {
                        handleChallengeComplete(currentLocationDetail.challenge.type, currentLocationDetail.challenge.reward);
                        setShowLocationDetail(false);
                        // 自動切換到下一玩家
                        setTimeout(() => {
                          switchToNextPlayer();
                        }, 500);
                      }
                    }}
                  >
                    完成挑戰
                  </button>
                </div>
              )}
              
              {currentLocationDetail.chance && (
                <div className="chance-details">
                  <div className="chance-type">{currentLocationDetail.chance.type}</div>
                  <div className="chance-title">機會卡</div>
                  <div className="chance-content">請抽取一張機會卡</div>
                  
                  <button 
                    className="draw-chance-button"
                    onClick={() => {
                      setShowLocationDetail(false);
                      // 立即切換到下一玩家
                      switchToNextPlayer();
                    }}
                  >
                    抽取機會卡
                  </button>
                </div>
              )}
              
              {currentLocationDetail.shortcut && (
                <div className="shortcut-details">
                  <div className="shortcut-description">{currentLocationDetail.shortcut.description}</div>
                  <button 
                    className="use-shortcut-button"
                    onClick={() => {
                      setShowLocationDetail(false);
                      // 立即切換到下一玩家
                      switchToNextPlayer();
                    }}
                  >
                    使用捷徑
                  </button>
                </div>
              )}
              
              {/* 對於沒有特定操作的格子（START、GO、特殊格子等）顯示完成按鈕 */}
              {currentLocationDetail.type === 'start' || 
               currentLocationDetail.type === 'go' || 
               currentLocationDetail.type === 'special' && !currentLocationDetail.challenge && !currentLocationDetail.chance && !currentLocationDetail.shortcut ? (
                <div className="completion-details">
                  <div className="completion-message">
                    {currentLocationDetail.type === 'start' ? '歡迎來到起始點！' :
                     currentLocationDetail.type === 'go' ? '通過起點，獲得獎勵！' :
                     '特殊格子效果'}
                  </div>
                  <button 
                    className="complete-button"
                    onClick={() => {
                      setShowLocationDetail(false);
                      // 立即切換到下一玩家
                      switchToNextPlayer();
                    }}
                  >
                    完成
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* 優惠券視窗 */}
      {showCouponPanel && (
        <div className="coupon-overlay">
          <div className="coupon-panel">
            <div className="coupon-header">
              <h2 className="coupon-title">優惠券</h2>
              <button 
                className="close-button"
                onClick={() => setShowCouponPanel(false)}
              >
                ✕
              </button>
            </div>
            <div className="coupon-buttons">
              {/* 地產格子顯示三個選項 */}
              {couponType === 'property' && (
                <>
                  <button 
                    className="coupon-button taiwanese-challenge"
                    onClick={handleWordChallenge}
                  >
                    台語大單挑
                  </button>
                  <button 
                    className="coupon-button scenario-challenge"
                    onClick={() => {
                      setShowCouponPanel(false);
                      setShowCouponChallengePanel(true);
                    }}
                  >
                    情境挑戰
                  </button>
                  <button 
                    className="coupon-button no-coupon"
                    onClick={() => {
                      setShowCouponPanel(false);
                      switchToNextPlayer();
                    }}
                  >
                    不使用優惠
                  </button>
                </>
              )}
              
              {/* 加油站和道路施工顯示兩個選項 */}
              {(couponType === 'gas_station' || couponType === 'road_construction') && (
                <>
                  <button 
                    className="coupon-button scenario-challenge"
                    onClick={() => {
                      setShowCouponPanel(false);
                      setShowCouponChallengePanel(true);
                    }}
                  >
                    情境挑戰
                  </button>
                  <button 
                    className="coupon-button no-coupon"
                    onClick={() => {
                      setShowCouponPanel(false);
                      const currentPlayer = players.find(p => p.isCurrentPlayer);
                      if (currentPlayer) {
                        // 道路施工專用暫停邏輯
                        if (couponType === 'road_construction') {
                          setRoadConstructionSkip(prev => ({
                            ...prev,
                            [currentPlayer.id]: true
                          }));
                          recordGameAction(
                            currentPlayer.id,
                            currentPlayer.name,
                            'move',
                            `${currentPlayer.name} 在道路施工選擇不使用優惠券，下一次輪到時暫停一回合`,
                            { location: currentPlayer.location, skipped: true, couponType, roadConstructionSkip: true }
                          );
                        } else {
                          // 加油站使用原有的暫停邏輯
                          setPlayerSkipped(true);
                          recordGameAction(
                            currentPlayer.id,
                            currentPlayer.name,
                            'move',
                            `${currentPlayer.name} 選擇不使用優惠，暫停一次`,
                            { location: currentPlayer.location, skipped: true, couponType }
                          );
                        }
                      }
                      switchToNextPlayer();
                    }}
                  >
                    不使用優惠
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 暫停提示視窗 */}
      {showSkipAlert && (
        <div className="skip-alert-overlay">
          <div className="skip-alert-content">
            <div className="skip-icon">⏸️</div>
            <h2 className="skip-title">暫停提示</h2>
            <p className="skip-message">{skipAlertMessage}</p>
            <button className="skip-close-button" onClick={() => setShowSkipAlert(false)}>
              了解
            </button>
          </div>
        </div>
      )}

      {/* 回合完成慶祝覆蓋層 */}
      {showRoundComplete && (
        <div className="round-complete-overlay">
          <div className="round-complete-content">
            <div className="celebration-icon">🎉</div>
            <h2 className="celebration-title">回合完成！</h2>
            <p className="celebration-message">{roundCompleteMessage}</p>
            <div className="celebration-effects">
              <div className="confetti"></div>
              <div className="confetti"></div>
              <div className="confetti"></div>
            </div>
          </div>
        </div>
      )}

      {/* 遊戲歷程覆蓋層 */}
      {showGameHistory && (
        <div className="game-history-overlay">
          <div className="game-history-content">
            <div className="history-header">
              <h2 className="history-title">遊戲歷程</h2>
              <button 
                className="close-button"
                onClick={() => setShowGameHistory(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="history-stats">
              <div className="stat-item">
                <span className="stat-label">遊戲時間：</span>
                <span className="stat-value">
                  {Math.floor((Date.now() - gameHistory.startTime.getTime()) / 60000)} 分鐘
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">總動作數：</span>
                <span className="stat-value">{gameHistory.actions.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">參與玩家：</span>
                <span className="stat-value">{players.length}</span>
              </div>
            </div>

            <div className="history-actions">
              <h3 className="actions-title">動作記錄</h3>
              <div className="actions-list">
                {gameHistory.actions.length === 0 ? (
                  <div className="no-actions">尚無動作記錄</div>
                ) : (
                  gameHistory.actions.map((action) => (
                    <div key={action.id} className="action-item">
                      <div className="action-time">
                        {action.timestamp.toLocaleTimeString()}
                      </div>
                      <div className="action-content">
                        <div className="action-player">{action.playerName}</div>
                        <div className="action-description">{action.description}</div>
                        <div className="action-type">{action.actionType}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Monopoly;