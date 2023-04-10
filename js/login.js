
let avlTree = new AvlTree();
let lista = new CircularList()
let tree =  new Tree(1, lista);





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
        usuario=avlTree.search(parseInt(carnet), contrasena)

        if (localStorage.getItem(carnet) !== null) {
          // El archivo existe en el almacenamiento local
        } else {
          // El archivo no existe en el almacenamiento local
          localStorage.setItem(carnet, JSON.stringify(JSON.decycle(tree)));
        }
        localStorage.setItem("usuario_actual", carnet)
        localStorage.setItem("nombre_actual", usuario.nombre)
        window.location.href = "usuario.html";

      } else{
        alert("No se encontro usuario");
      }

  }else{

  alert("No se encontro usuario");

  }
    
}
