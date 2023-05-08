// let NaryTree = require('./structures/n-ary-tree');

let usuario_actual = localStorage.getItem("usuario_actual")
let nombre_actual = localStorage.getItem("nombre_actual")
let Tree2 = JSON.retrocycle(JSON.parse(localStorage.getItem(usuario_actual)));

let BlockChain2 = JSON.retrocycle(JSON.parse(localStorage.getItem("blockChain")));

let blockChain = new BlockChain();
blockChain.head = BlockChain2.head;
blockChain.end = BlockChain2.end;
blockChain.size = BlockChain2.size;


let tree =  new Tree(Tree2.size, Tree2.listaC, Tree2.grafoC );
tree.root = Tree2.root;


iniciar_sesion()



let valorSpan = document.getElementById("valor_id");
valorSpan.innerHTML = `${nombre_actual + " - " + usuario_actual}`;








function crearCarpeta(e){
    e.preventDefault();
    let folderName = nuevoNombre()
    let path =  $('#path').val();
    tree.insert(folderName, path);
    tree.insertGrafo(folderName, path);
    alert("Todo bien!")

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear().toString().padStart(4, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    tree.insertarLista(formattedDate, "Se creo carpeta -- "+folderName)

    $('#carpetas').html(tree.getHTML(path))

    localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));
}

function entrarCarpeta(folderName){
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#carpetas').html(tree.getHTML(curretPath))
    localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));
}

function retornarInicio(){
    $('#path').val("/");
    $('#carpetas').html(tree.getHTML("/"))
}

function showTreeGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graph()} }`
    console.log(body);
    $("#graph").attr("src", url + body);
    localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));
}

function showMatrixGraph(){
    let path = $('#path').val();
    let url = 'https://quickchart.io/graphviz?graph=';
    console.log(tree.matrixGrpah(path))
    let body = `digraph G { ${tree.matrixGrpah(path)} }`
    $("#graph").attr("src", url + body);
    localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));
}


function showMatrixGraph2(){
    let path = $('#path').val();
    let url = 'https://quickchart.io/graphviz?graph=';
    console.log(tree.matrixGrpah(path))
    let body = `digraph G { ${tree.matrixGrpah2(path)} }`
    $("#graph").attr("src", url + body);
    localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));
}

function showListGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `${tree.listaC.graph()}`
    console.log(body);
    $("#graph").attr("src", url + body);
}

function showGrafhGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graphGrafo()}}`
    console.log(body);
    $("#graph").attr("src", url + body);
    localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));
}


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const subirArchivo =  async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);

    let nombreA = ""
    // console.log(form.file.type);
    let path = $('#path').val();
    if(form.file.type === 'text/plain'){
        // ARCHIVO DE TEXTO
        nombreA = nuevoNombreArchivo()
        let fr = new FileReader();
        fr.readAsText(form.file);
        fr.onload = () => { 
            // CARGAR ARCHIVO A LA MATRIZ
            
            tree.getFolder(path).files.push({
                name: nombreA, 
                content: fr.result, 
                type: form.file.type,
                tipoN: 0
            })
            $('#carpetas').html(tree.getHTML(path));
            localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));
        };
        
        tree.insertX(path, nombreA)
        
    }else{
        // IMÁGENES O PDF 
        let parseBase64 = await toBase64(form.file);
        nombreA = nuevoNombreArchivo()
        tree.getFolder(path).files.push({
            name: nombreA, 
            content: parseBase64, 
            type: form.file.type,
            tipoN: 0
        })
        $('#carpetas').html(tree.getHTML(path));
        
        tree.insertX(path, nombreA)

        // console.log(parseBase64)
        // $("#imagenSubida").attr("src", imgBase64); 
        // console.log(await toBase64(form.file));
    }

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear().toString().padStart(4, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    tree.listaC.insertList(formattedDate, "Se creo archivo -- "+ nombreA)
    

    alert('Archivo Subido!')
    localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));

}

