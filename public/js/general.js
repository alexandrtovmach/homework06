// /**
//  * Created by Alexandr on 18.07.2017.
//  */
var arrNick = [];
var socket;
function init() {
    socket = io.connect();
    cleanUp.onclick = function () {
        if (!confirm('You really wanna clean up all users and messages?')) {return}
        localStorage.clear();
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/cleanup');
        xhr.send();
        xhr.onload = function () {
            alert('All data is removed');
            location.reload();
        }
    };


    chat.onsubmit = function (event) {
        event.preventDefault();
        var message = {
            userNick: localStorage.getItem('userNick'),
            userName: localStorage.getItem('userName'),
            reciverNick: parseMessage(true),
            textMessage: parseMessage()
        };
        socket.emit('send new message', message);
    };
    if (localStorage.length) {
        chat.classList.remove('hidden');
        getAllReservedNicks();
        chatSocket();
    } else {
        authForm.onsubmit = function (event) {
            event.preventDefault();
            if (checkUniqueNick(userNick.value)) {
                var user = {
                    userNick: userNick.value,
                    userName: userName.value
                };
                socket.emit('new user', user);
                socket.on('new user', function (nicks) {
                    localStorage.setItem('userNick', userNick.value);
                    localStorage.setItem('userName', userName.value);
                    authForm.classList.add('hidden');
                    chat.classList.remove('hidden');
                    nicks.forEach(function (elem){
                        var li = document.createElement('li');
                        li.className = (elem.userNick == localStorage.getItem('userNick'))? 'myNick': 'otherNick';
                        li.innerHTML = elem.userNick;
                        userList.appendChild(li);
                    });
                    //getAllReservedNicks();
                    chatSocket();
                })
            } else {
                alert('This nickname is reserved by another user')
            }
        };
        getAllReservedNicks();
        authForm.classList.remove('hidden');
    }
}



function getAllReservedNicks() {
    socket.emit('getAllUserReservedNicks');
    socket.on('reservedNicks', function (nicks) {
        nicks.forEach(function (elem){
            var li = document.createElement('li');
            li.className = (elem.userNick == localStorage.getItem('userNick'))? 'myNick': 'otherNick';
            li.innerHTML = elem.userNick;
            userList.appendChild(li);
        });
    });
}
function checkUniqueNick(nick) {
    var res = true;
    arrNick.forEach(function (elem){
        if (String(elem.userNick) === String(nick)) {
            res = false;
        }
    });
    return res;
}