import './App.css';
import { BrowserRouter, Route, Routes, useNavigate, Navigate, useHistory } from "react-router-dom";

import CurrentUser from './contexts/currentUser';

import Navbar from './components/navbar';

import LoginPage from './pages/Login';
import Register from './pages/Register';

import Home from './pages/Home';
import Feed from './pages/Feed';
import Restaurant from './pages/Restaurant';
import General from './pages/General';
import Blog from "./pages/Blog";
import Menu from "./pages/Menu";
import Comments from "./pages/Comments";
import SingleBlogPost from './pages/SingleBlogPost';

import EditProfile from './pages/EditProfile';
import EditBlogPost from './pages/EditBlogPost';
import EditHome from './pages/EditHome';
import EditImages from './pages/EditImages/EditImages';
import EditMenu from './pages/EditMenu';


function Auth({ children }) {
    return localStorage.getItem('token') ? children : <Navigate to='/login' replace />;
}

function LoggedIn({ children }) {
    return localStorage.getItem('token') ? <Navigate to='/home' replace /> : children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoggedIn><LoginPage /></LoggedIn>} />
                <Route path="/register" element={<LoggedIn><Register /></LoggedIn>} />

                <Route path="/" element={<Navbar />}>
                    <Route path="home" element={<Home />} />
                    <Route path="feed" element={<Auth><Feed /></Auth>} />

                    <Route path="editProfile" element={<Auth><EditProfile /></Auth>} />

                    <Route path=':idUsername/' element={<Auth><CurrentUser /></Auth>} >
                        <Route path="blogPost/:idSlug" element={<Auth><SingleBlogPost /></Auth>} />
                        <Route path="blogPost/:idSlug/edit" element={<Auth><EditBlogPost /></Auth>} />
                        <Route path="blogpost/add" element={<Auth><EditBlogPost /></Auth>} />

                        <Route path='restaurant/' element={<Auth><Restaurant /></Auth>} >
                            <Route path='general' element={<Auth><General /></Auth>} />
                            <Route path='menu' element={<Auth><Menu /></Auth>} />
                            <Route path='blog' element={<Auth><Blog /></Auth>} />
                            <Route path='comments' element={<Auth><Comments /></Auth>} />

                            <Route path='general/edit' element={<Auth><EditHome /></Auth>} />
                            <Route path='general/editImages' element={<Auth><EditImages /></Auth>} />

                            <Route path='menu/:idMenu/edit' element={<Auth><EditMenu /></Auth>} />
                            <Route path='menu/add' element={<Auth><EditMenu /></Auth>} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>

    );
}

export default App;