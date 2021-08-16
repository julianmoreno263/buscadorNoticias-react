import React, { useState } from 'react';

const useSelect = (stateInicial, opciones) => {
	//state de nuestro hook
	const [state, actualizarState] = useState(stateInicial);

	const SelectNoticias = () => (
		<select className="browser-default" value={state} onChange={(e) => actualizarState(e.target.value)}>
			{opciones.map((opcion) => (
				<option value={opcion.value} key={opcion.value}>
					{opcion.label}
				</option>
			))}
		</select>
	);

	return [state, SelectNoticias];
};

export default useSelect;
