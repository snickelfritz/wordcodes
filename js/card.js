var React = require('react');
var createReactClass = require('create-react-class');

var Card = createReactClass({
    render: function() {
        var word = this.props.word;
        var cardNum = this.props.cardNum;

        return (
            <td className="card">{word}</td>
        );
    }
});

export { Card };
