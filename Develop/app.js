const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Choices = require("inquirer/lib/objects/choices");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


const teamCollection = async (inputs = []) => {
    const prompts = [
        {
            type: 'input',
            name: 'firstName',
            message: 'Team member first name:'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Team member last name:'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What role does this member have?',
            choices: ['Manager', 'Intern', 'Engineer']
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is their employee ID?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email'
        },
        //Intern question(s)
        {
            type: 'input',
            name: 'school',
            message: 'What school do they go to?',
            when: (answers) => answers.role === 'Intern'
        },
        // Manager
        {
            type: 'input',
            name: 'officeNumber',
            message: 'What is their office number?',
            when: (answers) => answers.role === 'Manager'
        },
        //Engineer
        {
            type: 'input',
            name: 'github',
            message: 'What is their github?',
            when: (answers) => answers.role === 'Engineer'
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another team member?',
            default: 'true'
        }
    ];
    
    const {again, ...answers} = await inquirer.prompt(prompts)
    const newInputs = [...inputs, answers]
    return again ? teamCollection(newInputs) : newInputs;
}

function generateTeamObjects(input){
    let outputArray = []

    input.forEach(element => {

        if(element.role === 'Manager'){
            console.log('Generating Manager...')
            let manager = new Manager(element.firstName + ' ' + element.lastName, element.id ,element.email, element.officeNumber)
            outputArray.push(manager)

        } else if(element.role === 'Intern'){
            console.log('Generating Intern...')
            let intern = new Intern(element.firstName + ' ' + element.lastName, element.id ,element.email, element.school)
            outputArray.push(intern)
        }else if(element.role === 'Engineer'){
            console.log('Generating Engineer...')
            let engineer = new Manager(element.firstName + ' ' + element.lastName, element.id ,element.email, element.github)
            outputArray.push(engineer)
        }

    })
    return outputArray
}

function writeHTML(text){
    // make the output directory
    fs.mkdir(OUTPUT_DIR, {recursive: true},(err) => {
        if (err) throw err
    })

    fs.writeFile(outputPath, text, function (err){
        if(err) throw err
    })
}

const main = async () => {
    const input = await teamCollection()
    console.log('Here we go...:', input)
    let teamArray = generateTeamObjects(input)
    let html = render(teamArray)
    writeHTML(html)
}

main();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
