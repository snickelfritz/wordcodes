var React = require('react');
var ReactDOM = require('react-dom');
var createReactClass = require('create-react-class');
import { Board } from './board.js'
import { Header } from './header.js'
import { Button } from './button.js'


var Body = createReactClass({
    getInitialState: function() {
        return {
            wordList: []
        };
    },

    createNewGame: function() {
        var componentThis = this;

        fetch("/api/game/create", {method: "post"})
        .then(function(data) {
            data.json()
            .then(function(jsonData) {
                componentThis.setState({wordList: jsonData.wordList});
            })
            .catch(function(jsonError) {
                console.log(jsonError);
            });
        }, function(error) {
            console.log(error);
        });
    },

    render: function() {
        if (this.state.wordList.length === 0) {
            return (
                <div className="text-center">
                    <Button buttonText="Create New Game" onClickFn={this.createNewGame} />
                </div>
            );
        }

        return (
            <Board wordList={this.state.wordList}/>
        );
    }
});

var App = createReactClass({
    render: function() {
        return (
            <div>
                <Header title="WordCodes"/>
                <Body/>
            </div>
        );
    }
});

ReactDOM.render(<App/>,  document.getElementById("app"));
