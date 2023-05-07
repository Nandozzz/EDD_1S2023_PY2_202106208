// CLASE DEL BLOCQUE DEL BLOCK-CHAIN
class Block{
    constructor(index, transmitter, receiver, message, previusHash, hash, fecha, carnet_transmitter, carnet_receiver, encriptado){
        this.index = index;
        this.timestamp = fecha;
        this.transmitter = transmitter;
        this.receiver = receiver;
        this.message = message;
        this.previusHash = previusHash; // HASH DEL BLOQUE ANTERIOR
        this.hash = hash; // HASH DEL BLOQUE ACTUAL
        this.carnet_transmitter =carnet_transmitter;
        this.carnet_receiver = carnet_receiver;
        this.encriptado = encriptado;
        
        // APUNTADORES DEL NODO
        this.next = null;
        this.prev = null;
    }


}

class BlockChain{
    // CONSTRUCTOR PARA LA LISTA DOBLE
    constructor(){
        this.head = null;
        this.end = null;
        this.size = 0;
    }

    // INSERCIÓN SÓLO AL FINAL **FUNCIÓN ASÍNCRONA**
    async insert(transmitter, receiver, message, fecha, carnet_transmitter, carnet_receiver){

        let tem = this.aesEncrypt(message, "Mi clave secreta"); 
        
        let newNode = new Block(this.size, transmitter, receiver, message, "","", fecha, carnet_transmitter, carnet_receiver, tem);
        if(this.head == null){
            // HASH ANTERIOR DEL PRIMER BLOQUE
            newNode.previusHash = "00000";
            // ASIGNAR EL HASH AL BLOQUE ACTUAL
            newNode.hash = await this.getSha256(newNode);
            // INSERTAR EL NODO
            this.head = newNode;
            this.end = newNode;
            // AUMENTAR TAMAÑO
            this.size++;
        }else{
            // ASIGNAR PRIMERO EL HASH ANTERIOR
            newNode.previusHash = this.end.hash;
            // CREAR EL HASH ACTUAL
            newNode.hash = await this.getSha256(newNode);
            // INSERTAR EL NODO AL FINAL
            this.end.next = newNode;
            newNode.prev = this.end;
            this.end = newNode;
            // AUMENTAR TAMAÑO
            this.size++;
        }
    }

    // MÉTODO PARA OBTENER SHA256 DE UN BLOQUE
    // REF: https://stackoverflow.com/questions/63736585/why-does-crypto-subtle-digest-return-an-empty-object
    async getSha256(block){
        // PASAR EL OBJETO A STRING
        let str = JSON.stringify(block).toString();
        // OBTENER LOS BYTES DEL STRING 
        let bytes = new TextEncoder().encode(str);
        // OBTENER BYTES DEL HASH
        let hashBytes = await window.crypto.subtle.digest("SHA-256", bytes);
        // PASAR EL HASH A STRING 
        let hash = Array.prototype.map.call(new Uint8Array(hashBytes), x => ('00' + x.toString(16)).slice(-2)).join('');
        // RETORNAR EL HASH
        return hash;
    }

    // METODO PARA IMPRIMIR EN CONSOLA
    print(){        
        if(this.head !== null){
            let temp = this.head;
            while(temp !== null){
                console.log(temp);
                temp = temp.next;
            }
        }
    }

    // NÚMEROS DE CARNET DEL CHAT
    getMessages(transmitter, receiver){
        if(this.head !== null){
            let msgs = "";
            let temp = this.head;
            while(temp !== null){
                if(String(temp.receiver) === String(transmitter)){
                    if(String(temp.transmitter) === String(receiver)){
                        msgs += `<li class="list-group-item">${temp.message}</li>`;
                    }
                }else if(String(temp.transmitter) === String(transmitter)){
                    if(String(temp.receiver) === String(receiver)){
                        msgs += `<li class="list-group-item bg-primary text-light" style="text-align: right">${temp.message}</li>`;
                    }
                }
                temp = temp.next;
            }
            if(msgs){
                return `
                    <ul class="list-group">
                        ${msgs}
                    </ul>
                `;
            }
        }
        return "No hay mensajes";
    }

    blockReport(index = 0){

        if(this.head){
            let temp = this.head;
            while(temp !== null){
                if(temp.index === index){
                    // EL NOMBRE DE LA TABLA TIENE EL INDEX DEL BLOQUE, PARA PODER OBTENER EL SIGUIENTE O EL ANTERIOR
                    return `
                        <table class="table table-bordered" id="block-table" name="${temp.index}">
                            <tbody>
                                <tr>
                                    <th scope="row" class="col-3">Index</th>
                                    <td class="col-9">${temp.index}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Timestamp</th>
                                    <td>${temp.timestamp}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Transmitter</th>
                                    <td>${temp.transmitter}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Carnet Transmitter</th>
                                    <td>${temp.carnet_transmitter}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Receiver</th>
                                    <td>${temp.receiver}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Carnet Receiver</th>
                                    <td>${temp.carnet_receiver}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Message</th>
                                    <td style="max-width: 200px; word-wrap: break-word;">${temp.encriptado}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Previus Hash</th>
                                    <td style="max-width: 200px; word-wrap: break-word;">${temp.previusHash}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Hash del Bloque</th>
                                    <td style="max-width: 200px; word-wrap: break-word;">${temp.hash}</td>
                                </tr>
                            </tbody>
                        </table>
                    `;
                }else{
                    temp = temp.next;
                }

            }
        }
        return "";
    }

    graph() {
        let temp = this.head;
        let conn = "";
        let nodes = "";
        let counter = 0;
        let rango = "";
        while (temp.next != null) {
        nodes += `N${counter}[label=<Timestamp: ${temp.timestamp} <br/> Emisor: ${temp.carnet_transmitter} <br/> Receptor: ${temp.carnet_receiver} <br/> Previus Hash: ${temp.previusHash} <br/> Mensaje: ${temp.message}>];\n`;
        conn += `N${counter}->`;
        rango += `N${counter} `
        temp = temp.next;
        counter++;
        }
        nodes += `N${counter}[label=<Timestamp: ${temp.timestamp} <br/> Emisor: ${temp.carnet_transmitter} <br/> Receptor: ${temp.carnet_receiver} <br/> Previus Hash: ${temp.previusHash} <br/> Mensaje: ${temp.message}>];\n`;
        conn += `N${counter}`;
        rango += `N${counter} `
    
        return  "digraph G {\n" + "node[shape=rectangle, style=filled, color=black, fillcolor=white, width=4];\n" + "rankdir=TB;\n" + "nodesep=1;\n" + nodes + conn + ";\n" + "\n}"
        
    
    }
    

    

    aesEncrypt(message, key) {
        const encrypted = CryptoJS.AES.encrypt(message, key);
        return encrypted.toString();
    }

}