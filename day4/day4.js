const path = require('path');

function resolvePath(realtivePath) {
    const absolutePath = path.resolve(__dirname, realtivePath);
    console.log("resolvePath: ", absolutePath);
}

resolvePath("test-files/file.txt");
resolvePath("nonexistent-folder/file.txt");