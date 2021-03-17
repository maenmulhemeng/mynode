const skill_business = require('../business/skill_business');
const skill_ado = require('../models/skill_ado');

const get_skills = (req, res, next) => {

    // Ask access layer to retrieve models
    skill_ado.select_skills()
    .then((skills)=>{
        // Apply business rules
        skill_business.setskills(skills);  
        skill_business.orderskills();
        // Send it back 
        console.log("here ",skills)
        res.send(skills);
    }).catch(err =>{
      console.log("let's catch it")
      next(err)
    });;
    console.log("finish");
}

const post_skill = (req, res, next) => {
    console.log(req.body);
    let test = req.body;
    // Apply business rules  before inserting 
    if (skill_business.validate(test)){
      // Ask access layer to insert 
      skill_ado.insert_skill(test).then(r=>{
       
        console.log(r)
        if (r.rowsAffected > 0 ){
          // apply business rules after inserting
          test.id = r.inserted_id;
          console.log("inserted")
          // Send it back 
          res.send(test);
        }else{
          res.send("was not inserted")
        }
      });
    }else{
      res.send("it is not a valid object")
    }
    console.log("finish");
  }

const get_skill = (req, res, next) => {

    // Ask access layer to retrieve models
    skill_ado.select_skill(req.params.id)
    .then((skill)=>{
        // Send it back 
        console.log("here ",skill)
        res.send(skill);
    }).catch(err =>{
      console.log("let's catch it")
      next(err)
    });;
    console.log("finish");
}

module.exports = {
    get_skills,
    post_skill,
    get_skill
}