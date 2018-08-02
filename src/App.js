import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Worker from './test.worker';
var myWorker;
class App extends Component {
  constructor (props) {
    super(props);
    this.state = {counter: 0}
  }
  handleMessage = (event) =>  {
    console.log(' handleMessage ben B gui lai');
    console.log('[Main]', 'Main Thread receives command: ', event.data.cmd, event.data.msg);
    this.setState({
      counter: event.data.msg
    })
    if(event.data.cmd == 'stop') {
      console.log('[Main]', 'Web Worker is already stopped');
    }
  }
  componentDidMount() {
    if(typeof(Worker) != 'undefined') {
      if(typeof(myWorker) === 'undefined') {
        myWorker = new Worker();
        console.log('[Main]', 'Init Web Worker');
        myWorker.onmessage = (event) => {
          console.log('ben B gui lai');
          this.handleMessage(event);
        }
        myWorker.onerror = function(event) {
          console.log('[Main]', 'Error', event.message, event);
        }
      }
    } else {
      console.log("[Main]", "The browser doesn't support web worker");
    }
  }

  startWorker() {
    if(typeof(myWorker) != 'undefined') {
    console.log('Bat dau worker');    
      myWorker.postMessage({cmd : 'start', msg : 'hello'});
    } else {
      console.log('[Main]', 'Worker is undefined.');
    }
  }
   stopWorker1() {
    if(typeof(myWorker) != 'undefined') {
      myWorker.terminate();
      myWorker = undefined;
      console.log('[Main]', 'Worker terminated.');  
    } else {
      console.log('[Main]', 'Worker is undefined.');
    }
  }
  
   stopWorker2() {
    if(typeof(myWorker) != 'undefined') {
      myWorker.postMessage({cmd : 'stop', msg : 'bye'});
    } else {
      console.log('[Main]', 'Worker is undefined.');
    }
  }
  render() {
    return (
      <div className="App">

        <button onClick={this.startWorker}>Start Worker</button>
        <h3>Value: {this.state.counter}</h3>
      </div>
    );
  }
}

export default App;
