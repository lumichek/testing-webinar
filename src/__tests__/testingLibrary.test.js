import React from 'react';
import '@testing-library/jest-dom';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history'
import {render, screen, cleanup} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import store from "../store/store";
import Header from '../components/Header';

describe('check header component', () => {
  afterEach(cleanup);

  test('should has img with logo class', () => {
    const history = createMemoryHistory();

    render(
      <Router history={history}>
        <Provider store={store}>
          <Header/>
        </Provider>
      </Router>
    );

    const img = screen.getByAltText('Логотип проекта Mesto');

    expect(img).toHaveClass('logo');
  });

  test('should has login element', () => {
      const history = createMemoryHistory();

      history.push('/signin');

      render(
        <Router history={history}>
          <Provider store={store}>
            <Header/>
          </Provider>
        </Router>
      );

      const element = screen.getByTestId('link-signin-element');

      userEvent.click(element);

      expect(screen.getByTestId('link-signup-element')).toHaveTextContent('Войти');
  });

  test('should be equal to snapshot', () => {
      const history = createMemoryHistory();
      history.push('/signin')
      const {asFragment} = render(
        <Router history={history}>
          <Provider store={store}>
            <Header/>
          </Provider>
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
  });
});
