import { Vehiculo } from './vehiculo.js';


document.addEventListener('DOMContentLoaded', () => {
    const vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];

    const formulario = document.querySelector('#formulario');
    const resultado = document.querySelector('#listaVehiculos');
    const btnOrdenar = document.querySelector('.btn-ordenar');
    const btnEliminar = document.querySelector('.btn-eliminar-ultimo');
    const btnEliminarMatricula = document.querySelector('.btn-eliminar-matricula');
    const btnModificarPrecio = document.querySelector('.btn-modificar-precio');
    const btnModificarMarca = document.querySelector('.btn-modificar-marca');
    const buttons=document.querySelector('.buttons')
    const btnModificarModelo = document.createElement('button');
    btnModificarModelo.innerHTML = 'Modificar Modelo';
    btnModificarModelo.classList.add('btn', 'btn-modificar-modelo');
    // btnModificarModelo.classList.add('btn');
    buttons.appendChild(btnModificarModelo);

    let nuevoVehiculo;
    

    const marca = document.querySelector('#marca');
    const modelo = document.querySelector('#modelo');
    const precio = document.querySelector('#precio');
    const color = document.querySelector('#color');
    const matricula = document.querySelector('#matricula');
    const fechaMatriculacion = document.querySelector('#fechaMatriculacion');

    formulario.addEventListener('submit', addVehiculo);
    btnOrdenar.addEventListener('click', ordenarVehiculos);
    btnEliminar.addEventListener('click', eliminarUltimoVehiculo);
    btnEliminarMatricula.addEventListener('click', eliminarVehiculoPorMatricula);
    btnModificarModelo.addEventListener('click', modificarModelo);
    btnModificarMarca.addEventListener('click', modificarMarca);

    // Mostrar vehículos al cargar la página
    mostrarVehiculos();

    function addVehiculo(e) {
        e.preventDefault();

        if (marca.value === '' || modelo.value === '' || precio.value === '' || color.value === '' || matricula.value === '' || fechaMatriculacion.value === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        if (isNaN(Number(precio.value)) || Number(precio.value) <= 0) {
            alert('El precio debe ser un número mayor a 0');
            return;
        }

        if (vehiculos.some(vehiculo => vehiculo.matricula === matricula.value)) {
            alert('Ya existe un vehículo con esa matrícula');
            return;
        }
        nuevoVehiculo = new Vehiculo(marca.value, modelo.value, precio.value, color.value, matricula.value, fechaMatriculacion.value);
        vehiculos.push(nuevoVehiculo);

        actualizarLocalStorage();
        mostrarVehiculos();

        formulario.reset();
    }

    function mostrarVehiculos() {
        resultado.innerHTML = '';

        if (vehiculos.length === 0) {
            resultado.innerHTML = '<p>No hay vehículos</p>';
            return;
        }

        vehiculos.forEach(vehiculo => {
            const { marca, modelo, precio, color, matricula, fechaMatriculacion } = vehiculo;

            const vehiculoHTML = document.createElement('div');
            vehiculoHTML.classList.add('vehiculo');
            vehiculoHTML.innerHTML = `
                <p><span>Marca:</span> ${marca}</p>
                <p><span>Modelo:</span> ${modelo}</p>
                <p><span>Precio:</span> ${precio}</p>
                <p><span>Color:</span> ${color}</p>
                <p><span>Matrícula:</span> ${matricula}</p>
                <p><span>Fecha de Matriculación:</span> ${fechaMatriculacion}</p>
                <hr>
            `;
            resultado.appendChild(vehiculoHTML);
        });
    }

    function ordenarVehiculos() {
        vehiculos.sort((a, b) => a.marca.localeCompare(b.marca));
        actualizarLocalStorage();
        mostrarVehiculos();
    }

    function eliminarUltimoVehiculo() {
        if (vehiculos.length === 0) {
            alert('No hay vehículos para eliminar');
            return;
        }

        vehiculos.pop();
        actualizarLocalStorage();
        mostrarVehiculos();
    }

    function eliminarVehiculoPorMatricula() {
        if (vehiculos.length === 0) {
            alert('No hay vehículos');
            return;
        }

        const matriculaAEliminar = prompt('Ingrese la matrícula del vehículo a eliminar:');
        const index = vehiculos.findIndex(vehiculo => vehiculo.matricula === matriculaAEliminar);

        if (index !== -1) {
            vehiculos.splice(index, 1);
            actualizarLocalStorage();
            mostrarVehiculos();
        } else {
            alert('No se ha encontrado ningún vehículo con esa matrícula');
        }
    }

    function modificarModelo(){
        if(confirm('Desea modificar el modelo')){
            const matriculaAModificar=prompt('Ingrese la matricula del vehiculo que desea modificar:', this.matricula);

            const vehiculoAModificar=vehiculos.find(vehiculo=>vehiculo.matricula===matriculaAModificar);

            if(vehiculoAModificar){
                vehiculoAModificar.modificarModelo();
                actualizarLocalStorage();
                mostrarVehiculos();
            }else{
                alert('No se ha encontrado ningún vehículo con esa matrícula');
            }

        }
    }

    function modificarMarca() {
        if (confirm('¿Desea modificar la marca de un vehículo?')) {
            const matriculaAModificar = prompt('Ingrese la matrícula del vehículo que desea modificar:');
    
            
    
            // Buscar el vehículo en el array
            const vehiculoAModificar = vehiculos.find(vehiculo => vehiculo.matricula === matriculaAModificar);
    
            if (vehiculoAModificar) {
                // Llamar al método modificarMarca del objeto encontrado
                vehiculoAModificar.modificarMarca();
    
                // Actualizar almacenamiento y la interfaz
                actualizarLocalStorage();
                mostrarVehiculos();
            } else {
                alert('No se ha encontrado ningún vehículo con esa matrícula.');
            }
        }
    }
    

    function actualizarLocalStorage() {
        localStorage.setItem('vehiculos', JSON.stringify(vehiculos));
    }
});
