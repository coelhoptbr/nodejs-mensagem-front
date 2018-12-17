import React, { Component } from "react";
import "./Timeline.css";
import twitterLogo from "../twitter.svg";
import apiMensagem from "../servicos/api-mensagem";

export default class Timeline extends Component {
    state = {
        novaPostagem: "",
        listaPostagens: [],
    };

    async componentDidMount() {
        const resposta = await apiMensagem.get("postagens");
        this.setState( { listaPostagens: resposta.data});
    }

    processarNovaPostagem = async evento => {
        console.log("tecla " + evento.keyCode);
        if (evento.keyCode !== 13) return;

        const conteudo = this.state.novaPostagem;
        const autor = localStorage.getItem("@servrod:nomeDeUsuario");
        
        //primeiro parametro é o endereco da operacao na api
        //https://nomedaapi/postagens
        await apiMensagem.post("postagens", { autor, conteudo } );

        this.setState({novaPostagem: ""});
    }

    processarMudancaPostagem = evento => {
        this.setState({novaPostagem: evento.target.value});
    }

    render() {
        return (
        <div className="timeline-wrapper">
            <img height={24} src={twitterLogo} alt="GoTwitter" />
            <form>
                <textarea
                    value={this.state.novaPostagem}
                    placeholder="Conte uma novidade"
                    onChange={this.processarMudancaPostagem}
                    onKeyDown={this.processarNovaPostagem}
                >
                </textarea>
            </form>

            { this.state.listaPostagens.map(postagem => (
                <h1>{postagem.conteudo}</h1>
                )
            )}
        </div>
        );
    }
}