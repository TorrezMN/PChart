
function setup() {
	createCanvas(windowWidth, windowHeight);
	var config = {
		'kind' : 'bar',
		'conf' : {
			'debug': true,
			'display': {
				'width':windowWidth,
				'height':windowHeight,
			}
		},
		'data' : null
	}
	

	// Creating a new chart.
	P_Chart(config);
}

function draw() {

}