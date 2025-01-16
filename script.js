const tarefaName = document.getElementById('tarefaName');
const addTarefa = document.getElementById('addTarefa');
let completo = document.getElementById('completo');
let incompleto = document.getElementById('incompleto');
const tarefas = document.getElementById('tarefas');
let i = 0;
completo.innerText = 0
incompleto.innerText = 0

function salvarTarefas() {
    const tarefasList = [];
    const tarefasDivs = document.querySelectorAll('.tarefa-div');

    tarefasDivs.forEach(div => {
        const tarefa = div.querySelector('p');
        const input = div.querySelector('input');
        
        tarefasList.push({
            id: div.id,
            tarefaText: tarefa.innerText,
            completed: input.checked
        });
    });

    localStorage.setItem('tarefas', JSON.stringify(tarefasList));

    localStorage.setItem('completo', completo.innerText);
    localStorage.setItem('incompleto', incompleto.innerText);
}

function carregarTarefas() {
    const tarefasSalvas = JSON.parse(localStorage.getItem('tarefas'));
    const completoSalvo = localStorage.getItem('completo');
    const incompletoSalvo = localStorage.getItem('incompleto');

    if (tarefasSalvas) {
        tarefasSalvas.forEach(item => {
            const div = document.createElement('div');
            div.id = item.id;
            div.classList.add('tarefa-div');

            const input = document.createElement('input');
            input.type = 'checkbox';
            input.id = item.id;
            input.checked = item.completed;

            const tarefa = document.createElement('p');
            tarefa.id = `tarefa${item.id}`;
            tarefa.innerText = item.tarefaText;

            const Delete = document.createElement('p');
            Delete.className = 'fim';
            Delete.id = `delete${item.id}`;
            Delete.innerText = 'delete';
            Delete.addEventListener('click', function () {
                completo.innerText++;
                incompleto.innerText--;
                tarefas.removeChild(div);
                salvarTarefas();
            });

            const edit = document.createElement('p');
            edit.className = 'fim';
            edit.id = `Edit${item.id}`;
            edit.innerText = 'Edit';
            edit.addEventListener('click', () => {
                const newText = prompt('Edit the task:', tarefa.innerText);
                if (newText !== null) {
                    tarefa.innerText = newText;
                    salvarTarefas();
                }
            });

            div.append(input, tarefa, Delete, edit);
            tarefas.appendChild(div);

            
            if (input.checked) {
                completo.innerText++;
            } else {
                incompleto.innerText++;
            }

            input.addEventListener('click', () => {
                if (input.checked) {
                    incompleto.innerText--;
                    completo.innerText++;
                    tarefa.style.textDecoration = 'line-through';
                    tarefa.style.color = '#cacaca';
                    tarefa.style.fontStyle = 'italic';
                } else {
                    completo.innerText--;
                    incompleto.innerText++;
                    tarefa.style.textDecoration = 'none';
                    tarefa.style.color = 'white';
                    tarefa.style.fontStyle = 'normal';
                }
                salvarTarefas();
            });
        });
    }

    if (completoSalvo) {
        completo.innerText = completoSalvo;
    }

    if (incompletoSalvo) {
        incompleto.innerText = incompletoSalvo;
    }
}

window.onload = carregarTarefas;

addTarefa.addEventListener('click', () => {
    incompleto.innerText++;
    
    const div = document.createElement('div');
    div.id = i + 1;
    div.classList.add('tarefa-div');

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = i + 1;

    const tarefa = document.createElement('p');
    tarefa.id = `tarefa${i + 1}`;
    tarefa.innerText = tarefaName.value;

    const Delete = document.createElement('p');
    Delete.className = 'fim';
    Delete.id = `delete${i + 1}`;
    Delete.innerText = 'delete';
    Delete.addEventListener('click', function () {
        completo.innerText++;
        incompleto.innerText--;
        tarefas.removeChild(div);
        salvarTarefas();
    });

    const edit = document.createElement('p');
    edit.className = 'fim';
    edit.id = `Edit${i + 1}`;
    edit.innerText = 'Edit';
    edit.addEventListener('click', () => {
        const newText = prompt('Edit the task:', tarefa.innerText);
        if (newText !== null) {
            tarefa.innerText = newText;
            salvarTarefas();
        }
    });

    div.append(input, tarefa, Delete, edit);
    tarefas.appendChild(div);

    input.addEventListener('click', () => {
        if (input.checked) {
            incompleto.innerText--;
            completo.innerText++;
            tarefa.style.textDecoration = 'line-through';
            tarefa.style.color = '#cacaca';
            tarefa.style.fontStyle = 'italic';
        } else {
            completo.innerText--;
            incompleto.innerText++;
            tarefa.style.textDecoration = 'none';
            tarefa.style.color = 'white';
            tarefa.style.fontStyle = 'normal';
        }
        salvarTarefas();
    });

    tarefaName.value = '';
    i++;

    salvarTarefas();
});
