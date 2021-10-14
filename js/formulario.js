const formulario = document.getElementById("formulario"); //guardamos en una constante el formulario para poder acceder a el 
const inputs = document.querySelectorAll("#formulario input"); //permite acceder a todos los input de el ID formulario 

//estas expresiones regulares permitiran definir los caracteres validos dentro de cada input 
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{5,10}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

//inicializamos los campos como falso ya que en un inicio ninguno de los campos estara llenado, posteriormente cuando sean llenados, el valor de cada campo cambiara a verdadero 
const campos ={
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name){ //reconocera cada uno de los input en los que nos colocamos por medio de su nombre 
		case "usuario":  //en caso de que estemos posicionados en el usuario se ejecutara el siguiete codigo 
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;
		
		case "nombre":  //en caso de que estemos posicionados en el nombre se ejecutara el siguiete codigo 
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break; 
		
		case "password":  //en caso de que estemos posicionados en la contraseña se ejecutara el siguiete codigo 
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
		break; 
		
		case "password2":  //en caso de que estemos posicionados en la segunda contraseña  se ejecutara el siguiete codigo 
			validarPassword2();
		break; 
		
		case "correo":  //en caso de que estemos posicionados en el correo se ejecutara el siguiete codigo 
			validarCampo(expresiones.correo, e.target, 'correo');
		break;
		
		case "telefono":  //en caso de que estemos posicionados en el telefono se ejecutara el siguiete codigo 
			validarCampo(expresiones.telefono, e.target, 'telefono');
		break; 
	} 
}

//validamos campo en una sola funcion para que podamos utilizarla en los diferentes campos en los cuales se aplica 
const validarCampo = (expresion, input, campo ) =>{
	//vamos a validar que lo que se escriba dentro del campo corresponda con lo permitido dentro de la expresion regular (expresiones.usuario.test)
	if(expresion.test(input.value)){ //nos lanzara un valor verdadero si es que se cumplio la expresion regualar 
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle"); //agregamos la clase para que aparezca la paloma
		document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle"); //removemos la clase para que desaparezca el x
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove("formulario__input-error-activo");
		campos[campo] = true; //una vez que el campo sea llenado cambiaremos su valor a verdadero 
	}else{
		document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto"); //en caso de que la validacion sea falsa cambiara la clase previamente definida en el CSS
		document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
		document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle"); 
		document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle"); 
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add("formulario__input-error-activo");
		campos[campo] = false;
		}
}

//validacion del segundo password con el primero 
const validarPassword2 = () =>{ 
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');
	
	if(inputPassword1.value !== inputPassword2.value ){
		document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto"); //en caso de que la validacion sea falsa cambiara la clase previamente definida en el CSS
		document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto");
		document.querySelector(`#grupo__password2 i`).classList.add("fa-times-circle"); 
		document.querySelector(`#grupo__password2 i`).classList.remove("fa-check-circle"); 
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add("formulario__input-error-activo");
		campos['password'] = false;
	}else {
		document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto"); //en caso de que la validacion sea falsa cambiara la clase previamente definida en el CSS
		document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
		document.querySelector(`#grupo__password2 i`).classList.remove("fa-times-circle"); 
		document.querySelector(`#grupo__password2 i`).classList.add("fa-check-circle"); 
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove("formulario__input-error-activo");
		campos['password'] = true;
	}
}

inputs.forEach((input) => {   //para cada input se ejecutara una funcion 
	input.addEventListener("keyup", validarFormulario); //cada vez que se presione una tecla dentro de uno de los input se ejecutara el codigo  
	input.addEventListener("blur", validarFormulario); //cuando se de click fuera del campo se ejecutara la funcion 
});	

formulario.addEventListener("submit", (e) => {
	e.preventDefault(); //evitamos que el formuario se envie al presionar el boton de enviar 
	
	const terminos = document.getElementById('terminos');
	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked){
		formulario.reset();
		
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		//despues de 5 segundos el mensaje de exito desaparecera 
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 5000);
		
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('.formulario__grupo-correcto');
		});
	}else{
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo'); //mandamos el mensaje de error en caso de que los campos del formulario no esten llenos 
	}
});