import { Helmet } from 'react-helmet';
import Navbar from './Navbar';

const Layout = (props) => {
    return (
        <>
            <Navbar />
            <div className='container mt-5'> {props.children} </div>
        </>
    )
};

export default Layout;