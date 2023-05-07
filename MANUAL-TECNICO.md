# EDD GoDrive

El sistema denominado como EDD GoDrive debe de llevar el control de usuarios, donde cada
uno de los cursos de la carrera de ingeniería en sistemas debe de contar con un
espacio de almacenamiento donde se puede subir, crear y eliminar carpetas, así
como también archivos. Los usuarios también tendrán la opción de modificar los
nombres de carpetas y archivos ya creados. La aplicación es responsiva y
amigable al usuario. A continuación, se da una explicación técnica más detallada de EDD GoDrive.



# Descripción  
El proyecto de EDD GoDrive, se basa en el uso de TDA, las cuales son estructuras de datos que define un conjunto de operaciones y restricciones para manipular un conjunto de datos. La implementación de estas operaciones no es visible para el usuario de la estructura, lo que permite ocultar los detalles internos de la estructura y enfocarse en su uso. Las TDA son fundamentales en la programación orientada a objetos y en la programación modular en general, ya que permiten separar la especificación de la estructura de datos de su implementación.

## Blockchain
La tecnología blockchain es una base de datos distribuida y segura, que utiliza criptografía para garantizar la integridad y la seguridad de la información almacenada en ella. La idea principal detrás de la tecnología blockchain es crear una base de datos de transacciones que no puedan ser alteradas o borradas una vez que se han registrado. Esto se logra mediante la creación de bloques de datos que se conectan entre sí formando una cadena.

Cada bloque en la cadena de bloques contiene información como la fecha y hora de la transacción, el remitente y el destinatario, el importe de la transacción y una firma digital única que lo identifica. Cada bloque también contiene una referencia al bloque anterior en la cadena, lo que garantiza que los bloques sean inmutables y que cualquier intento de modificar un bloque se refleje en toda la cadena.

En resumen, blockchain es una tecnología que se basa en la descentralización, la transparencia y la seguridad para crear una base de datos inmutable y resistente a la manipulación. Se utiliza en una amplia variedad de aplicaciones, desde la criptomoneda hasta la gestión de la cadena de suministro, y se considera una de las tecnologías más disruptivas e innovadoras de la última década.

Este código implementa una blockchain básica que se puede utilizar para almacenar mensajes encriptados en una lista doblemente enlazada. La clase Block define cada bloque de la cadena, mientras que la clase BlockChain maneja la lista de bloques. La clase `Block` tiene los siguientes atributos:

- `index`: un número entero que representa la posición del bloque en la cadena.
- `timestamp`: la fecha y hora en que se creó el bloque.
- `transmitter`: el remitente del mensaje.
- `receiver`: el destinatario del mensaje.
- `message`: el contenido del mensaje sin cifrar.
- `previusHash`: el hash del bloque anterior.
- `hash`: el hash del bloque actual.
- `carnet_transmitter`: el número de carnet del remitente.
- `carnet_receiver`: el número de carnet del destinatario.
- `encriptado`: el contenido del mensaje cifrado.

La clase BlockChain tiene los siguientes métodos:

- `async insert(transmitter, receiver, message, fecha, carnet_transmitter, carnet_receiver)`: este método crea un nuevo bloque en la cadena y lo inserta al final de la lista doblemente enlazada. Se toman como entrada el remitente (transmitter), el destinatario (receiver), el contenido del mensaje sin cifrar (message), la fecha y hora (fecha), y los números de carnet del remitente y destinatario (carnet_transmitter y carnet_receiver, respectivamente). El método utiliza getSha256 para calcular el hash del bloque actual y asignarlo al atributo hash. El hash del bloque anterior se asigna al atributo previusHash. El método también incrementa el contador size del número de bloques en la cadena.

- `async getSha256(block)`: este método toma un bloque como entrada y calcula su hash SHA-256. El hash se devuelve como una cadena de caracteres. El método utiliza el objeto window.crypto.subtle.digest para calcular el hash. El bloque se convierte en una cadena utilizando JSON.stringify y se codifica como una matriz de bytes utilizando new TextEncoder().encode. Los bytes del hash se convierten en una cadena hexadecimal utilizando Array.prototype.map.

