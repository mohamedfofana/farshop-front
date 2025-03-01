export const environment = {
  production: false,
  ssrIgnoresSsl: false,
  CRYPTO_JS_SECRET_KEY: '',
  API_AUTH_ENDPOINT: '',
  API_PUBLIC_ENDPOINT: '',
  API_SECURED_ENDPOINT: '',
  auth0: {
    domain: '', //'${process.env['AUTH0_DOMAIN']}',
    clientId: '', //'${process.env['AUTH0_CLIENT_ID']}',
    authorizationParams: {
      audience: '',
      scope: '',
      redirect_uri: '', //'${process.env['AUTH0_CALLBACK_URL']}',
    },
    errorPath: '',
  },
};
