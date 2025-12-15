export type DynamicRecord<B extends object, K extends keyof B | string, V> = B & {
    [key in (K extends keyof B ? never : string)]: K extends keyof B ? B[K] : V
}