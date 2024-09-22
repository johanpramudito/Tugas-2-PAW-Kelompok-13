import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const Main = () => {
    const [films, setFilms] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [genre, setGenre] = useState("");
    const [sort, setSort] = useState(""); 

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const fetchFilms = useCallback(async () => {
		try {
			let url = "http://localhost:5000/Film";
			const params = new URLSearchParams();
	
			// If searchTerm is provided, search by title
			if (searchTerm) {
				url = `http://localhost:5000/Film/title/${searchTerm}`;
			}
	
			// If genre is provided, filter by genre
			if (genre) {
				url = `http://localhost:5000/Film/genre/${genre}`;
			}
	
			// Add sorting to the URL query parameters if sorting is selected
			if (sort) {
				params.append('sort', sort);
			}
	
			// If genre and sort both are selected, combine them in the URL
			if (genre && sort) {
				url = `http://localhost:5000/Film/genre/${genre}?sort=${sort}`;
			}

			if (sort && genre) {
				url = `http://localhost:5000/Film?sort=${sort}&genre=${genre}`;
			}
	
			// Attach query params to the URL
			if (params.toString()) {
				url += `?${params.toString()}`;
			}
	
			const response = await axios.get(url);
			setFilms(response.data);
		} catch (error) {
			console.error("Error fetching films:", error);
		}
	}, [searchTerm, genre, sort]);
    
    /*const fetchFilms = useCallback(async () => {
        try {
            const params = new URLSearchParams();

            // Add query parameters only if they are not empty
            if (searchTerm) {
                params.append("title", searchTerm);
            }
            if (genre) {
                params.append("genre", genre);
            }
            if (sort) {
                params.append("sort", sort);
            }

            const response = await axios.get(`http://localhost:5000/Film?${params.toString()}`);
            setFilms(response.data);
        } catch (error) {
            console.error("Error fetching films:", error);
        }
    }, [searchTerm, genre, sort]); */

    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Call fetchFilms when search term, genre, or sort changes
    useEffect(() => {
        fetchFilms();
    }, [searchTerm, genre, sort, fetchFilms]);

    // Handle form submit for search, when user presses enter or clicks search button
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Prevent form refresh
        fetchFilms(); // Fetch films on search submit
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Film</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>

            {/* Horizontal alignment of search bar, filter, and sort dropdowns */}
            <form onSubmit={handleSearchSubmit} className={styles.search_bar}>
                <div className={styles.search_bar_container}>
                    <input
                        type="text"
                        placeholder="Search film by title..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.search_input}
                    />
                    <button type="submit" className={styles.search_btn}>
                        Search
                    </button>
                </div>

                <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className={styles.filter_dropdown}
                >
                    <option value="">All Genres</option>
                    <option value="Action">Action</option>
                    <option value="Romance">Romance</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Thriller">Thriller</option>
                    {/* Add other genre options as needed */}
                </select>

                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className={styles.sort_dropdown}
                >
                    <option value="">Sort by Release Year</option>
                    <option value="asc">Oldest</option>
                    <option value="desc">Newest</option>
                </select>
            </form>

            {/* Film List */}
            <div className={styles.films_container}>
                {films.length > 0 ? (
                    films.map((film) => (
                        <div key={film._id} className={styles.film_item}>
                            <h2>{film.title}</h2>
                            <p>Director: {film.director}</p>
                            <p>Release Year: {film.releaseYear}</p>
                            <p>Genre: {film.genre}</p>
                            <p>Duration: {film.duration} minutes</p>
                            <p>Language: {film.language}</p> 
                        </div>
                    ))
                ) : (
                    <p>No films found.</p>
                )}
            </div>
        </div>
    );
};

export default Main;