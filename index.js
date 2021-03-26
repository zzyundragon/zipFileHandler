const util = require('./utils/index.js')
const Unzip = require('./utils/zip.js')

const config = {
    url: '',
    targetPath: './public/python.zip'
}

// util.downloadFile(config.url, config.targetPath)
// util.getFileMD5('./public/python.zip')

new Unzip('./public/python.zip', 'public')