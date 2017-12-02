import React, { Component } from 'react';
import IconButton from 'react-toolbox/lib/button/IconButton';
import Chip from 'react-toolbox/lib/chip/Chip';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

class VoteToolbox extends Component {

  render() {
    const name = this.props.parentName;
    const className = this.props.className;
    return (
            <div className={className}>
              <Chip className='commentChip'>{this.props.voteScore} votes
              <IconButton icon='mood' data-tip={'Up vote '+name}
              onClick={this.props.upVoteHandler} />
              <IconButton icon='mood_bad' data-tip={'Down vote '+name}
              onClick={this.props.downVoteHandler} />
              </Chip>
              <ReactTooltip />
            </div>
    );
  }
}

VoteToolbox.propTypes = {
  parentName: PropTypes.string.isRequired
}


export default VoteToolbox;
