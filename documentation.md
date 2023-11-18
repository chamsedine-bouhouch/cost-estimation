Collections:

Users:

```
_id (ObjectId)
username (String)
type (String)
```
Projects:

```
_id (ObjectId)
user_id (ObjectId)
project_type (String)
answers (Array of Objects)
```
Document structure:

```
Users:
{
  "_id": ObjectId("636f8728799f2c0100000001"),
  "username": "johndoe",
  "type": "student"
}
Projects:
{
  "_id": ObjectId("636f8728799f2c0100000002"),
  "user_id": ObjectId("636f8728799f2c0100000001"),
  "project_type": "quiz",
  "answers": [
    {
      "question_id": ObjectId("636f8728799f2c0100000003"),
      "answer": "A"
    },
    {
      "question_id": ObjectId("636f8728799f2c0100000004"),
      "answer": "B"
    }
  ]
}
```