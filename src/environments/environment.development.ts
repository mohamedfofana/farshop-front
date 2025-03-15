export const environment = {
  production: false,
  ssrIgnoresSsl: true,
  CRYPTO_JS_SECRET_KEY: '@for_test_purpose',
  API_AUTH_ENDPOINT: 'http://localhost:8080/api/auth',
  API_PUBLIC_ENDPOINT: 'http://localhost:8080/api/public',
  API_SECURED_ENDPOINT: 'http://localhost:8080/api/private',
  auth0: {
    clientId: 'pEEM1rRsbCYxUKRWPooPr2veUv3DpeXk', //'${process.env['AUTH0_DOMAIN']}',
    domain: 'dev-5bq3tuoo05ke5a18.us.auth0.com', //'${process.env['AUTH0_CLIENT_ID']}',
    authorizationParams: {
      scope: 'openid profile email',
      audience: 'https://dev-5bq3tuoo05ke5a18.us.auth0.com/api/v2/',
      redirect_uri: 'https://localhost:4200/callback', //'${process.env['AUTH0_CALLBACK_URL']}',
    },
    errorPath: '/callback',
  },
  stripe: {
    PUBLIC_KEY:
      'pk_test_51QySW9DA6ks8j7NZx1B635WkMePpC1o4HjVnjFWB8Qkl4m29CRYamxVySHLfL6rgNFUslXmd5V3dl0hP8tHZuM8T009Z5YNMLs',
    CLIENT_SECRET:
      'sk_test_51QySW9DA6ks8j7NZ7brcM3mVlZltIC4HExHEft1QjVzyO0agyOwTPC7QAMICNifB4WzTTjGvQOmBoq9FgIxVii52007NMLor2c',
  },
};
