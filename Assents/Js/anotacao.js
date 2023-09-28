const textarea = document.getElementById("anotacao");
const input = document.getElementById("data");
const input2 = document.getElementById("hora");
const select = document.getElementById("opcao");
const btn = document.querySelector("button");
const div = document.getElementById("resultado");

// Inicialize o Firebase (substitua as configurações pelo seu próprio projeto do Firebase)
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
    div.innerHTML += `<div>
                        <h3>${anotacao}</h3>
                        <p>${opcao}, ${data} ás ${hora}</p>
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
  const mensagemDiv = document.getElementById("resultado");
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
