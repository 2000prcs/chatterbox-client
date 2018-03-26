class App {

  init() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
    this.room = {};
    $('.refresh').on('click', this.fetch());
    $('.username').on('click', this.handleUsernameClick.bind(this));
    $('#send .submit').on('submit', this.handleSubmit.bind(this));
    $('#roomSelect').on('change', this.handleRoomChange);
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
  }

  renderRoom(string) {
    var room = document.createElement('option');
    if (!this.room[string] && string) {
      this.room[string] = string;
      room.innerText = string;  
      $(room).attr('data-roomname', string);  
      $(room).addClass('dropdown-item');
      $('#roomSelect').append(room);
    }
  }
  
  handleUsernameClick() {
    console.log('clicked');
  }
  
  handleSubmit() {
    var input = $('input:first').val();
    var newSearch = window.location.search.slice(10);
    var message = {
      username: newSearch,
      text: input,
      roomname: this.roomname || 'mo&leader\'s room'
    };
    this.send(message);
    this.clearMessages();
    this.fetch();
  }

  handleRoomChange(event) {
    this.roomname = event;
  }
}

var app = new App();
app.init();


