const shell = require('shelljs');

function setStatus(message) {
    console.log(`Status: ${message}`)
    console.log('\n')
}

function viewPath() {
    const path = shell.pwd()
    console.log(path);
}

module.exports = {
    setStatus,
    viewPath,
}