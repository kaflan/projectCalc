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
  var statusMessage = document.querySelectorAll('.status-message');
  var existingGames = document.querySelector('.existing-games');
  var newGame = document.querySelector('.newGame');
  var field = document.querySelector('.field');
  var mainGame = document.querySelector('.mainGame');
  var soket = new WebSocket(gameUrls.list);
  var startGame = document.querySelector('.startGame');
  var button = document.querySelector('button');
  var req;
  var obj;
  var arr = [];
  var i;
  var li;
  var yourPlayerId = {};
  var queryLi;
  var err = 'Неизвестная ошибка';
  var newGameWait = 'Ожидаем начала игры';
  var newGameErr = 'Ошибка создания игры';
  var gameId;
  var someGameId;
  var side;
  var jsonobj;
  // post для создания новой игри
  /* */
  function doRequest(method, url, data, callback) {
    req = new XMLHttpRequest();
    req.open(method, url);
    req.addEventListener('readystatechange', function finish() {
      if (req.readyState === req.DONE && req.status === 200) {
        callback(req);
      }
    });
    req.send(data);
  }
  // create new game
  soket.addEventListener('message', function listUrl(message) {
    obj = JSON.parse(message.data);
    arr.push([obj]);
    for (i = 0; i < arr.length; i++) {
      if (obj.action === 'add') {
        li = document.createElement('li');
        li.id = obj.id;
        someGameId = obj.id;
        li.textContent = obj.id;
        existingGames.appendChild(li);
        return true;
      }
      if (obj.action === 'remove') {
        gameId = obj.id;
        queryLi = document.getElementById(gameId);
        existingGames.removeChild(queryLi);
        return true;
      }
      if (obj.action === 'startGame') {
        someGameId = obj.id;
        return true;
      }
    }
  });
  soket.onerror = function errMessage() {
    statusMessage[0].classList.add('error-message');
    statusMessage[0].textContent = newGameErr;
    statusMessage[1].classList.add('error-message');
    statusMessage[1].textContent = newGameErr;
  };
  createGame.addEventListener('click', function hand() {
    statusMessage[0].textContent = newGameWait;
    statusMessage[1].textContent = newGameWait;
    doRequest('POST', gameUrls.newGame, null, function cu(data) {
      statusMessage.textContent = newGameWait;
      yourPlayerId = JSON.parse(data.response);
      button.disabled = true;
      if (!yourPlayerId.yourId) {
        statusMessage[0].classList.add('error-message');
        statusMessage[0].textContent = err;
        button.disabled = false;
      }
      jsonobj = JSON.stringify({register: yourPlayerId.yourId})
      soket.send(jsonobj);
      startGame.style.display = 'none';
      mainGame.style.display = 'inline-block';
    });
    console.log(obj);
    //doRequest('POST', gameUrls.gameReady, yourPlayerId, function cur() {
    //
    //});
  });
  existingGames.addEventListener('click', function crab() {
    doRequest('POST', gameUrls.newGame, null, function cu(data) {
      statusMessage.textContent = newGameWait;
      yourPlayerId = JSON.parse(data.response);
      button.disabled = true;
      if (!yourPlayerId.yourId) {
        statusMessage[0].classList.add('error-message');
        statusMessage[0].textContent = err;
        button.disabled = false;
      }
      soket.send({register: yourPlayerId.yourId});
      startGame.style.display = 'none';
      mainGame.style.display = 'inline-block';
    });
  });
  newGame.addEventListener('click', function gaga(){
    doRequest('PUT', gameUrls.surrender, yourPlayerId.yourId, null);
    console.log(yourPlayerId.yourId);
    console.log('put work');
  });
  mainGame.addEventListener('click', function gab() {
    mainGame.style.display = 'none';
    startGame.style.display = 'inline-block';
    button.disabled = false;
  });

});