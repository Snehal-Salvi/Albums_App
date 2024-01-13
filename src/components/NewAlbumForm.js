// Import necessary dependencies
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAlbum } from '../redux/reducers/albumsReducers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the NewAlbumForm component
const NewAlbumForm = () => {
  // Redux dispatch hook to dispatch actions
  const dispatch = useDispatch();

  // State to manage the new album title input
  const [newAlbumTitle, setNewAlbumTitle] = useState('');

  // Handler for adding a new album
  const handleAddAlbum = () => {
    // Check if the new album title is not empty
    if (newAlbumTitle.trim() !== '') {
      // Dispatch the addAlbum action with the new album title
      dispatch(addAlbum({ title: newAlbumTitle }));
      
      // Display success notification
      toast.success('Album added successfully');
      
      // Reset the newAlbumTitle state to clear the input
      setNewAlbumTitle('');
    } else {
      // Display error notification if the album title is empty
      toast.error('Please enter a valid album title');
    }
  };

  // Render the NewAlbumForm component
  return (
    <div>
      {/* Input field for entering the new album title */}
      <input
        className='add-album-form'
        type="text"
        value={newAlbumTitle}
        onChange={(e) => setNewAlbumTitle(e.target.value)}
        placeholder='Enter new album title here'
      />

      {/* Button to add a new album */}
      <button className='add-album-button' onClick={handleAddAlbum}> + Add Album</button>
    </div>
  );
};

// Export the NewAlbumForm component
export default NewAlbumForm;
