$(document).on('turbolinks:load', function() {
    function appendUserName(user){
      var html = `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${user.name}</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                    追加
                    </a>
                  </div>`
      $('#user-search-result').append(html);
    };
    function appendUserMember(member,user_id){
      var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                   <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                   <p class='chat-group-user__name'>${member}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${user_id}">削除</a>
                  </div>`
      $('#chat-group-users').append(html);
    }

    $('#user-search-field').on('keyup',function(e){
      var input = $(this).val();
      if(input !== ""){ 
        $.ajax({
           type: 'GET',
           url: '/users',
           data: { name: input },
           dataType: 'json'
           })
         .done(function(users){
           $("#user-search-result").empty();
             if(users.length !== 0){
               users.forEach(function(user){
                 appendUserName(user);
               });
             }
          })
         .fail(function(){
           alert('ユーザー検索に失敗しました');
          });
      };
    });

    var members = []
    $('#user-search-result').on('click','.chat-group-user__btn--add',function(){
      var member = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      var result = $.inArray(user_id,members);
        if(result == -1){
          members.push(user_id)
          appendUserMember(member,user_id)
          $('#user-search-result').empty()
        }
        else {
          alert("登録済みのユーザーです")
        }
    });

    $('#chat-group-users').on('click','.chat-group-user__btn--remove',function(){
      var user_id = $(this).data("user-id");
      var num = members.indexOf(user_id)
      members.splice(num, 1)
      $(this).parent().remove()
    });
});
