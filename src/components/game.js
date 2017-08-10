import React from 'react';
import Board from './board'
import CalculateWinner from '../helper'

export default class Game extends React.Component {

    constructor() {
        super();
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
            movesAscending: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (CalculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    getMoves(history) {
        const moves = history.map((step, move) => {
            const desc = move ? 'Move #'+move : 'Game start';
            const isSelected = move === this.state.stepNumber;
            return (
                <li key={move}>
                    <a href="#" onClick={() => this.jumpTo(move)} className={(isSelected ? 'selected' : '')}>{desc}</a>
                </li>
            );
        })

        if (!this.state.movesAscending) {
            moves.sort((a, b) => {
                return b.key - a.key
            })
        }

        return moves;
    }

    toggleMovesOrder() {
        this.setState((prevState) => ({
            movesAscending: !prevState.movesAscending
        }));
    }


    render() {

        const history = this.state.history;
        const current = history[this.state.stepNumber];;
        const winner = CalculateWinner(current.squares);

        const moves = this.getMoves(history);

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        handleSquareClick={(i) => {this.handleClick(i)}}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ul>{moves}</ul>
                    <a href="#" onClick={this.toggleMovesOrder.bind(this)}>Toggle Moves Order</a>
                </div>
            </div>
        );
    }
}