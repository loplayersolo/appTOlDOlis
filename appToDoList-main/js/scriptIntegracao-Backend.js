const urlAPI = "http://localhost:3000/tarefas"
 
const inputTarefa = document.querySelector(".campo-tarefa");
 
const botaoAdicionar = document.querySelector(".botao-adicionar");
 
const listaTarefas = document.querySelector(".lista-tarefas");
 //*função para carregas as tarefas adicionadas na tela
async function renderizarTarefas() {

    try {
        const resposta = await fetch(urlAPI)
        const tarefas = await resposta.json();


        tarefas.forEach(tarefa => {
            const itemLista = document.createElement('li');
            itemLista.className = 'item-tarefa';
            itemLista.textContent = tarefa.titulo;

            const botaoRemover = document.createElement('button');
            botaoRemover.className =  'botao-remover';
            botaoRemover.textContent = 'Excluir';

            const botaoEditar = document.createElement('button');
            botaoEditar.className = 'botao-editar';
            botaoEditar.textContent = 'Editar';


            itemLista.appendChild(botaoRemover);
            itemLista.appendChild(botaoEditar);
            listaTarefas.appendChild(itemLista);

        })

    }

    catch (erro) {
        console.error("Erro ao renderizar tarefas:" + erro);
    }
}


async function adicionarTarefa(titulo) {
    try{
        await fetch(urlAPI, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: titulo
            })
        });

        // A cada nova tarefa aducionada, executa renderizarTarefas() para que todas apareçam na tela, inclusive a ultmia adicionada*/
        renderizarTarefas();
    }
    catch (error){
        console.error("Erro ao adicionar tarefa:", error)
    }
}
 
botaoAdicionar.addEventListener("click", function (evento){
    evento.preventDefault();
    const novaTarefa = inputTarefa.value.trim();
 
    if(novaTarefa !== ""){
        adicionarTarefa(novaTarefa);
        inputTarefa.value = "";
    }
});
 

//iNICIAR A aplicação com as tarefas ja renderizadas
renderizarTarefas();