- `print()`: este método imprime en la consola los detalles de cada bloque en la cadena. Comienza en el primer bloque y sigue los apuntadores next hasta llegar al final de la lista.

- `getMessages(transmitter, receiver)`: este método devuelve una lista de mensajes enviados entre dos usuarios específicos (transmitter y receiver). Devuelve una cadena de caracteres HTML que contiene la lista de mensajes. Cada mensaje se representa como un elemento de lista dentro de una lista no ordenada. Si no se encontraron mensajes entre los dos usuarios, el método devuelve "No hay mensajes".

- `blockReport(index = 0)`:  se utiliza para generar un informe en forma de tabla que muestra información específica de un bloque. El parámetro index especifica el índice del bloque que se desea mostrar. El método recorre la lista enlazada y busca el bloque con el índice especificado y luego genera el informe en forma de tabla. El informe contiene la información del bloque como su índice, sello de tiempo, transmisor, receptor, mensaje, hash anterior y hash actual. Este método es útil para verificar y validar los bloques de la cadena de bloques.

- `graph()`:El propósito de esta función es crear y devolver una representación visual en formato DOT de la lista enlazada que contiene objetos que representan los bloques de la Blockchain.

- `aesEncrypt(message, key)`: se utiliza para cifrar el mensaje utilizando el algoritmo de cifrado AES (Advanced Encryption Standard). El parámetro message es el mensaje que se desea cifrar y el parámetro key es la clave secreta que se utiliza para cifrar el mensaje. El método utiliza la biblioteca CryptoJS para cifrar el mensaje y devuelve el mensaje cifrado. El cifrado es importante para garantizar la seguridad y privacidad de los mensajes que se envían a través de la cadena de bloques.


## Tabla Hash

Es una estructura de datos que se utiliza para almacenar y recuperar datos de forma eficiente. Se trata de una matriz o arreglo en el que se pueden insertar, buscar y eliminar elementos de manera rápida.

La ventaja principal de utilizar una tabla hash es la rapidez en la búsqueda, ya que la información se almacena en una ubicación determinada, en función de su clave, lo que permite que se pueda acceder a ella de manera inmediata. En otras palabras, la búsqueda en una tabla hash tiene un tiempo constante, independientemente de la cantidad de elementos que se encuentren almacenados en ella.

Otra ventaja de la tabla hash es que, en general, se utiliza menos memoria que otras estructuras de datos, ya que solo se almacena la información que se necesita en cada momento, y no se requiere de un espacio de memoria predefinido para almacenar datos. La tabla hash permite realizar operaciones de inserción, eliminación y búsqueda de manera eficiente en una gran cantidad de datos, lo que la convierte en una herramienta muy útil para aplicaciones que manejan grandes volúmenes de información.

En cuanto a los principales métodos de la clase HashTable, podemos destacar:

- `insert()`: se utiliza para insertar nuevos elementos en la tabla hash. Toma tres argumentos: carnet, nombre y password.

- `calcularIndice(carnet)`: se utiliza para aplicar la fórmula hash y obtener el índice para un valor dado. La fórmula para obtener el índice es (suma ASCII del carnet) % capacidad actual. La función recorre cada carácter del carnet y suma los valores ASCII, luego aplica la operación de módulo con la capacidad actual y devuelve el índice.

- `recalcularIndice`: se utiliza cuando hay una colisión, es decir, cuando se asigna la misma posición a múltiples valores. El método calcula un nuevo índice aplicando la fórmula de colisiones [(suma ASCII del carnet) % capacidad actual] + intentos^2. Luego, si el nuevo índice es mayor que la capacidad actual, se resta la capacidad actual hasta que el nuevo índice sea menor que la capacidad actual.

