import React from 'react';
import { GRID_SIZE, WHITE } from '../types';
import PropTypes from 'prop-types';

const MARGIN_LEFT = 30;
const MARGIN_TOP = 30;
const GAP_SIZE = 50;
const RADIUS = 20;

class CanvasComponent extends React.Component {

  componentDidMount() {
    const elem = this.refs.canvas;

    elem.addEventListener('click', e => {
      const pageX = e.pageX - MARGIN_LEFT;
      const pageY = e.pageY - MARGIN_TOP;

      for (let i = 0; i < GRID_SIZE; i++) {
        const y = i * GAP_SIZE;
        for (let j = 0; j < GRID_SIZE; j++) {
          const x = j * GAP_SIZE;
          if (pageX >= x - RADIUS && pageX < x + RADIUS && pageY >= y - RADIUS && pageY < y + RADIUS) {
            if (this.props.gomoku[i][j].color === null) {
              this.props.go(j, i, this.props.turn, this.props.gomoku);
            }
            return;
          }
        }
      }
    });

    this.updateCanvas();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateCanvas();
    if (this.props.turn === WHITE) {
      const {machineGo} = this.props;
      const {x, y} = machineGo;
      this.props.go(x, y, this.props.turn, this.props.gomoku);;
    }
  }

  updateCanvas = () => {
    const elem = this.refs.canvas;
    const ctx = elem.getContext('2d');

    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.fillRect(0, 0, GAP_SIZE * (GRID_SIZE - 1) + MARGIN_LEFT * 2, GAP_SIZE * (GRID_SIZE - 1) + MARGIN_TOP * 2);
    for (let i = 0; i < GRID_SIZE; i++) {
      ctx.moveTo(MARGIN_LEFT, MARGIN_TOP + i * GAP_SIZE);
      ctx.lineTo(MARGIN_LEFT + GAP_SIZE * (GRID_SIZE - 1), MARGIN_TOP + i * GAP_SIZE);
      ctx.moveTo(MARGIN_LEFT + i * GAP_SIZE, MARGIN_TOP);
      ctx.lineTo(MARGIN_LEFT + i * GAP_SIZE, MARGIN_TOP + GAP_SIZE * (GRID_SIZE - 1));
    }

    ctx.stroke();

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        if (this.props.gomoku[i][j].color !== null) {
          ctx.beginPath();
          ctx.fillStyle = this.props.gomoku[i][j].color;
          ctx.arc(MARGIN_LEFT + j * GAP_SIZE, MARGIN_TOP + i * GAP_SIZE, RADIUS, 0, 2 * Math.PI);
          ctx.closePath();
          ctx.fill();
        }
      }
    }

    if (this.props.winner !== '') {
      setTimeout(() => {
        alert(`${this.props.winner} Wins!`);
      }, 0);
    }
  };

  render() {

    return (
      <React.Fragment>
        <canvas ref="canvas" width={GAP_SIZE * (GRID_SIZE - 1) + MARGIN_LEFT * 2} height={GAP_SIZE * (GRID_SIZE - 1) + MARGIN_TOP * 2}/>
      </React.Fragment>
    );
  }
}

CanvasComponent.propTypes = {
  gomoku: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  turn: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired,
  winner: PropTypes.string.isRequired,
  decodedGomoku: PropTypes.string.isRequired,
  machineGo: PropTypes.object.isRequired,
};

export default CanvasComponent;