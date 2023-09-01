import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

const tokenString = 'token';

const saveToken = token => {
  return new Promise(function (resolve, reject) {
    RNSecureKeyStore.set(tokenString, token, {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    }).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      },
    );
  });
};

const retrieveToken = () => {
  return new Promise(function (resolve, reject) {
    RNSecureKeyStore.get(tokenString).then(
      token => {
        resolve(token);
      },
      () => {
        resolve(null);
      },
    );
  });
};

const deleteToken = () => {
  return new Promise(function (resolve, reject) {
    // Remove token from axios headers
    // removeToken();
    RNSecureKeyStore.remove(tokenString).then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      },
    );
  });
};

export default {
  saveToken,
  retrieveToken,
  deleteToken,
};
