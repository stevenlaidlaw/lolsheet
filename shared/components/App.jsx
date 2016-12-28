import React, { PropTypes } from 'react';
import Header from './global/Header';
import Footer from './global/Footer';

export default class App extends React.Component {
  render() {
    return (
      <div id="main-view">
        <Header history={this.props.history}/>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}
