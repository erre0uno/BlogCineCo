let ventasDefault = [
    { idVenta: 1, fecha: '2022-11-09', idCliente: 1, producto: "Combo 1", valor: 10000, cantidad: 1, subTotal: 10000, total: 11900 },
    { idVenta: 2, fecha: '2022-11-09', idCliente: 2, producto: "Combo 2", valor: 20000, cantidad: 2, subTotal: 40000, total: 47600 },
];

setLocalVentas = (nombre) => {
    localStorage.setItem("Ventas", JSON.stringify(nombre));
}

let combos = [
    { id: 1, nombre: "Combo 1", precio: 10000 },
    { id: 2, nombre: "Combo 2", precio: 20000 },
    { id: 3, nombre: "Combo 3", precio: 30000 },
    { id: 4, nombre: "Combo 4", precio: 40000 },
];

setLocalCombos = (nombre) => {
    localStorage.setItem("Combos", JSON.stringify(nombre));
}
setLocalCombos(combos);

/* ################################################ * */
/* ################################################ * */

//Create
crearVenta = () => {
    let idVenta = parseInt(document.getElementById('idVenta').value);
    let fecha = document.getElementById('fecha').value;
    let idCliente = parseInt(document.getElementById('idCliente').value);
    let producto = document.getElementById('producto').value;
    let valor = parseInt(document.getElementById('valor').value);
    let cantidad = parseInt(document.getElementById('cantidad').value);
    let subTotal = parseInt(document.getElementById('subTotal').value);
    let total = parseInt(document.getElementById('total').value);
    producto = combos[producto - 1].nombre;

    if (idVenta != "" && fecha != "" && idCliente != "" && producto != "" && valor != "" && cantidad != "" && subTotal != "" && total != "") {
        let venta = { idVenta, fecha, idCliente, producto, valor, cantidad, subTotal, total };

        if (localStorage.getItem("Ventas") === null) {
            let ventas = ventasDefault;
            ventas.push(venta);
            setLocalVentas(ventas);
        } else {
            let ventas = JSON.parse(localStorage.getItem("Ventas"));
            ventas.push(venta);
            setLocalVentas(ventas);
        }
        limpiarVentas();
        swal("Listo!", "Venta creada con exito!", "success");
    }
    else {
        limpiarVentas();
        swal("Upps!", "Ingresa todos los campos !!", "error");
    }
    listarVentas();
}


//Update
function editarVentaById() {
    let id = parseInt(document.getElementById('idVenta').value);
    let fecha = document.getElementById('fecha').value;
    let idCliente = document.getElementById('idCliente').value;
    let producto = document.getElementById('producto').value;
    let valor = parseInt(document.getElementById('valor').value);
    let cantidad = parseInt(document.getElementById('cantidad').value);
    let subTotal = parseInt(document.getElementById('subTotal').value);
    let total = parseInt(document.getElementById('total').value);
    producto = combos[producto - 1].nombre;

    if (id != "" && fecha != "" && idCliente != "" && producto != "" && valor != "" && cantidad != "" && subTotal != "" && total != "") {
        let index = buscarVenta(parseInt(id));
        if (index != -1) {
            ventas[index].fecha = fecha;
            ventas[index].idCliente = idCliente;
            ventas[index].producto = producto;
            ventas[index].valor = valor;
            ventas[index].cantidad = cantidad;
            ventas[index].subTotal = subTotal;
            ventas[index].total = total;
            setLocalVentas(ventas);
            listarVentas();
            limpiarVentas();
            swal("Listo!", "Registro actualizado !", "success");

            console.log(ventas)
        }
        else
            swal("Upps!", "Venta no resitrada !", "error");

    } else
        swal("Upps!", "Ingresa todos los campos !!", "error");

}

// Read
function mostrarVentaId() {
    let id = document.getElementById('idVenta').value;
    let fecha = document.getElementById('fecha');
    let idCliente = document.getElementById('idCliente');
    let producto = document.getElementById('producto');
    let valor = document.getElementById('valor');
    let cantidad = document.getElementById('cantidad');
    let subTotal = document.getElementById('subTotal');
    let total = document.getElementById('total');

    let index = buscarVenta(parseInt(id));
    if (index != -1) {
        fecha.value = ventas[index].fecha;
        console.log(fecha.value);
        idCliente.value = ventas[index].idCliente;
        console.log(ventas[index].producto);
        producto.value = buscarProducto(ventas[index].producto) + 1;   //combos[document.getElementById('producto').value-1].nombre;
        CargarPrecio();
        //valor.value = ventas[index].value;
        cantidad.value = ventas[index].cantidad;
        subTotal.value = ventas[index].subTotal;
        total.value = ventas[index].total;
    }
    else {
        limpiarVentas();
        listarVentas();
        swal("Upps!", "Venta no resitrada !", "error");
    }
}

