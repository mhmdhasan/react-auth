import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
const LOGIN_URL = '/auth';

function Login() {
    const { setAuth, presist, setPresist } = useAuth();
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log(res.data);
            const accessToken = res?.data?.accessToken;
            const roles = res?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No server response');
            } else if (error?.response?.status === 400) {
                setErrMsg('Missing username of password');
            } else if (error?.response?.status === 401) {
                setErrMsg('UnAuthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    };

    const togglePresist = () => {
        setPresist((prev) => !prev);
    };

    useEffect(() => {
        localStorage.setItem('presist', presist);
        console.log(presist);
    }, [presist]);

    return (
        <section>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
                {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor='password'>Password:</label>
                <input type='password' id='password' onChange={(e) => setPwd(e.target.value)} value={pwd} required />
                <button>Sign In</button>
                <div className='presistCheck'>
                    <input type='checkbox' id='presist' checked={presist} onChange={togglePresist} />
                    <label htmlFor='presist'>Trust this device</label>
                </div>
            </form>
            <p>
                Need an Account?
                <br />
                <span className='line'>
                    {/*put router link here*/}
                    <Link to='/register'>Sign Up</Link>
                </span>
            </p>
        </section>
    );
}

export default Login;
