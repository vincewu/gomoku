import { BLACK, TOGGLE, WHITE } from '../types';
import { combineReducers } from 'redux';
import gomoku from './gomoku';
import winner from './winner';
import machineGo from './machineGo';

const turn = (state = BLACK, action) => {
  switch(action.type) {
    case TOGGLE:
      return state === BLACK ? WHITE : BLACK;
    default:
      return state;
  }
};


export default combineReducers({
  gomoku,
  turn,
  winner,
  machineGo
});