/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const puntajesText = document.querySelectorAll('small');
const contenedorCartasJugador = document.querySelector('#jugador-cartas');
const contenedorCartasPc = document.querySelector('#computadora-cartas');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const crearDeck = () => {
	for (let i = 2; i <= 10; i++) {
		for (let tipo of tipos) {
			deck.push(i + tipo);
		}
	}
	for (let tipo of tipos) {
		for (let esp of especiales) {
			deck.push(esp + tipo);
		}
	}
	deck = _.shuffle(deck);
	return deck;
};

crearDeck();

const pedirCarta = () => {
	if (deck.length === 0) {
		throw 'No hay cartas en el deck';
	}
	const cartaPedida = deck.shift();
	return cartaPedida;
};

const valorCarta = (carta) => {
	const valor = carta.substring(0, carta.length - 1);
	return isNaN(valor) ? (valor === 'A' ? 11 : 10) : parseInt(valor);
};

//turno PC
const turnoPc = (puntosMinimos) => {
	do {
		const carta = pedirCarta();
		puntosComputadora += valorCarta(carta);
		puntajesText[1].textContent = puntosComputadora;

		const cartaImg = document.createElement('img');
		cartaImg.classList.add('carta');
		cartaImg.src = `assets/cartas/${carta}.png`;
		contenedorCartasPc.append(cartaImg);

		if (puntosMinimos > 21) {
			break;
		}
	} while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
	setTimeout(() => {
		if (puntosComputadora === puntosMinimos) {
			alert('Empate, srry chatito');
		} else if ((puntosMinimos < puntosComputadora && puntosComputadora <= 21) || puntosMinimos > 21) {
			alert('La PC te gano chatito , hahahaha 😂');
		} else if ((puntosMinimos > puntosComputadora && puntosMinimos <= 21) || puntosComputadora > 21) {
			alert('Le ganaste a la PC chatito 😨');
		}
	}, 300);
};

//Eventos
btnPedir.addEventListener('click', () => {
	const carta = pedirCarta();
	puntosJugador += valorCarta(carta);
	puntajesText[0].textContent = puntosJugador;

	const cartaImg = document.createElement('img');
	cartaImg.classList.add('carta');
	cartaImg.src = `assets/cartas/${carta}.png`;
	contenedorCartasJugador.append(cartaImg);

	if (puntosJugador > 21) {
		console.warn('perdiste chato');
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoPc(puntosJugador);
	} else if (puntosJugador === 21) {
		console.warn('21, que suerte');
		btnPedir.disabled = true;
		btnDetener.disabled = true;
		turnoPc(puntosJugador);
	}
});

btnDetener.addEventListener('click', () => {
	btnPedir.disabled = true;
	btnDetener.disabled = true;
	turnoPc(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
	deck = [];
	deck = crearDeck();
	puntajesText[0].textContent = 0;
	puntajesText[1].textContent = 0;
	puntosJugador = 0;
	puntosComputadora = 0;
	btnPedir.disabled = false;
	btnDetener.disabled = false;
	while (contenedorCartasJugador.hasChildNodes()) {
		contenedorCartasJugador.removeChild(contenedorCartasJugador.firstChild);
	}
	while (contenedorCartasPc.hasChildNodes()) {
		contenedorCartasPc.removeChild(contenedorCartasPc.firstChild);
	}
});
