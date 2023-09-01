import axios from 'axios';
import {API_URL} from '../api/apiconstants';
import TokenManager from '../utils/TokenManager';

const APP_PLATFORM = 'Mobile';

export const request = axios.create({
  headers: {
    app_platform: APP_PLATFORM,
  },
});

async function getToken() {
  return TokenManager.retrieveToken();
}

export function removeToken() {
  delete request.defaults.headers.Authorization;
}

export async function setupHttpConfig() {
  // await TokenManager.deleteToken();
  request.defaults.baseURL = API_URL;
  // request.defaults.timeout = appConfig.defaultTimeout;
  // axios.defaults.headers['Content-Type'] = 'application/json';
  const token = await getToken();
  if (token) {
    request.defaults.headers['x-auth-token'] = `${token}`;
  }
}
