const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js')

function main() {
    if (argv.length > 3) {
        console.log(`Too many arguments!`)
        process.exit(1)
    }
    if (argv.length < 3) {
        console.log('Too few arguments')
        process.exit(1)
    }
    // console.log(`Great, here is the url: ${argv[2]}`)
    crawlPage(argv[2])
}

main()
