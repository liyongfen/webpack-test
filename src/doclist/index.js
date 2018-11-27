import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from "./App";

document.addEventListener('DOMContentLoaded', e => {
    let wrapper = document.createElement('div');
    wrapper.style.height = '100%';
    document.body.appendChild(wrapper);
    ReactDOM.render(<App />, wrapper);
}, false);