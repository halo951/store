import { Config } from '@jest/types'

const config: Config.InitialOptions = {
    cache: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [],
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },
    collectCoverage: false,
    coverageDirectory: '.coverage',
    coverageReporters: ['html', 'lcov', 'text'],
    collectCoverageFrom: ['packages/store/src/**/*.ts', 'packages/store-plugin-*/src/**/*.ts'],
    // ignore jest
    coveragePathIgnorePatterns: ['/node_modules/', '/intf/', '/store-plugin-'],
    testMatch: ['<rootDir>/packages/store/__tests__/*.test.ts'],
    moduleNameMapper: {
        '^@cp0/(.*?)$': '<rootDir>/packages/$1/src'
    },
    rootDir: __dirname
}
export default config
