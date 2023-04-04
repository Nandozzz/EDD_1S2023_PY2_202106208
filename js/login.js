
let avlTree = new AvlTree();

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
