export default (width, height, options) => {
	return (p5) => {
		p5.setup = () => {
			p5.createCanvas(width, height);
		};

		p5.draw = () => {
			p5.background('#c5eef5');
		};
	};
};
