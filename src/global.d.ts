import CAvatar from '@/components/avatar';
// import { SetupContext } from 'vue';
declare global {
  // eslint-disable-next-line no-unused-vars
  interface AnyObject {
    [key: string]: any;
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    avatar: typeof CAvatar;
  }
}

export {};
