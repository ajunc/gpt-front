let targetWsPort = process.env.NODE_ENV == 'production' ? 'ws://47.254.45.52:3000' : 'ws://47.254.45.52:3000'
module.exports = {
    targetWsPort: targetWsPort
}