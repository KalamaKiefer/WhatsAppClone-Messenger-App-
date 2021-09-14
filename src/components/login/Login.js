import { Button } from '@material-ui/core';
import React from 'react'
import "./login.css";
import { auth, provider } from "../../firebase";
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {
           dispatch({
               type: actionTypes.SET_USER,
               user: result.user,
           });
        })
        .catch((error) => alert(error.message));
    };


    return (
        <div className="login">
            <div className="loginContainer">
                <img src="https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80" 
                alt="" />

                <div className="loginText">
                    <h1>Sign in to MessageApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In With Google
                </Button>
            </div>
        </div>
    )
}

export default Login
