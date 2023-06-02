import React, { Component, Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { PrivateRoute } from "./privateRoute";
import { AuthRoute } from "./authRoute";

import Layout from "../layout/layout";
import Login from "../modules/auth/components/login"
import Introduction from "../modules/intro/components"
import ResetPassword from "../modules/auth/components/resetPasswordNew"

const Home = lazy(() => import("../modules/home/components"))
const HomePage = lazy(() => import("../modules/homepage/components"))
const NotFound = lazy(() => import("../modules/not-found/components"))


// Example
const ExampleManagement1 = lazy(() => import("../modules/example/example1/components"))
const ExampleManagement2 = lazy(() => import("../modules/example/example2/components"))
const ExampleManagement3 = lazy(() => import("../modules/example/example3/components"))

const ExampleManagementHooks1 = lazy(() => import("../modules/example/example1/components-hooks"))
const ExampleManagementHooks2 = lazy(() => import("../modules/example/example2/components-hooks"))
const ExampleManagementHooks3 = lazy(() => import("../modules/example/example3/components-hooks"))

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
            <Suspense fallback={<Layout />}>
                <Switch>
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/"
                        component={Introduction}
                    />
                    <AuthRoute
                        exact={false}
                        auth={auth}
                        path="/login"
                        component={Login}
                    />
                    <AuthRoute
                        exact
                        auth={auth}
                        path="/reset-password"
                        component={ResetPassword}
                    />
                    <AuthRoute
                        auth={auth}
                        exact
                        path={"/homepage"}
                        component={HomePage}
                    />

                    <PrivateRoute
                        isLoading={auth.isLoading}
                        key={"home"}
                        arrPage={[
                            { link: "/home", name: "home", icon: "fa fa-home" },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/home"}
                        path={"/home"}
                        pageName={"home"}
                        layout={Layout}
                        component={Home}
                    />


                    {/* Tài liệu văn bản của người dùng */}
                    <PrivateRoute
                        isLoading={false}
                        key={"documents"}
                        arrPage={[
                            { link: "/", name: "home", icon: "fa fa-home" },
                            {
                                link: "/documents",
                                name: "documents",
                                icon: "fa fa-file-text",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/documents"}
                        path={"/documents"}
                        pageName={"documents"}
                        layout={Layout}
                        component={Document}
                    />                    

                    {/* Example Management */}
                    <PrivateRoute
                        isLoading={this.props.example1.isLoading}
                        key={"manage-examples-1"}
                        arrPage={[
                            { link: "/", name: "home", icon: "fa fa-home" },
                            {
                                link: "/manage-examples-1",
                                name: "manage_examples_1",
                                icon: "fa fa-circle",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/manage-examples-1"}
                        path={"/manage-examples-1"}
                        pageName={"manage_examples_1"}
                        layout={Layout}
                        component={ExampleManagement1}
                    />

                    <PrivateRoute
                        isLoading={this.props.example2.isLoading}
                        key={"manage-examples-2"}
                        arrPage={[
                            { link: "/", name: "home", icon: "fa fa-home" },
                            {
                                link: "/manage-examples-2",
                                name: "manage_examples_2",
                                icon: "fa fa-adjust",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/manage-examples-2"}
                        path={"/manage-examples-2"}
                        pageName={"manage_examples_2"}
                        layout={Layout}
                        component={ExampleManagement2}
                    />

                    {/* Example Management Hooks*/}
                    <PrivateRoute
                        isLoading={this.props.example1.isLoading}
                        key={"manage-examples-1"}
                        arrPage={[
                            { link: "/", name: "home", icon: "fa fa-home" },
                            {
                                link: "/manage-examples-hooks-1",
                                name: "manage_examples_hooks_1",
                                icon: "fa fa-circle",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/manage-examples-hooks-1"}
                        path={"/manage-examples-hooks-1"}
                        pageName={"manage_examples_hooks_1"}
                        layout={Layout}
                        component={ExampleManagementHooks1}
                    />

                    <PrivateRoute
                        isLoading={this.props.example2.isLoading}
                        key={"manage-examples-2"}
                        arrPage={[
                            { link: "/", name: "home", icon: "fa fa-home" },
                            {
                                link: "/manage-examples-hooks-2",
                                name: "manage_examples_hooks_2",
                                icon: "fa fa-circle",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/manage-examples-hooks-2"}
                        path={"/manage-examples-hooks-2"}
                        pageName={"manage_examples_hooks_2"}
                        layout={Layout}
                        component={ExampleManagementHooks2}
                    />
                    {/* example 3 */}
                    <PrivateRoute
                        isLoading={this.props.example3.isLoading}
                        key={"manage-examples-3"}
                        arrPage={[
                            { link: "/", name: "home", icon: "fa fa-home" },
                            {
                                link: "/manage-examples-3",
                                name: "manage_examples_3",
                                icon: "fa fa-adjust",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/manage-examples-3"}
                        path={"/manage-examples-3"}
                        pageName={"manage_examples_3"}
                        layout={Layout}
                        component={ExampleManagement3}
                    />

                    <PrivateRoute
                        isLoading={this.props.example3.isLoading}
                        key={"manage-examples-3"}
                        arrPage={[
                            { link: "/", name: "home", icon: "fa fa-home" },
                            {
                                link: "/manage-examples-hooks-3",
                                name: "manage_examples_hooks_3",
                                icon: "fa fa-circle",
                            },
                        ]}
                        auth={auth}
                        exact={true}
                        link={"/manage-examples-hooks-3"}
                        path={"/manage-examples-hooks-3"}
                        pageName={"manage_examples_hooks_3"}
                        layout={Layout}
                        component={ExampleManagementHooks3}
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
