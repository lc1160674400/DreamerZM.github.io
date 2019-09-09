// Client Side
var socket = io();

function scrollToBottom() {
    // var messages = jQuery('#messages');
    // var newMessage = messages.children('li:last-child');
    // var scrollHeight = messages.prop('scrollHeight');
    // messages.scrollTop(scrollHeight);
    var chat = jQuery('.chat_main');
	chat.scrollTop(chat.prop('scrollHeight'))
}

var params = jQuery.deparam(window.location.search);

socket.on('connect', function() {
    // What to do when connecting to server
    console.log('Connected to server');

    socket.emit('join', params, function (err) {
        if (err) {
            // Redirection
            window.location.href = '/';
            alert(err);
        } 
        // else {
        //     console.log('No error');
        // };
    });
});

/* Receive from server */
socket.on('newMessage', function(message) {
    console.log("New message", message);
    
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var head = '';
    if(message.from === '小番茄'){
        head = '/images/girl.png'
    }else if(message.from === '小薯条'){
	    head = '/images/boy.png'
    }else{
        head = '/images/Robot.png'
    }
    var html = Mustache.render(template, {
        text: message.text,
        head: head,
        // from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

/* If disconnected from server */
socket.on('disconnect', function() {
    console.log('Disconnect from server')
});

// socket.on('updateUserList', function(users) {
//     console.log(users);
//     var ol = jQuery('<ol></ol>');
//     users.forEach(function (user) {
//         ol.append(jQuery('<li></li>').text(user));
//     });

//     jQuery('#users').html(ol);
// })

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
});

var sendButton = jQuery('#send-message');
var leaveButton = jQuery('#leave');

sendButton.on('click', function() {
    // e.preventDefault(); // Override page refresh

    var textBox = jQuery('[name=message]');

    if (jQuery('[name=message]').val().trim() != "") {
        socket.emit('createMessage', {
            text: textBox.val(),
            createdAt: new Date().getTime()
        }, function() {
            textBox.val('');
        });
    }
});

jQuery('#change-person').on('click', function() {
    // TODO
    sendButton.removeAttr('disabled')
    leaveButton.removeAttr('disabled')
    socket.emit('leave');
    socket.emit('changeRoom', params);
});

leaveButton.on('click', function() {
    socket.emit('leave');
    sendButton.attr('disabled', 'disabled')
    leaveButton.attr('disabled', 'disabled')
});

// jQuery('#message-form').on('submit', function(e) {
//     e.preventDefault(); // Override page refresh

//     var textBox = jQuery('[name=message]');

//     if (jQuery('[name=message]').val().trim() != "") {
//         socket.emit('createMessage', {
//             text: textBox.val(),
//             createdAt: new Date().getTime()
//         }, function() {
//             textBox.val('');
//         });
//     }

// });

// var locationButton = jQuery('#send-location');
// locationButton.on('click', function() {
//     // If the browser does not support geolocation
//     if (!navigator.geolocation) {
//         return alert('你的浏览器尚不支持该功能。');
//     }

//     // Also disables the original sending function
//     locationButton.attr('disabled', 'disabled').text('正在发送...');

//     navigator.geolocation.getCurrentPosition(function(position) {
//         // Success
//         locationButton.removeAttr('disabled').text('发送位置');
//         socket.emit('createLocationMessage', {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude
//         });
//     }, function() {
//         locationButton.removeAttr('disabled').text('发送位置');
//         // If user denies the permission prompt
//         alert('无法抓取地理位置。');
//     });
// });
