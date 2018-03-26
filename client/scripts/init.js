$(document).ready(function() {
  $('.refresh').on('click', function() {
    app.clearMessages();
    app.fetch();
  });
});