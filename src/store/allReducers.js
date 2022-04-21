import {combineReducers} from 'redux';
import BookDetailReducer from '../screens/DetailBooks/redux/reducer';
import HomeReducer from '../screens/Home/redux/reducer';
import LoginReducer from '../screens/Login/redux/reducer';
import RegisterReducer from '../screens/Register/redux/reducer';
import {globalReducer} from './globalReducer';

export const allReducers = combineReducers({
  login: LoginReducer,
  home: HomeReducer,
  register: RegisterReducer,
  bookdetail: BookDetailReducer,
  Global: globalReducer,
});
