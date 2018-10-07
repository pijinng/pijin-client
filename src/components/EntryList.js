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
    isLoading: false,
  };

  async fetchEntries() {
    try {
      return this.props.listType === 'random'
        ? await getRandomEntries(RESULTS_PER_PAGE)
        : this.props.listType === 'entry'
          ? await getEntryEntries(
              this.props.match.params.entry,
              RESULTS_PER_PAGE
            )
          : [];
    } catch (error) {
      console.error(error);
    }
  }

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const entries = await this.fetchEntries();
      this.setState({ entries, isLoading: false });
      window.scrollTo(0, 0);
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
        this.setState({ entries: [], isLoading: true });
        const entries = await this.fetchEntries();
        this.setState({ entries, isLoading: false });
        window.scrollTo(0, 0);
      } catch (error) {
        console.error(error);
      }
    }
  }

  handleSeeMoreClick = async () => {
    try {
      this.setState({ isLoading: true });
      const { entries } = this.state;
      const newEntries = await this.fetchEntries();
      entries.push(...newEntries);
      this.setState({ isLoading: false, entries });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { entries, isLoading } = this.state;
    return (
      <div>
        <div className="container">
          <div className="word-list-page">
            <div className="word-list">
              {entries.map((entry, id) => (
                <WordCard entry={entry} key={id} />
              ))}
              {entries.length > 0 &&
                entries.length % RESULTS_PER_PAGE === 0 && (
                  <button
                    className="see-more"
                    onClick={this.handleSeeMoreClick}
                  >
                    See more
                  </button>
                )}
              {isLoading && 'Loading entries...'}
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
