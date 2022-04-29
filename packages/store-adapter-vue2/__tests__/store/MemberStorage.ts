/** mock storage */
export class MemoryStorage implements Storage {
    [name: string]: any
    length!: number

    clear(): void {
        for (const key of Object.getOwnPropertyNames(this)) {
            if (!['clear', 'length', 'getItem', 'key', 'removeItem', 'setItem'].includes(key)) {
                delete this[key]
            }
        }
    }
    getItem(key: string): string {
        return this[key] ?? undefined
    }

    key(index: number): string {
        // skip
        return ''
    }

    removeItem(key: string): void {
        delete this[key]
    }

    setItem(key: string, value: string): void {
        this[key] = value
    }
}
