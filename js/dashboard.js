var React = require('react');
var createReactClass = require('create-react-class');
import { Board } from './board.js'
import { Button } from './button.js'
import { makeApiRequest } from './api_requests.js'

var Dashboard = createReactClass({
    getInitialState: function() {
        return {
            wordList: []
        };
    },

    createNewGame: function() {
        var componentThis = this;

        var url = "/api/game/create";
        var method = "post";
        var params = {};
        var onSuccess = function(data) {
            componentThis.setState({wordList: data.wordList});
        };
        var onError = function(error) {
            console.log(error);
        };

        makeApiRequest(url, method, params, onSuccess, onError);
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

export { Dashboard };
