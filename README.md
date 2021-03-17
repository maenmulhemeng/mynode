# mynode

This is just a demo project to show the basic architecture of the relationship between the data access layer, the business layer, controllers and routes.  
## Routes 
This folder includes the routers of the API. For example employee routers and skill routers. The employee router is responsible of receiving requests of employees and forward the request to the suitable controller.  
## controllers 
This folder includes the controllers of the project. Each contoller can ask a data access object to retrieve data model from the database and then ask a business layer object to apply business rules over this model. Finally, the controller can return the result to the client. 
## models
Here we can find the data access layer where the application can execute SQL statements and map the recordsets into models 

## business 
Any application has to apply set of business rules before and after retrieving data models. These business rules are defined in business layer modules and can be used by the controller an other buisess layer modules. 

## Docker 
There is a docker file can be used to create an image of the project 

# Database 
This project considers a database that consists of three tables  
1- Employee(id,title,value)  
2- Skill(id,title,value)  
3- Skill_Employee(employee_id, skill_id,title,value)  
The emplpoyee has many skills and a skill can belong to many employees. For example let Maen and Marcelo be two employees and Maen has NodeJs and ReactJS skills and Marcelo has just ReactJs skill. So ReactJs skill belongs to both Maen and Marcelo. To express this many to many relationship we use skill_employee table. 