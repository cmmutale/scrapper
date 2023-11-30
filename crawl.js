function normalizeUrl(url) {
    const urlObj = new URL(url)
    const hostPth = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPth.length > 0 && hostPth.slice(-1) === '/') {
        return hostPth.slice(0, -1)
    } else {
        return hostPth
    }
}

module.exports = {
    normalizeUrl
}