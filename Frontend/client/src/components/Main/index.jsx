import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {
    const [films, setFilms] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [genre, setGenre] = useState(searchParams.get("genre") || "");
    const [sort, setSort] = useState(searchParams.get("sort") || "");
    const [noDataFound, setNoDataFound] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

	const fetchFilms = useCallback(async () => {
		try {
			const params = new URLSearchParams();
	
			const searchTerm = searchParams.get("title") || "";
			const selectedGenre = genre; // Current genre state
			const selectedSort = sort; // Current sort state
	
			if (searchTerm) params.append("title", searchTerm);
			if (selectedGenre) params.append("genre", selectedGenre);
			if (selectedSort) params.append("sort", selectedSort);
	
			const finalUrl = `http://localhost:5000/film?${params.toString()}`; // Use the new endpoint
	
			const response = await axios.get(finalUrl);
			setFilms(response.data);
			setNoDataFound(response.data.length === 0);
		} catch (error) {
			console.error("Error fetching films:", error);
			setNoDataFound(true);
		}
	}, [searchParams, genre, sort]);

    const deleteFilm = useCallback(async (id) => {
        try {
            await axios.delete(`http://localhost:5000/film/deleteFilm/${id}`);
            fetchFilms();
        } catch (error) {
            console.error("Error deleting film:", error);
        }
    }, [fetchFilms]);
	

    useEffect(() => {
        const updatedParams = {};
        const searchTerm = searchParams.get("title");

        if (searchTerm) updatedParams.title = searchTerm; // Keep the search term
        if (genre) updatedParams.genre = genre; // Update genre
        if (sort) updatedParams.sort = sort; // Update sort

        setSearchParams(updatedParams); // Update searchParams
        fetchFilms(); // Fetch films based on the updated searchParams
    }, [genre, sort, searchParams, setSearchParams, fetchFilms]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchTerm = e.target.elements.search.value;
        setSearchParams({ title: searchTerm, genre, sort });
    };

    const handleDelete = (id) => {
        deleteFilm(id);
    }

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Film</h1>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Logout
                </button>
            </nav>

            <form onSubmit={handleSearchSubmit} className={styles.search_bar}>
                <div className={styles.search_bar_container}>
                    <input
                        type="text"
                        name="search"
                        placeholder="Search film by title..."
                        defaultValue={searchParams.get("title") || ""}
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

            <div className={styles.films_container}>
                {noDataFound ? (
                    <p>Tidak ada data ditemukan.</p>
                ) : (
                    films.map((film) => (
                        <div key={film._id} className={styles.film_item}>
                            <h2>{film.title}</h2>
                            <p>Director: {film.director}</p>
                            <p>Release Year: {film.releaseYear}</p>
                            <p>Genre: {film.genre}</p>
                            <p>Duration: {film.duration} minutes</p>
                            <p>Language: {film.language}</p>
                            <button onClick={() => handleDelete(film._id)}>Delete</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Main;
