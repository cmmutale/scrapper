const { test, expect } = require('@jest/globals')
const { normalizeUrl } = require('./crawl.js')

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