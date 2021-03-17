const express = require('express');
const router = express.Router();
const controller = require('../controllers/skill_controller');
const default_controller = require('../controllers/default_controller');

// *******************************************************
// OPTIONS /skill 
router.options('/',(req,res,next) => res.send("GET and POST are supported but PUT and DELETE are not yet"))

// GET /skill 
router.get('/', controller.get_skills);

// POST /skill
router.post('/', controller.post_skill);

// PUT /skill 
router.put('/', default_controller.not_supported);

// DELETE /skill 
router.delete('/', default_controller.not_supported);


// *******************************************************
// OPTIONS /skill/:id 
router.options('/:id',(req,res,next) => res.send("GET"))

// GET /skill/:id  example: /employee/7 
router.get('/:id',controller.get_skill);

// POST /skill/:id 
router.post('/:id',default_controller.not_a_service);

// PUT /skill/:id  
router.put('/:id', default_controller.not_supported);

// DELETE /skill/:id
router.delete('/:id', default_controller.not_supported);

module.exports = router;
