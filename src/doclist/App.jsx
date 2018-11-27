import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import styles from "./App.less";

class App extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div class={styles.text}>doclist</div>);
    }
}
export default App;