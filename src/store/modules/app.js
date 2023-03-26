const app = {
    state: {
        userInfo: {
            isLogin: false,
            uName: '',
            uId: '',
            remaining: {
                remaining_words: 0,
                remaining_images: 0
            }
        },
    },
    mutations: {
        HANDLE_USERINFO: (state, isLogin) => {
            state.userInfo.isLogin = isLogin
        },
    },
    actions: {
        HandleIslogin ({commit}, {isLogin}) {
            commit('HANDLE_USERINFO', isLogin)
        },
    }
}

export default app
