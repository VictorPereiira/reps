const { setStatus } = require("./utils");
const shell = require('shelljs');
const { Octokit } = require("octokit");
const readlineSync = require('readline-sync');
require('dotenv').config();

(async () => {
    console.clear()
    setStatus('Template React-TS Generator');

    console.log('📥 GetInfo...')
    const project_name = readlineSync.question('Project Name: ');
    const project_desc = readlineSync.question('Project Description: ');
    let rep_visibility = readlineSync.question('Project Visibility: ');
    console.log('\n');

    const octokit = new Octokit({
        auth: process.env.GIT_TOKEN
    });

    if (rep_visibility === 'Private') {
        rep_visibility = true
    } else {
        rep_visibility = false
    }

    await octokit.request('POST /user/repos', {
        name: project_name,
        description: project_desc,
        private: rep_visibility,
        has_wiki: false,
    })

    // GitHub repository
    console.log('🔨 GitHub config...')
    const rep_name = 'front-template-react-ts'
    shell.cd("/home/victor/Code/projects")
    shell.exec(`git clone https://github.com/VictorPereiira/${rep_name}.git`)
    shell.exec(`mv ${rep_name} ${project_name}`);
    shell.cd(`${project_name}`)
    shell.exec('git remote rm origin')
    console.log('\n');

    // Install Package
    console.log('🔨 NPM Install Packages...')
    shell.exec('npm install')
    console.log('\n');

    // Git configs
    console.log('🔨 Git config...')
    shell.exec(`echo "# ${project_name}" >> README.md`)
    shell.exec('git add .')
    shell.exec('git commit -m "start project"')
    shell.exec(`git remote add origin https://github.com/VictorPereiira/${project_name}.git`)
    shell.exec('git push -u origin main')
    shell.exec('git config --global credential.helper cache')

    // Finished
    console.log('🏁 Finished!!!');
    console.log('Open Project...');
    shell.exec('code .')
    shell.exit()
})()

