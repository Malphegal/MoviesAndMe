const API_TOKEN = "df776c59838ce93530033019ace3517e";

export default new class TMDB_handler{
    async findMovies(text, page){
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${text}&page=${page}`;
        return fetch(url)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }

    async getMovieById(id){
        const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits&api_key=${API_TOKEN}&language=fr`;
        return fetch(url)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }

    async getUpcoming(page){
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_TOKEN}&language=fr&page=${page}`;
        return fetch(url)
            .then((response) => response.json())
            .catch((error) => console.error(error));
    }
}()