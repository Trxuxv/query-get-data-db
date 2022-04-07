import picture from './assets/picture.png';
import React from 'react';
import './App.css';

function App() {

  var item_compra = require('./data/data.json').item_compra;
  var produtos = require('./data/data.json').produtos;
  var usuarios = require('./data/data.json').usuario;
  var compras = require('./data/data.json').compras;

  const mostrar = () => {
    alert('SELECT DISTINCT U.NOME, U.ID, C.DATA_COMPRA    FROM USUARIO AS U   INNER JOIN COMPRAS AS C ON    U.ID = C.ID_USUARIO    INNER JOIN ITEM_COMPRA AS IC ON    C.ID = IC.ID_COMPRA     INNER JOIN PRODUTO AS P ON    IC.ID_PRODUTO = P.ID    WHERE 3 >= (SELECT COUNT(C.ID_USUARIO) FROM COMPRAS AS C WHERE C.ID_USUARIO = U.ID)    AND P.NOME LIKE "LEITE%"    AND(SELECT COUNT(P.PRECO) FROM PRODUTO AS P) <= 30    AND C.DATA_COMPRA BETWEEN "2021-04-18" AND "2021-04-20"')
  }

  return (
    <div className="App">
      <div className='title'>
        <p>Simulation Back-End - SQL Query</p>
      </div>
      <div className='conts'>
        {/* Usuários */}
        <div className='cont'>
          <h2>Usuários</h2>
          <ul>
            <th className='td-1'>ID</th> <th className='td-2'>Nome</th>
          </ul>
          {usuarios.map(x => (
            <ul>
              <td className='td-1'>{x.id}</td>
              <td className='td-2'>{x.nome}</td>
            </ul>
          ))}
        </div>

        {/* Compras */}
        <div className='cont'>
          <h2>Compras</h2>
          <ul>
            <th className='td-1'>ID</th> <th className='td-2'>Usuario ID</th><th className='td-2'>Data</th>
          </ul>
          {compras.map(x => (
            <ul>
              <td className='td-1'>{x.id}</td>
              <td className='td-2'>{x.id_usuario}</td>
              <td className='td-2'>{x.data_compra}</td>
            </ul>
          ))}
        </div>

        {/* Produtos */}
        <div className='cont'>
          <h2>Produtos</h2>
          <ul>
            <th className='td-1'>ID</th> <th className='td-2'>Nome</th><th className='td-2'>Preço</th>
          </ul>
          {produtos.map(x => (
            <ul>
              <td className='td-1'>{x.id}</td>
              <td className='td-2'>{x.nome}</td>
              <td className='td-2'>{"R$" + x.preco}</td>
            </ul>
          ))}
        </div>

        {/* Itens */}
        <div className='cont'>
          <h2>Itens de compras</h2>
          <ul>
            <th className='td-1'>ID</th> <th className='td-2'>Produto ID</th><th className='td-2'>Compra ID</th>
          </ul>
          {item_compra.map(x => (
            <ul>
              <td className='td-1'>{x.id}</td>
              <td className='td-2'>{x.id_produto}</td>
              <td className='td-2'>{x.id_compra}</td>
            </ul>
          ))}
        </div>
      </div>

      <div className='question-card'>
        <div className='question'>
          <p>
            Tendo em vista as tabelas supracitadas, faça um endpoint que retorne o nome e id de todos os
            usuários que tenham feito pelo menos 3 compras de pelo menos 30 reais (a soma do preco dos
            itens deve ser maior = 30) em produtos que contenham a string "Leite" no nome e que a compra tenha
            sido consumada entre start date e end_date (esses dois parâmetros devem ser enviados para o
            endpoint). Também deve ser retornada a data em que a compra foi feita.
          </p>

          <div className='input-date'>
            <label>Data Inicial</label>
            <br />
            <input type="date" placeholder='Data inicial' />
          </div>
          <div className='input-date'>
            <label>Data final</label>
            <br />
            <input type="date" placeholder='Data final' />
          </div>

          <button className='button-show' onClick={mostrar}> Resultado</button>
        </div>
        <div className='result'>
          <div className='query'>
            SELECT DISTINCT U.NOME, U.ID, C.DATA_COMPRA <br />
            FROM USUARIO AS U <br />
            INNER JOIN COMPRAS AS C ON <br />
            U.ID = C.ID_USUARIO <br />
            INNER JOIN ITEM_COMPRA AS IC ON <br />
            C.ID = IC.ID_COMPRA <br />
            INNER JOIN PRODUTO AS P ON <br />
            IC.ID_PRODUTO = P.ID <br />
            WHERE 3{' >= '}( SELECT COUNT(C.ID_USUARIO) FROM COMPRAS AS C  WHERE C.ID_USUARIO = U.ID ) <br />
            AND P.NOME LIKE 'leite%' <br />
            AND  (SELECT COUNT(P.PRECO) FROM PRODUTO AS P) {'<= '}30 <br />
            AND  C.DATA_COMPRA BETWEEN '2021-04-18' AND '2021-04-20' <br />
          </div>
          <div>
            <img src={picture} alt='image' />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
