import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {ActionTypes, register} from '../store/auth/actions';
import reducer from '../store/auth/reducer';
import * as authApi from "../utils/auth-api";

describe('check redux store and actions', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(
        { result: 'OK' }
      ),
      ok: true,
    });
  });

  afterEach(() => {
      jest.restoreAllMocks();
  });

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

  test('should fire 3 actions after register is dispatched', () => {
    const middlewares = [thunk.withExtraArgument({authApi})]
    const mockStore = configureMockStore(middlewares)

    fetch.mockImplementationOnce(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: 'OK' }),
    }));

    const expectedActions = [
      {type: ActionTypes.SET_REGISTER_SENDING, payload: true},
      {type: ActionTypes.SET_REGISTER_SEND_ERROR, payload: ''},
      {type: ActionTypes.SET_REGISTER_SENDING, payload: false},
    ];

    const store = mockStore({});

    return store.dispatch(register({email: 'email', password: 'password'}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      });
  });
});