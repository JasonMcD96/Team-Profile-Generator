// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school, role = 'Intern'){
        super(name, id, email)
        this.role = role
        this.school = school
    }

    // Getters and Setters
    getSchool(){
        return this.school
    }
    
    setSchool(newSchool){
        this.school = newSchool
    }
}

module.exports = Intern