//--------------------------------------------------------------------------
//                      DECLARACIÓN DE LAS ESTRUCTURAS A UTILIZAR
//--------------------------------------------------------------------------
let avlTree = new AvlTree();
let hashTable = new HashTable();
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
                avlTree.estudiantes.push(studentsArray[i].carnet);
            }
            // GUARDAR EN LOCAL STORAGE

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

    $('#permisosTable tbody').html(
        row
    )
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




$( document ).ready(showLocalStudents);