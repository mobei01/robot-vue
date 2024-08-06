import useAxiosApi from '@/composables/useAxiosApi';
import type { UseAxiosReturn } from '@vueuse/integrations/useAxios';
const urlPrefix = import.meta.env.VITE_URL_PREFIX;

/**
 * 获取文章列表
 * @returns UseAxiosReturn
 */
export const getArticleList = (params: {
  page: number;
  pageSize: number;
}): UseAxiosReturn<any> => {
  return useAxiosApi(`${urlPrefix}/api/page/getArticleList`, {
    method: 'GET',
    params
  });
};

/**
 * 保存文章
 * @returns UseAxiosReturn
 */
export function saveArticle(data: { title: string; url: string }) {
  return useAxiosApi(`${urlPrefix}/api/page/saveArticle`, {
    method: 'POST',
    data
  });
}

/**
 * 推送文章
 * @returns UseAxiosReturn
 */
export function sendNewsApi(data: AnyObject) {
  return useAxiosApi(`${urlPrefix}/api/wechat/sendNews`, {
    method: 'POST',
    data
  });
}

export function codeGet(params: AnyObject) {
  return useAxiosApi(`${urlPrefix}/user/get`, { method: 'GET', params });
}
