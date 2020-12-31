// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email, role = 'Employee'){
        this.name = name
        this.id = id
        this.email = email
        this.role = role
    }

    // Getters and Setters
    getName(){
        return this.name
    }

    setName(newName){
        this.name = newName
    }

    setId(newID){
        this.id = newID
    }

    getId(){
        return this.id
    }

    serEmail(newEmail){
        this.email = newEmail
    }

    getEmail(){
        return this.email
    }

    getRole(){
        return this.role
    }
}

module.exports = Employee