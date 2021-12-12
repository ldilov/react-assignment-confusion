import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetails from './DishDetailsComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

import { DISHES } from '../data/mock/dishes';
import { COMMENTS } from '../data/mock/comments';
import { LEADERS } from '../data/mock/leaders';
import { PROMOTIONS } from '../data/mock/promotions';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};


class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS
    };
  }

  onDishSelect(dishId) {
    this.setState({selectedDish: dishId});
  }

  render() {
    const HomePage = () => {
      return (
          <Home
              dish={ this.props.dishes.filter((dish) => dish.featured)[0] }
              promotion={ this.props.promotions.filter((promo) => promo.featured)[0] }
              leader={ this.props.leaders.filter((leader) => leader.featured)[0] }
          />
      );
    };

    const DishWithId = ({match}) => {
      return (
          <DishDetails dish={ this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0] }
                      comments={ this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10)) }/>
      );
    };


    return (
        <div className="container">
          <Navbar dark color="primary">
            <div className="container">
              <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
            </div>
          </Navbar>
          <Header/>
          <Switch>
            <Route path="/home" component={ HomePage }/>
            <Route exact path="/menu" component={ () => <Menu dishes={ this.state.dishes }
                                                              onClick={ (dishId) => this.onDishSelect(dishId) }/> }/>
            <Route exact path="/contactus" component={ Contact }/>} />
            <Route exact path="/aboutus" component={ () => <About leaders={ this.state.leaders }/> }/>} />
            <Route path="/menu/:dishId" component={ DishWithId }/>
            <Redirect to="/home"/>
          </Switch>
          <Footer/>
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));
