#DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name |text|index: true, null: false|
|Email|string|null: false, unique: true|

### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body |text||
|image|string||
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name |text|null: false|

### Association
- has_many :members
- has_many :users, through: :members
- accepts_nested_attributes_for :members
- has_many :messages


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
