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

function restartGame() {
  for (const scene in scenes) {
      scenes[scene].classList.remove('active');
  }
  showScene('startScene');
}

// 保存玩家信息到本地存储
function savePlayerInfo(playerId, nickname, gameHistory) {
  if (playerId === null || nickname === null) {
    playerId = '游客';
    nickname = '游客';
  }
  localStorage.setItem('playerId', playerId);
  localStorage.setItem('nickname', nickname);
  localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}

function restorePlayerInfo() {
  const playerId = localStorage.getItem('playerId');
  const nickname = localStorage.getItem('nickname');
  const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
  if (playerId === 'null') playerId = null;
  if (nickname === 'null') nickname = null;
  return { playerId: playerId || '游客', nickname: nickname || '游客', gameHistory };
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

window.addEventListener('load', function() {
  var audio = document.getElementById('backgroundMusic');
  setTimeout(function() {
      audio.play();
  }, 3000); // 延迟3秒播放
});
