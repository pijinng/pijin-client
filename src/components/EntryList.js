import React, { Component } from 'react';
import './EntryList.css';
import WordCard from '../containers/EntryCard';
import { connect } from 'react-redux';
import { addRandomEntries, addEntryEntries } from '../actions/entries';
import { RESULTS_PER_PAGE } from '../config';

class EntryList extends Component {
  static propTypes = {};

  async setEntries() {
    if (this.props.listType === 'random') {
      await this.props.addRandomEntries(RESULTS_PER_PAGE, { set: true });
    } else if (this.props.listType === 'entry') {
      const { entry } = this.props.match.params;
      await this.props.addEntryEntries(entry, RESULTS_PER_PAGE, { set: true });
    }
  }

  async componentDidMount() {
    await this.setEntries();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.listType !== prevProps.listType) {
      await this.setEntries();
    }
  }

  render() {
    let visibleEntries = [];
    const { listType, entries } = this.props;
    if (listType === 'random' && entries.random) {
      visibleEntries = entries.random;
    } else if (listType === 'entry' && entries.entry) {
      visibleEntries = entries.entry;
    }

    return (
      <div>
        <div className="container">
          <div className="word-list-page">
            <div className="word-list">
              {visibleEntries.map((entry, id) => (
                <WordCard entry={entry} key={id} />
              ))}
              {visibleEntries.length > 0 &&
                visibleEntries.length % RESULTS_PER_PAGE === 0 && (
                  <button
                    className="see-more"
                    onClick={() => {
                      this.props.addRandomEntries(RESULTS_PER_PAGE);
                    }}
                  >
                    See more
                  </button>
                )}
            </div>
            <div className="word-sidebar">
              <div className="footer">
                Pijin.ng - The Brokin English of Naija
                <br />
                &copy; Copyright 2018. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    entries: state.entries,
  }),
  { addRandomEntries, addEntryEntries }
)(EntryList);
