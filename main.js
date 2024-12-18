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
      if (scenes[scene]) {
          scenes[scene].classList.remove('active');
      }
  }
  const sceneElement = scenes[sceneId];
  if (sceneElement) {
      sceneElement.classList.add('active');
  } else {
      console.error(`Scene with id '${sceneId}' not found.`);
  }
}

function startGame() {
  const nickname = document.getElementById('nickname').value || '游客';
  const playerId = document.getElementById('playerId').value || '游客';
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

// 重新开始游戏
function restartGame() {
  // 清空游戏进度
  localStorage.removeItem('gameProgress');
  // 重置玩家信息
  localStorage.removeItem('playerId');
  localStorage.removeItem('nickname');
  localStorage.removeItem('gameHistory');
  // 重置到开始场景
  showScene('startScene');
}

// 再试一次游戏
function retryGame() {
  // 尝试从localStorage加载最后一个保存的游戏进度
  const gameProgress = JSON.parse(localStorage.getItem('gameProgress'));
  if (gameProgress) {
      // 根据保存的游戏进度恢复游戏状态
      showScene(gameProgress.sceneId);
      // 恢复其他游戏状态...
      restorePlayerInfo();
  } else {
      // 如果没有保存的游戏进度，重新开始游戏
      restartGame();
  }
}

// 保存玩家信息到本地存储
function savePlayerInfo(playerId, nickname, gameHistory) {
  localStorage.setItem('playerId', playerId);
  localStorage.setItem('nickname', nickname);
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

function restorePlayerInfo() {
  const playerId = localStorage.getItem('playerId') || '游客';
  const nickname = localStorage.getItem('nickname') || '游客';
  const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
  return { playerId, nickname, gameHistory };
}

// 当页面加载时，尝试恢复玩家信息和游戏历史
document.addEventListener('DOMContentLoaded', () => {
  const playerInfo = restorePlayerInfo();
  console.log('恢复的玩家信息：', playerInfo);

  const gameHistory = playerInfo.gameHistory;
  if (gameHistory.length > 0) {
    const lastScene = gameHistory[gameHistory.length - 1];
    showScene(lastScene);
  } else {
    showScene('startScene');
  }

  // 在页面加载时加载图书馆的资料
  loadGameData('libraryInfo', 'library.txt');
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

// 延迟3秒播放背景音乐
window.addEventListener('load', function() {
  var audio = document.getElementById('backgroundMusic');
  setTimeout(function() {
      audio.play();
  }, 3000);
});
