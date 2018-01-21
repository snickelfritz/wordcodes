var React = require('react');
var createReactClass = require('create-react-class');

var Header = createReactClass({
    render: function () {
        var title = this.props.title

        return (
            <header className="text-center">
                <h1>{title}</h1>
            </header>
        );
    }
});

export { Header };