const tarefaName = document.getElementById('tarefaName');
const addTarefa = document.getElementById('addTarefa');
let completo = document.getElementById('completo');
let incompleto = document.getElementById('incompleto');
const tarefas = document.getElementById('tarefas');
const img = document.querySelector('img')
const nav = document.querySelector('nav')
const p = document.querySelector('#p')
const ul = document.getElementById('ul')
const x = document.querySelector('#x')
const historico = document.getElementById('historico')
const cheia = document.querySelectorAll('.cheia')
const vazio = document.getElementById('vazio')
const AZ = document.getElementById('AZ')
const ZA = document.getElementById('ZA')
const data = document.getElementById('data')
const txt = []
let i = 0;
completo.innerText = 0
incompleto.innerText = 0

img.addEventListener('click', () => {
    if(localStorage.getItem('historico') == []) {
        vazio.style.display = 'block'
    } else {
        vazio.style.display = 'none'
    }
    nav.style.width = '25rem'
    nav.style.transition = '2s'
    x.style.display = 'block'
    setTimeout(() => {
        ul.style.display = 'block'
    }, 550);
})

x.addEventListener('click', function () {
    nav.style.width = '0px'
    nav.style.transition = '1s'
    x.style.display = 'none'
    setTimeout(() => {
        ul.style.display = 'none'
    }, 300);
})



function carregarHistorico() {
    // Recupera o histórico salvo do localStorage
    const historicoSalvo = JSON.parse(localStorage.getItem('historico'));
    
    // Se houver histórico salvo, cria os itens da lista
    if (historicoSalvo) {
        historicoSalvo.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = item;
            const para = document.createElement('p');
            para.id = 'inline';
            para.innerText = 'Deletar';
            li.appendChild(para);
            ul.append(li);

            li.addEventListener('click', () => {
                ul.removeChild(li);
                
                const updatedHistorico = historicoSalvo.filter(h => h !== item);
                localStorage.setItem('historico', JSON.stringify(updatedHistorico));
            });
        });
    }
}

window.onload = () => {
    carregarTarefas();
    carregarHistorico();
};




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


addTarefa.addEventListener('click', () => {
    incompleto.innerText++;
    
    const div = document.createElement('div');
    div.id = i + 1;
    div.classList.add('tarefa-div');
    
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = i + 1;
    
    const tarefa = document.createElement('p');
    tarefa.className = 'tarefa'
    tarefa.id = `tarefa${i + 1}`;
    tarefa.innerText = tarefaName.value;
    txt.push(tarefaName.value)
    
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
    
    
    let historicoSalvo = JSON.parse(localStorage.getItem('historico')) || [];
    
    txt.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = item;
        const para = document.createElement('p');
        para.id = 'inline';
        para.innerText = 'Deletar';
        li.appendChild(para);
        ul.append(li);

        li.addEventListener('click', () => {
            ul.removeChild(li);
            
            // Remove o item do histórico no localStorage
            historicoSalvo = historicoSalvo.filter(h => h !== item);
            localStorage.setItem('historico', JSON.stringify(historicoSalvo));
        });
        
        // Salva o item no histórico do localStorage
        historicoSalvo.push(item);
    });
    
    // Atualiza o histórico no localStorage
    localStorage.setItem('historico', JSON.stringify(historicoSalvo));
    
    salvarTarefas();
    
});

AZ.addEventListener('click', () => {
    const tarefas = document.querySelectorAll('#tarefas div');
    const tarefasArray = Array.from(tarefas);

    tarefasArray.sort((a, b) => {
        const tarefaA = a.querySelector('p').innerText.toLowerCase();
        const tarefaB = b.querySelector('p').innerText.toLowerCase();
        return tarefaA.localeCompare(tarefaB);
    });

    const tarefasContainer = document.getElementById('tarefas');
    tarefasContainer.innerHTML = ''; // Limpa as tarefas atuais

    tarefasArray.forEach(tarefa => {
        tarefasContainer.appendChild(tarefa); // Adiciona as tarefas ordenadas
    });
});

ZA.addEventListener('click', () => {
    const tarefas = document.querySelectorAll('#tarefas div');
    const tarefasArray = Array.from(tarefas);

    tarefasArray.sort((a, b) => {
        const tarefaB = b.querySelector('p').innerText.toLowerCase();
        const tarefaA = a.querySelector('p').innerText.toLowerCase();
        return tarefaB.localeCompare(tarefaA);
    });

    const tarefasContainer = document.getElementById('tarefas');
    tarefasContainer.innerHTML = ''; // Limpa as tarefas atuais

    tarefasArray.forEach(tarefa => {
        tarefasContainer.appendChild(tarefa); // Adiciona as tarefas ordenadas
    });
});

data.addEventListener('click', () => {
    const tarefas = document.querySelectorAll('#tarefas div');
    const tarefasArray = Array.from(tarefas);

    tarefasArray.sort((a, b) => {
        const idA = parseInt(a.id);
        const idB = parseInt(b.id);
        return idA - idB;
    });

    const tarefasContainer = document.getElementById('tarefas');
    tarefasContainer.innerHTML = ''; // Limpa as tarefas atuais

    tarefasArray.forEach(tarefa => {
        tarefasContainer.appendChild(tarefa); // Adiciona as tarefas ordenadas
    });
});
