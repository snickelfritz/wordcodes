var React = require('react');
var createReactClass = require('create-react-class');

var Card = createReactClass({
    render: function() {
        var cardData = this.props.cardData;

        return (
            <td className="card">{cardData.word}</td>
        );
    }
});

export { Card };
