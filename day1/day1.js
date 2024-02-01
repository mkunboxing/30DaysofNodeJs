const fs = require('fs');

async function readFileContent(filePath) {
  try {
    const fileContent = await new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    console.log(fileContent);
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
  }
}

readFileContent("day1/test-files/file1.txt");
readFileContent("day1/test-files/empty-file.txt");
readFileContent("day1/test-files/nonexistent-file.txt");