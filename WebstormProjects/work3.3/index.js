window.addEventListener('load', function load() {
//  заголовок .setRequestHeader('Content-Type', 'application/json');
  'use strict';
	// global vars
  var gameUrls = {
    list: 'ws://jb3.smartjs.academy/games',
    newGame: 'http://jb3.smartjs.academy/newGame',
    gameReady: 'http://jb3.smartjs.academy/gameReady',
    move: 'http://jb3.smartjs.academy/move',
    surrender: 'http://jb3.smartjs.academy/surrender'
  };
  var createGame = document.querySelector('.createGame');
  var statusMessage = document.querySelector('.status-message');
  var existingGames = document.querySelector('.existing-games');
  var newGame = document.querySelector('.newGame');
  var statusMessage = document.querySelector('.status-message');
  var field = document.querySelector('.field');
  var mainGame = document.querySelector('.mainGame');
  var wsList = new WebSocket(gameUrls.list);
  var startGame = document.querySelector('.startGame');
  var req;
  var obj;
  var arr = [];
  var i;
  var li;
  var yourId;
  var queryLi;
  var err = 'Неизвестная ошибка';
	var newGameWait = 'Ожидаем начала игры';
	var newGameErr = 'Ошибка создания игры';
	var gameId;
	var side;
  // post для создания новой игри
  /* */
  function doRequest(method, url, data, callback) {
    req = new XMLHttpRequest();
    req.open(method, url);
    console.log('work2');
    req.addEventListener('readystatechange', function finish() {
      if (req.readyState === req.DONE) {
        callback(req);
      }
    });
    req.send(data);
  }

  createGame.addEventListener('click', function create() {
    startGame.style.display = 'none';
    mainGame.style.display = 'inline-block';
    //doRequest(){}
  });
  newGame.addEventListener('click', function newGameStart() {
    startGame.style.display = 'inline-block';
    mainGame.style.display = 'none';
		//doRequest(){}
  });
  // create new game
  wsList.addEventListener('message', function listUrl(message) {
    obj = JSON.parse(message.data);
    arr.push([obj]);
    for (i = 0; i < arr.length; i++) {
      if (obj.action === 'add') {
        li = document.createElement('li');
        existingGames.appendChild(li);
        li.id = obj.id;
        li.textContent = obj.id;
        return true;
      }
      if (obj.action === 'remove') {
        gameId = obj.id;
        li.innerHTML = '';
        queryLi = document.getElementById(gameId);
        existingGames.removeChild(queryLi);
        return true;
      }
      //if(){}
    }
  });
  createGame.addEventListener('click', function hand(e) {
      doRequest('POST', gameUrls.newGame, null, function(data) {
        yourId = JSON.parse(data);
      });
    wsList.send();
    statusMessage.textContent = err;
		statusMessage.classList.add(err);
  });
});