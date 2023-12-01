const { JSDOM } = require('jsdom')

function getUrlFromHTML(htmlBody, baseUrl) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    linkElements.forEach((item) => {
        if (item.href.slice(0, 1) === '/') {
            // relaive url
            try {
                const urlObj = new URL(`${baseUrl}${item.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        } else {
            //absolute url
            try {
                const urlObj = new URL(item.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`Error: ${error}`)
            }
        }
    })
    return urls
}

function normalizeUrl(url) {
    const urlObj = new URL(url)
    const hostPth = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPth.length > 0 && hostPth.slice(-1) === '/') {
        return hostPth.slice(0, -1)
    } else {
        return hostPth
    }
}

async function crawlPage(url) {
    console.log(`Crawling: ${url}`)

    try {
        const res = await fetch(url)

        if (res.status > 399) {
            console.log(`Error in fetch: status ${res.status} on page: ${url}`)
            return
        }
        // check for valid html
        const contentType = res.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`Non html response content type: ${contentType}`)
            return
        }
        console.log(await res.text())
    } catch (error) {
        console.log(`Error: ${error} | on page ${url}`)
    }
}

module.exports = {
    normalizeUrl,
    getUrlFromHTML,
    crawlPage
}