function cargar() {
    let opciones = [];
    let opciones2 = [];
    let temp = localStorage.getItem("avlTree")
    estudiantes = JSON.parse(temp).estudiantes;
    
    let path = $('#path').val();
    carpetaP = tree.getFolder(path);
    console.log(carpetaP.files);

    const selectElement = document.getElementById("usuarios");
    selectElement.innerHTML = ""; // Eliminar opciones antiguas
    selectElement.innerHTML = "<option selected disabled>Seleccionar Usuario</option>";
    opciones = estudiantes;
    for (let i = 0; i < opciones.length; i++) {
        const opcion = opciones[i].carnet;
        const elementoOpcion = document.createElement("option");
        elementoOpcion.value = opcion;
        elementoOpcion.textContent = opcion;
        selectElement.appendChild(elementoOpcion);
    }

    const selectElement2 = document.getElementById("archivos");
    selectElement2.innerHTML = ""; // Eliminar opciones antiguas
    selectElement2.innerHTML = "<option selected disabled>Seleccionar Archivo</option>";
    opciones2 = carpetaP.files;
    for (let i = 0; i < opciones2.length; i++) {
        const opcion = opciones2[i].name;
        const elementoOpcion = document.createElement("option");
        elementoOpcion.value = opcion;
        elementoOpcion.textContent = opcion;
        selectElement2.appendChild(elementoOpcion);
    }


    const selectElement3 = document.getElementById("permisos");
    selectElement3.innerHTML = ""; // Eliminar opciones antiguas
    selectElement3.innerHTML = "<option selected disabled>Seleccionar Permiso</option>";

    const permisos = ["r", "w", "r-w"];
    permisos.forEach(opcion => {
      const elementoOpcion = document.createElement("option");
      elementoOpcion.value = opcion;
      elementoOpcion.textContent = opcion;
      selectElement3.appendChild(elementoOpcion);
    });

}


function agregar_sparase(){

    let archivo_ele;
    let bandera = false;
    let archivos_compartidos = [];
    archivos_compartidos = JSON.parse(localStorage.getItem("archivos_compartidos"))

    const archivoSelect = document.getElementById("archivos");
    const archivoValue = archivoSelect.value;
    console.log(archivoValue);


    const usuarioSelect = document.getElementById("usuarios");
    const usuarioValue = usuarioSelect.value;
    console.log(usuarioValue);


    const permisoSelect = document.getElementById("permisos");
    const permisoValue = permisoSelect.value;
    console.log(permisoValue);

    let path = $('#path').val();
    carpetaP = tree.getFolder(path);
    console.log(carpetaP.files);

    for (let i = 0; i < carpetaP.files.length; i++) {
        if(carpetaP.files[i].name == archivoValue){

            archivo_ele = carpetaP.files[i]
        }

    }

    if(archivo_ele.type == "text/plain" && permisoValue=="r" || archivo_ele.type == "text/plain" && permisoValue=="w" || archivo_ele.type == "text/plain" && permisoValue=="r-w" || archivo_ele.type == "image/png" && permisoValue=="r" || archivo_ele.type == "image/jpeg" && permisoValue=="r" || archivo_ele.type == "application/pdf" && permisoValue=="r"){
        
        if(archivoValue =="Seleccionar Archivo" || usuarioValue=="Seleccionar Usuario" || permisoValue =="Seleccionar Permiso"){
            alert('Ingrese parametros correctos')

        }else {

            if(usuarioValue != usuario_actual){
                let path = $('#path').val();


                let archivo = tree.getFolder(path).files.find(function (elemento){
                    if(elemento.name == archivoValue){
                        return elemento;
                    }else{
                        return false;
                    }
                })
                archivo.tipoN = 1;

                for(let i = 0; i < archivos_compartidos.length; i++){
                    if(archivos_compartidos[i].archivo.name == archivo.name && archivos_compartidos[i].propietario == usuario_actual && archivos_compartidos[i].destinatario== usuarioValue){
                        bandera = true;
                        archivos_compartidos[i].permisos= permisoValue
                    }

                }

                if(bandera == false){
                    archivos_compartidos.push({propietario: usuario_actual, destinatario: usuarioValue, ubicacion: path, archivo:archivo, permisos:permisoValue})  
                }


                localStorage.setItem("archivos_compartidos", JSON.stringify(archivos_compartidos))

                tree.insertFile(path, archivoValue, usuarioValue, permisoValue);
                alert('Permisos dados a '+ usuarioValue)
            }else {
                alert('Ya posees esos permisos')
            }

        }
    } else {
        alert('Solo los archivos de tipo texto pueden tener el permiso de w o r-w')
    }





}


function eliminar(){
    let opciones3 = [];
    let path = $('#path').val();
    carpetaP = tree.getFolder(path);
    console.log(carpetaP.children);

    const selectElement2 = document.getElementById("hijos");
    selectElement2.innerHTML = ""; // Eliminar opciones antiguas
    selectElement2.innerHTML = "<option selected disabled>Seleccionar Carpeta</option>";
    opciones3 = carpetaP.children;
    for (let i = 0; i < opciones3.length; i++) {
        const opcion = opciones3[i].folderName;
        const elementoOpcion = document.createElement("option");
        elementoOpcion.value = opcion;
        elementoOpcion.textContent = opcion;
        selectElement2.appendChild(elementoOpcion);
    }


}


