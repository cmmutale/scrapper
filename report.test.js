const { test, expect } = require('@jest/globals')
const { sortPages } = require('./report.js')

test('Sortpages', () => {
    const input = {
        'https://wagslane.dev/tags': 2,
        'https://wagslane.dev/about': 3,
        'https://wagslane.dev/posts/zen-of-proverbs': 1,
    }
    const actualOutput = sortPages(input)
    const expectedOutput = [
        ['https://wagslane.dev/about', 3],
        ['https://wagslane.dev/tags', 2],
        ['https://wagslane.dev/posts/zen-of-proverbs', 1],
    ]
    expect(actualOutput).toEqual(expectedOutput)
})