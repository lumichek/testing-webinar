import {ActionTypes} from '../store/auth/actions';
import reducer from '../store/auth/reducer';

describe('check redux store and actions', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        authChecking: true,
        data: null,
        loginError: '',
        loginSending: false,
        registerError: '',
        registerSending: undefined
      }
    );
  });

  test('should return state with loginError after login error action', () => {
    const errorMessage = 'Error message';
    const action = {
      type: ActionTypes.SET_LOGIN_SEND_ERROR,
      payload: errorMessage
    };

    expect(reducer(undefined, action)).toEqual(
      {
        authChecking: true,
        data: null,
        loginError: errorMessage,
        loginSending: false,
        registerError: '',
        registerSending: false
      }
    );
  });
});