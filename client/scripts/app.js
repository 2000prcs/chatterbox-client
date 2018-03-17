class App {
  constructor() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  }

  init() {
    $('.username').on('click', this.handleUsernameClick());
    $('#send .submit').on('submit', app.handleSubmit());
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
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message retrived');
      },
      error: function (data) {
        console.error('chatterbox: Failed to retrive message', data);
      }
    });
  }
  
  clearMessages() {
    $('#chats').empty();
  }

  renderMessage(message) {
    var node = document.createElement('div');
    node.innerText = message.text;
    $('#chats').append(node);

    var user = document.createElement('div');
    var username = message.username;
    user.innerText = username;
    $(user).addClass('.username');
    $('#main').append(user);

  }

  renderRoom(string) {
    var room = document.createElement('a');
    room.innerText = string;    
    $(room).addClass('dropdown-item');
    $('#roomSelect').append(room);
  }
  
  handleUsernameClick() {
    console.log('clicked');
  }
  
  handleSubmit() {
    console.log('submit');
  }
}

var app = new App();


