const app = {
    state: {
        isLogin: false,
        userInfo: {
            uName: '',
            uId: '',
            remaining_words: 0,
            remaining_images: 0
        },
        conversation_id: '',
        chartList: [],
        chatListLeft: []
    },
    mutations: {
        HANDLE_USERINFO: (state, userInfoObj) => {
            userInfoObj.uName && (state.userInfo.uName = userInfoObj.uName)
            userInfoObj.uId && (state.userInfo.uId = userInfoObj.uId)
            state.userInfo.remaining_words = userInfoObj.remaining_words,
            state.userInfo.remaining_images = userInfoObj.remaining_images
        },
        HANDLE_ISLOGIN: (state, isLogin) => {
            state.isLogin = isLogin
        },
        HANDLE_CONVERSATION_ID: (state, id) => {
            state.conversation_id = id
        },
        ADD_CHAT_LIST: (state, item) => {
            state.chartList.push(item)
        },
        CLEAR_CHAT_LIST: (state, item) => {
            state.chartList = [item]
        },
        INIT_AND_ADD_CHAT_LIST: (state, arr) => {
            state.chatListLeft = arr
        },
    },
    actions: {
        HandleIslogin ({commit}, isLogin) {
            commit('HANDLE_ISLOGIN', isLogin)
        },
        HandleUserInfo ({commit}, userInfoObj) {
            commit('HANDLE_USERINFO', userInfoObj)
        },
        SaveConversationId ({commit}, id) {
            commit('HANDLE_CONVERSATION_ID', id)
        },
        AddChatList ({commit}, item) {
            commit('ADD_CHAT_LIST', item)
        },
        ClearChatList ({commit}, item) {
            commit('CLEAR_CHAT_LIST', item)
        },
        InitAndAddChatList ({commit}, item) {
            commit('INIT_AND_ADD_CHAT_LIST', item)
        },
    }
}

export default app
