const { promisify} = require('util')
const downLoadGitRepo = require('download-git-repo')
const ora = require('ora')
const download = promisify(downLoadGitRepo)

module.exports.clone = async function clone(repo,desc) {
    const process = ora(`下载项目...${desc}`)
    process.start()
    try {
        await download(repo,desc)
    } catch(error) {
        process.fail()
    }
    process.succeed()
}