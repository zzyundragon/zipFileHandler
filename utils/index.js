const fs = require('fs')
const crypto = require('crypto')
const axios = require('axios')
async function downloadFile(fileUrl, targetPath, callback, onProgress) {
    try {
        console.time()
        let [url, receivedBytes, totalBytes] = [fileUrl, 0, 0]
        const writeStream = fs.createWriteStream(targetPath)
        const res = await axios.get(url, {
            responseType: 'stream'
        })
        console.timeEnd()
        totalBytes = res.headers['content-length']
        const data = res.data
        data.pipe(writeStream)
        data.on('data', (chunk) => {
            receivedBytes += chunk.length
        })
        data.on('end', () => {
            console.log('数据传输完毕')
        })
        data.on('error', (err) => {
            console.error('数据传输失败', err)
        })
    } catch (error) {
        console.log(error)
    }
}

function getFileMD5(filePath) {
    console.log(filePath, fs.existsSync(filePath));
    if (!fs.existsSync(filePath)) {
        new Error(`${filePath} 文件不存在`)
        return null
    }
    const fsHash = crypto.createHash('md5')
    const fileInfo = fs.readFileSync(filePath)
    fsHash.update(fileInfo)
    const md5 = fsHash.digest('hex')
    console.log(md5)
    return md5
}


module.exports = {
    getFileMD5,
    downloadFile
}