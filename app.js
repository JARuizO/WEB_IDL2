const form = document.getElementById('formRegistro');
const nombreInput = document.getElementById('nombreInput');
const apellidoInput = document.getElementById('apellidoInput');
const celularInput = document.getElementById('celularInput');
const emailInput = document.getElementById('emailInput');
const tableBody = document.getElementById('tableBody');

let data = JSON.parse(localStorage.getItem('formData')) || [];

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const celular = celularInput.value;
    const email = emailInput.value;

    if(nombre && apellido && celular && email) {
        const newData = {nombre,apellido,celular,email};
        data.push(newData);
        saveDataToLocalStorage();
        renderTable();
        form.reset();
    }else{
        alert('Debe llenar todos los datos')
    }

})

function saveDataToLocalStorage() {
    localStorage.setItem('formData',JSON.stringify(data));
}

function renderTable(){
    tableBody.innerHTML = '';

    data.forEach(function (item, index){
        const row = document.createElement('tr');
        const nombreCell = document.createElement('td');
        const apellidoCell = document.createElement('td');
        const celularCell = document.createElement('td');
        const emailCell = document.createElement('td');
        const opcionesCell = document.createElement('td');
        const editarButton = document.createElement('button');
        const eliminarButton = document.createElement('button');

        nombreCell.textContent = item.nombre;
        apellidoCell.textContent = item.apellido;
        celularCell.textContent = item.celular;
        emailCell.textContent = item.email;
        editarButton.textContent = 'Editar';
        eliminarButton.textContent = 'Eliminar';

        editarButton.classList.add('button', 'button2');
        eliminarButton.classList.add('button', 'button3');

        editarButton.addEventListener('click', function(){
            editarData(index)
        })

        eliminarButton.addEventListener('click', function(){
            eliminarData(index)
        })

        opcionesCell.appendChild(editarButton);
        opcionesCell.appendChild(eliminarButton);

        row.appendChild(nombreCell);
        row.appendChild(apellidoCell);
        row.appendChild(celularCell);
        row.appendChild(emailCell);
        row.appendChild(opcionesCell);

        tableBody.appendChild(row);
    })
}

function editarData(index) {
    const item = data[index];
    nombreInput.value = item.nombre;
    apellidoInput.value = item.apellido;
    celularInput.value = item.celular;
    emailInput.value = item.email;
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

function eliminarData(index) {
    data.splice(index, 1);
    saveDataToLocalStorage();
    renderTable();
}

renderTable();
