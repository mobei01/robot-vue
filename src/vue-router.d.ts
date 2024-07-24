import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    // 默认 false，设置 true 的时候该路由不会在侧边栏出现
    hidden?: boolean;

    // 设置该路由在侧边栏和面包屑中展示的名字
    title?: string;

    // 返回地址，返回路径
    backPath?: string;

    // 是否设置页面key
    usePathKey?: boolean;

    /**
     * 是否缓存该路由页面
     * 默认为 false，为 true 时代表需要缓存，此时该路由和该页面都需要设置一致的 Name
     */
    keepAlive?: boolean;
  }
}
