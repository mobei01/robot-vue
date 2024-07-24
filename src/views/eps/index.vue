<script lang="ts" setup>
// @ts-ignore
// prettier-ignore
import { TUICallKit, TUICallKitServer, VideoDisplayMode, VideoResolution, TUICallType } from '@tencentcloud/call-uikit-vue';
import { getEpsInfoByToken } from '@/api/eps';
import type { epsInfoResponse } from '@/api/types/eps';

import callImg from '@/assets/eps/call.png';

const callUrl = ref<string>(callImg);
let epsInfo = ref<epsInfoResponse | undefined>(undefined);

const route = useRoute();

let userID = '';
let callUserID = '';
let roomID = 0;
let isCallClient = false;

onMounted(async () => {
  isCallClient = false;
  const token = route.query.token as string;
  const { data } = await getEpsInfoByToken({
    token,
    requestType: 'GET_INFO_BY_TOKEN'
  });
  epsInfo.value = data.value;
  const info = data.value!;

  const { trtcSdkAppId: SDKAppID, trtcUserSig: userSig } = info;
  userID = info?.clientType === '1' ? info?.storeUserId : info?.druggistId;
  callUserID = info?.clientType === '1' ? info?.druggistId : info?.storeUserId;
  roomID = info?.roomId;

  await init(SDKAppID, userID, userSig);
});

async function init(SDKAppID: number, userID: string, userSig: string) {
  try {
    await TUICallKitServer.init({ SDKAppID, userID, userSig });
    console.log('初始化完成');
  } catch (error: any) {
    console.log(`初始化失败，原因：${error}`);
  }
}

async function call() {
  try {
    await TUICallKitServer.call({
      userID: callUserID,
      type: TUICallType.VIDEO_CALL,
      roomID
    });
    isCallClient = true;
  } catch (error: any) {
    isCallClient = false;
  }
}

function statusChange(e: { newStatus: string }) {
  const { newStatus } = e!;
  if (newStatus === 'calling-c2c-video' && isCallClient) {
    const token = route.query.token as string;
    getEpsInfoByToken({ token, requestType: 'MCU_MIX_TRAN_BY_TOKEN' });
  }
}
</script>

<template>
  <div>
    <div class="desc">
      <p>老百姓大药房远程审方（{{ epsInfo?.clientTypeName }}）</p>
      <p>本次远程审方的处方编号为：{{ epsInfo?.tradeNo }}</p>
      <p>审方药师：{{ epsInfo?.druggistName }}</p>
      <p>患者姓名：{{ epsInfo?.patient }} </p></div
    >

    <div class="callKit">
      <div @click="call()" class="callKit-call">
        <img :src="callUrl" />
        <div class="text-[16px] mt-[10px]">发起视频通话</div>
      </div>
      <TUICallKit
        :status-changed="statusChange"
        :allowedMinimized="true"
        :allowedFullScreen="true"
        :videoDisplayMode="VideoDisplayMode.CONTAIN"
        :videoResolution="VideoResolution.RESOLUTION_1080P"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.desc {
  text-align: center;
}
.callKit {
  width: 800px;
  height: 560px;
  position: relative;
  border-radius: 10px;
  background-color: #50556b;
  margin: auto;
  &-call {
    font-size: 20px;
    color: #fff;
    position: absolute;
    bottom: 160px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    cursor: pointer;
    img {
      width: 60px;
      height: 60px;
    }
  }
}
</style>
