var React = require('react');
var createReactClass = require('create-react-class');
import { Card } from './card.js'

var BoardRow = createReactClass({
    render: function() {
        var wordListHtml = this.props.wordList.map(function(word) {
            return (<Card key={word} word={word}/>);
        });

        return (
            <tr>
                {wordListHtml}
            </tr>
        );
    }
});

export { BoardRow };