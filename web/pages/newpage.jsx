/* eslint-disable no-unused-vars */

import React, { Component, Fragment } from 'react';
import Head from 'next/head';

class Newpage extends Component {
  componentDidMount() {
    // ...
  }

  render() {
    const title = 'Home | New Project Coco PWA Prototype';
    const description = 'This is the description for the homepage';
    return (
      <div>
        <h1>{title}</h1>
        <h2>{description}</h2>
      </div>
    );
  }
}

export default Newpage;
