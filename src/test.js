
import React from 'react';
import './App.css';

function Test() {

  const mergeArrays = (arr1 = [], arr2 = []) => {
    let res = [];
    res = arr1.map(obj => {
      const index = arr2.findIndex(el => el["id_usuario"] === obj["id"]);
      const { id_usuario, id, data_compra } = index !== -1 ? arr2[index] : {};
      return {
        ...obj,
        id,
        id_usuario,
        data_compra,
      };
    });
    return res;
  };

  var showResult = false;

  var item_compra = require('./data/data.json').item_compra;
  var produtos = require('./data/data.json').produtos;
  var usuarios = require('./data/data.json').usuario;
  var compras = require('./data/data.json').compras;
  var produtos_leite = produtos.filter(x => x.nome.includes("Leite"));

  const test = (users, purchase, itens, products) => {

    var users = users.map(function (item) { return item.id })
    var b = purchase.map(function (item) { return item.id_usuario })
    var compr = purchase.map(function (item) { return item.id })
    var c = itens.map(function (item) { return item.id_compra })
    var d = itens.map(function (item) { return item.id_produto })
    var e = products.map(function (item) { return item.id })

    if (users.filter(v => b.includes(v))) {

      var users_have_purch = users.filter(v => c.includes(v));

      const count = {};

      users_have_purch.forEach(element => {
        count[element] = (count[element] || 0) + 1;
      });

      if (compr.filter(v => c.includes(v)) && users_have_purch.filter(x => x >= 3)) {

        if (d.filter(v => e.includes(v))) {

          var prod = d.filter(v => e.includes(v))

          if (prod === produtos_leite)
            prod.forEach(element => {
              count[element] += count[element];
            });

          return users.filter(x => x.id === users_have_purch)
        }
      }
    }
  }

  test(usuarios, compras, item_compra, produtos);

  const mostrar = () => {
    showResult = true;
    alert(showResult)
  }

  function myFunc(array, prop) {

    return array.reduce(function (acc, item) {

      let key = item[prop]

      if (!acc[key]) {

        acc[key] = []

      }

      acc[key].push(item)

      return acc

    }, {})

  }

  const qtde_compras_por_usuario = [];

  compras.forEach((x) => {
    qtde_compras_por_usuario[x.id_usuario] = (qtde_compras_por_usuario[x.id_usuario] || 0) + 1;
  });

  // console.log("Contagem de compras por usuario: ", qtde_compras_por_usuario)

  var user_purchase = mergeArrays(usuarios, compras);
  var purchases = user_purchase.filter(x => x.id !== undefined)
  let groupedStudent = myFunc(purchases, 'id_usuario')

  // console.log("Usuarios e compras", groupedStudent)
  // console.log("Produtos que contém 'Leite' no nome", produtos_leite)
  // console.log("Compras feitas: ", purchases)

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
            SELECT U.NOME, U.ID, C.DATA
            FROM USUARIO U
            <br />
            INNER JOIN COMPRA C
            ON U.ID = C.ID_USUARIO
            <br />
            INNER JOIN ITEM_COMPRA IC
            ON C.ID = IC.ID_COMPRA
            <br />
            INNER JOIN PRODUTOS P
            ON IC.ID_PRODUTO = P.ID
            <br />
            WHERE 3 {'<='} (SELECT COUNT(*)
            FROM COMPRAS WHERE USUARIOID = U.ID
            FROM USUARIO)<br />
            AND<br />
            WHERE COUNT(P.PRECO) {'<='} 30<br />
            AND<br />
            WHERE P.NOME LIKE 'LEITE%'<br />
            AND<br />
            WHERE C.DATA BETWEEN '2021-04-16' AND '2021-04-23'

          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;