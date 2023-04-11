# Definición del problema
La facultad de ingeniería desea tener una forma de almacenar archivos importantes,
pero actualmente no cuentan con un sistema que se ajuste a sus necesidades por lo
que se plantea la solución de crear un sistema propio. Este sistema debe de ser
capaz de ser utilizado en cualquier sistema operativo por lo que se plantea la
posibilidad de que la aplicación sea un sitio web mediante el uso de Github Pages.
El sistema debe tener un funcionamiento similar a Google Drive con la característica
que la Universidad de San Carlos sea propietario del mismo, además de otras
características propias de la aplicación.

Según los requerimientos antes mencionados se desea que usted como estudiante
de ingeniería en sistemas desarrolle la aplicación para el manejo de archivos para la
Universidad de San Carlos de Guatemala de la facultad de Ingeniería. El sistema
denominado como EDD GoDrive debe de llevar el control de usuarios, donde cada
uno de los cursos de la carrera de ingeniería en sistemas debe de contar con un
espacio de almacenamiento donde se puede subir, crear y eliminar carpetas, así
como también archivos. Los usuarios también tendrán la opción de modificar los
nombres de carpetas y archivos ya creados. La aplicación debe de ser responsiva y
amigable al usuario. A continuación, se da una explicación más detallada de lo
solicitado.

# Login
La aplicación contará con una página principal con el cual los estudiantes aceptados
podrán iniciar sesión, así mismo el administrador, se deberá implementar la
búsqueda en el árbol de los alumnos para encontrar al usuario, en el caso del
administrador no estará dentro del árbol, solo se valida si el usuario y
contraseña son igual a “Admin”. 

![Login](https://drive.google.com/uc?export=download&id=1hEZd0zhfRP7BBP3Wq2X9SXgxAnQD3Ddz)




# Apantalla del admin
Para las funciones de administrador, este contará con un apartado donde pueda ver
visualmente los alumnos que hay dentro del sistema ya aprobados en una tabla,
además de esto el administrador podrá generar el reporte del árbol que se genera
de los alumnos, para el almacenamiento de los datos de los alumnos estarán en
un árbol AVL que deberán recorrer para mostrar los datos, para esto se usará
el recorrido In-Orden por defecto, el administrador podrá elegir si quiere otro
tipo de recorrido sea Post-Orden o Pre-Orden.

- `Carga Masiva`: El administrador tendrá la opción de subir un archivo de tipo JSON con los datos de
los estudiantes, para facilitar el manejo de los estudiantes aceptados.

![Admin](https://drive.google.com/uc?export=view&id=1mtjMcA1ZBjrsK3BHV-106Vco_OSBf12B)

- `Reportes de admin`: Para las funciones de administrador, este contará con un apartado de reportes en el
que se muestre el Árbol AVL con todos los estudiantes y la altura que posee cada
nodo de la estructura.

![R_Admin](https://drive.google.com/uc?id=1WDK-7uCL5XnnGjVN_IpF4cl0eh3e_eR9)


# Apantalla del user
El usuario que inicie sesión tendrá una ventana donde mostrará diferentes opciones
de creación, eliminación, modificación de carpetas. Para que el usuario pueda
acceder a la carpetas de sus sistema se usará una barra superior de búsqueda,
donde colocará la ruta de su carpeta, se debe validar que la ruta de la carpeta sera
existente, ejemplo si queremos acceder a /imagenes/2023 pero la carpeta
imagenes no existe en raíz, debe mostrar un alerta que especifique que el directorio
no es válido. Para el almacenamiento de las carpetas se deberá implementar un
árbol indexado, cada usuario dentro del sistema tendrá su propio árbol y para
el almacenamiento de los archivos de cada carpeta será una matriz dispersa
ligada a cada nodo del arbol.

- `Subir Archivo`: En la ventana principal de usuarios tendrá un apartado en el que se pueda subir
archivos, se deberá de restringir la extensión de los archivos que se suban a
cualquier extensión de imagen, archivos PDF o archivos de texto. Los archivos de
imágenes o archivos PDF se tendrán que codificar en base64 para su
almacenamiento en su estructura.

  No es posible agregar archivos con el mismo nombre en la misma ruta, si ya existe
  un archivo con el nombre del archivo a cargar se deberá agregar un alias adicional,
  por ejemplo: si ya existe “a.txt” y trato de cargar nuevamente “a.txt” se le debería
  asignar “a(copia1).txt”, el alias queda a discreción del estudiante.
  
- `Crear Carpeta`: El usuario tendrá la opción de crear carpeta con el nombre que desee y está a su
vez podrá almacenar tanto archivos como otras carpetas, al crear la carpeta tener
en cuenta que se realiza en el directorio actual donde esté el usuario, debe validar
que la carpeta que se quiere crear no exista ya dentro de la carpeta actual, si existe
solo creará una copia, por ejemplo al crear Estructuras como ya existe, creará la
carpeta con el siguiente nombre “Copia Estructuras”.

- `Eliminar Carpeta`: El usuario tendrá la opción de eliminar carpeta, se deberá de eliminar tanto la
carpeta como todos los archivos y carpetas que poseía dentro, para esto la
aplicación pedirá el nombre de la carpeta y buscará en la carpeta actual si existe o
no la carpeta que se quiera eliminar.

- `Permisos de archivos`: El usuario tendrá la opción de otorgar permisos de sus archivos a otro usuario, para
ello se usará una interfaz donde se especifique al usuario, el archivo y los permisos
que le dará, para ello se usará los siguientes sufijos: r (permisos para leer) y w (permisos para escribir).

![User](https://drive.google.com/uc?id=1VlAguSAreK73cu1T8YLP8-UZ96wyJue0)

- `Reportes de user`: El usuario tendrá la opción de crear el reporte del árbol N-ario de archivos del
usuario logueado.

  El usuario tendrá la opción de crear el reporte de la matriz que está asociado a los
archivos de la carpeta actual se debe de mostrar la matriz dispersa con los
permisos otorgados por el propietario de los archivos en la carpeta actual que se
esté mostrando en la interfaz. Si la carpeta actual no posee ningún archivo, mostrar
un mensaje que diga, “no se puede crear la matriz por falta de archivos”.

  Está almacenará todas las acciones que realice el usuario que no sea administrador,
al momento de crear o eliminar un archivo o carpeta de deberá de mostrar en una
lista enlazada circular.


![R_User](https://drive.google.com/uc?export=download&id=14SRG9c-BCC60xBbL3n6e8cb0dFOiwr8p)


