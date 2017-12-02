import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import ReactTooltip from 'react-tooltip';

class ConfirmToolbox extends Component {

  render() {
    return (
        <div>
          <Button className='commentDelete' icon='undo' floating mini
          data-tip='Undo changes' onClick={this.props.undoHandler}/>
          <Button className='commentEdit' icon='done' floating mini
          data-tip='Confirm changes' onClick={this.props.confirmHandler}/>
          <ReactTooltip />
        </div>
    );
  }
}

export default ConfirmToolbox;
