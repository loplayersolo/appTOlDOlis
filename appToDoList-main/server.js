// importa o framework express para facilitar a criação de apis com node.js
const express = require('express');
 
// importa o móludo cors para permitir requisições de diferentes origens
const cors = require('cors');
 
//cria uma instancia da aplicação express
const app = express();
 
// define a porta que o servidor irá ridar
const port = 3000;
 
//aplica o middleware cors para permitir requisições de diferentes origens
app.use(cors());
 
/* Aplica o middleware express.json() que permite receber
e interpretar JSON no corpo das requisições (red.body)
 */
app.use(express.json());
 
//array em memória para simular um banco de dados
let tarefas = [];
 
/*------------------------ ROTAS DA API ------------------------*/
// Rota GET - retorna a lista com todas as tarefas
app.get('/tarefas', (req, res) => {
  res.json(tarefas); //Responde com a lista de tarefas em formato de JSON
});
 
// Rota POST - adiciona uma nova tarefa á lista
app.post('/tarefas', (req, res) => {
    //extrai o campo 'texto' enviado no corpo da requisição
   const { text } = req.body;
 
   //validação simples: verifica se o campo 'texto' foi enviado
    if (!text) {
     //se não foi enviado, responde com erro 400 (Bad Request)
     return res.status(400).json({ error: 'Texto é obrigatório' });
    }
 
  //Cria um novo objeto tarefa com id único baseado no timestamp atual
  const novaTarefa = {id: Date.now(), text} // Pega o corpo da requisição
 
  // Adiciona a nova tarefa ao array de tarefas
  tarefas.push(novaTarefa);
  // Responde com a nova tarefa criada e o codigo http (status) 201 => Criado
  res.status(201).json(novaTarefa);
});
 
//Rota Put - atualiza uma tarefa existente
app.put('/tarefas/:id', (req, res) => {
  //obtem o id da tarefa a ser atualizada a partir dos parametros da URL
  const id  = parseInt(req.params.id);
  //extrai o novo texto enviado no corpo da requisição
  const { texto } = req.body;
 
  //encontra a tarefa com o id correspondente
  const index = tarefas.find(tarefa => tarefa.id == id);
 
  //verifica se a tarefa existe
  if (!index) {
    //se não foi encontrada, responde com erro 404 (Not Found)
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
 
  //se um novo texto foi enviado, atualiza o campo 'texto' da tarefa
  if (texto) {
    tarefas[index].text = texto;
  }
  else {
    //se não foi enviado, mantem o texto atual
    index.texto = index.texto;
  }
  //responde com a tarefa atualizada
  res.json(tarefa);
});
 
// Rota DELETE - remove uma tarefa existente
app.delete('/tarefas/:id', (req, res) => {
  //obtem o id da tarefa a ser removida a partir dos parametros da URL
  const id = parseInt(req.params.id);
 
  //encontra o index da tarefa com o id correspondente
  const index = tarefas.findIndex(tarefa => tarefa.id == id);
 
  //verifica se a tarefa existe
  if (index === -1) {
    //se não foi encontrada, responde com erro 404 (Not Found)
    return res.status(404).json({ error: 'Tarefa não encontrada' });
  }
 
  //remove a tarefa do array de tarefas
  tarefas = tarefas.filter(tarefa => tarefa.id != id);
  //responde com sucesso e o código http (status) 204 => Sem Conteudo
  res.sendStatus(204).send();
});
 
 
 