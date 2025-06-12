<!-- ExamResults -->
Don't Use straight sql query instead use similar like CRUD Example
Admin - table (id, name, email, password, dob, role - admin/student) 
 - / registerUser - role must be admin - if it is student - throught error 
 - /login - email, password - response - JWT Token 
 - /registerStudent - role must be student - this can be accessed by only admin  - token needed


Subjects - Table (id, name)
 - /createSubject 
 - /editSubject 
 - /deleteSubject 
 - /getSubjects 

 - all the above 4 apis must be accessed only by admin, if the student logged in 
  - throught the error - student is not allowed to perform this operation

Marks - Table - (id, subject_id, mark, user_id) - subject_id and user_id must be a foreign key relation
- below api must access only using admin 
    - /createMarks - 
        - {
    "user_name": "peter",
    "marks": [
        {"subject_name": "maths", "mark": 100},
        {"subject_name": "maths", "mark": 100},
        {"subject_name": "maths", "mark": 100},
        {"subject_name": "maths", "mark": 100},
        {"subject_name": "maths", "mark": 100}
    ]
}
 - use bulkCreate to create the marks 
    - / edit marks
    - / get Marks / id 
     - [{subject_name: , marks: }]


================================StudentAccess======================
1. /login - username, password - token 
2. /getMarks - [{subject_name: , marks: }] - token          
3. /myProfile - {name: , email:, dob: }                 