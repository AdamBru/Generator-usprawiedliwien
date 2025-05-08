let p1 = document.getElementById("pole1");
let p2 = document.getElementById("pole2");
let p3 = document.getElementById("pole3");
let p4 = document.getElementById("pole4");
let p5 = document.getElementById("pole5");

const p1words = [
	"Przepraszam za nieobecność, ", 
	"Szanowna Pani Profesor, ", 
	"Proszę o wyrozumiałość, ", 
	"Zwracam się z prośbą o usprawiedliwienie mojej nieobecności, ",
	"Dzień dobry, ",
	"Uprzejmie proszę o usprawiedliwienie, ",
	"W związku z zaistniałą sytuacją, "
]; 

const p2words = [
	"nie byłem obecny na zajęciach, ", 
	"spóźniłem się, ", 
	"nie mogłem przyjść na lekcję, ", 
	"nie mogłem uczestniczyć w zajęciach, ", 
	"nie byłem obecny na pierwszej lekcji, ",
	"moja obecność była niemożliwa, ",
	"nie pojawiłem się w szkole, "
];

const p3words = [
	"bo zapomiałem, że dzisiaj trzeba było przyjść do szkoły ", 
	"ponieważ dojazd do szkoły w dniu dzisiejszym był utrudniony ", 
	"bo mój pies zmarł ", 
	"ponieważ zmarł mój dziadek ", 
	"bo uciekł mi z domu kot ", 
	"ponieważ bolał mnie brzuch ",
	"z powodu nagłej wizyty u dentysty ",
	"z powodu awarii wody w domu "
]; 

const p4words = [
	"i nie mogłem się wcześniej skontaktować. ", 
	"i musiałem zostać w domu z młodszym bratem. ", 
	"i cały poranek spędziłem u lekarza. ", 
	"i samochód mi nie odpalił. ", 
	"i nie mogłem opuścić domu. ",
	"i musiałem pomóc rodzicom. ",
	"i nie mogłem dotrzeć do szkoły. "
]; 

const p5words = [
	"Liczę na poztywne rozpatrzenie mojej prośby.", 
	"Dziękuję za wyrozumiałość.", 
	"Zaległości nadrobię jak najszybciej.", 
	"Przepraszam i proszę o zrozumienie.", 
	"Obiecuję, że to się więcej nie powtórzy.",
	"Nadrobię zaległości najszybciej jak to możliwe.", 
	"Postaram się, aby taka sytuacja się nie powtórzyła."
];

function animateField(fieldElement, wordsArray, finalWord, animationDuration = 2000, changeInterval = 100) {
	return new Promise((resolve) => {
		if (!fieldElement || !wordsArray || wordsArray.length === 0) {
			if (fieldElement) fieldElement.value = finalWord || "";
			resolve();
			return;
		}

		fieldElement.value = wordsArray[Math.floor(Math.random() * wordsArray.length)];

		const intervalId = setInterval(() => {
			const randomIndex = Math.floor(Math.random() * wordsArray.length);
			fieldElement.value = wordsArray[randomIndex];
		}, changeInterval);

		setTimeout(() => {
			clearInterval(intervalId);
			fieldElement.value = finalWord;
			resolve();
		}, animationDuration);
	});
}

async function generate() {
	const finalP1Word = p1words[Math.floor(Math.random() * p1words.length)];
	const finalP2Word = p2words[Math.floor(Math.random() * p2words.length)];
	const finalP3Word = p3words[Math.floor(Math.random() * p3words.length)];
	const finalP4Word = p4words[Math.floor(Math.random() * p4words.length)];
	const finalP5Word = p5words[Math.floor(Math.random() * p5words.length)];

	await animateField(p1, p1words, finalP1Word);
	await animateField(p2, p2words, finalP2Word);
	await animateField(p3, p3words, finalP3Word);
	await animateField(p4, p4words, finalP4Word);
	await animateField(p5, p5words, finalP5Word);

	let finalSentence = finalP1Word + finalP2Word + finalP3Word + finalP4Word + finalP5Word;

	modal("Usprawiedliwienie", finalSentence);
};

// Modal
let body = document.body;
let opakowanie, bg, okno, naglowek, zamknij, contener;

function modal(tytul, tresc) {
	opakowanie = document.createElement('div');
	opakowanie.classList.add('modal');
	body.style.overflow = 'hidden';

	bg = document.createElement('div');
	bg.classList.add('modal-bg');

	bg.addEventListener('click', zamknijModal);

	okno = document.createElement('div');
	okno.classList.add('modal-okno');

	naglowek = document.createElement('div');
	naglowek.classList.add('modal-head');
	naglowek.innerHTML = tytul;

	zamknij = document.createElement('div');
	zamknij.classList.add('modal-zamknij');

	zamknij.addEventListener('click', zamknijModal);

	contener = document.createElement('div');
	contener.classList.add('modal-content');
	contener.innerHTML = tresc;

	naglowek.appendChild(zamknij);
	okno.appendChild(naglowek);
	okno.appendChild(contener);
	opakowanie.appendChild(bg);
	opakowanie.appendChild(okno);
	body.appendChild(opakowanie);

	setTimeout(() => {
		opakowanie.classList.add('modal-show');
	}, 10);
}

function zamknijModal() {
	opakowanie.classList.remove('modal-show');
	setTimeout(() => {
		body.style.overflow = 'auto';
		body.removeChild(opakowanie);
		opakowanie = bg = okno = naglowek = zamknij = contener = null;
	}, 100);
}
