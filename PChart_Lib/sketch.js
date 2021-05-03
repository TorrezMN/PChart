

function setup() {
	createCanvas(windowWidth, windowHeight);
	var conf = {
		debug: true,
		canvas_config: {
			width: windowWidth,
			height: windowHeight,
			background: 'random',

		},
		chart: {
			kind: 'cloud_of_words',
			colors: 'random',
			data_margins:{
				bottom:1000,
				top: 5000,
			},
			data: {
				'Maldives': 2972,
				'Mauritius': 1321,
				'Israel': 1990,
				'French Guiana': 3727,
				'Fiji': 3794,
				'Luxembourg': 3023,
				'Haiti': 2753,
			}
		}


	}







	p_chart(conf);
	// draw_chart();
}

function draw() {
	background(0);
	draw_chart();
}