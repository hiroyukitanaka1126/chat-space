#DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name |text|null: false|
|Email|string|null: false, unique:true|
|group_id|inreger|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|


### Association
- has_many :groups
- has_many :messages




## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body |text|add_index :messages, :body |
|image|string||
|group_id|inreger|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :group
- belongs_to :user







## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name |text|null: false|
|user_id|inreger|null: false, foreign_key: true|
|message_id|integer|null: false, foreign_key: true|


### Association
- has_many :users
- has_many :messages



## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

