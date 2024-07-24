import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    counter: 0,
    userData: {
      token: '1'
    }
  }),
  getters: {
    // 自动将返回类型推断为数字
    doubleCount(state) {
      return state.counter * 2;
    },
    // 返回类型必须明确设置
    doublePlusOne(): number {
      return this.counter * 2 + 1;
    }
  },
  actions: {
    increment() {
      this.counter++;
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random());
    },
    async loginPassword(login: string, password: string) {
      return new Promise<void>((resolve, reject) => {
        try {
          // this.userData = await api.post({ login, password });
          console.log(login, password);
          resolve();
        } catch (error) {
          reject();
        }
      });
    },
    async registerUser(login: string, password: string) {
      return new Promise<void>((resolve, reject) => {
        try {
          // this.userData = await api.post({ login, password });
          console.log(login, password);
          resolve();
        } catch (error) {
          reject();
        }
      });
    }
  }
});
