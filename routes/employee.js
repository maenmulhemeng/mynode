const express = require('express');
const router = express.Router();
const controller = require('../controllers/employee_controller');
const default_controller = require('../controllers/default_controller');


// *******************************************************
// employee 

// OPTIONS /employee 
router.options('/',(req,res,next) => res.send("GET and POST are supported but PUT and DELETE are not yet"))

// GET /employee 
router.get('/',controller.get_employees);

// POST /employee 
router.post('/', controller.post_employee);

// PUT /employee 
router.put('/', default_controller.not_supported);

// DELETE /employee 
router.delete('/', default_controller.not_supported);


// *******************************************************
// Single employee's oprations 

// OPTIONS /employee/id 
router.options('/:id',(req,res,next) => res.send("GET is supported but PUT and DELETE are not supported yet "))

// GET /employee/:id  example: /employee/7 
router.get('/:id',controller.get_employee);

// POST /employee/:id 
router.post('/:id',default_controller.not_a_service);

// PUT /employee/:id  
router.put('/:id', default_controller.not_supported);

// DELETE /employee/:id
router.delete('/:id', default_controller.not_supported);

// *******************************************************
// Employee's skills operations

// OPTIONS /employee/id 
router.options('/:id/skill',(req,res,next) => res.send("GET and POST are supported but PUT and DELETE are not supported yet "))

// GET /employee/:id/skill  example: /employee/7/skill  
router.get('/:id/skill',controller.get_employee_skills);

// POST /employee/:id/skill 
router.post('/:id/skill', controller.post_employee_skill);

// PUT /employee/:id/skill 
router.put('/:id/skill', default_controller.not_supported);

// DELETE /employee/:id/skill  
router.delete('/:id/skill', default_controller.not_supported);

// *******************************************************
//* GET employee's specific skill */
router.get('/:id/skill/:skill_id',controller.get_an_employee_skill);


/* Render an html model to test jade file*/
router.get('/html', controller.get_employees_html);

 /* let's pretend there was an error */
router.get('/err', controller.get_error);

module.exports = router;
