import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Redirect } from "react-router-dom";

import classes from './Login.module.css';
import * as actionCreators from "../../store/actions/actionCreators";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import FormRow from "../../components/UI/FormRow/FormRow";
import Logo from "../../components/Logo/Logo";
import i18 from "../../services/i18.services";

function Login(props) {
    const [name, setName] = useState("");

    const submitHandeler = (e) => {
        e.preventDefault();
        props.onAuth(name);
    } 
    const {isLoggedIn} = props;
    const isDisabled = name === "" ? true : false;

    useEffect(() => {
        isLoggedIn();
    }, [isLoggedIn]);

    if (props.auth) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <div className={classes.Main}>
            <p className={classes.SignInText}>
                {i18.signInText}
            </p>
            <Logo />
            <form onSubmit={submitHandeler}>
                <FormRow>
                    <Input 
                        value={name}
                        placeholder={i18.signinPlaceholder}
                        onChangeHandeler={(e) => setName(e.target.value)}
                        name="userName"
                    />
                </FormRow>
                <FormRow>
                    <Button 
                        btnType="Rounded" 
                        type="submit" 
                        name="guestLogin" 
                        disabled={isDisabled}
                    >
                        {i18.guestLogin}
                    </Button>
                </FormRow>
            </form>      
        </div>
    )
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        authError : state.authError
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onAuth : (login) => dispatch(actionCreators.auth(login)),
      isLoggedIn : () => dispatch(actionCreators.authCheckState())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
