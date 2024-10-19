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
    }

    function getMoviebyId() {
        if (!id) {
            window.alert('Invalid request!')
            return
        }
        api.get(`/movies/${id}`).then(response => {
            console.log(response.data)
            setMovie(response.data)
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
                    <button className="text-slate-100 bg-violet-900 hover:bg-violet-700  active:bg-violet-800 active:shadow-inner rounded-md h-10 w-32" onClick={getMovies}>Exibir</button>
                    <ul>
                        {filmes.map((filme) => (
                            <>
                                <br />
                                <li key={filme._id}>
                                    <span className="font-semibold">Título:</span> {filme.title}
                                </li>
                                <li key={filme._id}>
                                    <span className="font-semibold">Ano:</span> {filme.year}
                                </li>
                                <li key={filme._id}>
                                    <span className="font-semibold">Gênero:</span> {filme.genre}
                                </li>
                                <li key={filme._id}>
                                    <span className="font-semibold">ID:</span> {filme._id}
                                </li>
                            </>
                        ))}
                    </ul>
                </section>
            )}

            {select === '2' && (
                <section className="flex flex-col justify-start items-start gap-3 p-40 h-auto">
                    <input className="text-gray-950 rounded-md h-10 w-64" type="text" placeholder="Informar ID" onChange={event => setId(event.target.value)} />
                    <button className="text-slate-100 bg-violet-900 hover:bg-violet-700  active:bg-violet-800 active:shadow-inner rounded-md h-10 w-64" onClick={getMoviebyId}>Buscar</button>
                    {movie.title ? (
                        <ul>
                            <br />
                            <li key={movie.id}>
                                <span className="font-semibold">Título:</span> {movie.title}
                            </li>
                            <li key={movie.id}>
                                <span className="font-semibold">Ano:</span> {movie.year}
                            </li>
                            <li key={movie.id}>
                                <span className="font-semibold">Gênero:</span> {movie.genre}
                            </li>
                            <li key={movie.id}>
                                <span className="font-semibold">ID:</span> {movie._id}
                            </li>
                        </ul>
                    ) : null}
                </section>
            )}

            {select === '3' && (
                <section className="flex flex-col items-center gap-3 p-40 h-auto">
                    <input className="text-gray-950 rounded-md h-10 w-64" type="text" placeholder="Inserir título" onChange={event => setTitle(event.target.value)} />
                    <input className="text-gray-950 rounded-md h-10 w-64" type="text" placeholder="Inserir ano" onChange={event => setYear(event.target.value)} />
                    <input className="text-gray-950 rounded-md h-10 w-64" type="text" placeholder="Inserir gênero" onChange={event => setGenre(event.target.value)} />
                    <button className="text-slate-100 bg-green-800 hover:bg-green-600  active:bg-green-700 active:shadow-inner rounded-md h-10 w-64" onClick={addMovie}>Adicionar</button>
                </section>
            )}

            {select === '4' && (
                <section className="flex flex-col items-center gap-3 p-40 h-auto">
                    <input className="text-gray-950 rounded-md h-10 w-64" type="text" placeholder="Inserir ID" onChange={event => setId(event.target.value)} />
                    <input className="text-gray-950 rounded-md h-10 w-64" type="text" placeholder="Inserir título" onChange={event => setTitle(event.target.value)} />
                    <input className="text-gray-950 rounded-md h-10 w-64" type="text" placeholder="Inserir ano" onChange={event => setYear(event.target.value)} />
                    <input className="text-gray-950 rounded-md h-10 w-64" type="text" placeholder="Inserir gênero" onChange={event => setGenre(event.target.value)} />
                    <button className="text-slate-100 bg-yellow-700 hover:bg-yellow-500  active:bg-yellow-600 active:shadow-inner rounded-md h-10 w-64" onClick={patchMovie}>Atualizar</button>
                </section>
            )}

            {select === '5' && (
                <section className="flex flex-col items-center gap-3 p-40 h-auto">
                    <input className="text-gray-950 rounded-md h-10 w-64" type="text" placeholder="Inserir ID" onChange={event => setId(event.target.value)} />
                    <button className="text-slate-100 bg-red-700 hover:bg-red-500  active:bg-red-600 active:shadow-inner rounded-md h-10 w-64" onClick={deleteMovieById}>Deletar</button>
                </section>
            )}
        </>

    );
}