- `checkCapacidad`: se utiliza para ampliar la capacidad del array si está lleno hasta el 75%. Comprueba si la cantidad de elementos utilizados es mayor que el 75% de la capacidad actual y, si es así, genera una nueva capacidad que sea el siguiente número primo mayor que la capacidad actual. Luego, reinicia el contador de espacios utilizados y crea un nuevo array de la nueva capacidad.

- `generarNuevaCapacidad()`: se utiliza para determinar la nueva capacidad de la tabla hash cuando esta se llena. Básicamente lo que hace es sumarle uno a la capacidad actual y luego iterar sobre los números enteros consecutivos a partir de ese número hasta encontrar el siguiente número primo. Esto se hace para garantizar que la nueva capacidad sea un número primo, lo que ayuda a mejorar la distribución de los elementos en la tabla hash.

- `#esPrimo(num)`: es un método privado que se utiliza en el método generarNuevaCapacidad() para determinar si un número dado es primo o no. El método recibe como argumento un número entero y devuelve un valor booleano indicando si el número es primo o no. El método utiliza un algoritmo básico para determinar si el número es primo o no.

- `search(carnet)`: se utiliza para buscar un elemento en la tabla hash. Recibe como argumento el carnet (o clave) del elemento que se desea buscar y devuelve el elemento correspondiente si se encuentra en la tabla hash, o null si no se encuentra. El método utiliza la función calcularIndice(carnet) para determinar el índice en la tabla hash donde debería estar el elemento. Si la posición correspondiente en la tabla hash está vacía, el método devuelve null. Si la posición correspondiente no está vacía, se compara el carnet del elemento en esa posición con el carnet buscado. Si son iguales, se devuelve el elemento correspondiente. Si no son iguales, se utiliza la función recalcularIndice(carnet, contador) para calcular la siguiente posición en la tabla hash donde se podría encontrar el elemento buscado y se itera sobre esta hasta que se encuentra el elemento buscado o se llega a una posición vacía en la tabla hash.

En resumen, la ventaja de esta estructura de datos es que proporciona una forma rápida y eficiente de buscar elementos utilizando una clave. Además, la tabla hash se amplía automáticamente si se llena hasta el 75% de su capacidad. Esto hace que sea una buena opción para el almacenamiento y la búsqueda de grandes cantidades de datos.

## Grafo No Dirigido 
Es un tipo de grafo en el que las aristas no tienen dirección. En otras palabras, la conexión entre dos vértices es bidireccional y no hay una orientación de la arista que indique una dirección específica.

Por lo tanto, en un grafo no dirigido, la relación entre dos vértices es simétrica, lo que significa que si hay una arista que conecta el vértice A con el vértice B, entonces también hay una arista que conecta el vértice B con el vértice A.

En este tipo de grafo, cada arista tiene un peso asociado que indica la importancia o el costo de esa conexión entre dos nodos del grafo. Estos pesos pueden ser números reales o enteros y se utilizan para calcular el costo total de una ruta o camino en el grafo.

Los grafos no dirigidos con pesos son útiles en muchos problemas de optimización, como encontrar la ruta más corta entre dos nodos o la ruta de menor costo, así como en la planificación de redes de transporte, rutas de vuelo, redes de comunicación, entre otros. Se utiliza comúnmente en problemas de redes sociales, rutas de transporte, redes eléctricas y otros sistemas que implican conexiones simétricas.

En cuanto a los principales métodos de la clase Graph, podemos destacar:

- `insert(folderName, fatherPath)`: se utiliza para insertar un nuevo nodo en el árbol. Recibe el nombre del directorio y la ruta del directorio padre. Utiliza el método getFolder para obtener el nodo padre correspondiente y luego crea un nuevo nodo con el nombre y peso especificados. Si se encuentra el nodo padre, se asigna un nuevo identificador único al nodo y se agrega como un hijo del nodo padre.

- `getFolder(path)` se utiliza para obtener el nodo correspondiente a una ruta de directorio dada. Toma una ruta como entrada y devuelve un objeto que contiene el nodo correspondiente y su peso en el árbol. El método comienza en la raíz y se mueve hacia abajo a través de los nodos hijos según la ruta dada hasta encontrar el nodo correspondiente.

