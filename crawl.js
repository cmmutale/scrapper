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

async function crawlPage(baseUrl, url, pages) {

    const baseUrlObj = new URL(baseUrl)
    const urlObj = new URL(url)
    // make sure that we are crawling base url subpages
    if (baseUrlObj.hostname !== urlObj.hostname) {
        return pages
    }

    const normalizedCurrentUrl = normalizeUrl(url)
    if (pages[normalizedCurrentUrl] > 0) {
        pages[normalizedCurrentUrl]++
        return pages
    }

    pages[normalizedCurrentUrl] = 1

    console.log(`Crawling: ${url}`)

    try {
        const res = await fetch(url)

        if (res.status > 399) {
            console.log(`Error in fetch: status ${res.status} on page: ${url}`)
            return pages
        }
        // check for valid html
        const contentType = res.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`Non html response content type: ${contentType}`)
            return pages
        }

        const htmlBody = await res.text()

        const nextURLs = getUrlFromHTML(htmlBody, baseUrl)

        nextURLs.forEach(async (page) => {
            pages = await crawlPage(baseUrl, page, pages)
        })
    } catch (error) {
        console.log(`Error: ${error} | on page ${url}`)
    }

    return pages
}

module.exports = {
    normalizeUrl,
    getUrlFromHTML,
    crawlPage
}