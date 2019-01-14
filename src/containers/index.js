import { connect } from 'react-redux';
import CanvasComponent from '../components';
import { setGo } from '../actions';
import { serializeSelector } from '../selectors';

const mapStateToProps = (state) => ({
  gomoku: state.gomoku,
  turn: state.turn,
  winner: state.winner,
  decodedGomoku: serializeSelector(state),
  machineGo: state.machineGo,
});

const mapDispatchToProps = (dispatch) => ({
  go: (x, y, color, gomoku) => {
    dispatch(setGo(x, y, color, gomoku));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CanvasComponent);