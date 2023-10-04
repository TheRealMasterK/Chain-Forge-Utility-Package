const fs = require('fs');
const path = require('path');

// Specify the paths of the folders you want to delete
const folder1Path = '/Users/kylelloyd/Documents/GitHub/Rufferal-FE/SC/src';
const folder2Path = '/Users/kylelloyd/Documents/GitHub/Rufferal-FE/Frontend/src/chain-info';

// Function to delete a folder recursively
function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach((file, index) => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                // Recursive call for subdirectories
                deleteFolderRecursive(curPath);
            } else {
                // Delete file
                fs.unlinkSync(curPath);
            }
        });
        // Delete the folder itself
        fs.rmdirSync(folderPath);
        console.log(`Successfully deleted ${folderPath}`);
    } else {
        console.log(`Folder ${folderPath} does not exist.`);
    }
}

// Delete folder1
deleteFolderRecursive(folder1Path);

// Delete folder2
deleteFolderRecursive(folder2Path);
