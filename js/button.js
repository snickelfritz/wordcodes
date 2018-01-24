var React = require('react');
var createReactClass = require('create-react-class');

var Button = createReactClass({
    render: function() {
        var buttonText = this.props.buttonText;
        var onClickFn = this.props.onClickFn;

        return (
            <button onClick={onClickFn}>{buttonText}</button>
        );
    }
});

export { Button };
