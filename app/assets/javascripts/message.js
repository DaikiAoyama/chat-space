$(function(){ 
  function buildHTML(message){
    if (message.content && message.image) {
      var html =
      `<div class="message" data-message-id=${message.id}>
          <div class="message__detail">
            <div class="message__detail__user-name">
              ${message.user_name}
            </div>
            <div class="message__detail__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__contents">
            <p class="message__contents--content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
    } else if (message.content) {
      var html =
      `<div class="message" data-message-id=${message.id}>
          <div class="message__detail">
            <div class="message__detail__user-name">
              ${message.user_name}
            </div>
            <div class="message__detail__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__contents">
            <p class="message__contents--content">
              ${message.content}
            </p>
          </div>
        </div>`
    }
    else if (message.image) {
    var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="message__detail">
          <div class="message__detail__user-name">
            ${message.user_name}
          </div>
          <div class="message__detail__date">
            ${message.created_at}
          </div>
        </div>
        </div>
        <img src=${message.image} >
      </div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this);
  var url = $(this).attr('action')
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
        $('.messages').append(html);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $('form')[0].reset();
        $('.new_message__submit-btn').attr('disabled', false);
      })
      .fail(function() {
        alert("メッセージ送信に失敗しました");
    });
  });
  var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
      }
    })
    
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
