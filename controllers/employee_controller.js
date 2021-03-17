const employee_business = require('../business/employee_business');
const employee_ado = require('../models/employee_ado');
const skill_employee_ado = require('../models/skill_employee_ado');

const get_employees =  (req, res, next) => {
  
    // Ask access layer to retrieve models
    employee_ado.select_employees()
    .then((employees)=>{
        // Apply business rules
        employee_business.setEmployees(employees);  
        employee_business.orderEmployees();
        // Send it back 
        console.log("here ",employees)
      res.send(employee_business.getEmployees());
    }).catch(err =>{
      console.log("let's catch it")
      next(err)
    });;
    console.log("finish");
}

const get_employees_html = (req, res, next) => {
  
    // Ask access layer to retrieve models
    employee_ado.select_employees()
    .then((employees)=>{
       // Apply business rules  
       employee_business.setEmployees(employees);  
       employee_business.orderEmployees();
       // Send it back 
       res.render('employee', {employees:employee_business.getEmployees()});
    });
    console.log("finish");
}

const get_error = (req, res, next) => {
 
    // Ask access layer to retrieve models
    employee_ado.select_employees()
    .then((employees)=>{
       // Apply business rules  
      employee_business.orderEmployees(employees);
       // Send it back 
       // render the error page
       console.log("Let's create an error")
       throw 'Parameter is not a number!';
    }).catch(err =>{
      console.log("let's catch it")
      res.status(err.status || 500);
       next({msg:"error in",status:500})
    });
    console.log("finish");
  }

const post_employee =  (req, res, next) => {
    console.log(req.body);
    let employee = req.body;
    // Apply business rules  before inserting 
    if (employee_business.validate(employee)){
      // Ask access layer to insert 
      employee_ado.insert_employee(employee).then(r=>{
        
        if (r.rowsAffected > 0 ){
          // apply business rules after inserting
          employee.id = r.inserted_id;
          console.log("inserted")
          // Send it back 
          res.send(employee);
        }else{
          res.send("was not inserted")
        }
      });
    }else{
      res.send("it is not a valid object")
    }
    console.log("finish");
  }
const get_employee =  (req, res, next) => {
  
    // Ask access layer to retrieve models
    employee_ado.select_employee(req.params.id)
    .then((employee)=>{
          
        // Send it back 
        console.log("here ",employee)
      res.send(employee);
    }).catch(err =>{
      console.log("let's catch it")
      next(err)
    });;
    console.log("finish");
  }

const get_employee_skills =  (req, res, next) => {
  
    // Ask access layer to retrieve models
    skill_employee_ado.select_employee_skills(req.params.id)
    .then((skills)=>{
       employee_ado.select_employee(req.params.id)
       .then(employee => {
          
         employee.skills = skills;
         console.log("here ",employee)
         res.send(employee);
       
        }).catch(err =>{
        console.log("let's catch it")
        next(err)
      });
        // Send it back 
        
    }).catch(err =>{
      console.log("let's catch it")
      next(err)
    });
    console.log("finish");
  }

const post_employee_skill = (req, res, next) => {
  
    // Ask access layer to retrieve models
    skill_employee_ado.insert_employee_skill(req.params.id,req.body)
    .then((r)=>{
        if (r.rowsAffected>0){
          skill_employee_ado.select_employee_skills(req.params.id)
          .then((skills)=>{
            
              // Send it back 
              console.log("here ",skills)
            res.send(skills);
          
          }).catch(err =>{
            console.log("let's catch it")
            next(err)
          });
      }else{
        res.send(r);
      }
      
    }).catch(err =>{
      console.log("let's catch it")
      next(err)
    });;
    console.log("finish");
  }

const get_an_employee_skill =  (req, res, next) => {
  
    // Ask access layer to retrieve models
    skill_employee_ado.select_employee_skill(req.params.id,req.params.skill_id)
    .then((skills)=>{
       
        // Send it back 
        console.log("here ",skills)
      res.send(skills);
    }).catch(err =>{
      console.log("let's catch it")
      next(err)
    });
    console.log("finish");
  }

module.exports = {
    get_employees,
    get_employees_html,
    get_error,
    post_employee,
    get_employee,
    get_employee_skills,
    post_employee_skill,
    get_an_employee_skill
}