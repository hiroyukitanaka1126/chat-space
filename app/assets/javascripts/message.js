$(function(){

  // 送信したメッセージ（HTML）の作成
  function buildHTML(message){
    var image = " ";
    if(message.image){
      image = `<image src = "${message.image}">`;
    };
    var html = `<div class="messages" data-massage-id="${message.id}">
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

  // メッセージ送信を非同期通信で行う
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
      $('.type-message').val('')
      $('#message_image').val('')
    })
     .fail(function(data){
      alert('メッセージを入力してください');
    });
     return false;
  });

  // メッセージの自動更新
  var interval = setInterval(function() {
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var id = $('.messages:last').data('messageId');

      $.ajax({
        url: location.href,
        data: { id : id },
        type: "GET",
        dataType: 'json'
      })
      .done(function(data){
        var HTML = '';
        data.messages.forEach(function(message){
          HTML += buildHTML(message);
          $('.chat').append(HTML);
          $('.chat').animate({scrollTop: $('.chat')[0].scrollHeight},'fast');
        })
      })
      .fail(function(){
        alert('error');
      });
    }
    else {
      clearInterval(interval);
    }} , 5000 );
});
