// Os dados ficam apenas na memória.
// Se a página for atualizada, eles serão apagados.
const jogos = [];

const app = document.querySelector("#app");
const botoesMenu = document.querySelectorAll("nav button");

function marcarMenuAtivo(rota) {
  botoesMenu.forEach(botao => {
    botao.classList.toggle("ativo", botao.dataset.rota === rota);
  });
}

function irPara(rota) {
  marcarMenuAtivo(rota);

  if (rota === "inicio") mostrarInicio();
  if (rota === "cadastro") mostrarCadastro();
  if (rota === "lista") mostrarLista();
  if (rota === "sobre") mostrarSobre();
}

function mostrarInicio() {
  const totalFavoritos = jogos.filter(jogo => jogo.favorito).length;

  app.innerHTML = `
    <h1>Favorite Game - Catálogo de Jogos</h1>
    <p>
      <em>The right game in the right place.</em>
      Organize seus jogos preferidos em um só lugar, de forma simples e rápida.
      A navegação acontece sem recarregar a página.
    </p>

    <p>
      Os jogos cadastrados ficam temporariamente guardados em um array JavaScript.
    </p>

    <div class="contador">
      Jogos cadastrados nesta sessão: <strong>${jogos.length}</strong><br />
      Jogos favoritos: <strong>${totalFavoritos}</strong>
    </div>

    <div class="acoes">
      <button class="botao" id="btnCadastrar">Cadastrar jogo</button>
      <button class="botao secundario" id="btnVerJogos">Ver catálogo</button>
    </div>
  `;

  document.querySelector("#btnCadastrar")
    .addEventListener("click", () => irPara("cadastro"));

  document.querySelector("#btnVerJogos")
    .addEventListener("click", () => irPara("lista"));
}

function mostrarCadastro() {
  app.innerHTML = `
    <h1>Cadastrar Jogo</h1>

    <form id="formJogo">
      <div class="campo">
        <label for="nome">Nome do jogo</label>
        <input id="nome" type="text" placeholder="Ex.: Devil May Cry 5" required />
      </div>

      <div class="campo">
        <label for="genero">Gênero</label>
        <input id="genero" type="text" placeholder="Ex.: Ação, Aventura, RPG" required />
      </div>

      <div class="campo">
        <label for="plataforma">Plataforma</label>
        <input id="plataforma" type="text" placeholder="Ex.: PC, PlayStation, Xbox" required />
      </div>

      <div class="campo">
        <label for="ano">Ano de lançamento</label>
        <input id="ano" type="number" min="1970" max="2100" placeholder="Ex.: 2019" required />
      </div>

      <button class="botao" type="submit">Salvar jogo</button>
      <div id="mensagem"></div>
    </form>
  `;

  document.querySelector("#formJogo").addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const genero = document.querySelector("#genero").value.trim();
    const plataforma = document.querySelector("#plataforma").value.trim();
    const ano = document.querySelector("#ano").value.trim();

    jogos.push({
      nome,
      genero,
      plataforma,
      ano,
      favorito: false
    });

    document.querySelector("#mensagem").innerHTML =
      `<div class="mensagem">Jogo cadastrado com sucesso.</div>`;

    evento.target.reset();
  });
}

function mostrarLista() {
  app.innerHTML = `
    <h1>Catálogo de Jogos</h1>
    <p>Esta tabela é criada dinamicamente pelo JavaScript a partir do array de jogos.</p>
    <div id="conteudoLista"></div>
  `;

  renderizarTabela();
}

function renderizarTabela() {
  const conteudo = document.querySelector("#conteudoLista");

  if (jogos.length === 0) {
    conteudo.innerHTML = `
      <div class="vazio">
        Nenhum jogo cadastrado ainda.
      </div>
    `;
    return;
  }

  let linhas = "";

  jogos.forEach((jogo, indice) => {
    linhas += `
      <tr>
        <td>${jogo.favorito ? "★" : "☆"}</td>
        <td>${jogo.nome}</td>
        <td>${jogo.genero}</td>
        <td>${jogo.plataforma}</td>
        <td>${jogo.ano}</td>
        <td>
          <button class="favoritar ${jogo.favorito ? "ativo" : ""}" data-indice="${indice}">
            ${jogo.favorito ? "Desfavoritar" : "Favoritar"}
          </button>
          <button class="excluir" data-indice="${indice}">Excluir</button>
        </td>
      </tr>
    `;
  });

  conteudo.innerHTML = `
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Nome</th>
          <th>Gênero</th>
          <th>Plataforma</th>
          <th>Ano</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        ${linhas}
      </tbody>
    </table>
  `;

  document.querySelectorAll(".favoritar").forEach(botao => {
    botao.addEventListener("click", function() {
      const indice = Number(this.dataset.indice);
      jogos[indice].favorito = !jogos[indice].favorito;
      renderizarTabela();
    });
  });

  document.querySelectorAll(".excluir").forEach(botao => {
    botao.addEventListener("click", function() {
      const indice = Number(this.dataset.indice);
      jogos.splice(indice, 1);
      renderizarTabela();
    });
  });
}

function mostrarSobre() {
  app.innerHTML = `
    <h1>Sobre o projeto</h1>
    <p>
      O Favorite Game é uma Single Page Application simples, criada para
      catalogar jogos e marcar os favoritos.
    </p>
    <p>
      Existe apenas um arquivo HTML. Ao clicar nas opções do menu,
      o JavaScript modifica o conteúdo do elemento <strong>#app</strong>.
    </p>
    <p>
      O projeto também demonstra cadastro em array, manipulação do DOM,
      eventos de clique, envio de formulário, listagem, favoritar e exclusão.
    </p>
  `;
}

botoesMenu.forEach(botao => {
  botao.addEventListener("click", () => {
    irPara(botao.dataset.rota);
  });
});

mostrarInicio();
