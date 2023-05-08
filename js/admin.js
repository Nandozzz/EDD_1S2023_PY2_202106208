//--------------------------------------------------------------------------
//                      DECLARACIÓN DE LAS ESTRUCTURAS A UTILIZAR
//--------------------------------------------------------------------------
let avlTree = new AvlTree();
let hashTable = new HashTable();
let blockChain = new BlockChain();
let archivos_compartidos = [];
//--------------------------------------------------------------------------
//                      FUNCIÓN PARA MANEJAR FORMULARIOS
//--------------------------------------------------------------------------
function loadStudentsForm(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    let studentsArray = [];
    try{        
        let fr = new FileReader();
        fr.readAsText(form.inputFile);
        fr.onload = () => {
            
            studentsArray = JSON.parse(fr.result).alumnos;
            //AGREGAR A LA TABLA LOS ALUMNOS CARGADOS 
            $('#studentsTable tbody').html(
                studentsArray.map((item, index) => {


                    return(`
                        <tr>
                            <th>${item.carnet}</th>
                            <td>${item.nombre}</td>
                            <td>${item.password}</td>
                        </tr>
                    `);
                }).join('')
            )
            for(let i = 0; i < studentsArray.length; i++){
                avlTree.insert(studentsArray[i]);
                console.log(avlTree.root.height)
                avlTree.estudiantes.push({carnet: studentsArray[i].carnet, nombre: studentsArray[i].nombre});
            }
            // GUARDAR EN LOCAL STORAGE
            localStorage.setItem("blockChain", JSON.stringify(JSON.decycle(blockChain)));

            localStorage.setItem("avlTree", JSON.stringify(avlTree))
            alert('Alumnos cargados con éxito!')
        }
    }catch(error){
        console.log(error);
        alert("Error en la inserción");
    }
 
    

}

function showLocalStudents(){
    let temp = localStorage.getItem("avlTree")
    avlTree.root = JSON.parse(temp).root;
    $('#studentsTable tbody').html(
        avlTree.inOrder()
    )
}


function mostrarTablaPermisos(){
    let row = "";
    let temp = localStorage.getItem("archivos_compartidos")
    archivos_compartidos = JSON.parse(temp);

    for(let i = 0; i < archivos_compartidos.length; i++) {


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
                <td> <a class="btn btn-primary btn-sm" onclick="ver('${url}')">Vista Previa</a></td>             
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
                <td> <a class="btn btn-primary btn-sm" onclick="ver('${archivos_compartidos[i].archivo.content}')">Vista Previa</a></td>
            </tr>
            `;
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



//--------------------------------------------------------------------------
//                   FUNCIÓN PARA AGREGAR RECORRIDOS
//--------------------------------------------------------------------------
function showStudentsForm(e){
    e.preventDefault();

    let temp = localStorage.getItem("hashTable")
    hashTable.table = JSON.parse(temp).table;

    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData);
    if(avlTree.root !== null){
        switch(form.traversal){
            case 'inOrder':
                $('#studentsTable tbody').html(
                    avlTree.inOrder()
                )
                break;
            case 'preOrder':
                $('#studentsTable tbody').html(
                    avlTree.preOrder()
                )
                break;
            case 'postOrder':
                $('#studentsTable tbody').html(
                    avlTree.postOrder()
                )
                break;
            
            case 'tablaHash':
                $('#studentsTable tbody').html(
                    hashTable.printTable()
                )
                break;
            default:
                $('#studentsTable tbody').html("")
                break;
        }
    }
}



function validar() {
    var carnet = document.getElementById("carnet").value;
    var contrasena = document.getElementById("password").value;

    if (carnet == "admin" && contrasena == "admin") {
      alert("Inicio de sesión exitoso");
      window.location.href = "admin.html";
      
    }else if(localStorage.getItem("avlTree") != null){
      
        let temp = localStorage.getItem("avlTree")
        avlTree.root = JSON.parse(temp).root;
  
        if(avlTree.search(parseInt(carnet), contrasena)!= null){
          alert("Inicio de sesión exitoso");
          window.location.href = "usuario.html";
        } else{
          alert("No se encontro usuario");
        }

    }else{

    alert("No se encontro usuario");

    }
      
}

function ingresar(){
    hashTable=avlTree.inOrder2()
    localStorage.setItem("hashTable", JSON.stringify(hashTable))
    alert("Carga realizada con exito");
}




function cerrar_sesion(){


    window.location.href = "index.html";

    alert("Hasta la próxima :(");
}


//--------------------------------------------------------------------------
//                   FUNCIÓN PARA MOSTRAR LA GRÁFICA
//--------------------------------------------------------------------------
function showAvlGraph(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `digraph G { ${avlTree.treeGraph()} }`
    console.log(body);
    $("#graph").attr("src", url + body);
}

function getBlock(index){

    let BlockChain2 = JSON.retrocycle(JSON.parse(localStorage.getItem("blockChain")));

    blockChain.head = BlockChain2.head;
    blockChain.end = BlockChain2.end;
    blockChain.size = BlockChain2.size;

    if(index === 0){
        let html = blockChain.blockReport(index);
        if(html){
            $('#show-block').html(html);
        }
    }else{
        let currentBlock = Number($('#block-table').attr('name'));
        
        if(index < 0){ // MOSTRAR EL ANTERIOR
            if(currentBlock - 1 < 0){
                alert("No existen elementos anteriores");
            }else{
                let html = blockChain.blockReport(currentBlock - 1);
                if(html){
                    $('#show-block').html(html);
                }
            }

        }else if(index > 0){ // MOSTRAR EL SIGUIENTE
            if(currentBlock + 1 > blockChain.size ){
                alert("No existen elementos siguientes");
            }else{
                let html = blockChain.blockReport(currentBlock + 1);
                if(html){
                    $('#show-block').html(html);
                }
            }
        }
    }
    

}


function blockChainGraph(){
    let BlockChain2 = JSON.parse(localStorage.getItem("blockChain"));

    blockChain.head = BlockChain2.head;
    blockChain.end = BlockChain2.end;
    blockChain.size = BlockChain2.size;

    let url = 'https://quickchart.io/graphviz?graph=';
    let body = `${blockChain.graph()}`
    console.log(body);
    $("#graph").attr("src", url + encodeURIComponent(body));
}



$( document ).ready(showLocalStudents);