
### modules:
  - [x] projects
  - [x] questions
  - [x] categories

### todos
1. uml
2. Create Questions module
   - [x] Create
   - [x] Read
   - [x] Update
   - [x] Delete
   - [x] get questions by project category

3. Question Types Enum
   - [x] QCM - Options
   - [x] Text
  
4. Create projects module
   - Create
      - [x] name & email 
      - [ ] select type of the project 
   - [x] Read
   - [x] Update
      - [x] get questions by category
      - [x] delete Answer
      - [x] add Answer
   - [x] Delete

5. Weight Estimation
   - [x] add weight to Question model
   - [x] add weight to Answer model
   - [x] calculate a Project weightedScore

6. A Question can have only one Answer
   - [x] Adjust the Project Schema 
   - [x] add validation controle for adding Answer

7. Project Exception management
   - [x] not found Project
   - [x] not found Answer 
   - [x] duplicate Answer

8.  Create Categories module
    - [x] Create
    - [x] Read
    - [ ] Update 
    - [ ] Delete
    - [x] refactor with project_category

9.  use answerId for answer management
10. User can edit the estimation params
11. 