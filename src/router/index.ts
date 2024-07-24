import { useTitle } from '@vueuse/core';
import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
  Router
} from 'vue-router';
import routes from './routes';

import type { RouterScrollBehavior } from 'vue-router';

const { VITE_TITLE } = import.meta.env;

const scrollBehavior: RouterScrollBehavior = function (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  savedPosition: Record<string, any> | null
) {
  if (savedPosition) {
    // savedPosition is only available for popstate navigations.
    return savedPosition;
  } else {
    const position: Record<string, any> = {};

    // scroll to anchor by returning the selector
    if (to.hash) {
      position.el = to.hash;
      position.behavior = 'smooth';

      if (to.name == 'Item') {
        position.top = 200;
      }

      if (/^#\w/.test(to.hash) || document.querySelector(to.hash)) {
        return position;
      }

      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return false;
    }

    return new Promise((resolve) => {
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some((m) => m.meta.scrollToTop)) {
        // coords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.left = 0;
        position.top = 0;
      }

      resolve(position);
    });
  }
};

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
  scrollBehavior
});

// authList
const whiteList: Array<string> = ['user'];

router.beforeEach(async (to, from, next) => {
  // set title
  useTitle((to.meta?.title as string) || (VITE_TITLE as string));

  // determine whether the user has logged in
  const hasToken = true;
  if (hasToken) {
    // 已登录后访问登录页，重定向首页
    to.name == 'Login' ? next('/') : null;
    next();
  } else {
    // has no token
    if (whiteList.indexOf(to.name as string) != -1) {
      //public page  go directly
      next();
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next({ name: 'Login', query: { redirect: to.fullPath } });
    }
  }
});

export function routerPush(to: RouteLocationRaw) {
  router.push(to);
}

export function routerReplace(to: RouteLocationRaw) {
  router.replace(to);
}

export function routerBack() {
  router.back();
}

export function routerForward() {
  router.forward();
}

export function routerGo(delta: number) {
  router.go(delta);
}

export default router;
