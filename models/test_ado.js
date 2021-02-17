

const {getDb,sql} = require("./db");
const promise =require('promise');

const Test_model_mapper = (recordset) =>{    
    return {
        id: recordset["id"],
        key: recordset["key"],
        value: recordset["value"]
    }
}
const Test_list_model_mapper = (recordset) =>{
        let tests = [];
        recordset["recordset"].forEach(e =>{
          tests.push(Test_model_mapper(e))
    })
    return tests
}
const select_tests = (callback)=>{
    
    const request = getDb();
    if (request){
      request.query("select * from maen_test")
      .then((recordset) => {
        console.log("return results",recordset)
        callback( Test_list_model_mapper(recordset));
      })
    }
} 
const select_tests_promise = ()=>{
  const p = new Promise(function(resolve, reject) {  
    
    const request = getDb();
    if (request){
      request.query("select * from maen_test")
      .then((recordset) => {
        
        console.log("return results",recordset);
        resolve(Test_list_model_mapper(recordset));
      }).catch(err=>reject({msg:"error in SQL statment in select_tests_promise",status:500,err:err}));
    }else{
      reject({err:"no conection"})
    }
  
  });
  return p;
}

const insert_test = (test,callback)=>{
    
    const request = getDb();
    if (request){
    
      const q = `INSERT INTO maen_test([key],[value]) VALUES ('${test.key}' , '${test.value}' ); SELECT SCOPE_IDENTITY() AS id;`;
      console.log(q);  
      
      request.query(q)
      .then((recordset) =>{  
      
        console.log("return results", recordset)
        // return rowsAffected and the inserted id 
        const inserted_id = recordset['recordset'][0].id;
        const rowsAffected = recordset['rowsAffected'][0];
        callback(rowsAffected, inserted_id);
      
      }).catch(err =>console.log(err));
    }
}
const mypromise = new Promise(function(resolve, reject) {
  // Some imaginary 2000 ms timeout simulating a db call
  setTimeout(() => resolve({msg: 'To do some more job'}), 1000);
});

module.exports = { 
    Test_model_mapper,
    Test_list_model_mapper,
    select_tests,
    insert_test,
    mypromise,
    select_tests_promise
}