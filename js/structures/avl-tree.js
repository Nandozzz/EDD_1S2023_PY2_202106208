//--------------------------------------------------------------------------
//                      CLASE NODO
//--------------------------------------------------------------------------
class AvlNode{
    constructor(item){
        this.item = item;
        this.left = null;
        this.right = null;
        this.height = 1;

    }
}

//--------------------------------------------------------------------------
//                   VARIABLES GLOBALES
//--------------------------------------------------------------------------
let = nodes = "";
let = connections = "";

//--------------------------------------------------------------------------
//                   CLASE ARBOL AVL
//--------------------------------------------------------------------------
class AvlTree{

    constructor(){
        this.root = null;
        this.estudiantes = [];
    }
    // Función para insertar un valor en el árbol
    insert(value) {
        // Creamos un nuevo nodo con el valor dado
        const node = new AvlNode(value);

        // Si el árbol está vacío, establecemos el nuevo nodo como la raíz
        if (this.root === null) {
        this.root = node;
        return;
        }

        // Insertamos el nodo en el árbol y actualizamos las alturas
        this.root = this._insert(this.root, node);
    }
    _insert(root, node) {
        // Si el nodo es null, establecemos el nuevo nodo como la raíz
        if (root === null) {
        return node;
        }

        // Insertamos el nodo en el subárbol izquierdo o derecho según su valor
        if (node.item.carnet < root.item.carnet) {
            root.left = this._insert(root.left, node);
        } else if (node.item.carnet > root.item.carnet){
            root.right = this._insert(root.right, node);
        } else {
            console.log("Elemento ya existe en el árbol");
            return root;
        }

        // Actualizamos la altura del nodo actual
        root.height = Math.max(this.height(root.left), this.height(root.right)) + 1;

        // Obtenemos el balance factor del nodo actual
        const balanceFactor = this.balanceFactor(root);
        // Si el nodo actual está desbalanceado, realizamos las rotaciones necesarias
        if (balanceFactor > 1 && node.item.carnet < root.left.item.carnet) {
            // Caso 1: el nodo actual está desbalanceado hacia la izquierda y el nuevo nodo se encuentra en el subárbol izquierdo de su hijo izquierdo
            console.log("balanceando a la derecha")
            return this.rotateRight(root);
        }
    
        if (balanceFactor > 1 && node.item.carnet > root.left.item.carnet) {
            // Caso 2: el nodo actual está desbalanceado hacia la izquierda y el nuevo nodo se encuentra en el subárbol derecho de su hijo izquierdo
            root.left = this.rotateLeft(root.left);
            console.log("balanceando doble a la derecha")
            return this.rotateRight(root);
        }
    
        if (balanceFactor < -1 && node.item.carnet > root.right.item.carnet) {
            // Caso 3: el nodo actual está desbalanceado hacia la derecha y el nuevo nodo se encuentra en el subárbol derecho de su hijo derecho
            console.log("balanceando a la izquierda")
            return this.rotateLeft(root);
        }
    
        if (balanceFactor < -1 && node.item.carnet < root.right.item.carnet) {
            // Caso 4: el nodo actual está desbalanceado hacia la derecha y el nuevo nodo se encuentra en el subárbol izquierdo de su hijo derecho
            root.right = this.rotateRight(root.right);
            console.log("balanceando doble a la izquierda")
            return this.rotateLeft(root);
        }
    
        // Si el árbol sigue balanceado, simplemente devolvemos el nodo actual
        return root;
    }

    find(user,pass) {
        console.log("ingreso")
        // Función auxiliar recursiva para buscar el valor en el árbol
        const search = (node) => {
            if (!node) return null;
            console.log("pase :D");
            console.log(node.item.carnet, node.item.password);
            if (user === node.item.carnet && pass === node.item.password) {
                return node;
            } else if (user < node.item.carnet) {
                return search(node.left);
            } else if (user > node.item.carnet) {
                return search(node.right);
            } else {
                // Aquí se realiza una comparación adicional para asegurarse de que los valores se estén comparando correctamente
                return (pass === node.item.password) ? node :null;
            }
        };
    
        return search(this.root);
    }

    //Para obtener el balance del nodo
    balanceFactor(node) {
        if (node === null) {
          return 0;
        }
        return this.height(node.left) - this.height(node.right);
      }
    
    // saber la altura del nodo
    height(node){
        return node?.height || 0;
    }
    
