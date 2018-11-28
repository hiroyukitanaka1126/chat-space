$(function(){

  function buildHTML(message){
    var image = " ";
    if(message.image){
      image = `<image src = "${message.image}">`;
    };
    var html = `<div class="messages">
                 <div class="messages__name">
                  ${message.user_name}
                 </div>
                 <div class="messages__time">
                  ${message.created}
                 </div>
                 <p class="messages__text">
                  ${message.body}
                 </p>
                 <div class ="lower-massage__image">
                  ${image}
                 </div>
                </div>`;
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat').append(html);
      $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight},'fast');
      $('.submit-form').prop('disabled', false);
    })
     .fail(function(){
      alert('error');
    });
  });
});
