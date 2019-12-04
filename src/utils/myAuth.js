

const TokenKey = 'vue_admin'

export function getToken() {
    var rsObj = window.localStorage.getItem(TokenKey)
    if (!rsObj || rsObj == 'undefind') {
        return null
    } else {
        return JSON.parse(rsObj)
    }
}

export function setToken(token) {
    var tokenStr = JSON.stringify(token)
    window.localStorage.setItem(TokenKey, tokenStr)
}

export function removeToken() {
    return window.localStorage.clear(TokenKey)
}
