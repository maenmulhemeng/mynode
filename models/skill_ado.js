

const {getDb} = require("./db");


const insertQuery = (data) => `INSERT INTO maen_skill([title],[value]) VALUES ('${data.title}' , '${data.value}' ); SELECT SCOPE_IDENTITY() AS id;`;
const selectManyQuery = () => "select * from maen_skill";
const selectQuery = (id) => `select * from maen_skill where id=${id}`;


const skill_model_mapper = (recordset) =>{    
    return {
        id: recordset["id"],
        title: recordset["title"],
        value: recordset["value"]
    }
}
const skill_list_model_mapper = (recordset) =>{
        let tests = [];
        recordset["recordset"].forEach(e =>{
          tests.push(skill_model_mapper(e))
    })
    return tests
}
const select_skills = ()=>{
    
    const request = getDb();
    if (request){
      return request.query(selectManyQuery())
      .then((recordset) => {
        console.log("return results",recordset)
        return skill_list_model_mapper(recordset);
      })
    }
} 
const select_skill = (id)=>{
    
  const request = getDb();
  if (request){
    return request.query(selectQuery(id))
    .then((recordset) => {
      console.log("return results",recordset)
      return skill_list_model_mapper(recordset);
    })
  }
} 


const insert_skill = (test)=>{
    
    const request = getDb();
    if (request){
    
      const q = insertQuery(test);
      console.log(q);  
      
      return request.query(q)
      .then((recordset) =>{  
      
        console.log("return results", recordset)
        // return rowsAffected and the inserted id 
        const inserted_id = recordset['recordset'][0].id;
        const rowsAffected = recordset['rowsAffected'][0];
        return {rowsAffected, inserted_id}
      
      }).catch(err =>{
          
          console.log(err);
        });
    }
}


module.exports = { 
    skill_model_mapper,
    skill_list_model_mapper,
    select_skills,
    select_skill,
    insert_skill
}