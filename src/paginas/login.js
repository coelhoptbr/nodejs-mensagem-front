import React, { Component } from "react";
import "./Login.css";
import twitterLogo from "../twitter.svg";

export default class Login extends Component {
    state = {
        nomeDeUsuario: "",
    };

    processarMudancaInput = evento => {
        this.setState({
            nomeDeUsuario: evento.target.value
        });
    };

    processarSubmit = evento => {
        evento.preventDefault();
        const { nomeDeUsuario } = this.state;

        if (!nomeDeUsuario.length) return;

        localStorage.setItem("@servrod:nomeDeUsuario", nomeDeUsuario);

        this.props.history.push("/timeline");
    }

    render() {
        return (
        <div className="login-wrapper">
            <img src={twitterLogo} alt="GoTwitter" />
            <form onSubmit={this.processarSubmit}>
                <input 
                value={this.state.nomeDeUsuario}
                onChange={this.processarMudancaInput}
                placeholder="Usuário" />
                <button type="submit">Entrar</button>
            </form>        
        </div>
        );
    }
}