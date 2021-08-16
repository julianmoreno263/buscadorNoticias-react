/*

En este proyecto vamos a hacer un buscador de noticias, crearemos custom hooks, este buscador tendra un select donde buscaremos la categoria de la noticia y se realizara haciendo consultas a una API.

RECORDEMOS:

Los hooks no son más que una función utilizada por un componente, cuya responsabilidad se quiere extraer del componente. Sólo los Functional component pueden usarlas y como regla no escrita, todas ellas deben empezar por el sufijo use.

Por ejemplo la librería ya nos ofrece un conjunto de hooks como:

useState
useEffect
useContext

Lo importante de los hooks es que a demás de existir un conjunto de ellos ya definidos por la librería, nosotros podemos crear uno propio. El caso más típico suele ser el de hacer una petición asíncrona a una api.

Los Hooks son una nueva incorporación en React 16.8. Te permiten usar estado y otras características de React sin escribir una clase.

Construir tus propios Hooks te permite extraer la lógica del componente en funciones reutilizables.

Un Hook personalizado(CUSTOM) es una función de JavaScript cuyo nombre comienza con ”use” y que puede llamar a otros Hooks.

A diferencia de un componente de React, un Hook personalizado no necesita tener una firma específica. Podemos decidir lo que adopta como argumentos y que, si lo hace, debería devolver. En otras palabras, es como una función normal. Su nombre debería siempre empezar con use así se puede decir que de un vistazo las reglas de Hooks se le aplican.


1- instalamos el proyecto y hacemos la limpieza de los archivos como siempre. Vamos a utilizar el framework materialize para los estilos css(v144)

2- Creamos el primer componente Header, le pasamos una prop de titulo y creamos dentro de el un menu de navegacion con la etiqueta nav(v145)

3- en App.js pasamos este Header y despues del Header creamos un div para el contenedor del formulario.

-----------------------------------------------------------------------------------------------

1- creamos el componente Formulario para el formulario principal. El formulario tendra un select para seleccionar la categoria de noticias, pero este select lo crearemos como un custom hook(v146)

2- para dar estilos css en React ya vismo que hay varias formas, se puede con style components, con archivos externos vinculador donde esta todo el css de la app, pero aqui utilizaremos otra forma de crear los estilos css que es por medio de "modulos css", para esto creamos dentro de la misma carpeta de components un archivo para darle estilo a nuestro Formulario, lo llamammos "Formulario.module.css", es importante el nombre de module para que create-react-app lo pueda interpretar como un modulo css.(v146)
                           
3- en este archivo css que es el de los estilos para el componente Formulario, se importa al Formulario pero poniendole un nombre,por ejemplo styles y se le indica la ruta(en este caso estan en la misma carpeta de components)(v146)

                        import styles from './Formulario.module.css';

4- para utilizar las clases css que tiene el archivo css en los elementos, se pone en el className el nombre con el que importamos este archivo,osea styles, y se le indica que clase o selector css vamos a usar en dicho elemento pero como si fuera prop,osea dentro de {}

					<h2 className={styles.heading}>Encuentra Noticias por Categoría</h2>


5- para el caso del div que tiene la clase "row" y esta dentro de comillas, debemos indicarle nuestro estilo css dentro de {} pero colocando template strings porque vamos a combinar texto con una variable que es style.

		<div className={`${styles.buscador} row`}>

6- Hago lo mismo para el boton del formulario, mezclado string con variable.

					className={`${styles.btn_block}  btn-large amber darken-2`}

------------------------------------------------------------------------------------------

1- vamos a crear un custom hook para nuestro select de noticias. Creamos la carpeta hooks en src y creamos el hook llamado useSelect.js

2- este hook tomara un state inicial y unas opciones como props.(v147). Ahora, recordar que el custom hook en vez de tener un return tendra una funcion que lleva lo que se va a renderizar en la pantalla, en este caso el elemento select

3- despues de esta funcion si va el return que retornara el state del hook y la funcion del select propiamente(v147)

4- ahora vamos al formulario porque hay se va a mostrar el select, lo importamos y antes del return del Formulario utilizamos nuestro hook de select, como este hook retorna el state y el elemento del interfaz que seria el SelectNoticias, lo extraemos del useSelect(), osea asi:

			const [categoria,SelectNoticias]=useSelect()


el state que retorna el select tiene la categoria que el usuario escogio, por eso lo nombramos como categoria,pero en si es el mismo state, y tambien se retorna la funcion SelectNoticias que es la que pinta el select.

5- ahora el componente de SelectNoticias lo utilizamos despues del h2 en el Formulario. 
NOTA: DEBEMOS IMPORTAR USESTATE EN NUESTRO HOOK PORQUE VAMOS A UTILIZAR UN STATE, DESPUES DEBEMOS CREAR    ESESTATE CON SU CORRESPONDIENTE FUNCION DE ACTUALIZARSTATE, ESTE STATESE LE PASA LA PROP QUE CREAMOS DE STATEINICIAL, PERO POR ESTE VIDEO LO DEJAMOS COMO UN STRING VACIO, OSEA ASI:

			const [state,actualizarState]=useState("")



---------------------------------------------------------------------------------------------
1 - Usamos la API de newsapi.org y obtenemos nuestra API KEY,(2251c641eccc478ab05289d3a9e5c2c6)

(https://newsapi.org/v2/everything?q=tesla&from=2021-06-28&sortBy=publishedAt&apiKey=2251c641eccc478ab05289d3a9e5c2c6). (v148)

VAMOS A DOCUMENTACION, Y EN LA SECCION DE TOP HEADLINES ENCONTRAMOS LA SECCION DE CATEGORIES.

2- ahora, para pasarle las categorias que tiene la API a nuestro formulario,creamos un array llamado opciones en Formulario.js, este sera un array de objetos en donde cada objeto llevara un value y un label para cada opcion, el value sera lo que lea la API y el label lo que vera el usuario,ambos llevaran el mismo nombre pero el label comenzará en mayúscula.(v148)

3- ahora, al state inicial que creamos para el hook, osea es el mismo del formulario llamado categoria y que estaba como string vacio, le pasamos una de estas categorias como estate inicial para que al cargar la app muestre noticias, casi siempre se le pasa inicialmente las noticias generales, por lo que le pasamos "general" y las OPCIONES,(V148).

4- en nuestro hook del select se le pasa stateInicial al state y en el elemento select lo que hacemos es recorrer con un map( el array de OPCIONES) que es el que pintara las opciones en pantalla.

5- en la etiqueta select ponemos como value={state}, de esta forma la opcion que tengamos seleccionada sera la que se muestre en el select por defecto,osea será la opcion que salga primero.

6- por ultimo tambien en el select creamos un onChange para usar la funcion que actualiza el state llamada actualizarState, le pasamos a esta funcion el objeto del evento e y el e.target.value para que tome el cambio de categoria cuando el usuario asi lo seleccione. Para probar esto, vamos a components y cuando cambiemos de categoria esta se debe de ir guardando en el state del Formulario.

HASTA AQUI YA TENEMOS COMPLETO NUESTRO HOOK, YA QUEDA ASI, AHORA VAMOS A VER COMO LEER LA CATEGORIA QUE EL USUARIO SELECCIONE.

---------------------------------------------------------------------------------------------

1- Para pasar la categoria que el usuario seleccione, vamos a App.js y creamos un state para capturar la categoria que el usuario seleccione y guardarla en este state(v149). Este state es un string vacio porque hasta que el usuario no seleccione la categoria no habra nada en el state.

2- le pasamos al componente Formularo la funcion de este state para que cuando el usuario de submit tome la categoria que escogio, esta funcion tendra como parametro el state de "categoria" q porque en este state es que se guarda la categoria del select que se escoge.(v149)

3- por ultimo esta funcion que se ejecuta cuando el usuario de submit se la pasamos al form por medio de un onSubmit.

De esta forma, cuando demos submit, en components vamos a App.js y la categoria que escojamos debe de guardarse en el state categoria que creamos para App.js

----------------------------------------------------------------------------------------

ahora, una vez el usuario escoge una categoria, debemos consultar a la API para traernos las noticias de esa categoria.

1- utilizaremos usEffect para que detecte cuando haya un cambio en el state "categoria" y asi se ejecute de nuevo el componente. En la dependencia del useEffect se le pasa el state categoria, asi cuando este state cambie el use eFecct se ejecutara.

2- en este useEffect es donde creamos el codigo que consultara a la API, sera una funcion(v150).

3- vamos a la API de noticias y escogemos la url de las opciones que nos dan segun las categorias, a esta url le puedo cambiar el codigo de dos caracteres del pais para escoger el pais que queramos:

				https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2251c641eccc478ab05289d3a9e5c2c6


donde dice country=us, le puedo cambiar ese us por co, o por el que quiera. Entonces en nuestro useEffect creo una const para guardar esta url dentro de template strings, esto para poder pasarle via prop el state categoria, y tambien le pasamos nuestra API KEY, queda asi:

	const URL = `https://newsapi.org/v2/top-headlines?country=co&category=${categoria}&apiKey=2251c641eccc478ab05289d3a9e5c2c6`;



4- usamos fetch  para realizar la consulta, recordar que la funcion debe ser async-await. Cuando dems submit, como por defecto estaasnoticias generaless traera las noticiasde esa categoria general, si cambiamos de categoria nos traera noticias diferentes. En components podemos ver que categoria se cargo.(v150) 

5- creamos ahora en App.js otro state llamado noticias que inicia como un array vacio para que alli se guarden las noticias que trae la consulta. Si vemos las respuestas de las consultas, estan vienen en el array articles, entonces podemos acceder directamente a las noticias colocando    noticias.articles.  Utilizamos la funcion de este nuevo state para que lo aya actualizando, si vemos en components, el state noticias debera ir almacenando las noticias consultadas, y crearemos un nuevo componente para mostrar estas noticias del state noticias.

--------------------------------------------------------------------------------------

1- crearemos dos componentes mas, uno que tendra el listado de las noticias y otro sera para cada noticia especifica.(v151)

2- el componente Listado Noticias tomara como prop el state noticias, recorrera con map() el state de noticias(pues este es un array) y mostrara el componente noticia(que es especifico para cada noticia).

3- este componente de ListadoNoticias lo pasamos en App.js para que lo muestre despues del formulario,le pasamos el state noticias como props.

---------------------------------------------------------------------------------

ahora para mostrar cada noticia bien con toda su informacion debemos utilizar un key que sea propio para cada una, si vemos los resultados de los articles que salen en la consulta veremos que cada noticia tiene una url especifica, podemos utilizar estas url como keys de las noticias pues las urls seran unicas para cada noticia.(v152)


1- en ListadoNoticias le pasamos al componente noticia como props la url y la variable noticia que se itera en el map:

			{noticias.map((noticia) => (
				<Noticia key={noticia.url} noticia={noticia} />
			))}

2- ahora en el componente Noticia extraemos la informacion especifica que tiene cada noticia,esta informacion la podemos ver desplegando en components los articles y ver lo que trae cada noticia,como la imagen,url,etc.(v152)

3- usamos clases de materialize para estilizar las card de cada noticia y que s emuestren bien sus contenidos.

4- el ternario que ponemos antesdel return en Noticia, es para que evalue si la noticia tiene una imagen o no, asi, si no hay imagen no sale ibujito de imagen vacia.(v152).


LISTO!!!!   POR ULTIMO DOCUMENTAMOS LA APP AGREGANDO LOS PROPTYPES EN CADA COMPONENTE.

NOTA: NO SE PUDO DESPLEGAR LA APP EN NETLIFY PORQUE LA API CAMBIO LAS CONDICIONES DE CUENTA GRATUITA, LA API SOLO SE PUEDE USAR PARA DESARROLLO, EN PRODUCCION SOLO SE PUEDE USAR SI NOS INSCRIBIMOS EN UN PLAN DE PAGO A LA API.





*/
