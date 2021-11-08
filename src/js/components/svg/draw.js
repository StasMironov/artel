import gsap from 'gsap';
import DrawSVGPlugin from 'gsap/DrawSVGPlugin';

const Draw = {
	init() {
		let containers = document.querySelectorAll('[data-icon="draw"]');
		let pathElem;

		gsap.registerPlugin(DrawSVGPlugin);

		const tl = gsap.timeline();

		containers.forEach((element) => {
			pathElem = element.querySelectorAll('.path');
			console.log(pathElem);

			tl.fromTo(
				pathElem,
				0.9,
				{
					drawSVG: '0%',
				},
				{
					// duration: 2,
					// stagger: 0.1,
					drawSVG: '100%',
					ease: 'power1.inOut',
					// stagger: 0.1,
				}
			);
		});

		window.animateSvg = tl;

		// if (containers.length) {
		// 	containers.forEach((container) => {
		// 		const svg = container.querySelector('svg');
		// 		if (!svg) return;

		// 		const path1 = svg.querySelector('.path-1');
		// 		const path2 = svg.querySelector('.path-2');
		// 		if (!path1 || !path2) return;

		// 		gsap.registerPlugin(DrawSVGPlugin);

		// 		const tl = gsap.timeline();

		// 		// animate the plugin text first, drawing to 100%
		// 		tl.fromTo(
		// 			path2,
		// 			{
		// 				duration: 4,
		// 				drawSVG: false,
		// 				ease: 'power1.inOut',
		// 			},
		// 			{
		// 				drawSVG: true,
		// 			}
		// 		);
		// 		// // now animate the logo strokes (note we use "102% as FireFox 34 miscalculates the length of a few strokes)
		// 		// .fromTo(
		// 		// 	'.path-2, .green-line, .green-line-thin',
		// 		// 	{ drawSVG: 0 },
		// 		// 	{ duration: 2, drawSVG: '102%' },
		// 		// 	'-=1'
		// 		// )

		// 		window.animateSvg = tl;

		// 		// window.animateSvg = kute.to(
		// 		// 	path1,
		// 		// 	{ path: path2 },
		// 		// 	{ duration: 10000 }
		// 		// );
		// 	});
		// }
	},
};

export default Draw;
