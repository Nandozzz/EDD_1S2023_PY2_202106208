// let NaryTree = require('./structures/n-ary-tree');


let tree =  new Tree();


function crearCarpeta(e){
    e.preventDefault();
    let folderName = nuevoNombre()
    let path =  $('#path').val();
    tree.insert(folderName, path);
    alert("Todo bien!")

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear().toString().padStart(4, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    tree.listaC.insertList(formattedDate, "Acción: Se creo carpeta \""+folderName +"\"")

    $('#carpetas').html(tree.getHTML(path))
}

function entrarCarpeta(folderName){
    let path = $('#path').val();
    let curretPath = path == '/'? path + folderName : path + "/"+ folderName;
    console.log(curretPath)
    $('#path').val(curretPath);
    $('#carpetas').html(tree.getHTML(curretPath))
}

function retornarInicio(){
    $('#path').val("/");
    $('#carpetas').html(tree.getHTML("/"))
}

function showTreeGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${tree.graph()} }`
    $("#graph").attr("src", url + body);
}

function showMatrixGraph(){
    let path = $('#path').val();
    let url = 'https://quickchart.io/graphviz?graph=';
    console.log(tree.matrixGrpah(path))
    let body = `digraph G { ${tree.matrixGrpah(path)} }`
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
        let fr = new FileReader();
        fr.readAsText(form.file);
        fr.onload = () => { 
            // CARGAR ARCHIVO A LA MATRIZ
            nombreA = nuevoNombreArchivo()
            tree.getFolder(path).files.push({
                name: nombreA, 
                content: fr.result, 
                type: form.file.type
            })
            $('#carpetas').html(tree.getHTML(path));
        };
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
        // console.log(parseBase64)
        // $("#imagenSubida").attr("src", imgBase64); 
        // console.log(await toBase64(form.file));
    }

    const now = new Date();
    const formattedDate = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear().toString().padStart(4, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    tree.listaC.insertList(formattedDate, "Acción: Se creo archivo \""+ nombreA +"\"")
    alert('Archivo Subido!')

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
    selectElement3.innerHTML = "<option selected disabled>Seleccionar Archivo</option>";

    const permisos = ["r", "w", "r-w"];
    permisos.forEach(opcion => {
      const elementoOpcion = document.createElement("option");
      elementoOpcion.value = opcion;
      elementoOpcion.textContent = opcion;
      selectElement3.appendChild(elementoOpcion);
    });



}


function agregar_sparase(){
    const archivoSelect = document.getElementById("archivos");
    const archivoValue = archivoSelect.value;
    console.log(archivoValue );


    const usuarioSelect = document.getElementById("usuarios");
    const usuarioValue = usuarioSelect.value;
    console.log(usuarioValue);


    const permisoSelect = document.getElementById("permisos");
    const permisoValue = permisoSelect.value;
    console.log(permisoValue);

    let path = $('#path').val();
    tree.insertFile(path, archivoValue, usuarioValue, permisoValue);


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
    tree.listaC.insertList(formattedDate, "Acción: Se elimino carpeta \""+ carpetaValue +"\"")
    alert('Carpeta eliminada!')
    
    $('#carpetas').html(tree.getHTML(path))

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
            nuevoName= fileName + " ("+ N +")";

            estado=buscarArchivos(nuevoName);

          
        } while (estado == true);

        return nuevoName;
    }

    return fileName;


}
