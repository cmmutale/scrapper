const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js');
const { printReport } = require('./report.js')


async function main() {
    if (argv.length > 3) {
        console.log(`Only one URL at a time please...`);
        process.exit(1);
    }
    if (argv.length < 3) {
        console.log('Please input URL to crawl...');
        process.exit(1);
    }
    const baseUrl = argv[2];
    const pages = await crawlPage(baseUrl, baseUrl, {});
    printReport(pages)
}
exports.main = main;
