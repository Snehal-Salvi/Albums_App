import React from 'react';
import AlbumsList from './components/AlbumsList';
import NavBar from './components/NavBar';
import './App.css';
import { Provider } from 'react-redux';  // Import the Provider component
import store from './store';
import NewAlbumForm from './components/NewAlbumForm';

function App() {
  return (
    
    <Provider store={store}>  
      <div className="App">
        <NavBar /> {/* Render the NavBar component */}
        <NewAlbumForm /> {/* Render the NewAlbumForm component */}
        <AlbumsList /> {/* Render the AlbumsList component */}
      </div>
    </Provider>  
  );
}

export default App;
