tarefas = [];
var indiceParaEditar = -1; // criada fora de qualquer método se torna uma variável global.

function salvar(e) {
    // 13 é o código do enter no teclado
    if (e.keyCode == 13) {
        adicionarEditar();
    }
}

function adicionarEditar() {
    if (indiceParaEditar == -1) {
        adicionar();
    }
    else {
        editar();
    }
}

function adicionar() {
    var campoNome = document.getElementById("nome")
    var nome = campoNome.value;
    valido = validarCampo(nome, campoNome);
    if (valido == false) {
        //mostrar feedback
        return;
    }

    var elementotr = document.createElement("tr");
    var elementoTdNome = document.createElement("td");
    elementoTdNome.innerHTML = nome;
    var elementoTdAcao = document.createElement("td");
    // adicionar botões na coluna da ação
    var elementoBotaoEditar = document.createElement("button");
    elementoBotaoEditar.innerHTML = "Editar";
    elementoBotaoEditar.classList.add("btn", "btn-primary", "mr-2");
    elementoBotaoEditar.onclick = preencherCampo;

    var elementoBotaoApagar = document.createElement("button");
    elementoBotaoApagar.innerHTML = "Apagar";
    elementoBotaoApagar.classList.add("btn", "btn-danger");
    elementoBotaoApagar.onclick = apagar;



    elementoTdAcao.appendChild(elementoBotaoEditar);
    elementoTdAcao.appendChild(elementoBotaoApagar);


    elementotr.appendChild(elementoTdNome);
    elementotr.appendChild(elementoTdAcao);

    document.getElementById("registros").appendChild(elementotr);
    tarefas.push(nome);
    limparCampo(campoNome);
    atualizarQuantidade();
}

function apagar() {
    var confirmacao = confirm('Deseja realmente apagar?');
    if (confirmacao == true) {
        var elemento = event.target;
        var elementoTd = elemento.parentNode;
        var elementoTr = elementoTd.parentNode;
        var elementoTbody = elementoTr.parentNode;

        var elementoTdNome = elementoTr.childNodes[0];
        var nome = elementoTdNome.innerHTML;
        tarefas.pop(nome);
        atualizarQuantidade();
        elementoTbody.removeChild(elementoTr);


        elementoTbody.removeChild(elementoTr);
    }
}

function preencherCampo() {
    var elementoBotaoEditar = event.target;
    var elementoTr = elementoBotaoEditar.parentNode.parentNode;
    var elementoTdNome = elementoTr.childNodes[0];
    var nome = elementoTdNome.innerHTML;
    indiceParaEditar = tarefas.indexOf(nome);
    document.getElementById('nome').value = nome;
    document.getElementById('nome').focus();
}

function editar() {
    var nome = document.getElementById('nome').value;
    tarefas[indiceParaEditar] = nome;

    // atualizar tabela
var trs = document.getElementById('registros').childNodes;
var elementoTr = trs[indiceParaEditar];
elementoTr.childNodes[0].innerHTML = nome;

indiceParaEditar = -1;
document.getElementById('nome').value = '';
document.getElementById('nome').focus();
}

function atualizarQuantidade() {
    document.getElementById("quantidade").innerHTML = tarefas.length;
}

function limparCampo(campo) {
    campo.value = "";
    campo.focus();
}

function validarCampo(nome, campo) {
    texto = '';
    if (nome.trim().length == 0) {
        texto = 'Nome deve ser preenchido';
    } else if (nome.trim().length < 3) {
        texto = 'Nome deve conter no mínimo 3 caracteres';
    } else if (nome.trim().length > 20) {
        texto = 'Nome deve conter no máximo 20 caracteres';
    }

    var elementos = document.getElementsByClassName('span-erro');

    for (var i = 0; i < elementos.length; i++) {
        var elemento = elementos[i];
        var elementoPai = elemento.parentNode;
        elementoPai.removeChild(elemento);
    }

    campo.classList.remove('border-danger', 'text-danger');
    if (texto != '') {
        campo.classList.add('border-danger', 'text-danger');

        var spanErro = document.createElement('span');
        spanErro.innerHTML = texto;
        spanErro.classList.add('span-erro', 'text-danger', 'font-weight-bold');



        var elementoPaiDoInput = campo.parentNode;
        elementoPaiDoInput.appendChild(spanErro);



        campo.focus();
        return false;
    }

    return true;
}

function validar(){
    var campo = document.getElementById('nome');
    var nome = campo.value;
    validarCampo(nome, campo);
}