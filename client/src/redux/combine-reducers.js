import { IntlReducer as Intl } from 'react-redux-multilingual';
import { socket } from '../modules/socket/redux/reducers';
import { clearStorage } from '../config';
import { combineReducers } from 'redux';
import { auth } from '../modules/auth/redux/reducers';

//example1
import { example1 } from "../modules/example/example1/redux/reducers";

//example2
import { example2 } from "../modules/example/example2/redux/reducers";

//example3
import { example3 } from "../modules/example/example3/redux/reducers";

import { newsFeeds } from "../modules/home/redux/reducers";

const appReducer = combineReducers({
    socket,


    //---------------------------
    auth,
    
    //example1
    example1,

    //example2
    example2,

    //example3
    example3,




    Intl,

    newsFeeds
});

const rootReducer = (state, action) => {
    if (action.type === 'RESET') {
        state = undefined;
        clearStorage();
    } else if (action.type === 'SWITCH_PAGE') {
        state = {
            auth: state.auth,
            socket: state.socket
        }
    }

    return appReducer(state, action);
}

export default rootReducer;
