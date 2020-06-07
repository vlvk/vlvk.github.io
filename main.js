const animate = (selector, csstext, delay) => {
	const items = document.querySelectorAll(selector);
	const taskArray = [];
	if (items && items.length > 0) {
		for (let i = 0; i < items.length; ++i) {
			const temp = new Promise((resolve, reject) => {
				setTimeout(() => {
					items[i].style.cssText = csstext;
					resolve();
				}, delay * (i + 1));
			});
			taskArray.push(temp);
		}
	}
	return taskArray;
};

const cssShowup = 'top: 0px; opacity: 1;';
const cssLeft = 'right: 0px; opacity: 1;';
const cssRight = 'left: 0px; opacity: 1;';
const delayValue = 300;

const animateTitle = () => {
	return Promise.all(animate("h1", cssShowup, delayValue));
}

const animateSpan = () => {
	const spanQueue = animate(".slogan > span:first-child", cssRight, delayValue);
	spanQueue.push.apply(spanQueue, animate(".slogan > span:last-child", cssLeft, delayValue));
	return Promise.all(spanQueue);
}

const animateSlogan = () => {
	return Promise.all(animate(".slogan > p", cssShowup, delayValue));
}

const animateLink = () => {
	return Promise.all(animate(".links > a", cssShowup, delayValue));
}

const animateLocation = () => {
	const leftLocation = animate(".location > span:first-child", cssRight, delayValue);
	const rightLocation = animate(".location > span:last-child", cssLeft, delayValue);
	leftLocation.push.apply(leftLocation, rightLocation);
	return Promise.all(leftLocation);
}

window.addEventListener("load", () => {
	animateTitle()
		.then(animateSpan)
		.then(animateSlogan)
		.then(animateLink)
		.then(animateLocation);
});

window.addEventListener("keydown", e => {
	if (e.keyCode === 66) {
		document.querySelector('.navigator').style.cssText = 'opacity: 1;';
		setTimeout(() => {
			location.href = 'https://vlvk.github.io/bookmarks.html';
		}, 1500);	
	}
});