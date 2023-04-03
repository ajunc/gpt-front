var getters = {
    isLogin: state => state.app.isLogin,
    conversation_id: state => state.app.conversation_id,
    userInfo: state => state.app.userInfo,
    chartList: state => state.app.chartList,
    chatListLeft: state => state.app.chatListLeft
}
export default getters
