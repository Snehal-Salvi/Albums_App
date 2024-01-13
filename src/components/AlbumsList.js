import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { albumsSelector, fetchAlbums, updateAlbum, deleteAlbum } from '../redux/reducers/albumsReducers';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewAlbumForm from './NewAlbumForm';

function AlbumsList() {
  const dispatch = useDispatch();
  const albums = useSelector(albumsSelector);

  // State for managing album editing
  const [editingAlbumId, setEditingAlbumId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');

  // State for controlling the visibility of the new album form (unused for now)
  const [showNewAlbumForm] = useState(false);

  // Fetch albums on component mount
  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  // Create a reference to the albums list
  const albumsList = albums;

  // Handler for initiating album edit
  const handleEdit = (album) => {
    setEditingAlbumId(album.id);
    setEditedTitle(album.title);
  };

  // Handler for saving edited changes
  const handleSaveChanges = () => {
    dispatch(updateAlbum({ id: editingAlbumId, title: editedTitle }));
    setEditingAlbumId(null);
    toast.success('Album edited successfully');
  };

  // Handler for deleting an album
  const handleDelete = (albumId) => {
    dispatch(deleteAlbum(albumId));
    toast.success('Album deleted successfully');
  };

  return (
    <div className="container">
      {/* NewAlbumForm component will be rendered only if showNewAlbumForm is true */}
      {showNewAlbumForm && <NewAlbumForm />}

      {/* Render the list of albums */}
      <ul className="album-list">
        {albumsList.map((album) => (
          <li key={album.id} className="album-card">
            <div className="album-details">
              {/* Render input field if editing, otherwise render album title */}
              {editingAlbumId === album.id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              ) : (
                <h3>{album.title}</h3>
              )}
            </div>
            <div className="album-actions">
              {/* Render save button if editing, otherwise render edit and delete buttons */}
              {editingAlbumId === album.id ? (
                <button className="save-button" onClick={handleSaveChanges}>
                  Save Changes
                </button>
              ) : (
                <>
                  <button className="edit-button" onClick={() => handleEdit(album)}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(album.id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      {/* Toast container for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

export default AlbumsList;
