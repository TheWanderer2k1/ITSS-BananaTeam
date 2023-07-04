import React, { Component, Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { PrivateRoute } from "./privateRoute";
import { AuthRoute } from "./authRoute";

import Introduction from "../modules/intro/components"
import Search from "../modules/search/components";
import FoodInforPage from "../modules/Food-management/components";
import FoodReview from "../modules/food-review/components";
import ProfileWrapper from "../modules/profile";

const Foods = lazy(() => import("../modules/foods/components"))
const Home = lazy(() => import("../modules/home/components"))
const HomePage = lazy(() => import("../modules/homepage/components"))
import ResInfo from "../modules/res-info/components"
const ResInfoStaff = lazy(() => import("../modules/res-info-staff/components"))
const NotFound = lazy(() => import("../modules/not-found/components"))

class Routes extends Component {
    render() {
        const {
            auth,
            company,
            user,
            role,
            link,
            component,
            department,
            employeesManager,
        } = this.props;
        return (
            <Suspense>
                <Switch>
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/"
                        component={Introduction}
                    />

                   
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/homepage"
                        component={HomePage}
                    />
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/resinfo"
                        component={ResInfo}
                    />
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/resinfo-staff"
                        component={ResInfoStaff}
                    />

                     <AuthRoute
                        exact
                        auth={auth}
                        path="/foods"
                        component={Foods}
                    />

                    <AuthRoute
                        exact
                        auth={auth}
                        path="/FoodInforPage/:id"
                        component={FoodInforPage}
                    />      

                    <AuthRoute
                        exact
                        auth={auth}
                        path="/food-review"
                        component={FoodReview}
                    />      
                     
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/profile"
                        component={ProfileWrapper}
                    />      


                    {/* NOT FOUND */}
                    <Route component={NotFound}></Route>


                </Switch>
            </Suspense>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps, null)(Routes);
