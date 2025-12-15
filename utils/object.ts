export function functionExists(object: NonNullable<unknown>, method: string): boolean {
    if (typeof object !== 'object' || object === null) return false

    const candidate = object as Record<string, unknown>
    return method in candidate && typeof candidate[method] === 'function'
}