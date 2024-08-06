<template>
  <div>
    <el-button type="primary" class="mb-2 mt-2" @click="showAddDialog = true">
      新增文章
    </el-button>

    <el-table :data="currentLinks" border style="width: 100%">
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="url" label="链接" />
      <el-table-column fixed="right" label="操作">
        <template #default="{ row }">
          <el-button size="small" type="text" @click="showPushDialog(row, 0)">
            推送文案
          </el-button>
          <el-button size="small" type="text" @click="showPushDialog(row, 1)">
            默认推送
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="total, prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="fetchList"
      class="mb-2 mt-2 flex justify-end"
    />

    <!-- 新增链接弹窗 -->
    <el-dialog v-model="showAddDialog" title="新增链接">
      <el-form :model="addForm" :rules="addRules" ref="addFormRef">
        <el-form-item prop="title">
          <el-input v-model="addForm.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item prop="url">
          <el-input v-model="addForm.url" placeholder="请输入链接"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="addLink">确定</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 推送文案弹窗 -->
    <el-dialog v-model="showPushDialogVisible" title="推送文案">
      <el-form :model="pushForm" :rules="pushRules" ref="pushFormRef">
        <el-form-item prop="description">
          <el-input
            v-model="pushForm.description"
            placeholder="请输入描述"
          ></el-input>
        </el-form-item>
        <el-form-item prop="picurl">
          <el-input
            v-model="pushForm.picurl"
            placeholder="请输入图片链接"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPushDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="pushContent">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';

import { getArticleList, saveArticle, sendNewsApi } from '@/api/article';

const currentPage = ref(1);
const pageSize = ref(10);
const total = ref(0);
const currentLinks = ref([]);

const addForm = ref({ title: '', url: '' });
const addRules = reactive({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  url: [{ required: true, message: '请输入链接', trigger: 'blur' }]
});
const addFormRef = ref();
const showAddDialog = ref(false);

const pushForm = ref({ description: '', picurl: '' });
const pushRules = reactive({
  description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
  picurl: [{ required: true, message: '请输入图片链接', trigger: 'blur' }]
});
const pushFormRef = ref();
const showPushDialogVisible = ref(false);
let selectedRow = ref<any>(null);

const fetchList = async (page: number = currentPage.value) => {
  const { data } = await getArticleList({
    page,
    pageSize: pageSize.value
  });
  const { lists, total: totalCount } = data.value;
  currentLinks.value = lists || [];
  total.value = totalCount || 0;
};

const addLink = () => {
  addFormRef.value.validate(async (valid: any) => {
    if (valid) {
      const { error } = await saveArticle(addForm.value);
      if (error) {
        ElMessage.error('保存失败');
        return;
      }
      ElMessage.success('保存成功');
      addFormRef.value.resetFields();
      showAddDialog.value = false;
      fetchList(currentPage.value);
    }
  });
};

const showPushDialog = (row: any, type: number) => {
  selectedRow.value = row;
  if (type === 1) {
    sendNews();
    return;
  }
  showPushDialogVisible.value = true;
};

const pushContent = async () => {
  pushFormRef.value.validate(async (valid: any) => {
    if (valid) {
      sendNews();
    }
  });
};
const sendNews = async () => {
  const { url, title } = selectedRow.value || {};

  const payload = {
    ...pushForm.value,
    url,
    title
  };
  const { error } = await sendNewsApi(payload);
  if (error) {
    ElMessage.error('推送失败');
    return;
  }
  ElMessage.success('推送成功');
  pushFormRef.value?.resetFields?.();
  showPushDialogVisible.value = false;
};

onMounted(() => {
  fetchList(currentPage.value);
});
</script>
