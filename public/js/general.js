var socket = io();

function init() {
	//check authorize
	if (localStorage.length) {
		chat.classList.remove('hidden');
	} else {
		authForm.classList.remove('hidden');
		authForm.onsubmit = function (event) {
			event.preventDefault();
			user = {
				userNick: userNick.value,
				userName: userName.value
			}
			socket.emit('new user', user)
			return;
		}
	}
	
	textMessage.addEventListener('keydown', function () {
		socket.emit('typing', localStorage.getItem('userNick'))
	})
	textMessage.addEventListener('blur', function () {
		socket.emit('end typing', localStorage.getItem('userNick'))
	})
	//typing
	socket.on('typing', function (nick) {
		console.log(nick)
		document.getElementById(String(nick)).classList.add('typing')
	})
	socket.on('end typing', function (nick) {
		document.getElementById(String(nick)).classList.remove('typing')
	})
	
	//send message
	chat.onsubmit = function (event) {
		event.preventDefault();
		var message = {
			textMessage: parseMessage(),
			userNick: localStorage.getItem('userNick'),
			reciverNick: parseMessage(true)
		}
		socket.emit('chat message', message)
		return;
	}
	
	//take message
	socket.on('chat message', function (message) {
		messToHTML(message)
        var time = setTimeout(function scrollTimer() {
            if (chatField.scrollTop == (chatField.scrollHeight - chatField.clientHeight)) {
                clearTimeout(time);
                return
            }
            chatField.scrollTop += ((chatField.scrollHeight - chatField.scrollTop)/50 + 1);
            setTimeout(scrollTimer, 20)
        }, 1)
	})
	
	//new user
	socket.on('new user', function (user) {
		userToHTML(user)
	})
	//load users
	socket.on('load users', function (connecters) {
		userToHTML(connecters)
	})
	//confirm of created user
	socket.on('created user', function () {
		localStorage.setItem('userNick', userNick.value);
		localStorage.setItem('userName', userName.value);
		authForm.classList.add('hidden');
		chat.classList.remove('hidden');
	})
	//load history
	socket.on('chat history', function (messages) {
		messToHTML(messages);
		chatField.scrollTop = (chatField.scrollHeight - chatField.clientHeight)
	})
	//confirm of sended message
	socket.on('sended message', function () {
		textMessage.value = null;
	})
	
};

function userToHTML(user) {
	if (!!user.forEach) {
		userList.innerHTML = null;
		user.forEach(function (elem) {
			var li = document.createElement('li');
			li.className = (elem.userNick == localStorage.getItem('userNick'))? 'myNick': 'otherNick';
			li.id = elem.userNick;
			li.innerHTML = elem.userNick;
			userList.appendChild(li);
		})
	} else {
		var li = document.createElement('li');
		li.className = (user.userNick == localStorage.getItem('userNick'))? 'myNick': 'otherNick';
		li.id = user.userNick;
		li.innerHTML = user.userNick;
		userList.appendChild(li);
	}
}


function messToHTML(mess) {
	if (!!mess.forEach) {
		mess.forEach(function (elem) {
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
		})
	} else {
		var li = document.createElement('li'),
			span = document.createElement('span');
		li.className = (mess.userNick == localStorage.getItem('userNick')) ? 'my' : 'other';
		if (mess.reciverNick === localStorage.getItem('userNick')) {
			span.style.color = 'gold';
			li.style.color = 'gold';
			li.style.backgroundColor = 'midnightblue';
			span.innerHTML = mess.userNick + ' for @' + mess.reciverNick;
		} else if (mess.reciverNick !== ''){
			span.innerHTML = mess.userNick + ' for @' + mess.reciverNick;
		} else {
			span.innerHTML = mess.userNick;
		}
		li.appendChild(span);
		li.innerHTML += mess.textMessage;
		chatField.appendChild(li);
	}
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