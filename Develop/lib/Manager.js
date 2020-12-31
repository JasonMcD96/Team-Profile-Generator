// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee")

class Manager extends Employee {
    constructor(name, id, email, office, role = 'Manager'){
        super(name, id, email, role)
        this.officeNumber = office
    }

    // Getters and Setters
    getOfficeNumber(){
        return this.officeNumber
    }

    setOfficeNumber(newNumber){
        this.officeN = newNumber
    }
}

module.exports = Manager