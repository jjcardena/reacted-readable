import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import VoteToolbox from './VoteToolbox';

class ControlToolbox extends Component {

  render() {
    const name = this.props.parentName;
    const voteToolBoxClassName = this.props.voteToolBoxClassName;
    return (
            <div>
              <Button className='commentDelete' icon='delete' floating mini
                data-tip={'Delete '+name} onClick={this.props.deleteHandler} />
              <Button className='commentEdit' icon='edit' floating mini
                data-tip={'Edit '+name} onClick={this.props.editHandler}/>
              <VoteToolbox parentName={name} upVoteHandler={this.props.upVoteHandler}
              downVoteHandler={this.props.downVoteHandler} voteScore={this.props.voteScore}
              className={voteToolBoxClassName}/>
              <ReactTooltip />
            </div>
    );
  }
}

ControlToolbox.propTypes = {
  voteScore: PropTypes.number.isRequired,
  parentName: PropTypes.string.isRequired
}


export default ControlToolbox;