function eliminarCarpeta(){
    let path = $('#path').val();
    let carpetaSelect = document.getElementById("hijos");
    let carpetaValue = carpetaSelect.value;
    console.log(carpetaValue);

    if(carpetaValue == "Seleccionar Carpeta"){
        alert("Ingrese Carpeta");
        return
    }

    tree.remove(carpetaValue, path);
    tree.removeGrafo(carpetaValue, path);

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear().toString().padStart(4, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    tree.listaC.insertList(formattedDate, "Se elimino carpeta -- "+ carpetaValue)

    $('#carpetas').html(tree.getHTML(path))

    localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));

}


function actualizarVentana(){
    tree.listaC.print()
}

function buscarCarpetas(nombre){
    let path = $('#path').val();
    carpetaP = tree.getFolder(path);

    let listaTemp = carpetaP.children

    for (let i = 0; i < listaTemp.length; i++) {
        if(listaTemp[i].folderName== nombre){
            return true;
        }
    }

    return false;
}


function nuevoNombre(){

    let folderName =  $('#folderName').val();
    let estado = false;
    let N=0;

    estado = buscarCarpetas(folderName);

    if(estado == true){
        do {
            N=N+1;
            nuevoName= "Copia("+ N +") "+ folderName;

            estado=buscarCarpetas(nuevoName);

          
        } while (estado == true);

        return nuevoName;
    }

    return folderName;

}



function buscarArchivos(nombre){

    let path = $('#path').val();
    carpetaP = tree.getFolder(path);


    let listaTemp = carpetaP.files


    for (let i = 0; i < listaTemp.length; i++) {
        if(listaTemp[i].name== nombre){
            return true;
        }
    }

    return false;
}

function nuevoNombreArchivo(){
    let fileName =  $('#fileName').val();
    let estado = false;
    let N=0;


    estado = buscarArchivos(fileName);

    if(estado == true){
        do {
            N=N+1;
            nuevoName= fileName + "〈"+ N +"〉";

            estado=buscarArchivos(nuevoName);

          
        } while (estado == true);

        return nuevoName;
    }

    return fileName;


}

function iniciar_sesion(){
    let now = new Date();
    let formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear().toString().padStart(4, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    tree.insertarLista(formattedDate, "Se inició sección");
    localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));

    let path =  $('#path').val();
    $('#carpetas').html(tree.getHTML(path))



}



function cerrar_sesion(){
    let now = new Date();
    let formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear().toString().padStart(4, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    tree.insertarLista(formattedDate, "Se cerró sección");
    localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));

    window.location.href = "index.html";

    alert("Hasta la próxima :(");
}


function mostrarTablaPermisos(){
    let row = "";
    let temp = localStorage.getItem("archivos_compartidos")
    archivos_compartidos = JSON.parse(temp);

    for(let i = 0; i < archivos_compartidos.length; i++) {

      if(usuario_actual == archivos_compartidos[i].destinatario){

        if(archivos_compartidos[i].archivo.type === 'text/plain'){
            let archivo = new Blob([archivos_compartidos[i].archivo.content], {type: archivos_compartidos[i].archivo.type} );
            const url = URL.createObjectURL(archivo);

            if(archivos_compartidos[i].permisos === 'r' || archivos_compartidos[i].permisos === 'r-w'){
                row +=`
                <tr>
                    <th>${archivos_compartidos[i].propietario}</th>
                    <td>${archivos_compartidos[i].destinatario}</td>
                    <td>${archivos_compartidos[i].ubicacion}</td>
                    <td> <a href="${url}" download="descarga" class="btn btn-primary btn-sm">${archivos_compartidos[i].archivo.name}</a></td>
                    <td>${archivos_compartidos[i].permisos}</td>
                    <td> <a class="btn btn-primary btn-sm" onclick="ver('${url}')">Vista Previa</a></td> 
                </tr>
                `;

            }else{
                row +=`
                <tr>
                    <th>${archivos_compartidos[i].propietario}</th>
                    <td>${archivos_compartidos[i].destinatario}</td>
                    <td>${archivos_compartidos[i].ubicacion}</td>
                    <td> <a class="btn btn-secondary btn-sm">${archivos_compartidos[i].archivo.name}</a></td>
                    <td>${archivos_compartidos[i].permisos}</td>
                    <td> <a class="btn btn-secondary btn-sm">Sin permisos</a></td>
                </tr>
                `;
            }



        }else{

            if(archivos_compartidos[i].permisos == 'r' || archivos_compartidos[i].permisos == 'r-w'){
                row +=`
                <tr>
                    <th>${archivos_compartidos[i].propietario}</th>
                    <td>${archivos_compartidos[i].destinatario}</td>
                    <td>${archivos_compartidos[i].ubicacion}</td>
                    <td> <a href="${archivos_compartidos[i].archivo.content}" download="descarga" class="btn btn-primary btn-sm">${archivos_compartidos[i].archivo.name}</a></td>
                    <td>${archivos_compartidos[i].permisos}</td>
                    <td> <a class="btn btn-primary btn-sm" onclick="ver('${archivos_compartidos[i].archivo.content}')">Vista Previa</a></td>
                </tr>
                `;

            }else{
                row +=`
                <tr>
                    <th>${archivos_compartidos[i].propietario}</th>
                    <td>${archivos_compartidos[i].destinatario}</td>
                    <td>${archivos_compartidos[i].ubicacion}</td>
                    <td> <a class="btn btn-secondary btn-sm">${archivos_compartidos[i].archivo.name}</a></td>
                    <td>${archivos_compartidos[i].permisos}</td>
                    <td> <a class="btn btn-secondary btn-sm">Sin permisos</a></td>
                </tr>
                `;
            }
        }


      }
    }

    $('#permisosTable tbody').html(
        row
    )
}

