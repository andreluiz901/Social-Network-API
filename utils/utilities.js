const hashSteps = 10;

function getNowDate() {
    const nowDate = new Date()
    const nowDateUTC = nowDate.toUTCString()
    return nowDateUTC
}

module.exports = {hashSteps, getNowDate}