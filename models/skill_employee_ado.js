

const {getDb} = require("./db");
const query = require('./queries/skill_employee_queries');

const skill_employee_model_mapper = (recordset) =>{    
    return {
        employee_id: recordset["employee_id"],
        skill_id: recordset["skill_id"],
        title: recordset["title"],
        value: recordset["value"]
    }
}

const skill_employee_list_model_mapper = (recordset) =>{
    let models = [];
    recordset["recordset"].forEach(e =>{
      models.push(skill_employee_model_mapper(e))
    })
    return models
}

const select_all = () =>{
  const request = getDb();
  if (request){
    return request.query(query.selectAllQuery())
    .then((recordset) => {
      console.log("return results",recordset)
      return skill_employee_list_model_mapper(recordset)
    })
  }
}

const select_employee_skills = (id) =>{
  const request = getDb();
  if (request){
    return request.query(query.selectEmployeeSkillsQuery(id))
    .then((recordset) => {
      console.log("return results",recordset)
      return skill_employee_list_model_mapper(recordset)
    })
  }
}
const select_employee_skill = (employee_id,skill_id) =>{
  const request = getDb();
  if (request){
    return request.query(query.selectSkillEmployeeQuery(employee_id,skill_id))
    .then((recordset) => {
      console.log("return results",recordset)
      return skill_employee_list_model_mapper(recordset)
    })
  }
}

const insert_employee_skill = (employee_id,emplyee_skill) =>{ 
  const request = getDb();
  if (request){
  
    const q =  query.insertEmplyeeSkillQuery(employee_id,emplyee_skill);
    console.log(q);  
    
    return request.query(q)
    .then((recordset) =>{  
    
      console.log("return results", recordset)
      // return rowsAffected and the inserted id 
      const rowsAffected = recordset['rowsAffected'][0];
      return {rowsAffected};

    }).catch(err =>console.log(err));
  }
}
module.exports = { 
    select_all,
    select_employee_skills,
    select_employee_skill,
    insert_employee_skill
}