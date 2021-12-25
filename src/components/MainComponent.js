import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';
import { Routes, Route } from 'react-router-dom';

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

  render() {

    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                leader={this.state.leaders.filter((leader) => leader.featured)[0]}/>
      )
    }

    return (
      <div>
        <Header />
        <Routes>
            <Route path='/home' element={HomePage()} />
            <Route path='/menu' element={<Menu dishes={this.state.dishes} />} />
            <Route path='/contactus' element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default Main;