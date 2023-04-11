# EDD GoDrive

El sistema denominado como EDD GoDrive debe de llevar el control de usuarios, donde cada
uno de los cursos de la carrera de ingeniería en sistemas debe de contar con un
espacio de almacenamiento donde se puede subir, crear y eliminar carpetas, así
como también archivos. Los usuarios también tendrán la opción de modificar los
nombres de carpetas y archivos ya creados. La aplicación debe de ser responsiva y
amigable al usuario. A continuación, se da una explicación más detallada de lo
solicitado.



# Descripción  
El proyecto de EDD GoDrive, se basa en el uso de TDA, las cuales son estructuras de datos que define un conjunto de operaciones y restricciones para manipular un conjunto de datos. La implementación de estas operaciones no es visible para el usuario de la estructura, lo que permite ocultar los detalles internos de la estructura y enfocarse en su uso. Las TDA son fundamentales en la programación orientada a objetos y en la programación modular en general, ya que permiten separar la especificación de la estructura de datos de su implementación.


  
## El árbol AVL 
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



## El árbol n-ario
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

`JSON.decycle` toma un objeto y devuelve una copia profunda del mismo, asegurándose de que no hay más de una instancia de cada objeto o matriz en la estructura resultante. Las referencias duplicadas (que podrían estar formando ciclos) se reemplazan por un objeto de la forma `{"$ref": PATH}` donde PATH es una cadena JSONPath que localiza la primera aparición.

`JSON.retrocycle` toma una estructura de objeto serializada en formato JSON que contiene referencias cíclicas (es decir, objetos que se refieren mutuamente entre sí) y la restaura a su forma original. Las referencias a objetos que se encuentran en la estructura se reemplazan por referencias a los objetos reales.

Juntas, estas dos funciones permiten trabajar con objetos en JavaScript que contienen referencias cíclicas y serializarlos en formato JSON para enviarlos a un servidor o almacenarlos en una base de datos, y luego restaurarlos a su forma original cuando sea necesario.



## Uso
Este es un programa que representa un sistema de registro y control de estudiantes. El código comienza definiendo cuatro variables: una cola, una lista doblemente enlazada, una pila y un administrador. Luego, hay una sección en la que se le solicita al usuario que seleccione una opción del menú principal, ya sea iniciar sesión o salir del programa.


## Contacto
Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con conmigo a través del correo electrónico: 3030178480108@ingenieria.usac.edu.gt

## Datos
- Nombre: Dwight Fernando Gabriel Chinchilla Herández
- Carnet: 202106208


