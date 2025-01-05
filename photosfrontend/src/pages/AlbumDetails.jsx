import React from 'react';
import { useParams } from 'react-router-dom';
import './AlbumDetails.css';

function AlbumDetails() {
  const { id } = useParams();

  return (
    <div className="album-details">
      <h1>Album Details</h1>
      <p>Album ID: {id}</p>
      <p>Display album photos and manage options here.</p>
    </div>
  );
}

export default AlbumDetails;