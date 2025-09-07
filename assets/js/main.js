// --- CADASTRO DE TAREFA ---
const form = document.getElementById("form_task");
if (form) {
    form.addEventListener("submit", function(event){
        event.preventDefault(); // Evita recarregar a página

        const tarefa = document.getElementById("what_to_do").value;
        const data_inicio = document.getElementById("start_date").value;
        const data_fim = document.getElementById("due_date").value;

        // Recupera tarefas já salvas
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        // Adiciona nova tarefa
        tarefas.push({
            tarefa: tarefa,
            inicio: data_inicio,
            fim: data_fim
        });

        // Salva no LocalStorage
        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        // Redireciona para a página inicial
        window.location.href = "../index.html";
    });
}

// --- CARREGAR LISTA DE TAREFAS ---
function carregarTarefas(){
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const taskList = document.getElementById("taskList");

    if (!taskList) return; // se não existir, não faz nada

    taskList.innerHTML = ""; // limpa a lista

    tarefas.forEach((t, index) =>{
        const div = document.createElement("div");
        div.classList.add("task");

        div.innerHTML = `
            <section class="to_do">
                <label>
                    <input type="checkbox" onchange="marcarTarefa(${index}, this.checked)"
                        ${t.concluida ? "checked" : ""}>
                    ${t.tarefa}
                </label>
                <div>
                    Início: ${t.inicio} <br>
                    Validade: ${t.fim}
                </div>
            </section>
        `;

        // ✅ aplica a classe se já estiver concluída
        if (t.concluida) {
            div.classList.add("concluida");
        }
        taskList.appendChild(div);
    });
}

function marcarTarefa(index, concluida){
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    // adiciona ou atualiza a flag "concluida"
    tarefas[index].concluida = concluida;

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    carregarTarefas();
}



// --- Executa carregarTarefas automaticamente quando abrir o index ---
document.addEventListener("DOMContentLoaded", carregarTarefas);




// Cadastro de uma rotina
const form_rotina = document.getElementById("form_routine");
if (form_rotina) {
    form_rotina.addEventListener("submit", function(event){
        event.preventDefault(); // Evita recarregar a página

        const habito = document.getElementById("goal").value;

        const select = document.getElementById("establish_your_goal");
        const meta = select.options[select.selectedIndex].text;
        
        const horario = document.getElementById("time_to_do").value;

        // Recupera hábitos já salvos
        let habitos = JSON.parse(localStorage.getItem("habitos")) || [];

        // Adiciona novo hábito
        habitos.push({
            habito: habito,
            meta: meta,
            horario: horario
        });

        // Salva no LocalStorage
        localStorage.setItem("habitos", JSON.stringify(habitos));

        // Redireciona para a página inicial
        window.location.href = "../index.html";
    });
}


function carregarRotinas(){
    let habitos = JSON.parse(localStorage.getItem("habitos")) || [];
    const routinesList = document.getElementById("routineList");

    if (!routinesList) return; // se não existir, não faz nada

    routinesList.innerHTML = ""; // limpa a lista

    habitos.forEach((h, index) =>{
        const div = document.createElement("div");
        div.classList.add("task");

        div.innerHTML = `
            <section class="routines">
                <label>
                    <input type="checkbox" onchange="marcarRotina(${index}, this.checked)" 
                        ${h.concluida ? "checked" : ""}>
                    ${h.habito}
                </label>
                <div>
                    Meta: ${h.meta} <br>
                    Horário: ${h.horario}
                </div>
            </section>
        `;

        // ✅ aplica a classe se já estiver concluída
        if (h.concluida) {
            div.classList.add("concluida");
        }

        routinesList.appendChild(div);
    });
}

function marcarRotina(index, concluida){
    let habitos = JSON.parse(localStorage.getItem("habitos")) || [];

    // adiciona ou atualiza a flag "concluida"
    habitos[index].concluida = concluida;

    localStorage.setItem("habitos", JSON.stringify(habitos));

    carregarRotinas();
}

// Executa carregarRotinas quando abrir
document.addEventListener("DOMContentLoaded", carregarRotinas);