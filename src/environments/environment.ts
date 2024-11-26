export const environment = {
  production: false,
  ssrIgnoresSsl: false,
  API_AUTH_ENDPOINT: '',
  API_WHITE_LIST_ENDPOINT: '',
  API_SECURED_ENDPOINT: '',
  auth0: {
    domain: '', //'${process.env['AUTH0_DOMAIN']}',
    clientId: '', //'${process.env['AUTH0_CLIENT_ID']}',
    authorizationParams: {
      redirect_uri: '', //'${process.env['AUTH0_CALLBACK_URL']}',
    },
    errorPath: '',
  },
};
