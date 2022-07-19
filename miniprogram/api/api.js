
const baseUrl = 'https://yuque.com'

// 获取天气api
const weatherApi = 'https://restapi.amap.com/v3/weather/weatherInfo'

//首页
const getArticleList = `${baseUrl}/api/v2/repos/anfou-xhouv/hrmohr/docs` // 获取文章列表

// 文章详情
const articleDetail = `${baseUrl}/api/v2/repos/namespace/docs/` // 获取文章列表

// 专题
const sortList = `${baseUrl}/api/v2/users/anfou-xhouv/repos/` // 获取专题列表


module.exports = {
    baseUrl,
    getArticleList,
    articleDetail,
    sortList,
    weatherApi
}