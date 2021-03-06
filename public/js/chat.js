/**
 * Created by Alexandr on 18.07.2017.
 */


function sendMessage() {
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/chat');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify({
        userNick: localStorage.getItem('userNick'),
        userName: localStorage.getItem('userName'),
        reciverNick: parseMessage(true),
        textMessage: parseMessage()
    }));
    xhr.onload = function () {
        textMessage.value = null;
    };

    xhr.onerror = function () {
        alert(xhr.statusText)
    };
}

function parseMessage(reciver) {
    var res;
    if (reciver) {
        res = (String(textMessage.value[0]) === '@')? textMessage.value.split(' ')[0].slice(1): '';
    } else {
        res = (String(textMessage.value[0]) === '@')? textMessage.value.split(' ').slice(1).join(' '): textMessage.value;
    }
    return res
}

function chatPool() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', '/chat' + chatField.children.length);
    xhr.send();
    xhr.onloadend = function () {
        if (JSON.parse(xhr.responseText).length) {
            JSON.parse(xhr.responseText).forEach(function (elem) {
                var li = document.createElement('li'),
                    span = document.createElement('span');
                li.className = (elem.userNick == localStorage.getItem('userNick'))? 'my': 'other';
                var reciverClass = (elem.reciverNick == localStorage.getItem('userNick'))? 'iReciver': 'allReciver';
                li.classList.add(reciverClass);
                span.innerHTML = elem.userNick;
                li.appendChild(span);
                li.innerHTML += elem.textMessage;
                chatField.appendChild(li);
            });
            var time = setTimeout(function scrollTimer() {
               if (chatField.scrollTop == (chatField.scrollHeight - chatField.clientHeight)) {clearTimeout(time); return}
               chatField.scrollTop += 10;
               setTimeout(scrollTimer, 20)
            }, 1)
        }
        setTimeout(chatPool, 2000)
    };

    //xhr.onerror = function () {
    //    setTimeout(chatPool, 10000)
    //};
}