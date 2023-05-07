
// CLASE NODO 
class Tgnode{
    
    constructor(folderName, weight){
        this.folderName = folderName;
        this.files = [];
        this.children = []; // TODOS LOS NODOS HIJOS
        this.id = null; // PARA GENERAR LA GRÁFICA
        this.weight = weight;
    }
}


class Graph{
    constructor(size){
        // nodo raiz
        this.root = new Tgnode('/', 1);
        this.root.id = 0;
        this.size = 1; // Para generar los ids
    }


    insert(folderName, fatherPath){ 
        let {node:fatherNode, weight} = this.getFolder(fatherPath);
        let newNode =  new Tgnode(folderName, weight);

        
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
        let weight = 2;
        if(path == this.root.folderName){
            return {node: this.root, weight: weight};
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
                weight++;
            }
            return {node: temp, weight: weight}; 
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
                if(node.id ==0){
                    nodes += `S_${node.id}[label="${node.folderName}",shape=record];\n`;
                }else{
                    nodes += `S_${node.id}[label="${node.folderName}"];\n`;
                }
                
                node.children.forEach( item => {
                    connections += `S_${node.id} -> S_${item.id} [label="${node.weight}"];\n`
                    queue.push(item);
                });
            }
        }
        // sep="+10,20"; \noverlap=scalexy;
        return  '\nsep="+0.1,0.1"; \noverlap=scalexy; \nlayout=neato; \nedge[dir=none];\n' + nodes +'\n'+ connections;
    }

    remove(folderName, fatherPath) {
        let {node:fatherNode, weight} = this.getFolder(fatherPath);
        let numRest = 0
    
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
            numRest=nodeToRemove.children.length
            this.size-numRest;
    
    
            // Eliminar el nodo y limpiar sus parámetros
            this.folderName = null;
            this.files = [];
            this.children = [];
            this.id = 0;
            this.weight = weight;


            nodeToRemove = null
    
            alert(`Nodo ${folderName} eliminado`);
          } else {
            alert(`El nodo ${folderName} no existe en la ruta ${fatherPath}`);
          }
        } else {
          console.log(`La ruta ${fatherPath} no existe`);
        }
    }
    
}