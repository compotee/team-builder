import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

import './Layouys.css';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default Layout;