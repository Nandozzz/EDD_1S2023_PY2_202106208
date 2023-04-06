
class Bitacora {
    constructor(fecha, accion) {
      this.fecha = fecha;
      this.accion = accion;
    }
}


class Node {
    constructor(value) {
    this.value = value;
    this.next = null;
    }
}


class CircularList {
    constructor() {
    this.head = null;
    this.tail = null;
}

// INSERTAR AL FINAL
insertList(fecha, accion) {
    const newNode = new Node(new Bitacora(fecha, accion));
    if (this.head == null) {
        this.head = newNode;
        this.tail = newNode;
        // Asignar puntero a la cabeza haciendo la lista circular
        newNode.next = this.head;
      } else {
        this.tail.next = newNode;
        this.tail = newNode;
        this.tail.next = this.head;
      }

}


// MÉTODO PARA IMPRIMIR LA LISTA
print() {
    let temp = this.head;
    if(this.head == null){
        console.log("Lista vacia");

    }else{
        console.log("----Lista----")
        while (temp.next != this.head) {
            console.log(temp.value);
            temp = temp.next;
        }
        console.log(temp.value);
    }

}
    
// MÉTODO PARA GENERAR CÓDIGO GRPHVIZ
graph() {
    let temp = this.head;
    let conn = "";
    let nodes = "";
    let counter = 0;
    let rango = "";
    while (temp.next != this.head) {
    nodes += `N${counter}[label="Accion: ${temp.value.accion}"];\n`;
    conn += `N${counter}->`;
    rango += `N${counter} `
    temp = temp.next;
    counter++;
    }
    nodes += `N${counter}[label="Accion: ${temp.value.accion}"];\n`;
    conn += `N${counter}-> N0`;
    rango += `N${counter} `
    console.log(nodes);
    console.log(conn);

    return  "digraph G {\n" + "node[shape=rectangle, style=filled, color=black, fillcolor=white, width=4];\n" + "rankdir=TB;\n" + "nodesep=1;\n" + nodes + conn + "{rank=same;" + rango + ";}\n" + "\n}"
    

}
}