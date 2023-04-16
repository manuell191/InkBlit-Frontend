import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Universal from './pages/Universal'
import RoomList from './pages/RoomList';
import UserList from './pages/UserList';
import RoomPage from './pages/RoomPage';
import RoomUsers from './pages/RoomUsers';
import ProfilePage from './pages/ProfilePage';
import Bio from './pages/Bio';
import Followers from './pages/Followers';
import Following from './pages/Following';
import GlobalPost from './pages/GlobalPost';
import NewRoom from './pages/NewRoom';
import JoinRoom from './pages/JoinRoom';
import RoomPost from './pages/RoomPost';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className="App flex-container">
      <AuthProvider>
        <Header />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' index element={<Home />} />
            <Route path='/global' element={<Universal />} />
            <Route path='/global/post' element={<GlobalPost />} />
            <Route path='/room' element={<RoomList />} />
            <Route path='/room/new' element={<NewRoom />} />
            <Route path='/room/join' element={<JoinRoom />} />
            <Route path='/room/:id' element={<RoomPage />} />
            <Route path='/room/:id/users' element={<RoomUsers />} />
            <Route path='/room/:id/post' element={<RoomPost />} />
            <Route path='/users' element={<UserList />} />
            <Route path='/user/:id' element={<ProfilePage />} />
            <Route path='/user/:id/bio' element={<Bio />} />
            <Route path='/user/:id/followers' element={<Followers />} />
            <Route path='/user/:id/following' element={<Following />} />
          </Route>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