- `graph()`: genera una representación gráfica del árbol en el formato DOT. Recorre el árbol en anchura utilizando una cola y construye una cadena que contiene la definición de cada nodo y las conexiones entre ellos.

- `remove(folderName, fatherPath)`: elimina un nodo con un nombre de directorio y ruta padre especificados. Utiliza el método getFolder para obtener el nodo padre y el índice del nodo a eliminar en la lista de nodos hijos del padre. Si se encuentra el nodo a eliminar, se eliminan sus referencias, se actualiza el tamaño del árbol y se limpian los parámetros del nodo. Si no se encuentra el nodo, se muestra un mensaje de error.



  
## Árbol AVL 
Es una estructura de datos de árbol binario balanceado en el que la diferencia de alturas entre los subárboles izquierdo y derecho de cualquier nodo es como máximo 1. Esta propiedad hace que el árbol AVL sea altamente eficiente en la búsqueda, inserción y eliminación de elementos, con una complejidad de tiempo de O(log n) en promedio.

  Las ventajas de un árbol AVL incluyen una mayor eficiencia en la búsqueda, inserción y eliminación de elementos en comparación con otros árboles binarios, como el árbol binario de búsqueda. Además, el árbol AVL mantiene automáticamente su estructura balanceada, lo que garantiza un buen rendimiento incluso en casos extremos.

En cuanto a los principales métodos de la clase AvlTree, podemos destacar:


- `insert(value)`: inserta un nuevo nodo con el valor dado en el árbol. Si el árbol está vacío, el nuevo nodo se establece como la raíz del árbol.
- `_insert(root, node)`: función recursiva auxiliar utilizada por el método insert para insertar un nodo en el árbol. Esta función utiliza la propiedad `item.carnet` de los nodos para determinar la posición adecuada del nuevo nodo en el árbol. También actualiza las alturas de los nodos y realiza las rotaciones necesarias para mantener la estructura del árbol balanceada.
- `find(user, pass)`: busca un nodo en el árbol que tenga el carnet y la contraseña dados y devuelve el nodo correspondiente si se encuentra, o null en caso contrario.
- `balanceFactor(node)`: devuelve el factor de equilibrio del nodo dado, que se define como la diferencia entre la altura del subárbol izquierdo y la altura del subárbol derecho. Un factor de equilibrio positivo indica que el subárbol izquierdo es más alto que el derecho, mientras que un factor de equilibrio negativo indica lo contrario.
- `height(node)`: devuelve la altura del nodo dado. Si el nodo es null, devuelve 0.
- `getMaxHeight(leftNode, rightNode)`: devuelve la altura máxima entre los nodos leftNode y rightNode.
- `rotateRight(node)`: realiza una rotación hacia la derecha en el nodo dado y devuelve el nuevo nodo raíz del subárbol.
- `rotateLeft(node)`: realiza una rotación hacia la izquierda en el nodo dado y devuelve el nuevo nodo raíz del subárbol.



## Árbol n-ario
Son una estructura de datos no lineal, en la que cada nodo puede tener un número variable de hijos. En este caso, cada nodo representa una carpeta en una estructura de archivos y carpetas.

  Las ventajas de utilizar un árbol n-ario en este caso es que nos permite representar de manera eficiente una estructura jerárquica de archivos y carpetas. Cada carpeta puede contener un número variable de archivos y subcarpetas, lo que hace que la estructura de un árbol n-ario sea adecuada para este tipo de problema. Además, los árboles n-arios nos permiten realizar búsquedas, inserciones y eliminaciones en tiempo logarítmico, lo que hace que sean una estructura de datos muy eficiente.

Entre los principales métodos que se presentan en la implementación, se pueden destacar:


