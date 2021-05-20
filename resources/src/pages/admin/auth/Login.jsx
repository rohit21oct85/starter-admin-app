import React , {useState, useEffect,useRef, useContext} from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import {AuthContext} from '../../../context/AuthContext';
import './login.css';
import axios from 'axios'
import API_URL from '../../../helper/APIHelper.jsx';

export default function Login() {
    const history = useHistory();
    const location = useLocation();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState(null);
    const {dispatch, state} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const submitForm = async (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if(email === ''){
            setError("Please enter email address");
            return false;
        }else if(password === ''){
            setError("Please enter password");

            return false;
        }else{
            setLoading(true);
            const formData = {email: emailRef.current.value , password: passwordRef.current.value};
            const response = await axios.post(`${API_URL}v1/admin/login`, formData);
            // console.log(response)
            if(response.response && response.response.status){
                setError("Email or password not matched");
                setLoading(false);
            }else{
                let access_token = response.data.accessToken
                let refresh_token = response.data.refreshToken
                let fullname = response.data.admin.first_name + " " + response.data.admin.last_name
                let email = response.data.admin.email
                let role = response.data.admin.role
                let created_at = response.data.admin.created_at
                
                let isLoggedIn = true;
                localStorage.setItem('access_token', access_token)
                localStorage.setItem('refresh_token', refresh_token);
                localStorage.setItem('fullname', fullname);
                localStorage.setItem('email', email);
                localStorage.setItem('role', role);
                localStorage.setItem('created_at', created_at);
                localStorage.setItem('isLoggedIn', isLoggedIn);
                const payloadData = {
                    isLoggedIn,
                    fullname,
                    email,
                    role,
                    created_at,
                    access_token,
                    refresh_token
                }
                if(isLoggedIn){
                    dispatch({type: 'LOGIN', payload: payloadData});
                    
                    history.push('/dashboard');
                }
            }
            
        }   
    }
    const goToLogin = () => {
        if(location.pathname === '/admin' || location.pathname === '/admin/'){
            history.push('/admin/login');
        }
        emailRef.current.value = 'madmin@gmail.com'
        passwordRef.current.value = ''
    }
    useEffect(goToLogin,[])
    useEffect( () => {
        let timer1 = setTimeout(() => setError(null), 2500);
        return () => {
        clearTimeout(timer1)
        }
    },[error]);
    useEffect(checkLoggedIn, [state]);
    async function checkLoggedIn(){
        if(state.isLoggedIn == "true"){
            history.push(`/dashboard`);
        }
    }
    return (
        <div className="container-fluid p-0 m-0 text-center LoginBg">
            <div className="col-md-12">
                <NavLink to="/">
                    <img className="logo" alt="company Logo" src="/logo.png"/>
                </NavLink>
            </div>
            <div className="row no-gutter">
                <div className="col-md-3 loginDiv">
                <h4>Admin Login </h4>    
                {error && (<p style={{ color: 'red', margin: '0px' }}>{error}</p>)} 
                <hr />
                <Form autoComplete="off" onSubmit={submitForm}>
                    <Form.Group controlId="formBasicEmail" className="text-left">
                        <Form.Label> <span className="fa fa-send mr-2"></span> Email address</Form.Label>
                        <Form.Control type="email" autoComplete="off" ref={emailRef} placeholder="Enter email" />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <hr />
                    <Form.Group controlId="formBasicPassword"  className="text-left">
                        <Form.Label> <span className="fa fa-lock mr-2"></span> Password</Form.Label>
                        <Form.Control type="password" autoComplete="off" ref={passwordRef} placeholder="Password" />
                    </Form.Group>
                    <hr />
                    <Button 
                        className="btn btn-md btn-block btn-success w-100" 
                        type="submit"
                    >
                        {loading ? (
                            <>
                            <span className="fa fa-spinner mr-2"> </span> Authenticating...
                            </>
                        ):(
                            <>
                            <span className="fa fa-lock mr-2"> </span> Login Your Account
                            </>
                        )}
                    </Button>
                    </Form>
                </div>
            </div>
            
        </div>
    )
}
 