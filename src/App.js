import { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './redux/configureStore';

import { Provider } from 'react-redux';

// Custom Components
import Main from './components/MainComponent';

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
        <Provider store={ store }>
          <BrowserRouter>
            <div className="App">
              <Main/>
            </div>
          </BrowserRouter>
        </Provider>
    );
  }
}

export default App;
