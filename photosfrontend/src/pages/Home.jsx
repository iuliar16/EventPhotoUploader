import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
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

  // Handle album creation
  const handleAddAlbum = (e) => {
    e.preventDefault();
    if (!eventName || !eventDate) {
      alert("Please fill in both fields.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const accessToken = localStorage.getItem("accessToken");

    if (!user) {
      alert("User not logged in or access token missing.");
      return;
    }

    const newAlbum = {
      name: eventName,
      date: eventDate,
      userId: user.email,
    };

    if (!accessToken) {
      alert("Authorization token not found.");
      return;
    }

    axios
      .post("http://localhost:8080/api/albums", newAlbum, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setAlbums([...albums, response.data]);
        setEventName("");
        setEventDate("");
      })
      .catch((error) => {
        console.error("Error creating album:", error);
      });
  };

  return (
    <main className="home">
      {user && <p> Hello, {user.name}</p>}
      <h1>Welcome to your Event Photo App!</h1>
      <p>Create albums and gather memories!</p>

      <div className="home-container">
        {user ? (
          <>
            {/* Left Section: Form for Adding New Album */}
            <div className="form-container">
              <h2>Create a New Album</h2>
              <form onSubmit={handleAddAlbum}>
                <div>
                  <label>Event Name</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Enter event name"
                  />
                </div>
                <div>
                  <label>Event Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
                <button type="submit">Add Album</button>
              </form>
            </div>
            <div className="albums-container">
              <h2>My Created Albums</h2>
              {albums.length > 0 ? (
                albums.map((album) => (
                  <div key={album.id} className="album">
                    <h3>{album.name}</h3>
                    <p>Date: {album.date}</p>
                    <p>
                      Link:{" "}
                      <a href={album.link} target="_blank" rel="noreferrer">
                        {album.link}
                      </a>
                    </p>
                  </div>
                ))
              ) : (
                <p>No albums created yet.</p>
              )}
            </div>
          </>
        ) : (
          <h1 style={{ display: "flex", margin: "0 auto" }}>
            Please log in to create and view your albums.
          </h1>
        )}
      </div>
    </main>
  );
}

export default Home;
