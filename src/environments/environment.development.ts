export const environment = {
  production: false,
  ssrIgnoresSsl: true,
  CRYPTO_JS_SECRET_KEY: '@for_test_purpose',
  API_AUTH_ENDPOINT: 'https://localhost:8080/api/auth',
  API_WHITE_LIST_ENDPOINT: 'https://localhost:8080/api/wl',
  API_SECURED_ENDPOINT: 'https://localhost:8080/api',
  auth0: {
    clientId: 'pEEM1rRsbCYxUKRWPooPr2veUv3DpeXk', //'${process.env['AUTH0_DOMAIN']}',
    domain: 'dev-5bq3tuoo05ke5a18.us.auth0.com', //'${process.env['AUTH0_CLIENT_ID']}',
    authorizationParams: {
      redirect_uri: 'https://localhost:4200/callback', //'${process.env['AUTH0_CALLBACK_URL']}',
    },
    errorPath: '/callback',
  },
};
