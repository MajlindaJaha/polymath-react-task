export const authUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user))
}

export const getAuthedUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export function isAuth() {
  const token = localStorage.getItem('user')
  if (!token) return false
  const decodedToken = JSON.parse(atob(token?.split('.')[1])) // decode the JWT payload
  const tokenExpirationTime = decodedToken.exp * 1000
  const currentTime = Date.now()
  if (currentTime < tokenExpirationTime) {
    return true
  }
  return false
}

export const unAuthUser = () => {
  localStorage.removeItem('user')
}

export function parseJwt(token) {
  var base64Url = token?.split('.')[1]
  var base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}
