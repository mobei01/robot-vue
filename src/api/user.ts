import useAxiosApi from '@/composables/useAxiosApi';
const urlPrefix = import.meta.env.VITE_URL_PREFIX;

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword(data: AnyObject) {
  return useAxiosApi(`${urlPrefix}/login/password`, { method: 'POST', data });
}

/**
 * 普通用户注册
 * @returns UseAxiosReturn
 */
export function readerRegister(data: AnyObject) {
  return useAxiosApi(`${urlPrefix}/user/reader/register`, {
    method: 'POST',
    data
  });
}

/**
 * 获取用户资料
 * @returns UseAxiosReturn
 */
export function userGet(params: AnyObject) {
  return useAxiosApi(`${urlPrefix}/user/get`, { method: 'GET', params });
}

export function codeGet(params: AnyObject) {
  return useAxiosApi(`${urlPrefix}/user/get`, { method: 'GET', params });
}
