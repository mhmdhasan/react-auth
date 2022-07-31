import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
    const userRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatchPwd, setValidMatchPwd] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);

        const match = pwd === matchPwd;
        setValidMatchPwd(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg('Invalid username or password');
            return;
        }
        try {
            const res = await axios.post('/register', JSON.stringify({ user, pwd }), {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log(res.data);
            console.log(res.accessToken);
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
                return;
            } else if (error.response?.status === 409) {
                setErrMsg('Username already exists');
                return;
            } else {
                setErrMsg('Registeration Failed');
            }
        }
    };

    return (
        <section>
            <p ref={errRef} className={errMsg ? 'errmsg' : 'offscreen'} aria-live='assertive'>
                {errMsg}
            </p>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input
                    type='text'
                    id='username'
                    ref={userRef}
                    autoComplete='off'
                    required
                    aria-invalid={validName ? 'false' : 'true'}
                    aria-describedby='uidnote'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    onChange={(e) => setUser(e.target.value)}
                />
                <p id='uidnote' className={userFocus && user && !validName ? 'instructions' : 'offscreen'}>
                    4 to 24 characters, letters, numbers, and dashes
                </p>

                <label htmlFor='password'>Password:</label>
                <input
                    type='password'
                    id='password'
                    required
                    aria-invalid={validPwd ? 'false' : 'true'}
                    onChange={(e) => setPwd(e.target.value)}
                />

                <label htmlFor='confirm_password'>Confirm Password:</label>
                <input
                    type='password'
                    id='confirm_password'
                    required
                    aria-invalid={validMatchPwd ? 'false' : 'true'}
                    onChange={(e) => setMatchPwd(e.target.value)}
                />

                <button disabled={!validName || !validMatchPwd || !validPwd ? true : false}>Signup</button>
            </form>

            <p>
                Already registered <br />
                <span className='line'>
                    <Link to='/login'>Sign In</Link>
                </span>
            </p>
        </section>
    );
}

export default Register;
