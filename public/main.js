(function() {
    var socket = io();

    $('.submit-message').submit(function(event) {
        event.preventDefault();
        var message = $('#my-message').val();
        $('.messages').append('<p style=\"color:' + $('#color').val() + '\">' + $('#name').val() + ': ' + message + '</p>');

        socket.emit('message', {
            name: $('#name').val(),
            message: message,
            color: $('#color').val()
        });
        $('#my-message').val('');
    });

    socket.on('message', function(data) {
        $('.messages').append('<p style=\"color:' + data.color + '\">' + data.name + ': ' + data.message + '</p>');
    });
})();
