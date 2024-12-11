export class Vehiculo{
    constructor(marca, modelo, precio, color, matricula, fechaMatriculacion) {
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
        this.color = color;
        this.matricula = matricula;
        this.fechaMatriculacion = fechaMatriculacion;
    }

    obtenerInformacion() {
        return `Marca: ${this.marca}, Modelo: ${this.modelo}, Precio: ${this.precio}, Color: ${this.color}, Matrícula: ${this.matricula}, Fecha de Matriculación: ${this.fechaMatriculacion}`;
    }

    modificarMarca() {
        if (confirm('¿Desea modificar la marca?')) {
            const nuevaMarca = prompt('Ingrese la nueva marca:', this.marca);
            if (nuevaMarca) {
                this.marca = nuevaMarca;
                alert(`Marca modificada a: ${this.marca}`);
            }
        }
    }

    modificarModelo(){
        if(confirm('¿Desea cambiar el modelo')){
            const nuevoModelo=prompt('Ingrese el nuevo modelo:', this.modelo);
            if(nuevoModelo){
                this.modelo=nuevoModelo;
                alert(`Modelo modificado a: ${this.modelo}`);
            }
        }
    }

    modificarPrecio(){
        if(confirm('¿Desea cambiar el precio?')){
            const nuevoPrecio=Number(prompt('Ingrese el nuevo precio:', this.precio));
            if(nuevoPrecio && !isNaN(nuevoPrecio) && nuevoPrecio>0){
                this.precio=nuevoPrecio;
                alert(`Precio modificado a: ${this.precio}`);
            }
        }
    }

    modificarColor(){
        if(confirm('¿Desea cambiar el color?')){
            const nuevoColor=prompt('Ingrese el nuevo color:', this.color);
            if(nuevoColor){
                this.color=nuevoColor;
                alert(`Color modificado a: ${this.color}`);
            }
        }
    }

    modificarMatricula(){
       if(confirm('Desea cambiar la matricula?')){
        const nuevaMatricula=prompt('Ingrese la nueva matricula:', this.matricula);
        if(nuevaMatricula){
            this.matricula=nuevaMatricula;
            alert(`Matricula modificada a: ${this.matricula}`);
        }
       }
    }

}