function ver(contenidoBase64) {
    // Obtener el iframe
    var iframe = document.getElementById('pdf-viewer');
    iframe.src = contenidoBase64;
}



function carga_edicion_archivo(){
    let temp = localStorage.getItem("archivos_compartidos")
    archivos_compartidos = JSON.parse(temp);
    let opciones2 = [];
    let opciones = [];


    let path = $('#path').val();
    carpetaP = tree.getFolder(path);
    console.log(carpetaP.files);

    document.getElementById("myTextArea").value = "";
    const selectElement2 = document.getElementById("archivo_editar");
    selectElement2.disabled = false;
    selectElement2.innerHTML = ""; // Eliminar opciones antiguas
    selectElement2.innerHTML = "<option selected disabled>Seleccionar Archivo</option>";
    opciones2 = carpetaP.files;

    for (let i = 0; i < opciones2.length; i++) {
        if(opciones2[i].type == 'text/plain'){
            const opcion = opciones2[i].name + " (En panel actual)";
            const elementoOpcion = document.createElement("option");
            elementoOpcion.value = opcion ;
            elementoOpcion.textContent = opcion;
            selectElement2.appendChild(elementoOpcion);
        }

    }

    opciones = archivos_compartidos;
    for (let i = 0; i < opciones.length; i++) {

        if(opciones[i].archivo.type == 'text/plain' && usuario_actual == archivos_compartidos[i].destinatario && archivos_compartidos[i].permisos == "w" || opciones[i].archivo.type == 'text/plain' && usuario_actual == archivos_compartidos[i].destinatario && archivos_compartidos[i].permisos == "r-w"){
        const opcion = opciones[i].archivo.name + " (En compartido contigo)";
        const elementoOpcion = document.createElement("option");
        elementoOpcion.value = opcion;
        elementoOpcion.textContent = opcion;
        selectElement2.appendChild(elementoOpcion);
        }
    }

}

function agregar_area(){

    let temp = localStorage.getItem("archivos_compartidos")
    archivos_compartidos = JSON.parse(temp);

    const archivoSelect = document.getElementById("archivo_editar");
    let archivoValue = archivoSelect.value;
    console.log(archivoValue);

    let path = $('#path').val();
    carpetaP = tree.getFolder(path);
    console.log(carpetaP.files);

    

    if(archivoValue =="Seleccionar Archivo"){
        alert('Ingrese parametros correctos')
    }else{

        archivoSelect.disabled = true;
        if(archivoValue.includes(" (En panel actual)")){
            archivoValue = archivoValue.replace(" (En panel actual)", "");

            for (let i = 0; i < carpetaP.files.length; i++) {
                if(carpetaP.files[i].name == archivoValue){

                    document.getElementById("myTextArea").value = carpetaP.files[i].content;

                }
        
            }
        }


        if(archivoValue.includes(" (En compartido contigo)")){

            archivoValue = archivoValue.replace(" (En compartido contigo)", "");

            for (let i = 0; i < archivos_compartidos.length; i++) {
                if(archivos_compartidos[i].archivo.name == archivoValue){

                    document.getElementById("myTextArea").value = archivos_compartidos[i].archivo.content;

                }
        
            }

        }

    }


}


