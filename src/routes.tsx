/* Para que quando o usuário clicar no botão ele seja levado para outra página, precisamos criar um sistema de roteamento
    - BrowserRouter: rotas no formato "/nome" 
    - Cada página é um Route (tudo componente) 
    - Path: qual o endereço que tenho que acessar para essa rota estar visível para o usuário
        Verifica se começa com o digito, se você cria duas rotas com / e /nome, precisa especificar com exact (que na vdd é exact = {true})*/

import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Informations from './pages/Informations';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Informations} path="/pokemon/:id" />
        </BrowserRouter>
    );
}

export default Routes;