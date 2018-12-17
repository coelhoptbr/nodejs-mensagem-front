import axios from "axios";

const apimensagem = axios.create({
    baseURL: "https://mensagem-api.herokuapp.com"

});

export default apimensagem;