    //obtener la altura máxima del nodo
    getMaxHeight(leftNode, rightNode){
        return leftNode.height > rightNode.height ? leftNode.height : rightNode.height;
    }


    // //--------------------------------------------------------------------------
    // //                   ROTACIONES
    // //--------------------------------------------------------------------------
    rotateRight(node) {
        const leftNode = node.left;
        const rightLeftNode = leftNode.right;
    
        // Realizamos la rotación
        leftNode.right = node;
        node.left = rightLeftNode;
    
        // Actualizamos las alturas de los nodos
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        leftNode.height = Math.max(this.height(leftNode.left), this.height(leftNode.right)) + 1;
        return leftNode;
    }
    // Función para rotar a la izquierda un subárbol
    rotateLeft(node) {
        const rightNode = node.right;
        const leftRightNode = rightNode.left;

        // Realizamos la rotación
        rightNode.left = node;
        node.right = leftRightNode;

        // Actualizamos las alturas de los nodos
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        rightNode.height = Math.max(this.height(rightNode.left), this.height(rightNode.right)) + 1;

        // Devolvemos la nueva raíz del subárbol rotado
        return rightNode;
    }

    //--------------------------------------------------------------------------
    //                  REPORTE DEL ARBOL
    //--------------------------------------------------------------------------
    treeGraph(){       
        nodes = "";
        connections = "";
        this.#treeGraphRecursive(this.root);
        // console.log(nodes,connections);
        return nodes + connections;
    }
    #treeGraphRecursive(current){
        if(current.left != null){
            this.#treeGraphRecursive(current.left);
            connections += `S_${current.item.carnet} -> S_${current.left.item.carnet};\n`;
        }
        console.log(current.height, current.item.nombre)
        nodes += `S_${current.item.carnet}[label="${current.item.carnet} \\n ${current.item.nombre} \\n Altura: ${current.height}"];\n`
        if(current.right != null){
            this.#treeGraphRecursive(current.right);
            connections += `S_${current.item.carnet} -> S_${current.right.item.carnet};\n`;
        }
    }
    
    //--------------------------------------------------------------------------
    //                  RECORRIDO IN ORDER
    //--------------------------------------------------------------------------
    inOrder(){
        let html = this.#inOrderRecursive(this.root);
        return html;
    }
    #inOrderRecursive(current){
        let row = "";
        if(current.left != null){
            row += this.#inOrderRecursive(current.left);
        }
        row +=`
            <tr>
                <th>${current.item.carnet}</th>
                <td>${current.item.nombre}</td>
                <td>${current.item.password}</td>
            </tr>
        `;
        if(current.right != null){
            row += this.#inOrderRecursive(current.right);
        }
        return row;
    }
    //--------------------------------------------------------------------------
    //                  RECORRIDO PRE ORDER
    //--------------------------------------------------------------------------
    preOrder(){
        let html = this.#preOrderRecursive(this.root);
        return html;
    }
    #preOrderRecursive(current){
        let row = "";
        row +=`
            <tr>
                <th>${current.item.carnet}</th>
                <td>${current.item.nombre}</td>
                <td>${current.item.password}</td>
            </tr>
        `;
        if(current.left != null){
            row += this.#inOrderRecursive(current.left);
        }
        if(current.right != null){
            row += this.#inOrderRecursive(current.right);
        }
        return row;
    }

    //--------------------------------------------------------------------------
    //                  RECORRIDO POST ORDER
    //--------------------------------------------------------------------------
    postOrder(){
        let html = this.#postOrderRecursive(this.root);
        return html;
    }
    #postOrderRecursive(current){
        let row = "";
        if(current.left != null){
            row += this.#inOrderRecursive(current.left);
        }
        if(current.right != null){
            row += this.#inOrderRecursive(current.right);
        }
        row +=`
            <tr>
                <th>${current.item.carnet}</th>
                <td>${current.item.nombre}</td>
                <td>${current.item.password}</td>
            </tr>
        `;
        return row;
    }

    search(carnet, password) {
        let current = this.root;
      
        while (current) {
          if (carnet == current.item.carnet && password == current.item.password) {
            return current.item;
          } else if (carnet < current.item.carnet) {
            current = current.left;
          } else {
            current = current.right;
          }
        }
      
        return null; // Si no se encuentra el estudiante, se devuelve null
    }


}