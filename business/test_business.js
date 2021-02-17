
const {select_tests} = require('../models/test_ado');

// Define properties 
let test = {}
const getTest = () => test;
const setTest = (t) => test = t;

let tests = [];
const getTests = () => tests;
const setTests = (t) => {
    tests = [];
    tests = t;
}

// General functions
const orderTests = () =>{

    getTests().sort((a,b)=>a-b);
    
}
const validate = (test) => {
    if(!test) return false;
    if (test.key == test.value) return false;
    return true;
}



module.exports = { 
    getTests,
    setTests,
    getTest,
    setTest,
    orderTests,
    validate
}