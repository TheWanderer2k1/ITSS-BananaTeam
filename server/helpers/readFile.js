const path = require('path');
const fs = require('fs');


exports.convertFilePath = (file_name) => {
    var absolutePath = path.join(__dirname, '..', file_name);
    let imageLink = null
    if (fs.existsSync(absolutePath)) {
        imageLink = process.env.SERVER_HOST + file_name
    } else {
        imageLink = process.env.GITHUB_HOST + file_name
    }
    return imageLink
}