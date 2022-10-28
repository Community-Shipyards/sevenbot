// Runs delete-dev, then deploy-dev

async function main() {
    require('./delete-dev.js');
    require('./deploy-dev.js');
}

main();
