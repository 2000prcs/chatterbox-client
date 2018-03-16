// YOUR CODE HERE:
$('document').ready(function(){


   $.ajax({
    url: 'http://parse.sf93.hackreactor.com/chatterbox/classes/messages',
    success: function(data){
        $('body'.append(data));
    }
   })

   

});