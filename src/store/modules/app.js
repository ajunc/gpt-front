const app = {
    state: {
        isLogin: false,
        userInfo: {
            uName: '',
            uId: '',
            remaining_words: 0,
            remaining_images: 0
        },
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
    },
    actions: {
        HandleIslogin ({commit}, isLogin) {
            commit('HANDLE_ISLOGIN', isLogin)
        },
        HandleUserInfo ({commit}, userInfoObj) {
            commit('HANDLE_USERINFO', userInfoObj)
        },
    }
}

export default app
