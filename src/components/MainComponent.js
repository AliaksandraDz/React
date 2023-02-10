import React, { Component } from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Favorites from './FavoriteComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Routes, Route, useParams, Outlet, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback, loginUser, logoutUser, fetchFavorites, postFavorite, deleteFavorite } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    // feedback: state.forms,
    //react integrartion
    favorites: state.favorites,
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => ({
  
  postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)), ////react integrartion
  fetchDishes: () => { dispatch(fetchDishes())},
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => { dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => dispatch(fetchLeaders()),
  postFeedback: (feedback) => dispatch(postFeedback(feedback)),
  //react integrartion
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
  fetchFavorites: () => dispatch(fetchFavorites()),
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
});

class Main extends Component {

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
    this.props.fetchFavorites();
  }

  render() {

    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
          leaderLoading={this.props.leaders.isLoading}
          leaderErrMess={this.props.leaders.errMess}
        />
      );
    }

    const DishWithId = () => {
      let {dishId} = useParams();
      let arr = this.props.dishes.dishes;
      let test = this.props.dishes.dishes.includes(item.name == "Uthappizza")
      console.log(test)
      return(
          this.props.auth.isAuthenticated //react integration
          ?
          <DishDetail dish={arr.filter(item => item._id === dishId)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(comment => comment.dish === dishId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment} 
          favorite={this.props.favorites.favorites.dishes.some(dish => dish._id === dishId)}
          postFavorite={this.props.postFavorite}
          />
          :
          <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish._id === dishId)[0]} 
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter((comment) => comment.dish === dishId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment} 
          favorite={false}
          postFavorite={this.props.postFavorite}
          />
      );
    }
    console.log(DishDetail.dish)

    const PrivateRoute = () => {
      return (
        this.props.auth.isAuthenticated
        ? <Outlet/> 
        : <Navigate to='/home'/>
      )
    }

    return (
      <div>
        <Header auth={this.props.auth} 
          loginUser={this.props.loginUser} 
          logoutUser={this.props.logoutUser} />
          <Routes>
              <Route path='/home' element={<HomePage />} />
              <Route path='/menu' element={<Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' element={<DishWithId />} />
              <Route path='/contactus' element={<Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>} />
              <Route path='/aboutus' element={<About leaders={this.props.leaders} leadersLoading={this.props.leaders.isLoading}  leadersErrMess={this.props.leaders.errMess}/>} />
              <Route element={<PrivateRoute/>}>
                <Route path='/favorites' element={<Favorites favorites={this.props.favorites} deleteFavorite={this.props.deleteFavorite}/>} />
              </Route>
              <Route path="*" element={<HomePage />} /> 
          </Routes>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);