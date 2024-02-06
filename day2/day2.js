const fs = require('fs');

function writeToFile(filePath, content) {
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(`Error writing file: ${err.message}`);
        } else {
            console.log(`File written successfully: ${filePath}`);
        }
    });
}

writeToFile('day2/test-files/output1.txt', 'Sample content.');
// Expected Output: Data written to output1.txt

writeToFile('day2/test-files/nonexistent-folder/output.txt', 'Content in a non-existent folder.');
// Expected Output: Error writing to file: ENOENT: no such file or directory...