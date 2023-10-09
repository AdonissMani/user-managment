# user-managment

##steps to run 
1. clone repo
2. opne project dir in VSCode
3. opne **application.properties** file to modify **MySQL configuration** as per your system (**root_user, root_password , database , table** )
4. make sure your sql is up and running.
5. go to backend dir in your terminal -> use `mvn clean install` on terminal
6. go to  backend/target dir -> run `java -jar sql-crud-0.0.1-SNAPSHOT.jar`
7. this will run your spring boot application, assuming your sql is up and running properly
8. go to frontnend dir in your terminal -> use `npm install` on terminal
9. in frontend dir -> `npm start`
10. your server will be up and running
11. backend : localhost:8080/api/v1/employees
12. frontend : localhost:3000/


   
