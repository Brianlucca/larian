const input1 = document.getElementById("nome1");
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

const listasLocal =
  JSON.parse(localStorage.getItem("listas")) || [];

  function exibirLista() {
    div.innerHTML = ""; // Limpe o conteúdo para evitar duplicatas
  
    listasLocal.forEach(({ nome1, marcado }, index) => {
      const checked = marcado ? 'checked' : '';
      const marcadoClass = marcado ? 'marcado' : '';
  
      div.innerHTML += `<div style="border-radius: 1em; background-color: #d0f7ef; padding: 1em; margin: 0.8em;">
                          <p class="buttonResultado"onclick="excluirLista(${index})">X</p>
                          <input class="inputResultado" type="checkbox" ${checked} onclick="marcarCheckbox(${index})">
                          <p class="${marcadoClass}">${nome1}</h3>
                        </div>`;
    });
  }
  function marcarCheckbox(index) {
    listasLocal[index].marcado = ! listasLocal[index].marcado;
    localStorage.setItem("listas", JSON.stringify(listasLocal));
    exibirLista(); // Atualize a exibição após a marcação
  }
  
exibirLista(); // Chame a função para exibir as anotações iniciais

btn.addEventListener("click", () => {
  const nome1 = input1.value;

  const novaLista = {
    nome1,
  };

  listasLocal.push(novaLista);

  // Envie os dados para o Firebase
  salvarNoFirebase(novaLista);

  localStorage.setItem("listas", JSON.stringify(listasLocal));
  const mensagemDiv = document.getElementById("mensagemResultado");
  mensagemDiv.textContent =
    "Sua lista foi salva. Por favor, atualize a página.";
});

function salvarNoFirebase(novaLista) {
  const firebaseRef = database.ref("listas");
  firebaseRef.push(novaLista);
}

function excluirLista(index) {
  if (confirm("Tem certeza de que deseja excluir esta lista?")) {
    listasLocal.splice(index, 1);
    localStorage.setItem("listas", JSON.stringify(listasLocal));

    exibirLista(); // Atualize a exibição após a exclusão
  }
}
