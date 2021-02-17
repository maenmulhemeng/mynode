var express = require('express');
var router = express.Router();
const test_business = require('../business/test_business');
const test_ado = require('../models/test_ado');


/* GET users listing. */
router.get('/', function(req, res, next) {
  
  //test_ado.mypromise.then((d)=>{
  //  console.log('done',d);
  //})

  // Ask access layer to retrieve models
  test_ado.select_tests_promise()
  .then((tests)=>{
     // Apply business rules
     test_business.setTests(tests);  
      test_business.orderTests();
     // Send it back 
     console.log("here ",tests)
    res.send(test_business.getTests());
  }).catch(err =>{
    console.log("let's catch it")
    next(err)
  });;
  console.log("finish");
});

/* Render a model */
router.get('/html', function(req, res, next) {
  
  test_ado.mypromise.then((d)=>{
    console.log('done',d);
  })

  // Ask access layer to retrieve models
  test_ado.select_tests_promise()
  .then((tests)=>{
     // Apply business rules  
     test_business.setTests(tests);  
    test_business.orderTests();
     // Send it back 
     res.render('test', {tests:test_business.getTests()});
  });
  console.log("finish");
});

/* GET users listing. */
router.get('/err', function(req, res, next) {
  
  test_ado.mypromise.then((d)=>{
    console.log('done',d);
  })

  // Ask access layer to retrieve models
  test_ado.select_tests_promise()
  .then((tests)=>{
     // Apply business rules  
    test_business.orderTests(tests);
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
});

/* POST a test */
router.post('/', function(req, res, next) {
  console.log(req.body);
  let test = req.body;
  // Apply business rules  before inserting 
  if (test_business.validate(test)){
    // Ask access layer to insert 
    test_ado.insert_test(test , (rowseffected, inserted_id)=>{
      if (rowseffected > 0 ){
        // apply business rules after inserting
        test.id = inserted_id;
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
});


module.exports = router;
