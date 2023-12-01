const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js')

async function main() {
    if (argv.length > 3) {
        console.log(`Too many arguments!`)
        process.exit(1)
    }
    if (argv.length < 3) {
        console.log('Too few arguments')
        process.exit(1)
    }
    const baseUrl = argv[2]
    // console.log(`Great, here is the url: ${argv[2]}`)
    const pages = await crawlPage(baseUrl, baseUrl, {})
    for (const page of Object.entries(pages)) {
        console.log(page)
    }
}

main()
