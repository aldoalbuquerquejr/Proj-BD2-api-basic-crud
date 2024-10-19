import axios from "axios";
import React, { useState } from "react";

const api = axios.create({
    baseURL: "http://localhost:3000",
});

export function SelectContainer() {
    const [select, setSelect] = useState('');
    const [filmes, setFilmes] = useState([]);
    const [movie, setMovie] = useState([]);
    const [title, setTitle] = useState('');
    const [year, setYear] = useState();
    const [genre, setGenre] = useState('');
    const [id, setId] = useState();
    const [isMovieTableVisible, setIsMovieTableVisible] = useState(false);
    const [isMovieByIDVisible, setIsMovieByIDVisible] = useState(false);

    function optionOne() {
        setSelect('1')
    }

    function optionOTwo() {
        setSelect('2')
    }

    function optionThree() {
        setSelect('3')
    }

    function optionFour() {
        setSelect('4')
    }

    function optionFive() {
        setSelect('5')
    }

    function clearStates() {
        setTitle('')
        setYear()
        setGenre('')
        setId('')
    }

    function getMovies() {
        api.get("/movies").then((response) => {
            console.log(response.data);
            setFilmes(response.data);
        });
        setIsMovieTableVisible(true);
    }

    function getMoviebyId() {
        if (!id) {
            window.alert('Invalid request!')
            return
        }
        api.get(`/movies/${id}`).then(response => {
            console.log(response.data)
            setMovie(response.data)
            setIsMovieByIDVisible(true);
        }).catch(error => {
            window.alert('Movie ID not found!');
            console.error(error);
        })
        clearStates()
    }

    function addMovie() {
        if (!title || !year || !genre) {
            window.alert('Invalid request!')
            return
        }
        api.post('/movies', {
            title,
            year,
            genre
        }).then(response => {
            console.log(response)
        })
        window.alert('Movie has been successfully added!')
        clearStates()
        window.location.reload()
    }

    function patchMovie() {
        if (!id) {
            window.alert('Invalid request!')
            return
        } else if (!title && !year && !genre) {
            window.alert('Invalid inputs!')
            return
        }
        const data = {}
        if (title) {
            data.title = title
        }
        if (year) {
            data.year = year
        }
        if (genre) {
            data.genre = genre
        }
        if (Object.keys(data).length === 0) {
            return
        }
        api.get(`/movies/${id}`).then(response => {
            api.patch(`/movies/${id}`, data).then(response => {
                console.log(response);
                window.alert('Movie has been successfully updated!');
                clearStates();
                window.location.reload();
            }).catch(error => {
                window.alert("Error updating movie!")
                console.error(error);
            })
        }).catch(error => {
            window.alert('Movie ID not found!');
            console.error(error);
        })
    }

    function deleteMovieById() {
        if (!id) {
            window.alert('Invalid request!');
            return
        }
        api.get(`/movies/${id}`).then(response => {
            let answear = confirm("Are you sure you want to delete it?");
            if (answear) {
                api.delete(`/movies/${id}`).then(response => {
                    console.log(response);
                    window.alert('Movie has been successfully deleted!');
                    clearStates();
                    window.location.reload();
                }).catch(error => {
                    window.alert("Error deleting movie!")
                    console.error(error);
                })
            }
        }).catch(error => {
            window.alert('Movie ID not found!');
            console.error(error);
        })
    }

    return (
        <>
            <p className="text-6xl"> &#x1F3AC; MOVIE DATABASE &#x1F3A5; </p>
            <p className="text-2xl">API Basic CRUD Application</p>
            <div className="flex flex-row gap-3">
                <button className="text-slate-100 bg-violet-900 hover:bg-violet-700 active:bg-violet-800 active:shadow-inner rounded-md h-10 w-32" onClick={optionOne}>Get All</button>
                <button className="text-slate-100 bg-violet-900 hover:bg-violet-700  active:bg-violet-800 active:shadow-inner rounded-md h-10 w-32" onClick={optionOTwo}>Get by ID</button>
                <button className="text-slate-100 bg-green-800 hover:bg-green-600  active:bg-green-700 active:shadow-inner rounded-md h-10 w-32" onClick={optionThree}>Post</button>
                <button className="text-slate-100 bg-yellow-700 hover:bg-yellow-500  active:bg-yellow-600 active:shadow-inner rounded-md h-10 w-32" onClick={optionFour}>Put/Patch</button>
                <button className="text-slate-100 bg-red-700 hover:bg-red-500  active:bg-red-600 active:shadow-inner rounded-md h-10 w-32" onClick={optionFive}>Delete</button>
            </div>

            {select === '1' && (
                <section className="flex flex-col items-center p-40 h-auto">
                    <button className="text-slate-100 bg-violet-900 hover:bg-violet-700  active:bg-violet-800 active:shadow-inner rounded-md h-10 w-32" onClick={getMovies}>Show Up</button>
                    {isMovieTableVisible && (
                        <>
                            <br />
                            <table className="bg-slate-50 text-black rounded-md overflow-hidden">
                                <thead>
                                    <tr>
                                        <th className="border py-2 px-4">ID</th>
                                        <th className="border py-2 px-4">Title</th>
                                        <th className="border py-2 px-4">Year</th>
                                        <th className="border py-2 px-4">Genre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filmes.map(filme => (
                                        <tr key={filme._id}>
                                            <td className="border py-2 px-4">{filme._id}</td>
                                            <td className="border py-2 px-4">{filme.title}</td>
                                            <td className="border py-2 px-4">{filme.year}</td>
                                            <td className="border py-2 px-4">{filme.genre}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </section>
            )}

            {select === '2' && (
                <section className="flex flex-col items-center gap-3 p-40 h-auto">
                    <input className="text-gray-950 pl-2 rounded-md h-10 w-64" type="text" placeholder="Type ID" onChange={event => setId(event.target.value)} />
                    <button className="text-slate-100 bg-violet-900 hover:bg-violet-700  active:bg-violet-800 active:shadow-inner rounded-md h-10 w-64" onClick={getMoviebyId}>Search</button>
                    {isMovieByIDVisible && (
                        <>
                            <br />
                            <table className="bg-slate-50 text-black rounded-md overflow-hidden">
                                <thead>
                                    <tr>
                                        <th className="border py-2 px-4">ID</th>
                                        <th className="border py-2 px-4">Title</th>
                                        <th className="border py-2 px-4">Year</th>
                                        <th className="border py-2 px-4">Genre</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr key={movie._id}>
                                        <td className="border py-2 px-4">{movie._id}</td>
                                        <td className="border py-2 px-4">{movie.title}</td>
                                        <td className="border py-2 px-4">{movie.year}</td>
                                        <td className="border py-2 px-4">{movie.genre}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </>
                    )}
                </section>
            )}

            {select === '3' && (
                <section className="flex flex-col items-center gap-3 p-40 h-auto">
                    <input className="text-gray-950 pl-2 rounded-md h-10 w-64" type="text" placeholder="Type title" onChange={event => setTitle(event.target.value)} />
                    <input className="text-gray-950 pl-2 rounded-md h-10 w-64" type="text" placeholder="Type year" onChange={event => setYear(event.target.value)} />
                    <input className="text-gray-950 pl-2 rounded-md h-10 w-64" type="text" placeholder="Type genre" onChange={event => setGenre(event.target.value)} />
                    <button className="text-slate-100 bg-green-800 hover:bg-green-600  active:bg-green-700 active:shadow-inner rounded-md h-10 w-64" onClick={addMovie}>Add</button>
                </section>
            )}

            {select === '4' && (
                <section className="flex flex-col items-center gap-3 p-40 h-auto">
                    <input className="text-gray-950 pl-2 rounded-md h-10 w-64" type="text" placeholder="Type ID" onChange={event => setId(event.target.value)} />
                    <input className="text-gray-950 pl-2 rounded-md h-10 w-64" type="text" placeholder="Type title" onChange={event => setTitle(event.target.value)} />
                    <input className="text-gray-950 pl-2 rounded-md h-10 w-64" type="text" placeholder="Type year" onChange={event => setYear(event.target.value)} />
                    <input className="text-gray-950 pl-2 rounded-md h-10 w-64" type="text" placeholder="Type genre" onChange={event => setGenre(event.target.value)} />
                    <button className="text-slate-100 bg-yellow-700 hover:bg-yellow-500  active:bg-yellow-600 active:shadow-inner rounded-md h-10 w-64" onClick={patchMovie}>Update</button>
                </section>
            )}

            {select === '5' && (
                <section className="flex flex-col items-center gap-3 p-40 h-auto">
                    <input className="text-gray-950 pl-2 rounded-md h-10 w-64" type="text" placeholder="Type ID" onChange={event => setId(event.target.value)} />
                    <button className="text-slate-100 bg-red-700 hover:bg-red-500  active:bg-red-600 active:shadow-inner rounded-md h-10 w-64" onClick={deleteMovieById}>Delete</button>
                </section>
            )}
        </>

    );
}