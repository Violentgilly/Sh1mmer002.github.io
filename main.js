const scenes = {
  libraryScene: document.getElementById('libraryScene'),
  historyClueScene: document.getElementById('historyClueScene'),
  mythClueScene: document.getElementById('mythClueScene'),
  decodeScene: document.getElementById('decodeScene'),
  jungleScene: document.getElementById('jungleScene'),
  puzzleScene: document.getElementById('puzzleScene'),
  templeScene: document.getElementById('templeScene'),
  treasureScene: document.getElementById('treasureScene'),
  failureScene: document.getElementById('failureScene'),
  startScene: document.getElementById('startScene')
};

function showScene(sceneId) {
  for (const scene in scenes) {
      scenes[scene].classList.remove('active');
  }
  scenes[sceneId].classList.add('active');
}

function startGame() {
    const nickname = document.getElementById('nickname').value;
    const playerId = document.getElementById('playerId').value;
    savePlayerInfo(playerId, nickname, []);
    showScene('libraryScene');
    loadGameData('libraryInfo', 'library.txt');
}

function chooseHistory() {
  showScene('historyClueScene');
}

function chooseMyth() {
  showScene('mythClueScene');
}

function navigateToDecodeScene() {
  showScene('decodeScene');
}

function chooseSafePath() {
  showScene('templeScene');
  loadGameData('templeInfo', 'temple.txt');
}

function chooseDangerousPath() {
  showScene('failureScene');
}

function tryToPickLock() {
  showScene('failureScene');
}

function searchForSwitch() {
  showScene('treasureScene');
}

function restartGame() {
  for (const scene in scenes) {
      scenes[scene].classList.remove('active');
  }
  showScene('startScene');
}

// 保存玩家信息到本地存储
function savePlayerInfo(playerId, nickname, gameHistory) {
  localStorage.setItem('playerId', playerId);
  localStorage.setItem('nickname', nickname);
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

// 恢复玩家信息
function restorePlayerInfo() {
  const playerId = localStorage.getItem('playerId');
  const nickname = localStorage.getItem('nickname');
  const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
  return { playerId, nickname, gameHistory };
}

// 当页面加载时，尝试恢复玩家信息和游戏历史
document.addEventListener('DOMContentLoaded', () => {
  const playerInfo = restorePlayerInfo();
  // 如果有玩家信息，更新到页面上（这里可以根据需要更新到页面的任何部分）
  if (playerInfo.playerId) {
    // 例如，更新到一个隐藏的div中，或者用于其他逻辑
    console.log('恢复的玩家信息：', playerInfo);
  }

  // 检查游戏历史，如果玩家之前已经在游戏中，尝试恢复到之前的场景
  const gameHistory = playerInfo.gameHistory;
  if (gameHistory.length > 0) {
    const lastScene = gameHistory[gameHistory.length - 1];
    showScene(lastScene);
  } else {
    // 如果没有游戏历史，从开始场景开始
    showScene('startScene');
  }
});

// 异步加载游戏元素资料
async function loadGameData(elementId, fileName) {
    try {
      const response = await fetch(fileName);
      const data = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
          element.innerHTML = data;
      } else {
          console.error(`Element with id '${elementId}' not found.`);
      }
  } catch (error) {
      console.error('Error loading game data:', error);
      const element = document.getElementById(elementId);
      if (element) {
          element.innerHTML = '无法加载数据';
      } else {
          console.error(`Element with id '${elementId}' not found.`);
      }
  }
}

// 在页面加载时加载图书馆的资料
document.addEventListener('DOMContentLoaded', function() {
  loadGameData('libraryInfo', 'library.txt');
});

// 确保开始场景是默认显示的
document.addEventListener('DOMContentLoaded', function() {
  showScene('startScene');
});