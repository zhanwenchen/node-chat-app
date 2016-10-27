var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.emit('createEmail', {
    to: 'zainab@zainabrizvi.com',
    text: 'Hey, this is Zainab',
  });

  socket.on('newMessage', function (message) {
    console.log('newMessage', message);
  });

  socket.emit('createMessage', {
    from: 'whoever',
    text: 'Yup. That works for me.',
  })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newEmail', function (email) {
  console.log(`New email from ${email.from}, created at ${email.createdTimestamp}`);
  console.log(`${email.text}`);
});
