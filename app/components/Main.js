var React = require('react');

var Main = React.createClass({
  render: function() {
    return (
      <div className='mainContainer'>
        {this.props.children}
      </div>
    )
  }
})

module.exports = Main;

