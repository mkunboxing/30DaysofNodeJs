const path = require('path');

function checkFileExtansion(filePath , expectedExt){
    const actualExt = path.extname(filePath);

    if(actualExt === expectedExt){
        console.log('File has the expected extension',expectedExt);

    }else{
        console.log(`File does not have the expected extension \n Expected: ${expectedExt} \n Actual: ${actualExt}\n Actual: ${actualExt}`);
        
    }
}

checkFileExtansion('test.txt','.txt');
checkFileExtansion('dp.jpg','.png');