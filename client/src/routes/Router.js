import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppNavbar from "../components/AppNavbar";
import {Container} from "reactstrap";
import {Switch, Route, Redirect} from "react-router-dom";
import PostCardList from "./normalRoute/PostCardList";
import PostWrite from "./normalRoute/PostWrite";
import PostDetail from "./normalRoute/PostDetail";
import CategoryResult from "./normalRoute/CategoryResult";
import Search from "./normalRoute/Search";
import {EditProtectedRout, ProfileProtectedRoute} from "./protectedRoute/ProtectedRoute";
import PostEdit from "./normalRoute/PostEdit";
import Profile from "./normalRoute/Profile";

const MyRouter = () => {
    return (
        <>
            <AppNavbar/>
            <Header/>
            <Container id="main-body">
                <Switch>
                    <Route path="/" exact component={PostCardList}/>
                    <Route path="/post" exact component={PostWrite}/>
                    <Route path="/post/:id" exact component={PostDetail}/>
                    <EditProtectedRout path="/post/:id/edit" exact component={PostEdit}/>
                    <Route path="/post/category/:categoryName" exact component={CategoryResult}/>
                    <ProfileProtectedRoute path="/user/:userName/profile" exact component={Profile}/>
                    <Route path="/search/:searchTerm" exact component={Search}/>
                    <Redirect from="*" to="/"/>
                </Switch>
            </Container>
            <Footer/>
        </>
    )
}

export default MyRouter;