import React, { useEffect, useState } from "react";
import axios from "axios";
import "./myAlbums.css";

function MyAlbums() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [albums, setAlbums] = useState([]);

  // Fetch albums from the backend
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      axios
        .get(`http://localhost:8080/api/albums/user/${user.email}`)
        .then((response) => {
          setAlbums(response.data);
        })
        .catch((error) => {
          console.error("Error fetching albums:", error);
        });
    }
  }, []);

  // Handle delete album
  const handleDelete = (albumId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this album?"
    );
    if (!confirmDelete) return;

    axios
      .delete(`http://localhost:8080/api/albums/${albumId}`)
      .then(() => {
        // Update state to remove the deleted album
        setAlbums(albums.filter((album) => album.id !== albumId));
      })
      .catch((error) => {
        console.error("Error deleting album:", error);
      });
  };

  return (
    <div className="my-albums">
      {user ? (
        <>
          <h2>My Albums</h2>
          {albums.length > 0 ? (
            <ul className="album-list">
              {albums.map((album) => (
                <li key={album.id} className="album-item">
                  <div className="album-details">
                    <h3>{album.name}</h3>
                    <p>Date: {album.date}</p>
                    <p>
                      Link:{" "}
                      <a
                        href={album.link}
                        target="_blank"
                        rel="noreferrer"
                        className="album-link"
                      >
                        {album.link}
                      </a>
                    </p>
                  </div>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(album.id)}
                  >
                    Delete Album
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No albums created yet.</p>
          )}
        </>
      ) : (
        <p>Please log in to create albums and view your albums.</p>
      )}
    </div>
  );
}

export default MyAlbums;
