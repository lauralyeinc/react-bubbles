import React from 'react';
import { Redirect, Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...theRest}) => {
    return (
        <Route 
        {...theRest}
        render={props => {
            if(localStorage.getItem('token')) {
                return < Component {...props} />
            } else 
            return <Redirect to='/login' />
        }}
        /> 
    )
}

export default PrivateRoute; 
