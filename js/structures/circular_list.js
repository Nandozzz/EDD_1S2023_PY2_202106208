
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
    while (temp.next != this.head) {
    nodes += `N${counter}[label="Valor: ${temp.value}"];\n`;
    conn += `N${counter}->`;
    temp = temp.next;
    counter++;
    }
    nodes += `N${counter}[label="Valor: ${temp.value}"];\n`;
    conn += `N${counter}-> N0`;
    console.log(nodes);
    console.log(conn);
}
}