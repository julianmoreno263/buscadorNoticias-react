import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListadoNoticias from './components/ListadoNoticias';

function App() {
	//states para la categoria y noticias
	const [categoria, guardarCategoria] = useState('');
	const [noticias, guardarNoticias] = useState([]);

	//useEffect que detectara cuando el state categoria cambie
	useEffect(() => {
		const consultarAPI = async () => {
			const URL = `https://newsapi.org/v2/top-headlines?country=co&category=${categoria}&apiKey=2251c641eccc478ab05289d3a9e5c2c6`;

			const respuesta = await fetch(URL);
			const noticias = await respuesta.json();

			guardarNoticias(noticias.articles);
		};

		consultarAPI();
	}, [categoria]);
	return (
		<Fragment>
			<Header titulo="Buscador de Noticias" />

			<div className="container white">
				<Formulario guardarCategoria={guardarCategoria} />

				<ListadoNoticias noticias={noticias} />
			</div>
		</Fragment>
	);
}

export default App;
