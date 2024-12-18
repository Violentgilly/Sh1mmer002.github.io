let scenes = {};

document.addEventListener('DOMContentLoaded', () => {
    scenes = {
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

    const playerInfo = restorePlayerInfo();
    console.log('恢复的玩家信息：', playerInfo);

    const gameHistory = playerInfo.gameHistory;
    if (gameHistory.length > 0) {
        const lastScene = gameHistory[gameHistory.length - 1];
        showScene(lastScene);
    } else {
        showScene('startScene');
    }

    loadGameData('libraryInfo', 'library.txt');
});

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
    saveGameProgress(); // Save progress after showing a new scene
}

function startGame() {
    const nickname = document.getElementById('nickname').value || '游客';
    const playerId = document.getElementById('playerId').value || '游客';
    savePlayerInfo(playerId, nickname, ['startScene']);
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
    localStorage.removeItem('gameProgress');
    localStorage.removeItem('playerId');
    localStorage.removeItem('nickname');
    localStorage.removeItem('gameHistory');
    showScene('startScene');
}

function retryGame() {
    const gameProgress = JSON.parse(localStorage.getItem('gameProgress'));
    if (gameProgress) {
        showScene(gameProgress.sceneId);
        restorePlayerInfo();
    } else {
        restartGame();
    }
}

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

function saveGameProgress() {
const gameProgress = {
playerId: localStorage.getItem('playerId'),
nickname: localStorage.getItem('nickname'),
gameHistory: JSON.parse(localStorage.getItem('gameHistory')) || [],
currentScene: Object.keys(scenes).find(key => scenes[key].classList.contains('active'))
};
localStorage.setItem('gameProgress', JSON.stringify(gameProgress));
}

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


// 延迟500毫秒播放背景音乐，以符合自动播放政策
window.addEventListener('load', function() {
var audio = document.getElementById('backgroundMusic');
setTimeout(function() {
audio.play();
}, 500); // 减少延迟时间
});
