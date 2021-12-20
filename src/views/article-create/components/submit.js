import { ElMessage } from 'element-plus'
import { createArticleApi, editArticleApi } from '@/api/article'
import router from '@/router'

export default async (editor, title, detail) => {
  // 判断标题: 没有标题不能提交
  if (!title.value) {
    return ElMessage.warning('请输入标题')
  }
  // 请求参数 (标题,内容,文章_id)
  // 注意: 当前是编辑文章才需要携带文章_id
  const params = {}
  params.title = title.value
  params.content = editor.getHTML()
  // 判断: 通过detail的id判断当前是编辑文章还是新建文章
  if (detail && detail._id) {
    // api 编辑文章
    params.id = detail._id
    await editArticleApi(params)
    return ElMessage.success('编辑成功')
  } else {
    // api 创建文章
    await createArticleApi(params)
    ElMessage.success('创建成功')
  }
}
