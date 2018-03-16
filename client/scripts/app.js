class App {
  constructor() {
    this.server = 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages';
  }

  init() {
    return;
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
  }
}

var app = new App();