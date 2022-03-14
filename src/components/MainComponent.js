import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Routes, Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {

  render() {

    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}/>
      )
    }

    const DishWithId = () => {
      let {dishId} = useParams();
      return(
          <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(dishId,10))} />
      );
    };

    return (
      <div>
        <Header />
        <Routes>
            <Route path='/home' element={<HomePage />} />
            <Route path='/menu' element={<Menu dishes={this.props.dishes} />} />
            <Route path='/menu/:dishId' element={<DishWithId />} />
            <Route path='/contactus' element={<Contact />} />
            <Route path='/aboutus' element={<About leaders={this.props.leaders} />} />
            <Route path="*" element={<HomePage />} /> 
        </Routes>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps)(Main);