class App {

  init() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';

    $('.refresh').on('click', this.fetch());
    $('.username').on('click', this.handleUsernameClick.bind(this));
    $('#send .submit').on('submit', this.handleSubmit.bind(this));
  }

  send(message) {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
    });
  }

  fetch() {
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      dataType: 'JSON',
      data: 'order=-createdAt',
      success: function (data) {
        var data = data;
        var sortedData = data['results'].sort(function(a, b) {
          return a.createdAt > b.createdAt ? -1 : 1;
        });
        sortedData.forEach(obj => {
          app.renderMessage(obj);
          app.renderRoom(obj.roomname);
        });
        console.log('chatterbox: Message retrived', data);
      },
      error: function (data) {
        console.error('chatterbox: Failed to retrive message', data);
      }, 
    });
  }
  
  clearMessages() {
    $('#chats').empty();
  }

  renderMessage(message) {
    var chat = document.createElement('div');
    chat.innerText = `[${message.createdAt}] ${message.username}@\n${message.text}`; 
    $(chat).addClass('username');
    $(chat).attr('data-user', message.username);
    $('.username').on('click', this.handleUsernameClick);
    $(chat).appendTo('#chats');
      
    // var timeStamp = document.createElement('div')
    // $(timeStamp).addClass('.timeStamp');
    // $(timeStamp).css('font-style', 'oblique');
    // timeStamp.innerText = message.createdAt;
    // $('#chats').append(timeStamp);
    // var user = $('<div class=username></div>');
    // var username = message.username;
    // user.text(username).attr('data-user', username);
    // $('.username').on('click', this.handleUsernameClick);
    // $(user).css('font-weight', 'Bold');
    // $(user).appendTo('#chats');


    // if(message.text){
    //   var node = document.createElement('div');
    //   $(node).addClass('.text');
    //   node.innerText = message.text;
    //   $('#chats').append(node);
    // }

  
  }

  renderRoom(string) {
    var room = document.createElement('option');
    room.innerText = string;    
    $(room).addClass('dropdown-item');
    $('#roomSelect').append(room);
  }
  
  handleUsernameClick() {
    console.log('clicked');
  }
  
  handleSubmit() {
    var input = $('input:first').val();
    var newSearch = window.location.search.slice(10);
    console.log(input);
    var message = {
      username: newSearch,
      text: input,
      roomname: 'lobby'
    };
    this.send(message);
    this.clearMessages();
    this.fetch();
    
  }
}

var app = new App();
app.init();