- `insert(folderName, fatherPath)`: Este método permite insertar una nueva carpeta en la estructura. Recibe como parámetros el nombre de la carpeta que se quiere insertar y la ruta de la carpeta padre. Si la carpeta padre existe, se inserta la nueva carpeta como hija de la carpeta padre.

- `getFolder(path)`: Este método permite obtener un nodo de la estructura a partir de una ruta. Recibe como parámetro una cadena de texto con la ruta de la carpeta que se quiere obtener y devuelve el nodo correspondiente. Si la ruta no existe, devuelve null.

- `graph()`: Este método devuelve una cadena de texto en formato DOT que representa la estructura de la carpeta en forma de grafo. Este método se utiliza para visualizar la estructura en una herramienta de visualización de gráficos.

- `insertFile(path, archivoNombre, carnet, permisos)`: Este método permite insertar un nuevo archivo en una carpeta. Recibe como parámetros la ruta de la carpeta donde se quiere insertar el archivo, el nombre del archivo, el número de carnet y los permisos. Este método utiliza una matriz dispersa para almacenar la información de los archivos.

- `matrixGrpah(path)`: Este método devuelve una cadena de texto en formato DOT que representa la matriz dispersa que almacena la información de los archivos en una carpeta.

- `insertarLista(fecha, accion)`: Este método permite insertar un nuevo nodo en una lista circular. Recibe como parámetros la fecha y la acción que se quiere insertar. Este método se utiliza para llevar un registro de las acciones que se realizan en la estructura de archivos y carpetas.

- `listGrpah()`: Este método devuelve una cadena de texto en formato DOT que representa la lista circular que se utiliza para llevar un registro de las acciones que se realizan en la estructura de archivos y carpetas.

- `remove(folderName, fatherPath)`: Este método permite eliminar una carpeta de la estructura. Recibe como parámetros el nombre de la carpeta que se quiere eliminar y la ruta de la carpeta padre. Si la carpeta existe, se elimina de la estructura junto con todos sus archivos y subcarpetas.




## Lista Circular
Una lista circular simplemente enlazada es una estructura de datos donde cada elemento tiene un puntero al siguiente elemento y el último elemento tiene un puntero al primer elemento, de manera que la lista se cierra sobre sí misma. Esto significa que no hay un final de la lista y los elementos pueden ser accedidos desde cualquier punto de la lista.

Las ventajas de una lista circular simplemente enlazada incluyen que se puede acceder a los elementos de manera más eficiente y fácil que en una lista simplemente enlazada, ya que se puede comenzar en cualquier punto de la lista y recorrerla circularmente. Además, la inserción y eliminación de elementos en una lista circular enlazada es más eficiente que en una lista simplemente enlazada porque no se necesita actualizar los punteros finales.

En cuanto a los métodos de la clase CircularList, se tienen los siguientes:

- `constructor()`: Este es el método constructor de la clase CircularList y se utiliza para inicializar la cabeza y la cola de la lista.

- `insertList(fecha, accion)`: Este método se utiliza para insertar un nuevo nodo al final de la lista. Crea un nuevo nodo con un objeto Bitacora como valor y lo agrega al final de la lista. Si la lista está vacía, establece el nuevo nodo como cabeza y cola, y hace que el puntero next del nuevo nodo apunte a la cabeza, lo que convierte la lista en circular. Si la lista ya tiene elementos, agrega el nuevo nodo después de la cola y hace que el puntero next de la cola apunte al nuevo nodo, y luego establece el nuevo nodo como la nueva cola y hace que su puntero next apunte a la cabeza.

- `print()`: Este método se utiliza para imprimir todos los elementos de la lista. Si la lista está vacía, imprime un mensaje indicando que la lista está vacía. Si la lista tiene elementos, itera sobre ellos y los imprime en la consola.

- `graph()`: Este método se utiliza para generar código Graphviz para visualizar la lista como un diagrama. Itera sobre todos los nodos en la lista y crea una cadena de nodos y conexiones que pueden ser utilizados para dibujar un diagrama de la lista en Graphviz. Devuelve una cadena que representa el código Graphviz generado.



