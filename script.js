const thumbnails = document.querySelectorAll('.site-preview');
const menu = document.querySelector('.hamburger');
let clicked = false;
let startTime;

function show(){
	console.dir(this.querySelector('.blurb'));
	this.querySelector('.blurb').style.left = '50%';
}

function hide(){
	this.querySelector('.blurb').style.left = '-9999px';	
}

thumbnails.forEach(thumbnail => {
	thumbnail.addEventListener('mouseenter', show);
	thumbnail.addEventListener('mouseleave', hide);
})


//smooth scroll
const anchors = document.querySelectorAll('.internal');

anchors.forEach(function(anchor){
	anchor.addEventListener('click', scroll);
})


function smoothScroll(timestamp, start, destination, duration){
	// ease in out quad function
	// t<.5 ? 2*t*t : -1+(4-2*t)*t
	let runtime = timestamp - startTime;
	let progress = runtime/duration;
	let speed = progress < .5 ? 2*progress*progress : -1+(4-2*progress)*progress;
	let distance = destination-start;
	window.scrollTo(0, start+(distance*speed));
	if(runtime < duration){
		requestAnimationFrame(function(timestamp){
			smoothScroll(timestamp, start, destination, duration);
		});
	}
}

function scroll(e){
	e.preventDefault();
	let offset = window.innerWidth < 600 && clicked ? 172 : 60
	let destination = document.querySelector(`${this.hash}`).offsetTop - offset;
	let start = window.scrollY;
	requestAnimationFrame(timestamp => {
		startTime = timestamp;
		smoothScroll(startTime, start, destination, 800);
	})
}

menu.addEventListener('click', function(){
	clicked = !clicked;
	document.querySelectorAll('.menu').forEach(link => link.classList.toggle('menu-hide'));
});