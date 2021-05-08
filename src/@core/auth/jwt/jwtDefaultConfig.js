export default {
  // Endpoints
  // loginEndpoint: '/jwt/login',
  // registerEndpoint: '/jwt/register',
  // refreshEndpoint: '/jwt/refresh-token',
  // logoutEndpoint: '/jwt/logout',

  loginEndpoint: process.env.VUE_APP_ROOT_API + 'login',
  registerEndpoint: process.env.VUE_APP_ROOT_API + 'register',
  forgotPassword: process.env.VUE_APP_ROOT_API + 'forgot-password',
  refreshEndpoint: process.env.VUE_APP_ROOT_API + 'refresh-token',
  logoutEndpoint: process.env.VUE_APP_ROOT_API + 'logout',

  // This will be prefixed in authorization header with token
  // e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken',
}