## Matriz Dispersa
Se utiliza para almacenar matrices con un gran número de celdas vacías o nulas. En lugar de almacenar todas las celdas en memoria, la matriz dispersa solo almacena los valores no nulos y sus posiciones en la matriz.

En este caso, la estructura SparseMatrix se implementa utilizando nodos, donde cada nodo representa una celda con su valor, posición x e y, y punteros para apuntar a la siguiente celda en la misma fila, columna, arriba o abajo.Las ventajas de utilizar una matriz dispersa son la reducción de la cantidad de memoria necesaria para almacenar la matriz y la mejora en el rendimiento para algunas operaciones específicas, como la multiplicación de matrices dispersas.

En cuanto a los métodos de la clase SparseMatrix, se tienen los siguientes:

- `constructor()`: crea una nueva instancia de la matriz dispersa y define su nodo de cabecera.
- `insert(x, y, value)`: inserta un nuevo nodo en la posición (x, y) con el valor especificado. Para ello, se encarga de crear las cabeceras necesarias en caso de que no existan, y de llamar a los métodos privados addX() y addY() para añadir el nuevo nodo en las listas correspondientes.
- `insertX(x)`: inserta una nueva cabecera en la fila x, en caso de que no exista.
- `xHeaders(x)`: crea la cabecera correspondiente en la fila x, si no existe.
- `yHeaders(y, content, type)`: crea la cabecera correspondiente en la columna y, si no existe. Además, si se especifican los parámetros content y type, se les asigna a la cabecera creada.
- `addX(newNode, x)`: añade un nuevo nodo a la fila x, en orden ascendente de y. Para ello, primero busca la cabecera correspondiente y luego recorre la lista de nodos para insertar el nuevo nodo en la posición adecuada.
- `addY(newNode, y)`: añade un nuevo nodo a la columna y, en orden ascendente de x. Para ello, primero busca la cabecera correspondiente y luego recorre la lista de nodos para insertar el nuevo nodo en la posición adecuada.




# Tecnologías implementadas
En un futuro se implementarán más tecnologías en el proyecto, pero las principales fueron Graphviz, Json y Archivos en formato .csv.

- `Graphviz`:Es una herramienta de visualización de gráficos que permite crear diagramas de flujo, diagramas de red, organigramas, entre otros, mediante el uso de un lenguaje de descripción de gráficos. Este lenguaje permite especificar los nodos, aristas y otros elementos que componen el gráfico, y Graphviz se encarga de generar la visualización correspondiente.

- `JSON`: Es un formato de intercambio de datos que se utiliza para transmitir información estructurada entre sistemas. Es un formato ligero, legible para los humanos y fácil de interpretar y generar para las aplicaciones. Se utiliza en una amplia variedad de aplicaciones, desde el intercambio de datos entre servidores y aplicaciones web hasta el almacenamiento de datos en bases de datos NoSQL.
dame esto en una lista para markdown

- `Bootstrap`: Es un framework o conjunto de herramientas de diseño web de código abierto que permite crear sitios web y aplicaciones web responsivos (es decir, que se adaptan a diferentes tamaños de pantalla), con un diseño moderno y atractivo, de manera rápida y sencilla. Fue desarrollado por Twitter y es uno de los frameworks más populares en el desarrollo web. Bootstrap proporciona un conjunto de plantillas predefinidas, estilos CSS, componentes JavaScript y otras herramientas para facilitar el proceso de diseño y desarrollo de sitios web. También es altamente personalizable y extensible, lo que lo hace adecuado para una amplia gama de proyectos web.



# Lenguaje implementado

`JavaScript`: Es un lenguaje de programación popular utilizado para crear interactividad en sitios web y aplicaciones. Fue desarrollado por Netscape en 1995 y se ha convertido en uno de los lenguajes de programación más utilizados en la actualidad. JavaScript se ejecuta en el lado del cliente, lo que significa que se ejecuta en el navegador web del usuario final, en lugar de en el servidor web. Permite agregar interactividad dinámica a las páginas web, desde efectos visuales hasta validación de formularios, y también se puede utilizar para desarrollar aplicaciones web completas, desde pequeñas aplicaciones hasta grandes aplicaciones empresariales. Además, también se puede usar para programar en el lado del servidor con Node.js.

