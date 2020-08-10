var chart;
var config;

function setup() {
  var w = 600;
  var h = 400;
  createCanvas(w, h);
  background(4);

  let conf = {
    debug: true,
    canvas: {
      width: w,
      height: h,
    },
    chart: {
      chart_config:{
        orientation: 'vertical',
        labels:{
          display:true,
          rotate:-35, // Usar valores positivos o negativos para ir rotando la posicion del label.
        }

      },
      title: {
        text: "Test Title",
        size: 30,
      },
      labels:{
        rotate : 24,
      },
      data: {
        labels: [
          "Red", 
          "Blue", 
          "Yellow", 
          "Green", 
          "Green", 
          "Green", 
          "Purple", 
          "Orange"
        ],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
         
        ],
      },
    },
  };

  var my_chart = new Bar(conf);
  my_chart.draw_axis();
}
