// import DataTable from 'react-data-table-component';
import React from 'react';

import './App.css';

function App() {

  // let compras: compra = [];

  var produtos = require('./data/data.json').produtos;
  var item_compra = require('./data/data.json').item_compra;
  var usuarios = require('./data/data.json').usuario;
  var compras = require('./data/data.json').compras;

  // compras.find(x => x.id === 1)

  const mostrar = () => {

    usuarios.find(x => x.id === compras)

    alert("Amostra")
  }

  return (
    <div className="App">

      <div className='cont'>
        <h1> Usuarios</h1>
        {usuarios.map(x => (
          <li>
          {x.id} , {x.nome}, {x.data_compra}
          </li>
        ))}
      </div>
      <div className='cont'>
        <h1> Compras</h1>
        {compras.map(x => (
          <li>
            {x.id} , {x.id_usuario}, {x.data_compra}
          </li>
        ))}

      </div>

      <div className='cont'>
        <h1> Produtos</h1>
        {produtos.map(x => (
          <li>
            {x.id} , {x.nome}, {'R$' + x.preco}
          </li>
        ))}

      </div>


      <div className='cont'>
        <h1> item_compras</h1>
        {produtos.map(x => (
          <li>
            {x.nome}
          </li>
        ))}

      </div>

      <div>
        <p>
          Tendo em vista as tabelas supracitadas, faça um endpoint que retorne o nome e id de todos os
          usuários que tenham feito pelo menos 3 compras de pelo menos 30 reais (a soma do preco dos
          itens deve ser maior = 30) em produtos que contenham a string "Leite" no nome e que a compra tenha
          sido consumada entre start date e end_date (esses dois parâmetros devem ser enviados para o
          endpoint). Também deve ser retornada a data em que a compra foi feita.
        </p>

        <button onClick={mostrar}> Mostrar</button>

      </div>
    </div>
  );
}

export default App;
