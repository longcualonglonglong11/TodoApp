import { createStore, combineReducers, applyMiddleware } from "redux";
import todoReducer from "../reducer/reducer.js";
import { reducerDetail } from "../reducer/reducer";
const reducer = combineReducers({
  todos: todoReducer,
  detail: reducerDetail,
});
const myMiddleware = store => next => action => {
  if(action.type === "ADD" && action.data === 'Sleep'){
    action.data = 'No please learn English, not sleep'
  }
  return next(action)
}
export default  createStore(
  reducer, /* preloadedState, */
  applyMiddleware(myMiddleware),
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
 );
