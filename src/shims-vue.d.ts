declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>;
    export default component;
}

declare module 'nprogress' {
    const nprogress: any;
    export default nprogress;
}
