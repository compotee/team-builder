import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

import './Layouts.css';

const MainLayout = () => {
    return (
        <>
            <Header />
            <div className='main-layout-outlen-container'>
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout;