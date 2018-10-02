import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './WordCard.css';
import arrow from '../Arrow.svg';

class WordCard extends Component {
  static propTypes = {
    entry: PropTypes.shape({
      name: PropTypes.string.isRequired,
      meaning: PropTypes.string.isRequired,
      example: PropTypes.string,
    }).isRequired,
  };

  render() {
    const { entry } = this.props;

    return (
      <div className="card">
        <div className="card-votes">
          <a href="/upvote" className="vote-button upvote">
            <img src={arrow} alt="upvote" />
          </a>
          <div className="vote-count upvote"> {entry.votesCount.up}</div>
          <div className="divider" />
          <div className="vote-count downvote"> {entry.votesCount.down}</div>
          <a href="/downvote" className="vote-button upvote">
            <img className="vote-button downvote" src={arrow} alt="downvote" />
          </a>
        </div>
        <div className="card-entry">
          <h2 className="entry-name">{entry.name}</h2>
          <div className="entry-meaning">{entry.meaning}</div>
          <div className="entry-example">{entry.example}</div>
        </div>
        <div className="card-entry-image">
          <img
            className="entry-image-image"
            src="https://picsum.photos/600/300"
            alt={entry.name}
          />
        </div>
      </div>
    );
  }
}

export default WordCard;
