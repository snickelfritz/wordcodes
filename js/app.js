var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import { Board } from './board.js'
import { Header } from './header.js'

var App = createReactClass({
    render: function () {
        return (
            <div>
                <Header title="WordCodes"/>
                <Board wordList={["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y"]}/>
            </div>
        );
    }
});

ReactDOM.render(<App/>,  document.getElementById("app"));
