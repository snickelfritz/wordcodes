var React = require('react');
var createReactClass = require('create-react-class');
import { BoardRow } from './board_row.js'

var Board = createReactClass({
    render: function() {
        var wordList = this.props.wordList;

        return (
            <table className="game-board">
                <thead></thead>
                <tbody>
                    <BoardRow wordList={wordList.slice(0, 5)}/>
                    <BoardRow wordList={wordList.slice(5, 10)}/>
                    <BoardRow wordList={wordList.slice(10, 15)}/>
                    <BoardRow wordList={wordList.slice(15, 20)}/>
                    <BoardRow wordList={wordList.slice(20)}/>
                </tbody>
            </table>
        );
    }
});

export { Board };