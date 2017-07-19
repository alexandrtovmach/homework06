// /**
//  * Created by Alexandr on 18.07.2017.
//  */

function sendMessage() {
    var message = {
        userNick: localStorage.getItem('userNick'),
        userName: localStorage.getItem('userName'),
        reciverNick: parseMessage(true),
        textMessage: parseMessage()
    };
    socket.emit('send new message', message);
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

function chatSocket() {
    socket.emit('check new message', chatField.children.length);
    socket.on('take new messages', function (message) {
        console.log(message)
        if (message.length) {
            message.forEach(function (elem) {
                var li = document.createElement('li'),
                    span = document.createElement('span');
                li.className = (elem.userNick == localStorage.getItem('userNick')) ? 'my' : 'other';
                if (elem.reciverNick === localStorage.getItem('userNick')) {
                    span.style.color = 'gold';
                    li.style.color = 'gold';
                    li.style.backgroundColor = 'midnightblue';
                    span.innerHTML = elem.userNick + ' for @' + elem.reciverNick;
                } else if (elem.reciverNick !== ''){
                    span.innerHTML = elem.userNick + ' for @' + elem.reciverNick;
                } else {
                    span.innerHTML = elem.userNick;
                }
                li.appendChild(span);
                li.innerHTML += elem.textMessage;
                chatField.appendChild(li);
            });
            var time = setTimeout(function scrollTimer() {
                if (chatField.scrollTop == (chatField.scrollHeight - chatField.clientHeight)) {
                    clearTimeout(time);
                    return
                }
                chatField.scrollTop += ((chatField.scrollHeight - chatField.scrollTop)/50 + 1);
                setTimeout(scrollTimer, 20)
            }, 1)
        }
    });
}