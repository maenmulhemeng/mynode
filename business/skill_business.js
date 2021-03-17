
// Define properties 
let skill = {}
const getskill = () => skill;
const setskill = (t) => skill = t;

let skills = [];
const getskills = () => skills;
const setskills = (t) => {
    skills = [];
    skills = t;
}

// General functions
const orderskills = () =>{

    getskills().sort((a,b)=>a-b);
    
}
const validate = (skill) => {
    if(!skill) return false;
    if (skill.title == skill.value) return false;
    return true;
}



module.exports = { 
    getskills,
    setskills,
    getskill,
    setskill,
    orderskills,
    validate
}