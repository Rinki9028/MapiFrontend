import React from 'react'
import action from '../Redux/Action';
import constants from "../Redux/Constants";
import { store } from '../Redux/Store';

const Logout = () => {
    localStorage.clear();
    store.dispatch(action(constants.USER_INFO, {}));
    window.location.href = '/'
    return null
}

export default Logout