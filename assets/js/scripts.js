function checklist() {
    const form = document.querySelector(".form");
    const lista = document.querySelector('ul')
    const inputValue = document.querySelector(".tarefa");

    form.addEventListener('submit', function(){
        const getValue = inputValue.value;
        criaTarefa(getValue);
        inputValue.value=''
        salvarTarefas()
    });

    document.addEventListener('click', function (e) {
        const element = e.target;
        if (element.classList.contains('close')) {
            element.parentElement.remove();
            salvarTarefas()
        };
        if (element.classList.contains('alterationBtn')) {
            const button = element;
            button.classList.remove('alterationBtn');
            button.classList.add('endAlteration');
            const input = inputMdn();
            input.setAttribute('placeholder', 'Alteração aqui')
            const old = button.parentElement.querySelector('li');
            button.parentElement.replaceChild(input, old);
        } else if (element.classList.contains('endAlteration')) {
            element.classList.add('alterationBtn');
            element.classList.remove('endAlteration');
            const valor = element.parentElement.querySelector('.inputMdn');
            const filho = criaLi(valor.value);
            element.parentElement.replaceChild(filho, valor);
            salvarTarefas()
        };

    });
    
    document.addEventListener('keypress', function (e) {
        const elem = e.target;
        if (e.key === 'Enter') {
            if (elem.classList.contains('inputMdn')) {
                const element = elem.parentElement.querySelector('.endAlteration')
                element.classList.add('alterationBtn');
                element.classList.remove('endAlteration');
                const valor = element.parentElement.querySelector('.inputMdn');
                const filho = criaLi(valor.value);
                element.parentElement.replaceChild(filho, valor);
                salvarTarefas()
            }
        }
    })

    // Funcções novas
    function inputAlt(value, id) {
        const input = document.createElement('input');
        input.classList.add(`${value}`);
        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', `${id}`)
        return input
    }

    function inputMdn(){
        const input = document.createElement('input');
        input.classList.add('inputMdn');
        input.setAttribute('type', 'text');
        return input
    }

    function criaLi(value) {
        const li = document.createElement('li');
        li.innerText += value;
        return li
    };

    function criaButton(value, id) {
        const button = document.createElement('button');
        button.classList.add(value);
        button.setAttribute('id', id)
        return button
    };

    function criaDiv() {
        const div = document.createElement('div');
        return div
    }

    function criaTarefa(value) {
        const div = criaDiv();
        const closeBtn = criaButton('close', 'close');
        const alterarionBtn = criaButton('alterationBtn', 'alteration')
        const li = criaLi(value);
        const listMarker = inputAlt('listmarker', 'marker');
        div.appendChild(listMarker);
        div.appendChild(li);
        div.appendChild(alterarionBtn)
        div.appendChild(closeBtn);
        lista.appendChild(div);
    };
    
    function salvarTarefas() {
        const liTarefas = lista.querySelectorAll('li');
        const listaTarefas = [];

        for (let tarefa of liTarefas){
            let tarefaTexto = tarefa.innerText;
            listaTarefas.push(tarefaTexto);
        };

        const tarefasJson = JSON.stringify(listaTarefas);
        localStorage.setItem('tarefas', tarefasJson);
    };

    function adcionaTarefasSalvas() {
        const tarefasSalvas = localStorage.getItem('tarefas');
        const listaTarefas = JSON.parse(tarefasSalvas);
        for (let tarefa of listaTarefas) {
            criaTarefa(tarefa)
        }
    }

    adcionaTarefasSalvas()

}

checklist()