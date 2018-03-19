var app = {

  server: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  username: 'annonymous',
  roomname: 'lobby',
  lastMessageID: 0,
  friends: {},
  messages: [],
  room: {},

  init: function() {
    // get username
    app.username = window.location.search.substr(10);

    // add listeners
    $('.refresh').on('click', app.fetch());
    $('.username').on('click', app.handleUsernameClick);
    $('#send .submit').on('submit', app.handleSubmit);
    $('#roomSelect').on('change', app.handleRoomChange);

    // fetch previous messages
    app.startSpinner();
    app.fetch(false);

    //poll for new messages
    // setInterval(function(){
    //   app.fetch(true);
    // }, 3000);
  },

  send: function(message) {
    app.startSpinner();

    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        // clear messages input
        $('#message').val('');

        // trigger a fetch to update the messages, pass true to animate
        app.fetch();

        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch: function(animate) {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      dataType: 'JSON',
      data: 'order=-createdAt',
      success: function (data) {
        //store messages for caching later
        app.messages = data.results;

        data.results.forEach(obj => {
          app.renderMessage(obj);
          app.renderRoom(obj.roomname);
        });

        console.log('chatterbox: Message retrived', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to retrive message', data);
      }, 
    });
  },
  
  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessages: function(messages, animate){
    // clear existing messages
    app.clearMessages();
    app.stopSpinner();

    if (Array.isArray(messages)) {
    messages
      .filter(function (message) {
          return message.roomname === app.roomname || app.roomname === 'lobby' && !message.roomname;
    })
    .forEach(app.renderMessage);

    // make it scroll to the top
      if (animate) {
        $('body').animate({ scrollTop: '0px' }, 'fast');
      }
    }
  },

  renderMessage: function(message, animate) {

    var chat = document.createElement('div');
    chat.innerText = `[${message.createdAt}] ${message.username}@\n${message.text}`; 
    $(chat).addClass('username');
    $(chat).attr('data-user', message.username);
    $('.username').on('click', app.handleUsernameClick);
    $(chat).appendTo('#chats');  

    // add the friend class
    if(app.friends[message.username] === true){
      $(chat).addClass('friend');
    }

  },

  renderRoom: function(string) {    
    var room = document.createElement('option');

    if (!app.room[string] && string) {
      app.room[string] = string;
      room.innerText = string;  
      $(room).attr('data-roomname', string);  
      $(room).addClass('dropdown-item');
      $('#roomSelect').append(room);
    }
  },
  
  handleUsernameClick: function(event) {
    // get username from data attribute
    var username = $(event.target).data('user');
    
    if(username !== undefined){
      //toggle friend (set the string to a false value?)
      app.friends[username] = !app.friends[username];

      //escape the username in case it contains a quote (to avoid XSS)
      var selector = '[data-user="' + username.replace(/"/g, '\\\"') + '"]';

      // add 'friend' css class to all of that user's messages
      var $usernames = $(selector).toggleClass('friend');
    }
    
    event.preventDefault();
  },
  
  handleSubmit: function(event) {
    var input = $('input:first').val();
    var message = {
      username: app.username,
      text: input,
      roomname: app.roomname || 'lobby'
    };
    app.send(message);
    app.clearMessages();
    app.fetch();

    //stop the form from submitting
    // event.preventDefault();
  },

  handleRoomChange: function(event) {
    var selectedIndex = $('#roomSelect').prop('selectedIndex');

    // New room is always the first option
    if(selectedIndex === 0){
      var roomname = prompt('Enter room name');
      if(roomname){
        //set as the current room
        app.roomname = roomname;

        //add the room to the menu
        app.renderRoom(roomname);

        //select the menu option
        $('#roomSelect').val(roomname);
      } else {
        app.startSpinner();
        //store as undefined for empty names
        app.roomname = $('#roomSelect').val();
      }
      // rerender message
      app.renderMessages(app.messages);
    }

  },


  startSpinner: function(){
    $('.spinner img').show();
    $('form input[type=submit]').attr('disabled', 'true');
  },

  stopSpinner: function(){
    $('.spinner img').fadeOut('fast');
    $('form input[type=submit]').attr('disabled', null);
  }
}


app.init();
