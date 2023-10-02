const textarea = document.getElementById("anotacao");
const input = document.getElementById("data");
const input2 = document.getElementById("hora");
const select = document.getElementById("opcao");
const btn = document.querySelector("button");
const div = document.getElementById("resultado");

const firebaseConfig = {
  apiKey: "AIzaSyDdAz80uSFEYSVRgOzoV-p7IGMcnIkc7Og",
  authDomain: "musicas-34b84.firebaseapp.com",
  databaseURL: "https://musicas-34b84-default-rtdb.firebaseio.com",
  projectId: "musicas-34b84",
  storageBucket: "musicas-34b84.appspot.com",
  messagingSenderId: "980655490969",
  appId: "1:980655490969:web:e6f75df4f533c1c0a0b508",
  measurementId: "G-KP78DQYW4D",
};

const app = firebase.initializeApp(firebaseConfig);

const database = firebase.database();

const bancodedadosLocal =
  JSON.parse(localStorage.getItem("bancodedados")) || [];

function exibirAnotacoes() {
  div.innerHTML = ""; // Limpe o conteúdo para evitar duplicatas

  bancodedadosLocal.map(({ anotacao, opcao, data, hora }, index) => {
    div.innerHTML += `<div style="border: 1px solid white; margin: 1em; padding: 0.4em; border-radius: 0.3em; background-color: white; width: 25em; display: inline-block; color: black">
                        <h3>${anotacao}</h3>
                        <hr>
                        <p style="background-color: rgba(45, 38, 136, 0.808); width: 15em; border-radius: 0.2em; padding: 0.2em; margin: 0.2em;">${opcao}, ${data} ás ${hora}</p>
                        <button onclick="excluirAnotacao(${index})">Excluir</button>
                      </div>`;
  });
}

exibirAnotacoes(); // Chame a função para exibir as anotações iniciais

btn.addEventListener("click", () => {
  const anotacao = textarea.value;
  const opcao = select.value;
  const data = input.value;
  const hora = input2.value;

  const novaAnotacao = {
    anotacao,
    opcao,
    data,
    hora,
  };

  bancodedadosLocal.push(novaAnotacao);

  // Envie os dados para o Firebase
  salvarNoFirebase(novaAnotacao);

  localStorage.setItem("bancodedados", JSON.stringify(bancodedadosLocal));
  const mensagemDiv = document.getElementById("mensagemResultado");
  mensagemDiv.textContent =
    "Sua anotação foi salva. Por favor, atualize a página.";
});

function salvarNoFirebase(novaAnotacao) {
  const firebaseRef = database.ref("anotacoes");
  firebaseRef.push(novaAnotacao);
}

function excluirAnotacao(index) {
  if (confirm("Tem certeza de que deseja excluir esta anotação?")) {
    bancodedadosLocal.splice(index, 1);
    localStorage.setItem("bancodedados", JSON.stringify(bancodedadosLocal));

    exibirAnotacoes(); // Atualize a exibição após a exclusão
  }
}
