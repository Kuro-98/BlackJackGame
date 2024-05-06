const miModulo = (() => {
	'use strict';
	let e = [],
		t = ['C', 'D', 'H', 'S'],
		l = ['A', 'J', 'Q', 'K'],
		r = [],
		a = document.querySelector('#btnPedir'),
		s = document.querySelector('#btnDetener'),
		d = document.querySelector('#btnNuevo'),
		o = document.querySelectorAll('.divCartas'),
		n = document.querySelectorAll('small'),
		i = (t = 2) => {
			(e = []), (e = c()), (r = []);
			for (let l = 0; l < t; l++) r.push(0);
			n.forEach((e) => (e.textContent = 0)),
				o.forEach((e) => {
					for (; e.hasChildNodes(); ) e.removeChild(e.firstChild);
				}),
				(a.disabled = !1),
				(s.disabled = !1);
		},
		c = () => {
			e = [];
			for (let r = 2; r <= 10; r++) for (let a of t) e.push(r + a);
			for (let s of t) for (let d of l) e.push(d + s);
			return _.shuffle(e);
		},
		h = () => {
			if (0 === e.length) throw 'No hay cartas en el deck';
			return e.shift();
		},
		u = (e) => {
			let t = e.substring(0, e.length - 1);
			return isNaN(t) ? ('A' === t ? 11 : 10) : parseInt(t);
		},
		$ = (e, t) => ((r[t] += u(e)), (n[t].textContent = r[t]), r[t]),
		f = (e, t) => {
			let l = document.createElement('img');
			(l.src = `assets/cartas/${e}.png`), l.classList.add('carta'), o[t].append(l);
		},
		b = () => {
			let [e, t] = r;
			setTimeout(() => {
				t === e
					? alert('Empate, srry chatito')
					: (e < t && t <= 21) || e > 21
					? alert('La PC te gano chatito , hahahaha \uD83D\uDE02')
					: ((e > t && e <= 21) || t > 21) && alert('Le ganaste a la PC chatito \uD83D\uDE28');
			}, 300);
		},
		g = (e) => {
			let t = 0;
			do {
				let l = h();
				(t = $(l, r.length - 1)), f(l, r.length - 1);
			} while (t < e && e <= 21);
			b();
		};
	return (
		a.addEventListener('click', () => {
			let e = h(),
				t = $(e, 0);
			f(e, 0),
				t > 21
					? (console.warn('perdiste chato'), (a.disabled = !0), (s.disabled = !0), g(t))
					: 21 === t && (console.warn('21, que suerte'), (a.disabled = !0), (s.disabled = !0), g(t));
		}),
		s.addEventListener('click', () => {
			(a.disabled = !0), (s.disabled = !0), g(r[0]);
		}),
		d.addEventListener('click', () => {
			i();
		}),
		{ nuevoJuego: i }
	);
})();
