export interface epsInfoResponse {
  trtcSdkAppId: number;
  trtcUserSig: string;
  roomId: number;
  clientType: string;
  clientTypeName: string;
  tradeNo: string;
  patient: string;
  storeUserId: string;
  storeUserName: string;
  druggistId: string;
  druggistName: string;
  [key: string]: any;
}

export interface epsInfoParams {
  token: string;
  requestType: 'GET_INFO_BY_TOKEN' | 'MCU_MIX_TRAN_BY_TOKEN';
}
