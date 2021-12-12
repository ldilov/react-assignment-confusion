import { Navbar, NavbarBrand } from 'reactstrap';
import { Component } from 'react';

// Mocked data
import { DISHES } from './data/mock/dishes';

// Custom Components
import Menu from './components/MenuComponent';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      dishes: DISHES
    }
  }

  render() {
    return (
        <div className="App">
          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
            </div>
          </Navbar>
          <Menu dishes={this.state.dishes} />
        </div>
    );
  }
}

export default App;
