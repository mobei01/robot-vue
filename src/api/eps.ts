import useAxiosApi from '@/composables/useAxiosApi';
import type { UseAxiosReturn } from '@vueuse/integrations/useAxios';
import type { epsInfoResponse, epsInfoParams } from './types/eps';

const urlPrefix = import.meta.env.VITE_EPS_URL;

/**
 * 获取用户资料 requestType = GET_INFO_BY_TOKEN
 * 视频录制 requestType = MCU_MIX_TRAN_BY_TOKEN
 * @returns UseAxiosReturn
 */
export const getEpsInfoByToken = (
  data: epsInfoParams
): UseAxiosReturn<epsInfoResponse> => {
  return useAxiosApi(`${urlPrefix}/lbx-ms-prescription-router/eps/callVideo`, {
    method: 'post',
    data
  });
};
