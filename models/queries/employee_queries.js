
const insertQuery = (data) => 
`INSERT INTO maen_employee([title],[value]) 
VALUES ('${data.title}' , '${data.value}' ); SELECT SCOPE_IDENTITY() AS id;`;

const selectManyQuery = () => "select * from maen_employee";

const selectQuery = (id) => `select * from maen_employee where id=${id}`;

const selectEmployeeSkillsQuery = (id) => 
`select * 
    from maen_skill_employee
 where employee_id = ${id}`;

const selectSkillEmployeeQuery = (employee_id, skill_id) =>
`select * from maen_skill_employee where employee_id = ${employee_id} and skill_id = ${skill_id}`;

 const insertEmplyeeSkillQuery = (employee_id,data) => 
`INSERT INTO maen_skill_employee([employee_id],[skill_id],[title],[value]) 
 VALUES (${employee_id},'${data.skill_id}','${data.title}' , '${data.value}' ); SELECT SCOPE_IDENTITY() AS id;`


module.exports = {
    insertQuery,
    selectManyQuery,
    selectQuery,
    selectEmployeeSkillsQuery,
    selectSkillEmployeeQuery,
    insertEmplyeeSkillQuery
}