json.body  @message.body
json.image  @message.image.url
json.created  @message.created_at.strftime("%Y年%m月%d日 %H:%M")
json.user_id  @message.user.id
json.user_name  @message.user.name
