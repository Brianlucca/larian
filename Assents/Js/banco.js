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
const musicasEnviadas = [];
// Função para enviar dados para o Firebase
function enviarParaFirebase() {
  const arquivoInput = document.getElementById("arquivo");
  const nome = document.getElementById("nome").value;
  const url = document.getElementById("url").value;

  // Verifique se um arquivo foi selecionado
  if (!arquivoInput.files[0]) {
    alert("Por favor, selecione um arquivo.");
    return;
  }

  // Verifique se o nome e a URL não estão em branco
  if (nome.trim() === "" || url.trim() === "") {
    alert("Por favor, preencha o nome e a URL.");
    return;
  }

  const storage = firebase.storage();
  const storageRef = storage.ref();

  // Crie uma referência única para o arquivo usando um timestamp
  const timestamp = new Date().getTime();
  const arquivoRef = storageRef.child(
    `musicas/${timestamp}_${arquivoInput.files[0].name}`
  );

  // Faça o upload do arquivo
  arquivoRef
    .put(arquivoInput.files[0])
    .then(() => {
      // Após o upload do arquivo, obtenha a URL de download
      arquivoRef.getDownloadURL().then((downloadURL) => {
        // Adicione as informações da música à lista
        musicasEnviadas.push({ nome, arquivoURL: downloadURL });
        // Atualize a seção "Em breve" com todas as músicas na lista
        atualizarEmBreve();
        // Referência ao banco de dados
        const database = firebase.database();
        const ref = database.ref("musicas"); // Substitua "musicas" pelo caminho desejado

        // Crie um novo nó com os dados do formulário e a URL do arquivo
        const novaMusicaRef = ref.push();
        novaMusicaRef.set(
          {
            nome: nome,
            url: url,
            arquivoURL: downloadURL, // URL de download do arquivo
          },
          (error) => {
            if (error) {
              console.error(
                "Erro ao enviar dados: " + error.message
              );
            } else {
              console.log("Dados enviados com sucesso!");
            }
          }
        );

        // Limpe os campos do formulário
        document.getElementById("nome").value = "";
        document.getElementById("url").value = "";
        arquivoInput.value = ""; // Limpe o campo de seleção de arquivo
      });
    })
    .catch((error) => {
      console.error("Erro ao fazer upload do arquivo: " + error.message);
    });

  function atualizarEmBreve() {
    const musicList = document.getElementById("musicList");
    musicList.innerHTML = ""; // Limpar a lista de músicas

    musicasEnviadas.forEach((musica) => {
      const li = document.createElement("li");
      li.innerHTML = `A música "${musica.nome}" foi enviada e estará disponível em breve.`;
      musicList.appendChild(li);
    });
  }
}
