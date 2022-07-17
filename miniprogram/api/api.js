// 我的
const login = '/user/login' // 登录

//首页
const getArticleList = '/api/v2/repos/anfou-xhouv/hrmohr/docs' // 获取文章列表

// 文章详情
const articleDetail = '/api/v2/repos/namespace/docs/' // 获取文章列表

// 专题
const sortList = '/api/v2/users/anfou-xhouv/repos/' // 获取专题列表
const sortDetailList = '/api/v2/repos/id/docs' // 获取专题下的文章列表


module.exports = {
    login,
    getArticleList,
    articleDetail,
    sortList
}