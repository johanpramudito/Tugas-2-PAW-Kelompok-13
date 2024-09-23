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

    // State for edit modal
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [currentFilm, setCurrentFilm] = useState({
        _id: "",
        title: "",
        director: "",
        releaseYear: "",
        genre: "",
        duration: "",
        language: "",
        rating: "",
        image: ""
    });

    // State for add modal
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newFilm, setNewFilm] = useState({
        title: "",
        director: "",
        releaseYear: "",
        genre: "",
        duration: "",
        language: "",
        rating: "",
        image: ""
    });

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const fetchFilms = useCallback(async () => {
        try {
            const params = new URLSearchParams();
            const searchTerm = searchParams.get("title") || "";
            const selectedGenre = genre;
            const selectedSort = sort;

            if (searchTerm) params.append("title", searchTerm);
            if (selectedGenre) params.append("genre", selectedGenre);
            if (selectedSort) params.append("sort", selectedSort);

            const finalUrl = `http://localhost:5000/film?${params.toString()}`;
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

    const updateFilm = async (id, updatedFilm) => {
        try {
            await axios.put(`http://localhost:5000/film/updateFilm/${id}`, updatedFilm);
            fetchFilms();
            setIsEditModalOpen(false); // Close modal after update
        } catch (error) {
            console.error("Error updating film:", error);
        }
    };

    const addFilm = async (newFilm) => {
        try {
            await axios.post(`http://localhost:5000/film/createFilm`, newFilm);
            fetchFilms();
            setIsAddModalOpen(false); // Close modal after adding
        } catch (error) {
            console.error("Error adding film:", error);
        }
    };

    useEffect(() => {
        const updatedParams = {};
        const searchTerm = searchParams.get("title");

        if (searchTerm) updatedParams.title = searchTerm;
        if (genre) updatedParams.genre = genre;
        if (sort) updatedParams.sort = sort;

        setSearchParams(updatedParams);
        fetchFilms();
    }, [genre, sort, searchParams, setSearchParams, fetchFilms]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const searchTerm = e.target.elements.search.value;
        setSearchParams({ title: searchTerm, genre, sort });
    };

    const handleDelete = (id) => {
        deleteFilm(id);
    };

    const openEditModal = (film) => {
        setCurrentFilm(film);
        setIsEditModalOpen(true);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const updatedFilm = {
            title: e.target.elements.title.value,
            director: e.target.elements.director.value,
            releaseYear: e.target.elements.releaseYear.value,
            genre: e.target.elements.genre.value,
            duration: e.target.elements.duration.value,
            language: e.target.elements.language.value,
            rating : e.target.elements.rating.value,
            image: e.target.elements.image.value
        };
        updateFilm(currentFilm._id, updatedFilm);
    };

    const openAddModal = () => {
        setNewFilm({
            title: "",
            director: "",
            releaseYear: "",
            genre: "",
            duration: "",
            language: "",
            rating: "",
            image: ""
        });
        setIsAddModalOpen(true);
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        const newFilmData = {
            title: e.target.elements.title.value,
            director: e.target.elements.director.value,
            releaseYear: e.target.elements.releaseYear.value,
            genre: e.target.elements.genre.value,
            duration: e.target.elements.duration.value,
            language: e.target.elements.language.value,
            rating : e.target.elements.rating.value,
            image: e.target.elements.image.value
        };
        addFilm(newFilmData);
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Film</h1>
                <button className={styles.search_btn} onClick={handleLogout}>
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

            <button onClick={openAddModal} className={styles.search_btn}>
                Add New Film
            </button>

            <div className={styles.films_container}>
                {noDataFound ? (
                    <p>No data found.</p>
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
                            <button onClick={() => openEditModal(film)}>Edit</button>
                        </div>
                    ))
                )}
            </div>

            {/* Modal for editing */}
            {isEditModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <h2>Edit Film</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label>
                                Title:
                                <input type="text" name="title" defaultValue={currentFilm.title} />
                            </label>
                            <label>
                                Director:
                                <input type="text" name="director" defaultValue={currentFilm.director} />
                            </label>
                            <label>
                                Release Year:
                                <input type="number" name="releaseYear" defaultValue={currentFilm.releaseYear} />
                            </label>
                            <label>
                                Genre:
                                <input type="text" name="genre" defaultValue={currentFilm.genre} />
                            </label>
                            <label>
                                Duration:
                                <input type="number" name="duration" defaultValue={currentFilm.duration} />
                            </label>
                            <label>
                                Language:
                                <input type="text" name="language" defaultValue={currentFilm.language} />
                            </label>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal for adding */}
            {isAddModalOpen && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <h2>Add New Film</h2>
                        <form onSubmit={handleAddSubmit}>
                            <label>
                                Title:
                                <input type="text" name="title" value={newFilm.title} onChange={(e) => setNewFilm({...newFilm, title: e.target.value})} />
                            </label>
                            <label>
                                Director:
                                <input type="text" name="director" value={newFilm.director} onChange={(e) => setNewFilm({...newFilm, director: e.target.value})} />
                            </label>
                            <label>
                                Release Year:
                                <input type="number" name="releaseYear" value={newFilm.releaseYear} onChange={(e) => setNewFilm({...newFilm, releaseYear: e.target.value})} />
                            </label>
                            <label>
                                Genre:
                                <input type="text" name="genre" value={newFilm.genre} onChange={(e) => setNewFilm({...newFilm, genre: e.target.value})} />
                            </label>
                            <label>
                                Duration:
                                <input type="number" name="duration" value={newFilm.duration} onChange={(e) => setNewFilm({...newFilm, duration: e.target.value})} />
                            </label>
                            <label>
                                Language:
                                <input type="text" name="language" value={newFilm.language} onChange={(e) => setNewFilm({...newFilm, language: e.target.value})} />
                            </label>
                            <label>
                                Rating:
                                <input type="text" name="rating" value={newFilm.rating} onChange={(e) => setNewFilm({...newFilm, rating: e.target.value})} />
                            </label>
                            <label>
                                Image:
                                <input type="text" name="image" value={newFilm.image} onChange={(e) => setNewFilm({...newFilm, image: e.target.value})} />
                            </label>
                            <button className={styles.search_btn} type="submit">Add Film</button>
                            <button className={styles.search_btn} type="button" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;
