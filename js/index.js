// let NaryTree = require('./structures/n-ary-tree');

let usuario_actual = localStorage.getItem("usuario_actual")
let nombre_actual = localStorage.getItem("nombre_actual")
let Tree2 = JSON.retrocycle(JSON.parse(localStorage.getItem(usuario_actual)));


let tree =  new Tree(Tree2.size, Tree2.listaC);
tree.root = Tree2.root;


iniciar_sesion()



let valorSpan = document.getElementById("valor_id");
valorSpan.innerHTML = `${nombre_actual}`;








function crearCarpeta(e){
    e.preventDefault();
    let folderName = nuevoNombre()
    let path =  $('#path').val();
    tree.insert(folderName, path);
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
                type: form.file.type
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
            type: form.file.type
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
        const opcion = opciones[i];
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

            archivos_compartidos.push({propietario: usuario_actual, destinatario: usuarioValue, ubicacion: path, archivo:archivo, permisos:permisoValue})
            localStorage.setItem("archivos_compartidos", JSON.stringify(archivos_compartidos))

            tree.insertFile(path, archivoValue, usuarioValue, permisoValue);
            alert('Permisos dados a '+ usuarioValue)
        }else {
            alert('Ya posees esos permisos')
        }

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

            row +=`
            <tr>
                <th>${archivos_compartidos[i].propietario}</th>
                <td>${archivos_compartidos[i].destinatario}</td>
                <td>${archivos_compartidos[i].ubicacion}</td>
                <td> <a href="${url}" download="descarga" class="btn btn-primary btn-sm">${archivos_compartidos[i].archivo.name}</a></td>
                <td>${archivos_compartidos[i].permisos}</td>
            </tr>
            `;

        }else{

            row +=`
            <tr>
                <th>${archivos_compartidos[i].propietario}</th>
                <td>${archivos_compartidos[i].destinatario}</td>
                <td>${archivos_compartidos[i].ubicacion}</td>
                <td> <a href="${archivos_compartidos[i].archivo.content}" download="descarga" class="btn btn-primary btn-sm">${archivos_compartidos[i].archivo.name}</a></td>
                <td>${archivos_compartidos[i].permisos}</td>
            </tr>
            `;
        }


      }
    }

    $('#permisosTable tbody').html(
        row
    )
}
