var React = require('react');
var createReactClass = require('create-react-class');
import { Card } from './card.js'

var BoardRow = createReactClass({
    render: function() {
        var wordListHtml = this.props.wordList.map(function(cardData) {
            return (<Card key={cardData.word} cardData={cardData}/>);
        });

        return (
            <tr>
                {wordListHtml}
            </tr>
        );
    }
});

export { BoardRow };