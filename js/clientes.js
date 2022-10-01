login=()=>{
    let texto = prompt("Ingrese tu nommbre de usuario");
    if(texto != ""){
        document.getElementById('login').value=texto ;
    }else
        document.getElementById('login').value="ingrese login" ;
}
/* ################################################ * */

let clientesDefault = [{ id: 1, nombre: 'Kelly', apellido: 'Sanchez', telefono: "3123433443" },
{ id: 2, nombre: 'Andres', apellido: 'Calipso', telefono: "321334573" },
{ id: 3, nombre: 'Faustino', apellido: 'Torombolo', telefono: "315678695" }];


setLocalClientes = (nombre) => {
    localStorage.setItem("Clientes", JSON.stringify(nombre));
}

//Create
crearCliente = () => {
    let id = parseInt(document.getElementById('id').value);
    let nombre = document.getElementById('nombre').value;
    let apellido = document.getElementById('apellido').value;
    let telefono = document.getElementById('telefono').value;

    if (id != "" && nombre != "" && apellido != "" && telefono != "") {
        let cliente = { id, nombre, apellido, telefono };

        if (localStorage.getItem("Clientes") === null) {
            let clientes = clientesDefault;
            clientes.push(cliente);
            setLocalClientes(clientes);

        } else {
            let clientes = JSON.parse(localStorage.getItem("Clientes"));
            clientes.push(cliente);
            setLocalClientes(clientes);

        }
        document.getElementById("formClientes").reset();
        swal("Listo!", "Cliente creado con exito!", "success");

    }
    else {
        document.getElementById("formClientes").reset();
        swal("Upps!", "Ingresa todos los campos !!", "error");
    }
    listarClientes();

}

//Update
function editarClienteById() {
    var id = document.getElementById('id').value;
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var telefono = document.getElementById('telefono').value;

    let index = buscarCliente(parseInt(id));
    if (index != -1) {
        clientes[index].nombre = nombre;
        clientes[index].apellido = apellido;
        clientes[index].telefono = telefono;
        setLocalClientes(clientes);
        listarClientes();
        limpiarClientes();
        swal("Listo!", "Registro ha sido actualizado !", "success");
    }
    else
    swal("Upps!", "Cliente no encontrado !", "error");
}


// Read
function mostrarClienteId() {
    var id = document.getElementById('id').value;
    var nombre = document.getElementById('nombre');
    var apellido = document.getElementById('apellido');
    var telefono = document.getElementById('telefono');

    let index = buscarCliente(parseInt(id));
    if (index != -1) {
        nombre.value = clientes[index].nombre;
        apellido.value = clientes[index].apellido;
        telefono.value = clientes[index].telefono;
    }
    else {
        limpiarClientes();
        swal("Upps!", "Cliente no encontrado !", "error");
    }
}


//Delete
function eliminarClienteById() {
    var id = document.getElementById('id').value;

    let index = buscarCliente(parseInt(id));
    if (index != -1) {
        delete clientes[index].id;
        delete clientes[index].nombre;
        delete clientes[index].apellido;
        delete clientes[index].telefono;
        setLocalClientes(clientes);
        listarClientes();
        limpiarClientes();
        swal("Listo!", "Cliente id:" + id + " eliminado con exito !", "success");
    }
    else {
        limpiarClientes();
        swal("Upps!", "Cliente no encontrado !", "error");
    }
}


// Print
function listarClientes() {
    let clientes = JSON.parse(localStorage.getItem("Clientes"));

    if (clientes != null) {
        document.getElementById("tbodyCliente").innerHTML = "";

        for (let i = 0; i < clientes.length; i++) {
            var id = clientes[i].id;
            var nombre = clientes[i].nombre;
            var apellido = clientes[i].apellido;
            var telefono = clientes[i].telefono;

            if (id != undefined) {
                document.getElementById("tbodyCliente").innerHTML +=
                    `<tr>
                    <td>${id}</td>
                    <td>${nombre}</td>
                    <td>${apellido}</td>
                    <td>${telefono}</td>
                </tr>`
            }
        }
    }
}
//<Search
function buscarCliente(pid) {
    clientes = JSON.parse(localStorage.getItem("Clientes"));
    index = clientes.findIndex(obj => obj.id == pid);
    console.log("index:" + index)
    return index;
    /*
        var id = pid;
        index=-1;
        for (let item in clientes) {
            if (id == clientes[item].id) {
                index=id;
            }
        }
        console.log("index:"+index)
        return index;
    */
}

//Limpiar
function limpiarClientes() {
    document.getElementById("formClientes").reset();
}

/* ################################################ * */
/* ################################################ * */


loadApp = () => {
    listarClientes();
}


//swal("Listo!", "Cliente creado con exito!", "success");
//swal("Upps!", "Cliente creado con exito!", "error");
// "warning", "error", "success" and "info".

