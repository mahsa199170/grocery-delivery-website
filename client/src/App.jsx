import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import Login from './components/Login';
import { useAppContext } from './context/AppContext';
const App = () => {
  const isSellerPath = useLocation().pathname.includes('/seller');
  const { showUserLogin } = useAppContext();
  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      <Toaster />
      <div
        className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
      {showUserLogin ? <Login /> : null}
    </div>
  );
};

export default App;
