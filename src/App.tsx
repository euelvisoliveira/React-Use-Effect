/*
useEffect -> Side-effect -> Efeito Colateral

useEffect ele permite ficar monitorando as mudanca em uma variavel, e toda vez que essa variavel muda independente do motivo, origem, quem alterou eu quero que  alguma funcaco seja disparada. Ele recebe dois parametros, primeiro ->{qual funcao vai ser executada}, segundo -> [ele e um array e dentro dele eu passo qual variavel que eu quero ficar monitorando no caso abaixo a gente esta monitorando a list]

useEffect ele executa no inicio, assim que o compontente for exibido em tela e depois toda vez que a lista for alterada,  no caso se nao quiser que sexja executada no inicio teremos que colocar um condicao validando, no caso demostrado na linha 24 ate 28.


DICA: Dificilmente usa para atualizar o estado, caso precisa atualizar o estado de forma sincrona sem precisar fazer uma requisicao provavelmente podemos cometer um error. 
*/

import { useEffect, useState } from 'react';

function avisaAPi() {
  console.log('Lista salva')
}

export function App() {
	const [list, setList] = useState<string[]>([]);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		avisaAPi();
	}, [list]);

	/*
  useEffect(() => {
    if(list.length !== 0) {
      avisaAPi();
    }
  }, [list])
  */

	useEffect(() => {
		fetch('http://api.github.com/users/euelvisoliveira/repos')
			.then(response => response.json())
			.then(data => {
				setList(data.map((item: any) => item.full_name));
			});
	}, []);

	const filteredList = list.filter(item => item.includes(filter));

	function addToList() {
		setList(state => [...state, 'Novo item']);
		// mutablidade,  sempre quando for adicionar uma nova informacao a uma lista do meu estado/objeto preciso copiar toda lista que eu ja tenho [...state]
	}

	return (
		<div>
			<input
				type="text"
				onChange={e => setFilter(e.target.value)}
				value={filter}
			/>

			<ul>
				{list.map(item => (
					<li>{item}</li>
				))}
			</ul>

			<ul>
				{filteredList.map(item => (
					<li>{item}</li>
				))}
			</ul>

			<button onClick={addToList}>Add to list</button>
		</div>
	);
}



