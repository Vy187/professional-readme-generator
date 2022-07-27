const inquirer = require('inquirer');
const fs = require('fs');

const generateReadme = ({ title, description, installation, usage, credits, github, email }) =>
    `# ${title}
      
## Description
${description}
      
## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Credits](#Credits)
* [Questions](#Questions)

## Installation
${installation}
      
## Installation
${installation}
      
## Usage
${usage}
        
## Credits
${credits}
        
## Questions
If you have any questions about the repo, open an issue or contact me directly at https://github.com/${github} or ${email}
        
`;

const renderLicenseSection = (license) => 
    `## License
https://img.shields.io/badge/License-${license}-blue.svg
  
Copyright (c) [2022]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  
For more information, please visit: https://opensource.org/licenses/${license}`;


inquirer
    .prompt([
        {
            type: `input`,
            name: `title`,
            message: `What is the title of your project?`
        },
        {
            type: `input`,
            name: `description`,
            message: `Provide a short description of your project`
        },
        {
            type: `input`,
            name: `installation`,
            message: `What are the steps required to install your project?`
        },
        {
            type: `input`,
            name: `usage`,
            message: `Provide instructions of usage`
        },
        {
            type: `input`,
            name: `credits`,
            message: `List the collaboarator(s)`
        },
        {
            type: `list`,
            name: `license`,
            message: `What license is the project under?`,
            choices: [`Apache-2.0`, `BSD-2-Clause`, `BSD-3-Clause`, `GPL-license`, `LGPL-license`, `MIT`, `MPL-2.0`, `CDDL-1.0`, `EPL-2.0`, `NONE`]
        },
        {
            type: `input`,
            name: `github`,
            message: `What is your github username?`
        },
        {
            type: `input`,
            name: `email`,
            message: `What is your email?`
        }])
    .then((answers) => {
        readme = generateReadme(answers)
        if (answers.license !== `NONE`) { readme = readme + renderLicenseSection(answers.license) }
        fs.writeFile(`README.md`, readme, (err) =>  err ? console.log(err) : console.log('Successfully created README.md'))
    })