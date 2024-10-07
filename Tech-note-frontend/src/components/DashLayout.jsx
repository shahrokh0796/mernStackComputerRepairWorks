import { Outlet } from 'react-router-dom';
import DashHeader from './DashHearder';
import DashFooter from './DashFooter';

const DashLayout = () => {
    return (
        <>
        <DashHeader />
        <div className="dash-container">
            <Outlet />
        </div> 
        <DashFooter />
        </>
    )
}

export default DashLayout;