import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import Header from './Component/Header/Header';
import './App.scss'
import Footer from './Component/Home/Footer';

const App = () => {
    return (
        <>
            <div className="app-container">
                <div className='header-container'>
                    <Header/>
                </div>
                <div className='main-container'>
                    <div className='sidenav-container'>

                    </div>

                    <div className='app-content'>
                        <Outlet />
                    </div>

                </div>
                <div className='footer-container'>

                    <Footer />
                </div>
            </div>
        </>
    );
}

export default App;