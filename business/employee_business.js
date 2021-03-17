
// Define properties 
let employee = {}
const getEmployee = () => employee;
const setEmployee = (t) => employee = t;

let employees = [];
const getEmployees = () => employees;
const setEmployees = (t) => {
    employees = [];
    employees = t;
}

// General functions
const orderEmployees = () =>{

    getEmployees().sort((a,b)=>a-b);
    
}
const validate = (employee) => {
    if(!employee) return false;
    if (employee.title == employee.value) return false;
    return true;
}



module.exports = { 
    getEmployees,
    setEmployees,
    getEmployee,
    setEmployee,
    orderEmployees,
    validate
}