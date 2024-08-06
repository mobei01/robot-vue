import { useUserStore } from '@/store/user';
import { useAxios } from '@vueuse/integrations/useAxios';
import axios, { AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';

// create an axios instance
const instance = axios.create({
  withCredentials: false,
  timeout: 5000
});

const userStore = useUserStore();

// request interceptor
instance.interceptors.request.use(
  (config) => {
    // do something before request is sent
    const token = userStore.userData.token;
    if (token) {
      // let each request carry token
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data;
    console.log('res', res, response);

    // if the custom code is not 200, it is judged as an error.
    if (response.status !== 200) {
      ElMessage.error(res.msg);

      return Promise.reject(res.msg || 'Error');
    } else {
      return response;
    }
  },
  (error) => {
    console.log('err' + error);
    ElMessage.error(error.message);
    return Promise.reject(error.message);
  }
);

/**
 * reactive useFetchApi
 */

export default function useAxiosApi(url: string, config: AxiosRequestConfig) {
  return useAxios(url, config, instance);
}
