document.getElementById("form_task").addEventListener("submit", function(event){
    event.preventDefault(); //Evita que a página seja recarregada;

    const tarefa = document.getElementById("what_to_do").value;
    const data_inicio = document.getElementById("start_date").value;
    const data_fim = document.getElementById("due_date").value;


    //Serve para recuperar as tarefas já salvas
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    //Adiciona tarefas para o JSON
    tarefa.push({
        tarefa: tarefa,
        inicio: data_inicio,
        fim: data_fim
    });


    //Salva no LocalStorage
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    //Redireciona para a página inicial
    window.location.href = "../index.html";
});


function carregarTarefas(){
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const taskList = document.getElementById("taskList");


    taskList.innerHTML = ""; //Aqui, serve para limpar a lista;

    tarefas.foreach((task, index) =>{
        const div = document.createElement("div");
        div.classList.add("task");div.innerHTML = `
                    <span>
                        <input type="checkbox"> ${t.tarefa}
                    </span>
                    <span>
                        <div>
                            Início: ${t.inicio} <br>
                            Validade: ${t.validade}
                        </div>
                    </span>
                    <div class="delete_button" onclick="excluirTarefa(${index})">Excluir</div>
                `;

                taskList.appendChild(div);


    })
}