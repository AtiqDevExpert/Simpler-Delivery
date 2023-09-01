import axios from 'axios';
import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  GET_CREW_RIDES_START,
  GET_CREW_RIDES_SUCCESS,
  GET_CREW_RIDES_FAILURE,
  LOGOUT,
  UPDATE_RIDE_STATUS_START,
  UPDATE_RIDE_STATUS_SUCCESS,
  UPDATE_RIDE_STATUS_FAILURE,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../type';
import { GET_USER_URL, LOGIN_URL, UPDATE_STATUS_URL } from '../../api/apiconstants';
import TokenManager from '../../utils/TokenManager';
import { GET_CREWRIDE_URL } from '../../api/apiconstants';
import { request } from '../../utils/http';
import moment from 'moment';
import qs from 'qs';

export const LoginUserAPI = IncomingData => {
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  //   const body = IncomingData;
  // const body = {
  //   email: 'demo@minimals.cc',
  //   pinCode: '805097',
  // };
  console.log('API Body --> ', IncomingData);
  console.log(`${'API URL Called --> ' + LOGIN_URL}`);

  return (dispatch, getState) => {
    dispatch({ type: LOGIN_USER_START });
    axios
      .post(`${LOGIN_URL}`, qs.stringify(IncomingData), config)
      .then(async response => {
        await TokenManager.saveToken(response.headers['x-auth-token']);
        request.defaults.headers['x-auth-token'] =
          response.headers['x-auth-token'];
        dispatch({ type: LOGIN_USER_SUCCESS, payload: response.user });
      })
      .catch(error => {
        dispatch({ type: LOGIN_USER_FAILURE });
      });
  };
};

export const GetCrewRideAPI = payload => {
  return (dispatch, getState) => {
    dispatch({ type: GET_CREW_RIDES_START });
    request
      .get(
        `${GET_CREWRIDE_URL}?date=${moment(new Date()).format('YYYY-MM-DD')}`,
      )
      .then(response => {
        // console.log(`With Date Responce ====>`, response.data)
        dispatch({ type: GET_CREW_RIDES_SUCCESS, payload: response.data });
      })
      .catch(error => {
        // console.log("Without Date Responce ===>", error)
        dispatch({ type: GET_CREW_RIDES_FAILURE, payload: error });
      });
  };
};

export const GetUserAPI = payload => {
  return (dispatch, getState) => {
    dispatch({ type: GET_USER_START });
    request
      .get(
        `${GET_USER_URL}`,
      )
      .then(response => {
        dispatch({ type: GET_USER_SUCCESS, payload: response.data });
      })
      .catch(error => {
        dispatch({ type: GET_USER_FAILURE, payload: error });
      });
  };
};


export const UpdateRideStatusAPI = (payload = {}) => {
  const navigation = payload.navigation;
  const status = payload.status;
  delete payload.navigation;
  return (dispatch, getState) => {
    dispatch({ type: UPDATE_RIDE_STATUS_START });
    request
      .patch(`${UPDATE_STATUS_URL}`, payload)
      .then(response => {
        dispatch({ type: GET_CREW_RIDES_START });
        dispatch({ type: UPDATE_RIDE_STATUS_SUCCESS, payload: response.data });

        if (status === 'completed') navigation.navigate('Home');
      })
      .catch(error => {
        dispatch({ type: UPDATE_RIDE_STATUS_FAILURE, payload: error });
      });
  };
};

export const LogOutAPI = () => {
  return (dispatch, getState) => {
    TokenManager.deleteToken();
    dispatch({ type: LOGOUT });
  };
};
