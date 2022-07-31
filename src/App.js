import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Editor from './components/Editor';
import Admin from './components/Admin';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import Lounge from './components/Lounge';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import PresistLogin from './components/PresistLogin';
import { Routes, Route } from 'react-router-dom';

const ROLES = {
    user: 2001,
    editor: 1948,
    admin: 5150,
};

function App() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/* PUBLICK ROUTES */}
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='linkpage' element={<LinkPage />} />
                <Route path='unauthorized' element={<Unauthorized />} />

                {/* PROTECTED ROUTES */}
                <Route element={<PresistLogin />}>
                    <Route element={<RequireAuth allowedRoles={[ROLES.user]} />}>
                        <Route path='/' element={<Home />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.editor]} />}>
                        <Route path='editor' element={<Editor />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.admin]} />}>
                        <Route path='admin' element={<Admin />} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.editor, ROLES.admin]} />}>
                        <Route path='lounge' element={<Lounge />} />
                    </Route>
                </Route>

                {/* CATCH ALL */}
                <Route path='*' element={<Missing />} />
            </Route>
        </Routes>
    );
}

export default App;
