
import{BrowserRouter, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import LandingScreen from './screens/LandingScreen';
import BookingScreen from './screens/BookingScreen';
import RegistrationPage from './screens/RegistrationPage';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminScreen from './screens/AdminScreen';

import './App.css';

function App() {
  return (
    <div className="App">
        
        <BrowserRouter>
           <Navbar />
           <Routes>

            <Route path="/home" element={<HomeScreen />} />
            <Route path="/" element={<LandingScreen />} />
            <Route path="/book/:roomId/:fromDate/:toDate" element={<BookingScreen />}/>
            <Route path='/register' element={<RegistrationPage />}  />
            <Route path='/login' element={<LoginScreen />}/>
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/admin' element={<AdminScreen />} />
            
            
           </Routes>
        
        </BrowserRouter>
    </div>
  );
}

export default App;