`HTML`: es un lenguaje de marcado utilizado para crear páginas web. Es el lenguaje que se utiliza para estructurar el contenido de una página web, definiendo elementos como encabezados, párrafos, imágenes, enlaces, tablas, formularios, entre otros. HTML se basa en etiquetas (tags) que indican al navegador web cómo mostrar el contenido de la página. Las etiquetas se escriben utilizando corchetes angulares, y algunas de ellas pueden tener atributos que definen características adicionales para el elemento.


`CSS`: es un lenguaje de estilo utilizado para definir el diseño, el formato y la presentación de documentos HTML, XHTML y XML. CSS permite a los desarrolladores web controlar la apariencia de las páginas web, incluyendo el color, la fuente, el tamaño, el espaciado y la disposición de los elementos. Además, CSS se utiliza para aplicar efectos visuales, como sombras, bordes, animaciones y transiciones, lo que permite crear diseños web atractivos e interactivos. Al separar el contenido de la presentación, CSS facilita la creación de sitios web con múltiples páginas y la actualización de la apariencia de un sitio web sin tener que modificar cada página individualmente.

# Librerias
Para el proyecto se utilizo una implementación de las funciones `JSON.decycle` y `JSON.retrocycle`, que permiten serializar y deserializar objetos en formato JSON que contienen referencias cíclicas.

Para la encriptación se utilizó la librería `Crypto`.

`JSON.decycle` toma un objeto y devuelve una copia profunda del mismo, asegurándose de que no hay más de una instancia de cada objeto o matriz en la estructura resultante. Las referencias duplicadas (que podrían estar formando ciclos) se reemplazan por un objeto de la forma `{"$ref": PATH}` donde PATH es una cadena JSONPath que localiza la primera aparición.

`JSON.retrocycle` toma una estructura de objeto serializada en formato JSON que contiene referencias cíclicas (es decir, objetos que se refieren mutuamente entre sí) y la restaura a su forma original. Las referencias a objetos que se encuentran en la estructura se reemplazan por referencias a los objetos reales.

Juntas, estas dos funciones permiten trabajar con objetos en JavaScript que contienen referencias cíclicas y serializarlos en formato JSON para enviarlos a un servidor o almacenarlos en una base de datos, y luego restaurarlos a su forma original cuando sea necesario.

`Crypto` es un módulo de JavaScript que proporciona herramientas criptográficas para aplicaciones web y de servidor. Permite cifrar y descifrar datos, generar firmas digitales y verificar la autenticidad de los datos cifrados. Este módulo proporciona una variedad de algoritmos criptográficos, incluyendo cifrado simétrico y asimétrico, hashes criptográficos, generación de números aleatorios, y funciones de firma digital. Se utiliza comúnmente en aplicaciones web para cifrar y descifrar contraseñas y otros datos confidenciales transmitidos entre el cliente y el servidor, y para garantizar la integridad de los datos almacenados en la base de datos. También se utiliza en aplicaciones de blockchain y criptomonedas para generar y verificar firmas digitales.


## Uso
Este es un programa que representa un sistema de registro y control de estudiantes. El código comienza definiendo cuatro variables: una cola, una lista doblemente enlazada, una pila, la blockchain y un administrador. Luego, hay una sección en la que se le solicita al usuario que seleccione una opción del menú principal, ya sea iniciar sesión o salir del programa, para un descripción más gráfica puede dirigirse a la sección del manual de usuarios.


## Contacto
Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con conmigo a través del correo electrónico: 3030178480108@ingenieria.usac.edu.gt

## Datos
- Nombre: Dwight Fernando Gabriel Chinchilla Herández
- Carnet: 202106208


