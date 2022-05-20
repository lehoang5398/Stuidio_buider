import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage';
import LoginPage from 'containers/LoginPage';

import r from './routes';

export default [
  {
    exact: true,
    path: r.HOME,
    component: HomePage,
  },
  {
    path: r.LOGIN,
    component: LoginPage,
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
