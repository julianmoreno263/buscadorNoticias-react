import React from 'react';
import styles from './Formulario.module.css';
import useSelect from '../hooks/useSelect';
import  PropTypes from "prop-types"


const Formulario = ({ guardarCategoria }) => {
	const OPCIONES = [
		{ value: 'general', label: 'General' },
		{ value: 'business', label: 'Negocios' },
		{ value: 'entertainment', label: 'Entretenimiento' },
		{ value: 'health', label: 'Salud' },
		{ value: 'sports', label: 'Deportes' },
		{ value: 'technology', label: 'Tecnología' },
	];

	//utilizamos nuestro custom hook del select
	const [categoria, SelectNoticias] = useSelect('general', OPCIONES);

	//cuando el usuario de submit se pasa la categoria a App.js
	const buscarNoticias = (e) => {
		e.preventDefault();

		guardarCategoria(categoria);
	};

	return (
		<div className={`${styles.buscador} row`}>
			<div className="col s12 m8 offset-m2">
				<form action="" onSubmit={buscarNoticias}>
					<h2 className={styles.heading}>Encuentra Noticias por Categoría</h2>
					<SelectNoticias />
					<div className="input-field col s12">
						<input
							type="submit"
							className={`${styles.btn_block}  btn-large amber darken-2`}
							value="Buscar"
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

Formulario.protoTypes={
	guardarCategoria:PropTypes.func.isRequired
}


export default Formulario;
