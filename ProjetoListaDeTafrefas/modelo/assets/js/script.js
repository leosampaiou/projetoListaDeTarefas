const inputTarefa = document.querySelector('.input-tarefa');
const bntAdd = document.querySelector('.bnt-add');
const tarefas = document.querySelector('.tarefas');

inputTarefa.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput() {
    inputTarefa.value = "";
    inputTarefa.focus();
}

function criaBtnRemover(li) {
    li.innerText += ' '
    const btnRemover = document.createElement("button");
    btnRemover.innerText = 'Apagar';
    btnRemover.setAttribute('class', 'apagar')
    li.appendChild(btnRemover);

}

function criaChekBox(li) {
    const criaChekbox = document.createElement("input");
    criaChekbox.type = "checkbox";
    criaChekbox.setAttribute('class', 'concluido')
    li.prepend(criaChekbox);

    criaChekbox.addEventListener('click', function () {
        criaChekbox.setAttribute('checked', 'checked')

    })
}



function criaLi() {
    const li = document.createElement('li');
    return li;
}

function criaTarefa(texto) {
    const li = criaLi();
    li.innerText = texto;
    tarefas.appendChild(li);
    limpaInput();
    criaBtnRemover(li);
    criaChekBox(li);
    salvarTarefas();

}


bntAdd.addEventListener('click', function () {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function (e) {
    const el = e.target

    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
})

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem("tarefas");
    const listaDeTarefas = JSON.parse(tarefas);

    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();
