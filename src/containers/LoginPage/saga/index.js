import { call, takeLatest, put, select, delay } from 'redux-saga/effects';
import RepositoryFactory from 'repositories/RepositoryFactory';
import history from 'utils/history';
import routes from 'containers/App/routes';
import {
  setAccessToken,
  setRefreshToken,
  setUser,
} from 'containers/App/actions';
import toast from 'react-hot-toast';
import { LOGIN, REQUEST_PRODUCTS, REGISTER } from '../constants';
import { setIsLoadingProducts, setProducts } from '../actions';

// Individual exports for testing
const ProductRepository = RepositoryFactory.get('product');
const AuthRepository = RepositoryFactory.get('auth');

function* signIn(payload) {
  try {
    const { name, email, password } = payload.payload;
    yield delay(200);
    yield call(AuthRepository.register, {
      name,
      email,
      password,
    });
    toast.success('Sign In Success', { icon: '👏' });
  } catch (error) {
    console.log(error);
    toast.error('Used or duplicate e-mail !');
  }
}

function* loginSaga(payload) {
  try {
    const { email, password } = payload.payload;
    yield delay(200);
    const response = yield call(AuthRepository.login, {
      email,
      password,
    });
    yield put(setUser(response?.user));
    yield put(setAccessToken(response?.tokens?.access));
    yield put(setRefreshToken(response?.tokens?.refresh));
    history.push(routes.HOME);
    toast.success('Login is Success', { icon: '👏' });
  } catch (error) {
    console.log(error);
    toast.error('Wrong Email or Password !');
  }
}

function* getProductSaga() {
  try {
    yield delay(500);
    yield put(setIsLoadingProducts(true));
    const LIMIT = 3;
    // const page = yield select(makeSelectPage());
    const response = yield call(ProductRepository.get, {
      page: 1,
      limit: LIMIT,
    });
    yield put(setProducts(response.data));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(setIsLoadingProducts(false));
  }
}

export default function* productSaga() {
  yield takeLatest(REQUEST_PRODUCTS, getProductSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(REGISTER, signIn);
}
