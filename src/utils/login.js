export const isLoginFn = () => {
    let uname = window.localStorage.getItem('uname')
    let token = window.localStorage.getItem('token')
    if(uname && token) {
        return true
    }
    return false
}