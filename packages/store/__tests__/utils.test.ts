import { getFirstPropKey, requiredFunctionDefined } from '../src/utils'
describe('test.util functions', () => {
    test('util | verification getFirstPropKey', () => {
        expect(getFirstPropKey('a')).toBe('a')
        expect(getFirstPropKey('a.b.c')).toBe('a')
        expect(getFirstPropKey('a[0]')).toBe('a')
        expect(getFirstPropKey(['a', 'b', 'c'])).toBe('a')
        expect(getFirstPropKey('a\\.b')).toBe('a.b')
    })
    test('util | satisfy coverage', () => {
        expect(getFirstPropKey('a/b', { preservePaths: true })).toBe('a/b')
    })

    test('util | getFirstPropKey use options', () => {
        expect(getFirstPropKey('a/b/c', { separator: '/' })).toBe('a')
    })

    test('util | verification requireFunctionDefined', () => {
        class Test {
            initData(): void {}
        }
        requiredFunctionDefined('Test', new Test(), ['initData'])
        try {
            requiredFunctionDefined('Test', new Test(), ['notDefinedFunction'])
        } catch (error) {
            expect((error as Error).message).toBe(`Test notDefinedFunction is required.`)
        }
    })
})
