$(document).ready(function() {
  $('.refresh').on('click', function() {
    app.clearMessages();
    app.fetch();
  });
  $('.username').on('click', function() {
    app.handleUsernameClick();
  });
  // $('#send .submit').on('submit', function() {
  //   app.handleSubmit();
  // });
});