var React = require('react');
var ReactDOM = require('react-dom');

 var Container = require('../src/container.jsx');

// var Container = React.createClass({
//     render: function () {
//         return (
//            <div>Hello world</div>
//         )
//     }
// });

console.log(Container);
ReactDOM.render(<Container />, document.getElementById('app'));