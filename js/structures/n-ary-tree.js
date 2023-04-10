
// CLASE NODO 
class Tnode{
    
    constructor(folderName){
        this.folderName = folderName;
        this.files = [];
        this.children = []; // TODOS LOS NODOS HIJOS
        this.id = null; // PARA GENERAR LA GRÁFICA
        this.matriz = new SparseMatrix();
        this.matriz2 = new SparseMatrix()
    }

}


class Tree{
    constructor(size, lista){
        this.root = new Tnode('/');
        this.root.id = 0;
        this.size = size // Para generar los ids
        this.listaC = lista;
    }

    insert(folderName, fatherPath){ 
        let newNode =  new Tnode(folderName);

        let fatherNode = this.getFolder(fatherPath);
        if(fatherNode){
            this.size += 1;
            newNode.id = this.size;

            fatherNode.children.push(newNode);
        }else{
            console.log("Ruta no existe");
        }
    }


    getFolder(path){
        // Padre sea una '/'
        // console.log(path);
        if(path == this.root.folderName){
            return this.root;
        }else{
            let temp = this.root;
            let folders = path.split('/');
            folders = folders.filter( str => str !== '');
            let folder = null;
            while(folders.length > 0){
                let currentFolder = folders.shift()
                folder = temp.children.find(child => child.folderName == currentFolder);
                if(typeof folder == 'undefined' || folder == null){
                    return null;
                }
                temp = folder;
            }
            return temp;
        }
    }

    graph(){
        let nodes = "";
        let connections = "";

        let node = this.root;
        let queue = [];
        queue.push(node);
        while(queue.length !== 0){
            let len = queue.length;
            for(let i = 0; i < len; i ++){
                let node = queue.shift();
                nodes += `S_${node.id}[label="${node.folderName}"];\n`;
                node.children.forEach( item => {
                    connections += `S_${node.id} -> S_${item.id};\n`
                    queue.push(item);
                });
            }
        }
        return 'node[shape="record"];\n' + nodes +'\n'+ connections;
    }

    getHTML(path){
        let node = this.getFolder(path);
        let code = "";
        node.children.map(child => {
            code += ` <div class="col-2 folder" onclick="entrarCarpeta('${child.folderName}')">
                        <img src="./imgs/folder.png" width="100%"/>
                        <p class="h6 text-center">${child.folderName}</p>
                    </div>`
        })
        // console.log(node.files)
        node.files.map(file => {
            if(file.type === 'text/plain'){
                let archivo = new Blob([file.content], {type: file.type} );
                const url = URL.createObjectURL(archivo);
                code += `
                        <div class="col-2 folder">
                        <img src="./imgs/file.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${url}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>
                `
            }else{
                code += ` <div class="col-2 folder">
                        <img src="./imgs/file.png" width="100%"/>
                        <p class="h6 text-center">
                            <a href="${file.content}" download>
                                ${file.name}
                            </a>
                        </p>
                    </div>`
            }
        })
        return code;
    }


    insertFile(path, archivoNombre, carnet, permisos){
    let temp = this.getFolder(path);
    let matriz2 = new SparseMatrix()
    
    matriz2.head = temp.matriz.head

    if(matriz2.actualizar(archivoNombre, carnet, permisos)==false){
        matriz2.insert(archivoNombre, carnet, permisos);
    }
    
    temp.matriz = matriz2;
    }    
    
    insertX(path, archivoNombre){
        let temp = this.getFolder(path);
        let matriz2 = new SparseMatrix()
        
        matriz2.head = temp.matriz2.head
        console.log(archivoNombre)
    
        matriz2.insertX(archivoNombre);

        temp.matriz2 = matriz2;
    }    
        


    matrixGrpah(path){
         let temp = this.getFolder(path);
         let matriz2 = new SparseMatrix()

         matriz2.head = temp.matriz.head
 
         return matriz2.graph();
    }

    matrixGrpah2(path){
        let temp = this.getFolder(path);
        let matriz3 = new SparseMatrix()

        matriz3.head = temp.matriz2.head

        return matriz3.graph2();
   }

   insertarLista(fecha, accion){
        let temp = this.listaC
        let lista = new CircularList()

        lista.head= temp.head
        lista.tail = temp.tail

        lista.insertList(fecha, accion);

        this.listaC = lista
   }


   listGrpah(){
    let temp = this.getFolder(path);
    let matriz3 = new CircularList()

    matriz3.head = temp.matriz2.head

    return matriz3.graph2();
}


    remove(folderName, fatherPath) {
        let fatherNode = this.getFolder(fatherPath);
    
        if (fatherNode) {
          // Encontrar el índice del nodo a eliminar en la lista de hijos del padre
          let childIndex = fatherNode.children.findIndex(
            child => child.folderName === folderName
          );
    
          if (childIndex !== -1) {
            let nodeToRemove = fatherNode.children[childIndex];
    
            // Eliminar las referencias al nodo a eliminar
            fatherNode.children.splice(childIndex, 1);
    
            // Actualizar el tamaño del árbol
            this.size--;
    
    
            // Eliminar el nodo y limpiar sus parámetros
            this.folderName = null;
            this.files = [];
            this.children = [];
            this.id = 0;
            this.matriz = new SparseMatrix();
            this.matriz2 = new SparseMatrix()

            nodeToRemove = null
    
            alert(`Nodo ${folderName} eliminado`);
          } else {
            alert(`El nodo ${folderName} no existe en la ruta ${fatherPath}`);
          }
        } else {
          console.log(`La ruta ${fatherPath} no existe`);
        }
    }
    




    updateNodeIds(node) {
        node.id--;

        for (let child of node.children) {
            this.updateNodeIds(child);
        }
    }
}


// module.exports = Tree;