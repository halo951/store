export {}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $store: any
    }
}
