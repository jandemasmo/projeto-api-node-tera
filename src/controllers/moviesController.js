const movies = require("../models/movies.json");
const axios = require("axios");
const Movies = require("../models/movies");


const home = (req, res) => {
    res.status(200).send({ "mensagem": "Pessoa, seja bem vinda a api TERAFLIX" });
}

const getAll = async (req, res) => {
    //pegando todos os filmes
    let movies = await Movies.find();
    res.status(200).json(movies);
}

const createMovie = async (req, res) => {
    //recebendo dados para criar novo filme
    const { title, genre } = req.body;
    try {
        //criando novo filme
        let movie = new Movies({ title: title, genre: genre });
        await movie.save();
        //enviando resposta
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: "Não foi possível criar adicionar filme" });
    }
}

const updateMovieById = async (req, res) => {
    //saber quem vai ser atualizado
    const requestId = req.params.id;

    //saber o que vai ser atualizado
    const { title, genre } = req.body;
    try {
        //encontrar o filme pelo id
        //atualizar o filme no banco de dados
        let movieUpdated = await Movies.findByIdAndUpdate(requestId,
            {$set:{ title: title, genre: genre }},//usei o operador $set do mongo para atualizar apenas os campos que estamos passando.
            { $upsert: true, "new": true })//operador $upsert do mongo para devolver a nota atualizada.

        //enviar resposta
        res.status(200).json(movieUpdated);

    } catch (error) {
        res.status(500).send({ error: "Não foi possível atualizar filme" })
    }
}

const deleteMovieById = async (req, res) => {
    //acessar o id do filme a ser excluido na requisição
    const requestId = req.params.id;
    try {
        //localizar o filme a ser excluido no banco de dados e deletar
        await Movies.findOneAndDelete(requestId);
    
        //envio da resposta
        res.status(200).send({ menssage: "Filme excluido com sucesso" });
    } catch (error) {
        res.status({ error: "Não foi possível deletar o filme" })
    }
}

//abaixo fizemos uma requisição a uma api externa pelo backend e enviamos para o frontend
const getAllStudioGhibli = async (req, res) => {
    try {
        const url = "https://ghibliapi.herokuapp.com/films";
        if (url) {
            let requestedMovies = await axios.get(url);
            res.status(200).send(requestedMovies.data);
        }
    } catch (error) {
        res.status(500).send({ error: error });
    }
}

module.exports = {
    home,
    getAll,
    createMovie,
    updateMovieById,
    deleteMovieById,
    getAllStudioGhibli
}