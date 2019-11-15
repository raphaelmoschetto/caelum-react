import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { tweetsReducer } from './ducks/tweets';

const store = createStore(
    combineReducers({
        tweets: tweetsReducer,
    }),
    // FAZ VOCÊ PODER RETORNAR UMA FUNÇÃO NO SEU DISPATCH EM VEZ DE UM OBJETO
    applyMiddleware(thunkMiddleware),
);

console.log(`Primeira versão da store:`, store.getState());
export default store;