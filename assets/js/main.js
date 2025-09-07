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
            fim: data_fim,
            concluida: false
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

    // ✅ FILTRAR apenas tarefas não concluídas para exibir
    tarefas.forEach((t, index) =>{
        if (t.concluida) return; // Pula tarefas já concluídas

        const div = document.createElement("div");
        div.classList.add("task");
        div.setAttribute("data-index", index); // Para identificar a tarefa

        div.innerHTML = `
            <section class="to_do">
                <label>
                    <input type="checkbox" onchange="marcarTarefa(${index}, this.checked)">
                    ${t.tarefa}
                </label>
                <div>
                    Início: ${t.inicio} <br>
                    Validade: ${t.fim}
                </div>
            </section>
        `;

        taskList.appendChild(div);
    });
}

// FUNÇÃO CORRIGIDA com animação
function marcarTarefa(index, concluida){
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    const taskDiv = document.querySelector(`.task[data-index="${index}"]`);
    
    if (!taskDiv) return; // Proteção contra erros
    
    // adiciona ou atualiza a flag "concluida"
    tarefas[index].concluida = concluida;
    localStorage.setItem("tarefas", JSON.stringify(tarefas));

    if (concluida) {
        // ✅ DESABILITA o checkbox para evitar cliques duplos
        const checkbox = taskDiv.querySelector('input[type="checkbox"]');
        checkbox.disabled = true;
        
        // Primeiro aplica o estilo riscado
        taskDiv.classList.add("concluida");
        
        // Depois de um tempo, aplica a animação de saída
        setTimeout(() => {
            taskDiv.classList.add("saindo");
            
            // Remove do DOM após a animação
            setTimeout(() => {
                // ✅ REMOVE definitivamente da lista
                tarefas = tarefas.filter((_, i) => i !== index);
                localStorage.setItem("tarefas", JSON.stringify(tarefas));
                
                // Recarrega para reindexar
                carregarTarefas();
            }, 600); // Tempo da animação CSS
        }, 1500); // Aguarda 1.5s mostrando riscado
    }
}

// --- Executa carregarTarefas automaticamente quando abrir o index ---
document.addEventListener("DOMContentLoaded", carregarTarefas);

// --- CADASTRO DE ROTINA ---
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
            horario: horario,
            concluida: false
        });

        // Salva no LocalStorage
        localStorage.setItem("habitos", JSON.stringify(habitos));

        // Redireciona para a página inicial
        window.location.href = "../index.html";
    });
}

// --- CARREGAR ROTINAS ---
function carregarRotinas(){
    let habitos = JSON.parse(localStorage.getItem("habitos")) || [];
    const routinesList = document.getElementById("routineList");

    if (!routinesList) return; // se não existir, não faz nada

    routinesList.innerHTML = ""; // limpa a lista

    habitos.forEach((h, index) =>{
        const div = document.createElement("div");
        div.classList.add("task");
        div.setAttribute("data-routine-index", index);

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

// Função para marcar rotinas com animação
function marcarRotina(index, concluida){
    let habitos = JSON.parse(localStorage.getItem("habitos")) || [];
    const routineDiv = document.querySelector(`.task[data-routine-index="${index}"]`);

    if (!routineDiv) return; // Proteção contra erros

    // adiciona ou atualiza a flag "concluida"
    habitos[index].concluida = concluida;
    localStorage.setItem("habitos", JSON.stringify(habitos));

    if (concluida) {
        // ✅ DESABILITA o checkbox para evitar cliques duplos
        const checkbox = routineDiv.querySelector('input[type="checkbox"]');
        checkbox.disabled = true;
        
        // Primeiro aplica o estilo riscado
        routineDiv.classList.add("concluida");
        
        // Depois de um tempo, aplica a animação de saída
        setTimeout(() => {
            routineDiv.classList.add("saindo");
            
            // Remove do DOM após a animação, mas não remove permanentemente
            setTimeout(() => {
                // ✅ Para rotinas, apenas desmarca (são recorrentes)
                habitos[index].concluida = false;
                localStorage.setItem("habitos", JSON.stringify(habitos));
                carregarRotinas();
            }, 600);
        }, 1500);
    } else {
        // Se desmarcou, remove as classes
        routineDiv.classList.remove("concluida", "saindo");
    }
}

// Executa carregarRotinas quando abrir
document.addEventListener("DOMContentLoaded", carregarRotinas);