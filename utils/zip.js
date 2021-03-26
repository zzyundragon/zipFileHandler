const fs = require('fs')
const DecompressZip = require('decompress-zip')

module.exports =  class ZipHandle {
    constructor(fileName, output, callback) {
        console.log(fileName, fs.existsSync(fileName));
        if (!fs.existsSync(fileName)) {
            new Error(`${fileName} 文件不存在`)
            return null
        }
        const unzipper = new DecompressZip(fileName)
        unzipper.on('error', (err) => {
            if (callback) callback(err)
            console.log(`解压 ${fileName} 文件报错`, err)
        })
        unzipper.on('extract', function (log) {
            console.log('Finished extracting');
        });

        unzipper.on('progress', function (fileIndex, fileCount) {
            console.log('Extracted file ' + (fileIndex + 1) + ' of ' + fileCount);
        });
        unzipper.extract({
            path: output,
            filter: function (file) {
                return file.type !== "SymbolicLink";
            }
        })
    }
}