import React, { Component } from 'react';
import axios from 'axios';
import './Random.css';
import WordCard from './WordCard';
import Container from '../containers/Container';

export default class Random extends Component {
  static propTypes = {};

  state = {
    entries: [],
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        'http://127.0.0.1:4000/v1/entries/random?count=50'
      );
      this.setState({ entries: response.data.data });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        <Container>
          <div className="word-list-page">
            <div className="word-list">
              {this.state.entries.map((entry, id) => (
                <WordCard entry={entry} key={id} />
              ))}
            </div>
            <div className="word-sidebar">
              <div className="footer">
                Pijin.ng - The Brokin English of Naija
                <br />
                &copy; Copyright 2018. All rights reserved.
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}
