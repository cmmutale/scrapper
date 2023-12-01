const { test, expect } = require('@jest/globals')
const { normalizeUrl, getUrlFromHTML } = require('./crawl.js')

test('Normalize url strip protocol', () => {
    const input = 'https://boot.dev.blog/path'
    const actualOutput = normalizeUrl(input)
    const expectedOutput = 'boot.dev.blog/path'
    expect(actualOutput).toEqual(expectedOutput)
})

test('Normalize url strip trailing slash', () => {
    const input = 'https://boot.dev.blog/path/'
    const actualOutput = normalizeUrl(input)
    const expectedOutput = 'boot.dev.blog/path'
    expect(actualOutput).toEqual(expectedOutput)
})

test('Normalize url capitals', () => {
    const input = 'https://bOOt.deV.blog/path/'
    const actualOutput = normalizeUrl(input)
    const expectedOutput = 'boot.dev.blog/path'
    expect(actualOutput).toEqual(expectedOutput)
})

// GET URLS FROM HTML TESTS
test('getUrlFromHTML', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <p>Hello, World</p>
        <a href='https://bOOt.deV.blog/path/'>Link</a>
        <a href='https://bOOt.deV.blog/path/to-some-place'>Link</a>
        <div>
            <p>Hello, world</p>
        </div>
        <a href='https://bOOt.deV.blog/path/to-some-place/everywhere'>Link</a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://boot.dev.blog'
    const actualOutput = getUrlFromHTML(inputHTMLBody, inputBaseUrl)
    const expectedOutput = ['https://boot.dev.blog/path/', 'https://boot.dev.blog/path/to-some-place', 'https://boot.dev.blog/path/to-some-place/everywhere']
    expect(actualOutput).toEqual(expectedOutput)
})

test('getUrlFromHTML subpath', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <p>Hello, World</p>
        <a href='/sub-path'>Link</a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://boot.dev.blog'
    const actualOutput = getUrlFromHTML(inputHTMLBody, inputBaseUrl)
    const expectedOutput = ['https://boot.dev.blog/sub-path']
    expect(actualOutput).toEqual(expectedOutput)
})

test('getUrlFromHTML invalid', () => {
    const inputHTMLBody = `
    <html>
        <body>
        <p>Hello, World</p>
        <a href='invalid'>Link</a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://boot.dev.blog'
    const actualOutput = getUrlFromHTML(inputHTMLBody, inputBaseUrl)
    const expectedOutput = []
    expect(actualOutput).toEqual(expectedOutput)
})