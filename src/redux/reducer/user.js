import {
  LOGIN_USER_START,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  GET_CREW_RIDES_START,
  GET_CREW_RIDES_SUCCESS,
  GET_CREW_RIDES_FAILURE,
  UPDATE_RIDE_STATUS_FAILURE,
  UPDATE_RIDE_STATUS_START,
  UPDATE_RIDE_STATUS_SUCCESS,
  GET_USER_START,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from '../type';

const initialState = {
  IsUserLoggedIn: false,
  user: {},
  getCrewRidesList: {},
  updatedData: {},
  IsAppLoading: false,
};

export default function updateuser(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_START:
      return Object.assign({}, state, {
        user: {},
        IsUserLoggedIn: false,
        IsAppLoading: true,
      });
    case LOGIN_USER_SUCCESS:
      return Object.assign({}, state, {
        user: action.payload,
        IsUserLoggedIn: true,
        IsAppLoading: false,
      });
    case LOGIN_USER_FAILURE:
      return Object.assign({}, state, {
        user: {},
        IsUserLoggedIn: false,
        IsAppLoading: false,
      });
    case GET_CREW_RIDES_START:
      return Object.assign({}, state, {
        getCrewRidesList: {},
        IsAppLoading: true,
      });
    case GET_CREW_RIDES_SUCCESS:
      return Object.assign({}, state, {
        getCrewRidesList: action.payload,
        IsAppLoading: false,
      });
    case GET_CREW_RIDES_FAILURE:
      return Object.assign({}, state, {
        getCrewRidesList: {},
        IsAppLoading: false,
      });
    case UPDATE_RIDE_STATUS_START:
      return Object.assign({}, state, {
        updatedData: {},
        IsAppLoading: true,
      });
    case UPDATE_RIDE_STATUS_SUCCESS:
      return Object.assign({}, state, {
        updatedData: action.payload,
        getCrewRidesList: {
          ...state.getCrewRidesList,
          rides: [...state.getCrewRidesList?.rides, action.payload.ride],
        },
        IsAppLoading: false,
      });
    case UPDATE_RIDE_STATUS_FAILURE:
      return Object.assign({}, state, {
        updatedData: {},
        IsAppLoading: false,
      });
      case GET_USER_START:
        return Object.assign({}, state, {
          user: {},
          IsAppLoading: true,
        });
      case GET_USER_SUCCESS:
        return Object.assign({}, state, {
          user: action.payload,
          IsAppLoading: false,
        });
      case GET_USER_FAILURE:
        return Object.assign({}, state, {
          user: {},
          IsAppLoading: false,
        });
    default:
      return initialState;
  }
}
