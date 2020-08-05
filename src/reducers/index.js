import { combineReducers } from 'redux'
import tableReducer from '../features/table/tableSlice';
import menuReducer from '../features/menu/menuSlice';

export default combineReducers({
  table: tableReducer,
  menu: menuReducer,
})

