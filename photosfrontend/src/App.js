import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import MyAlbums from './pages/MyAlbums';
import AlbumDetails from './pages/AlbumDetails';
import OAuthCallback from './components/OAuthCallback';
import UploadPhoto from './pages/UploadPictures';
import { AuthProvider } from './components/AuthProvider';

function App() {
  return (
    <AuthProvider>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/albums" element={<MyAlbums />} />
        <Route path="/albums/:id" element={<AlbumDetails />} />
        <Route path="/oauth2/callback" element={<OAuthCallback />} />
        <Route path="/albums/upload/:albumId" element={<UploadPhoto />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
