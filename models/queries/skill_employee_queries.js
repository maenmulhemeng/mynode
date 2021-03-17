
const selectEmployeeSkillsQuery = (employee_id) => `select * from maen_skill_employee where employee_id = ${employee_id}`;

const selectSkillEmployeeQuery = (employee_id, skill_id) =>
`select * from maen_skill_employee where employee_id = ${employee_id} and skill_id = ${skill_id}`;

 const insertEmplyeeSkillQuery = (employee_id,data) => 
`INSERT INTO maen_skill_employee([employee_id],[skill_id],[title],[value]) 
 VALUES (${employee_id},'${data.skill_id}','${data.title}' , '${data.value}' ); SELECT SCOPE_IDENTITY() AS id;`

 
 const selectAllQuery = () =>`select * from maen_skill_employee`;
module.exports = {
    selectEmployeeSkillsQuery,
    selectSkillEmployeeQuery,
    insertEmplyeeSkillQuery,
    selectAllQuery
}