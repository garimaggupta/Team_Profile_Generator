const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");

if (!fs.existsSync(OUTPUT_DIR)){
  fs.mkdirSync(OUTPUT_DIR);
}
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { isNumber } = require("util");

const employeeArray = [];

var addnewTeamMembers = "";
var finalHTML = "";

//Validation Functions to valid user input

const validateNum = function (input) {
  var re = /^[0-9]+$/;
  if (input === '') {
    return 'This is a required field';
  } else if (!input.match(re)) {
    return 'Please enter valid number'
  }
  return true;
}

const validateReq = function (input) {
  if (input === '') {
    return 'This is a required field';
  } 
  return true;
}

const validateEmail = function (input) {
  var re = /\S+@\S+\.\S+/;
  if (input === '') {
    return 'This is a required field';
  } else if (!re.test(input)) {
    return 'Please enter a valid email address';
  }
  return true;
}


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
console.log("Please build your team");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your manager's name?",
      name: "managerName",
      validate: validateReq
    },
    {
      type: "input",
      message: "What is your manager's id?",
      name: "managerId",
      validate: validateReq
    },
    {
      type: "input",
      message: "What is your manager's email?",
      name: "managerEmail",
      validate: validateEmail
    },
    {
      type: "input",
      message: "What is your manager's office number?",
      name: "managerOfficeNumber",
      validate: validateNum
    },
    {
      type: "list",
      message: "Which type of team member would you like to add?",
      name: "teamMemberType",
      choices: [
        "Engineer",
        "Intern",
        "I don't want to add any more team members",
      ],
    },
  ])
  .then(function (res) {
    const manager1 = new Manager(
      res.managerName,
      res.managerId,
      res.managerEmail,
      res.managerOfficeNumber
    );
    employeeArray.push(manager1);

    if (res.teamMemberType === "I don't want to add any more team members")
      addnewTeamMembers = "none";
    else addnewTeamMembers = res.teamMemberType;

    if (addnewTeamMembers === "Engineer") {
      addEngineers();
    } else if (addnewTeamMembers === "Intern") {
      addIntern();
    } else {
      finalHTML = render(employeeArray);
      generateTeamPage(finalHTML);
    }
  });

//This function collects information specific to Engineering team members
function addEngineers() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "engineerName",
        validate: validateReq
      },
      {
        type: "input",
        message: "What is your engineer's id?",
        name: "engineerId",
        validate: validateReq
      },
      {
        type: "input",
        message: "What is your engineer's email?",
        name: "engineerEmail",
        validate: validateEmail
      },
      {
        type: "input",
        message: "What is your engineer's GitHub username?",
        name: "gitUserName",
        validate: validateReq
      },
      {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "teamMemberType",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members",
        ],
      },
    ])
    .then(function (res) {
      const engineer1 = new Engineer(
        res.engineerName,
        res.engineerId,
        res.engineerEmail,
        res.gitUserName
      );
      employeeArray.push(engineer1);

      if (res.teamMemberType === "I don't want to add any more team members")
        addnewTeamMembers = "none";
      else addnewTeamMembers = res.teamMemberType;

      if (addnewTeamMembers === "Engineer") {
        addEngineers();
      } else if (addnewTeamMembers === "Intern") {
        addIntern();
      } else {
        finalHTML = render(employeeArray);
        generateTeamPage(finalHTML);
      }
    });
}

//This function collects information specific to Intern team members
function addIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is your intern's name?",
        name: "internName",
        validate: validateReq
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "internId",
        validate: validateReq
      },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "internEmail",
        validate: validateEmail
      },
      {
        type: "input",
        message: "What is your intern's school?",
        name: "internSchool",
        validate: validateReq
      },
      {
        type: "list",
        message: "Which type of team member would you like to add?",
        name: "teamMemberType",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members",
        ],
      },
    ])
    .then(function (res) {
      const intern1 = new Intern(
        res.internName,
        res.internId,
        res.internEmail,
        res.internSchool
      );
      employeeArray.push(intern1);

      if (res.teamMemberType === "I don't want to add any more team members")
        addnewTeamMembers = "none";
      else addnewTeamMembers = res.teamMemberType;

      if (addnewTeamMembers === "Engineer") {
        addEngineers();
      } else if (addnewTeamMembers === "Intern") {
        addIntern();
      } else {
        finalHTML = render(employeeArray);
        generateTeamPage(finalHTML);
      } 
    });
}

function generateTeamPage(htmlContent) {
  fs.writeFile(outputPath, htmlContent, function (err) {
  if (err) {
    return console.log(err);
  }

  console.log("Team Page generated successfully!");
});

}


