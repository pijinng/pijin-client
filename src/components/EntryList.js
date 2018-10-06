import React, { Component } from 'react';
import './EntryList.css';
import WordCard from '../containers/EntryCard';
import { connect } from 'react-redux';
import { getRandomEntries, getEntryEntries } from '../calls/entries';
import { RESULTS_PER_PAGE } from '../config';

class EntryList extends Component {
  static propTypes = {};

  state = {
    entries: [],
  };

  async fetchEntries() {
    try {
      if (this.props.listType === 'random') {
        const entries = await getRandomEntries(50);
        this.setState({ entries });
      } else if (this.props.listType === 'entry') {
        const { entry } = this.props.match.params;
        const entries = await getEntryEntries(entry, 50);
        this.setState({ entries });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    try {
      await this.fetchEntries();
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidUpdate(prevProps) {
    if (
      this.props.listType !== prevProps.listType ||
      this.props.match.params.entry !== prevProps.match.params.entry
    ) {
      try {
        console.log(this.props);
        await this.fetchEntries();
      } catch (error) {
        console.error(error);
      }
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="word-list-page">
            <div className="word-list">
              {this.state.entries.map((entry, id) => (
                <WordCard entry={entry} key={id} />
              ))}
              {this.state.entries.length > 0 &&
                this.state.entries.length % RESULTS_PER_PAGE === 0 && (
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

export default connect()(EntryList);
