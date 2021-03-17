

const {getDb} = require("./db");
const query = require('./queries/employee_queries');

const employee_model_mapper = (recordset) =>{    
    return {
        id: recordset["id"],
        title: recordset["title"],
        value: recordset["value"]
    }
}
const employee_list_model_mapper = (recordset) =>{
    let employees = [];
    recordset["recordset"].forEach(e =>{
          employees.push(employee_model_mapper(e))
    })
    return employees
}
const select_employees = ()=>{
    const request = getDb();
    
    if (request){
      return request.query(query.selectManyQuery())
      .then((recordset) => {
        console.log("return results",recordset)
        return employee_list_model_mapper(recordset)
      })
    }
} 
const select_employee = (id)=>{
    
  const request = getDb();
  if (request){
    return request.query(query.selectQuery(id))
    .then((recordset) => {
      console.log("employee set",recordset)
      return employee_model_mapper(recordset.recordset[0])
    })
  }
} 

const insert_employee = (employee)=>{
    
    const request = getDb();
    if (request){
    
      const q = query.insertQuery(employee)
      console.log(q);  
      
      return request.query(q)
      .then((recordset) =>{  
      
        console.log("return results", recordset)
        // return rowsAffected and the inserted id 
        const inserted_id = recordset['recordset'][0].id;
        const rowsAffected = recordset['rowsAffected'][0];
        return {inserted_id,rowsAffected};

      }).catch(err =>console.log(err));
    }
}

const select_employee_skills = (id) =>{
  const request = getDb();
  if (request){
    return request.query(query.selectEmployeeSkillsQuery(id))
    .then((recordset) => {
      console.log("return results",recordset)
      return employee_list_model_mapper(recordset)
    })
  }
}
module.exports = { 
    employee_model_mapper,
    employee_list_model_mapper,
    select_employees,
    select_employee,
    select_employee_skills,
    insert_employee
}
