var React = require('react');
var ReactDOM = require('react-dom');

var Container = React.createClass({
    render: function () {
        return (
           <div>Hello world</div>
        )
    }
});


ReactDOM.render(<Container />, document.getElementById('app'));