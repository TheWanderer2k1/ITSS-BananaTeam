import React from 'react';
import Footer from '../../homepage/components/footer';
import FoodScreen from './food-screen';

const FoodInforPage = (props) => {

    return (
        <React.Fragment>
            <FoodScreen id={props.id}/>
            <Footer />
        </React.Fragment>
    );
}

export default FoodInforPage;