function guarda_archivo(){

    let temp = localStorage.getItem("archivos_compartidos")
    archivos_compartidos = JSON.parse(temp);

    const archivoSelect = document.getElementById("archivo_editar");
    let archivoValue = archivoSelect.value;
    console.log(archivoValue);

    let path = $('#path').val();
    carpetaP = tree.getFolder(path);
    console.log(carpetaP.files);

    if(archivoValue.includes(" (En panel actual)")){
        archivoValue = archivoValue.replace(" (En panel actual)", "");

        for (let i = 0; i < carpetaP.files.length; i++) {
            if(carpetaP.files[i].name == archivoValue){

                let texto = document.getElementById("myTextArea").value
                carpetaP.files[i].content = texto



            }
    
        }
        localStorage.setItem(usuario_actual, JSON.stringify(JSON.decycle(tree)));
    }

    if(archivoValue.includes(" (En compartido contigo)")){

        archivoValue = archivoValue.replace(" (En compartido contigo)", "");

        for (let i = 0; i < archivos_compartidos.length; i++) {
            if(archivos_compartidos[i].archivo.name == archivoValue && archivos_compartidos[i].permisos == "w" || archivos_compartidos[i].archivo.name == archivoValue && archivos_compartidos[i].permisos == "r-w"){

               let texto = document.getElementById("myTextArea").value;
               archivos_compartidos[i].archivo.content = texto;

            }
    
        }
        localStorage.setItem("archivos_compartidos", JSON.stringify(archivos_compartidos))

    }

    $('#carpetas').html(tree.getHTML(path))
    alert("Se modifico correctamente el archivo")
    
}

function cargar_estudiantes(){

    let temp = localStorage.getItem("avlTree")
    estudiantes = JSON.parse(temp).estudiantes;

    const selectElement = document.getElementById("receiver");
    selectElement.innerHTML = ""; // Eliminar opciones antiguas
    selectElement.innerHTML = "<option selected disabled>Seleccionar Usuario</option>";
    opciones = estudiantes;
    for (let i = 0; i < opciones.length; i++) {
        if(opciones[i].nombre != nombre_actual){
            const opcion = opciones[i].nombre;
            const elementoOpcion = document.createElement("option");
            elementoOpcion.value = opcion;
            elementoOpcion.textContent = opcion;
            selectElement.appendChild(elementoOpcion);
        }

    }
}

async function sendMessage(whoSend){
    // OBTENER VALORES DEL SELECT 
    let carnet_transmitter = "";
    let carnet_receiver = "";

    let transmitter = nombre_actual;
    let receiver = $('#receiver').val();

    let temp = localStorage.getItem("avlTree")
    estudiantes = JSON.parse(temp).estudiantes;

    opciones = estudiantes;
    for (let i = 0; i < opciones.length; i++) {
        if(opciones[i].nombre == nombre_actual){
           carnet_transmitter = opciones[i].carnet
        }

        if(opciones[i].nombre == receiver){
            carnet_receiver = opciones[i].carnet 
        }

    }


    const formattedDateTime = `${(new Date()).getDate().toString().padStart(2, '0')}-${((new Date()).getMonth() + 1).toString().padStart(2, '0')}-${(new Date()).getFullYear().toString().padStart(4, '0')} :: ${(new Date()).getHours().toString().padStart(2, '0')}:${(new Date()).getMinutes().toString().padStart(2, '0')}:${(new Date()).getSeconds().toString().padStart(2, '0')}`;

    
    // VERIFICAR QUE HAYA SELECCIONADO UN USUARIO
    if(transmitter && receiver){
        switch(whoSend){
            case 'transmitter':
                // OBTENER MENSAJE A ENVIAR
                let msgt = $('#msg-transmitter').val();
                // INSERTAR MENSAJE EN BLOCKCHAIN
                await blockChain.insert(transmitter, receiver, msgt, formattedDateTime, carnet_transmitter, carnet_receiver);
                $('#msg-transmitter').val("");
            break;
            case 'receiver':
                // OBTENER MENSAJE A ENVIAR
                let msgr = $('#msg-receiver').val();
                // INSERTAR MENSAJE EN BLOCKCHAIN
                await blockChain.insert(receiver, transmitter, msgr, formattedDateTime, carnet_transmitter, carnet_receiver);
                $('#msg-receiver').val("");
            break;
        }


        alert("Mensaje enviado");
        localStorage.setItem("blockChain", JSON.stringify(JSON.decycle(blockChain)));
        // ACTUALIZAR CHATS
        updateChats();
    }else{
        alert("No ha seleccionado Receptop o Emisor");
    }
}


function updateChats(){
    let transmitter = nombre_actual;
    let receiver = $('#receiver').val();
    $('#transmitter-chat').html(blockChain.getMessages(transmitter, receiver));
    $('#receiver-chat').html(blockChain.getMessages(receiver, transmitter));
}