function buscarProducto(nombre) {
    combos = JSON.parse(localStorage.getItem("Combos"));
    index = combos.findIndex(obj => obj.nombre == nombre);
    console.log("index combo:" + index)
    return index;
}

//Delete
function eliminarVentaById() {
    let id = document.getElementById('idVenta').value;

    let index = buscarVenta(parseInt(id));
    if (index != -1) {
        delete ventas[index].idVenta;
        delete ventas[index].fecha;
        delete ventas[index].idCliente;
        delete ventas[index].producto;
        delete ventas[index].valor;
        delete ventas[index].cantidad;
        delete ventas[index].subTotal;
        delete ventas[index].total;

        setLocalVentas(ventas);
        limpiarVentas();
        listarVentas();
        loadAppVentas();
        swal("Venta id:" + id + " registrada con exito !", "success");

        console.log(ventas);
    }
    else {
        limpiarVentas();
        swal("Upps!", "Venta no resitrada !", "error");
    }
}



// Print
function listarVentas() {
    let ventas = JSON.parse(localStorage.getItem("Ventas"));
    document.getElementById("tbodyVentas").innerHTML = "";
    if (ventas != null) {
        for (let i = 0; i < ventas.length; i++) {
            let id = ventas[i].idVenta;

            let fecha = ventas[i].fecha;
            if (fecha != null) { fecha = fecha.replaceAll("-", "/"); }


            let idCliente = ventas[i].idCliente;
            let producto = ventas[i].producto;
            let valor = ventas[i].valor;
            let cantidad = ventas[i].cantidad;
            let subTotal = ventas[i].subTotal;
            let total = ventas[i].total

            if (id != undefined) {
                document.getElementById("tbodyVentas").innerHTML +=
                    `<tr>
                    <td>${id}</td>
                    <td>${fecha}</td>
                    <td>${idCliente}</td>
                    <td>${producto}</td>
                    <td>${valor}</td>
                    <td>${cantidad}</td>
                    <td>${subTotal}</td>
                    <td>${total}</td>
                </tr>`
            }
        }
    document.getElementById("casillaTotal").style.display = "none";
    }
}
//<Search
function buscarVenta(pid) {
    ventas = JSON.parse(localStorage.getItem("Ventas"));
    index = ventas.findIndex(obj => obj.idVenta == pid);
    console.log("index:" + index)
    return index;
}


/* ################################################ * */
/* ################################################ * */

//Limpiar
function limpiarVentas() {
    document.getElementById("formVentas").reset();
}

function loadDate() {
    let date = new Date();
    y = date.getFullYear();
    //Mes
    m = date.getMonth() + 1;
    if (m < 10) { m = "0" + m }
    //Día
    d = date.getDate();
    if (d < 10) { d = "0" + d }
    document.getElementById("fecha").value = y + "-" + m + "-" + d;
}

function calcularVentas() {
    let ventas = JSON.parse(localStorage.getItem("Ventas"));
    let total = 0;

    if (ventas != null) {
        for (i in ventas) {
            if (ventas[i].total != null) {
                total += ventas[i].total;
            }
        }
        console.log(total);

        document.getElementById("casillaTotal").style.display = "inline";
        document.getElementById("totalVentas").innerHTML = total;

    }
}

function combosOptions() {
    document.getElementById("producto").innerHTML = "";
    for (let i = 0; i < combos.length; i++) {
        var id = combos[i].id;
        var nombre = combos[i].nombre;

        if (id != undefined) {
            document.getElementById("producto").innerHTML +=
                `<option value="${id}">${nombre}</option>`
        }
    }
}

function idClientesOptions() {
    let clientes = JSON.parse(localStorage.getItem("Clientes"));
    if (clientes != null) {
        
        document.getElementById("idCliente").innerHTML =" ";
        
        for (let i = 0; i < clientes.length; i++) {
            var id = clientes[i].id;
            var nombre = clientes[i].nombre;

            if (id != undefined) {
                document.getElementById("idCliente").innerHTML +=
                    `<option value="${id}">${nombre}</option>`
            }
        }
    }

}

function CargarPrecio(combo) {
    if (combo != null) {
        let precio = document.getElementById("valor");
        precio.value = combos[(parseInt(combo.value)) - 1].precio;
    }
}

function calcularPrecios() {
    let precio = parseInt(document.getElementById("valor").value);
    let cantidad = parseInt(document.getElementById("cantidad").value);

    let subTotal = document.getElementById("subTotal");
    let total = document.getElementById("total");

    subTotal.value = precio * cantidad;
    total.value = (precio * cantidad) * 1.16;

}
/* ################################################ * */
/* ################################################ * */

function loadAppVentas(){
    idClientesOptions();
    combosOptions();
    CargarPrecio();
    listarVentas();
    loadDate();
}