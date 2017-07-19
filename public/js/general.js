// /**
//  * Created by Alexandr on 18.07.2017.
//  */
var arrNick = [];
var socket;
function init() {
    socket = io.connect();
    chat.onsubmit = function (event) {
        event.preventDefault();
        sendMessage()
    };
    if (localStorage.length) {
        chat.classList.remove('hidden');
        getAllReservedNicks();
        chatSocket();
    } else {
        showForm();
    }
}

function showForm() {
    authForm.onsubmit = function (event) {
        event.preventDefault();
        if (checkUniqueNick(userNick.value)) {
            var user = {
                userNick: userNick.value,
                userName: userName.value
            };
            socket.emit('new user', user);
            socket.on('new user', function () {
                localStorage.setItem('userNick', userNick.value);
                localStorage.setItem('userName', userName.value);
                authForm.classList.add('hidden');
                chat.classList.remove('hidden');
                chatSocket();
            })
        } else {
            alert('This nickname is reserved by another user')
        }
    };
    getAllReservedNicks();
    authForm.classList.remove('hidden');
}


function getAllReservedNicks() {
    socket.emit('getAllUserReservedNicks', userList.children.length);
    socket.on('reservedNicks', function (nicks) {
        arrNick = nicks;
        arrNick.forEach(function (elem){
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