/*
██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗
██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗
███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝
██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗
██║  ██║███████╗███████╗██║     ███████╗██║  ██║
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝
███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
█████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
  - Help functions for carrying out different operations or calculations necessary to draw each graph.
    getRandomColor() -> Function that returns a random color of type 'string hex'.
*/
// Get random color.
function getRandomColor() {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
/*
 ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗
██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝
██║     ███████║███████║██████╔╝   ██║
██║     ██╔══██║██╔══██║██╔══██╗   ██║
╚██████╗██║  ██║██║  ██║██║  ██║   ██║
 ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝
  - Class that serves as the basis for drawing the graphics. All other kinds of graphics inherit from this.
*/
class Chart {
  constructor(cfg) {
    this.config = cfg;
    this.ref_points = {
      center: createVector(
        this.config.canvas.width / 2,
        this.config.canvas.height / 2
      ),
      margins: {
        bottom: createVector(
          this.config.canvas.width / 2,
          this.config.canvas.height * 0.8
        ),
        top: createVector(
          this.config.canvas.width / 2,
          this.config.canvas.height * 0.1
        ),
        left: createVector(
          this.config.canvas.width * 0.15,
          this.config.canvas.height / 2
        ),
        right: createVector(
          this.config.canvas.width - this.config.canvas.width * 0.15,
          this.config.canvas.height / 2
        ),
      },
    };
  }
  draw_title() {
    push();
    fill(255);
    stroke(255);
    textAlign(CENTER, CENTER);
    if (this.config.chart.title.size) {
      textSize(this.config.chart.title.size);
    } else {
      if (this.config.debug) {
        console.warn(
          "The title size was not defined, 5% of the window height will be used."
        );
      }
      textSize(this.config.canvas.height * 0.05);
    }
    text(
      this.config.chart.title.text,
      this.ref_points.margins.top.x,
      this.ref_points.margins.top.y
    );
    pop();
  }
  test() {
    push();
    fill(255);
    stroke(255);
    ellipseMode(CENTER);
    // CENTRO
    ellipse(this.ref_points.center.x, this.ref_points.center.y, 5, 5);
    // BOTTOM
    ellipse(
      this.ref_points.margins.bottom.x,
      this.ref_points.margins.bottom.y,
      5,
      5
    );
    // TOP
    ellipse(this.ref_points.margins.top.x, this.ref_points.margins.top.y, 5, 5);
    // LEFT
    ellipse(
      this.ref_points.margins.left.x,
      this.ref_points.margins.left.y,
      5,
      5
    );
    // RIGHT
    ellipse(
      this.ref_points.margins.right.x,
      this.ref_points.margins.right.y,
      5,
      5
    );
    pop();
  }
}
class Bar extends Chart {
  constructor(cfg) {
    super(cfg);
    var self = this;
    this.ref_points.axis = {
      x_axis: {
        width: this.config.canvas.width * 0.7,
        start: createVector(
          this.ref_points.margins.left.x,
          this.ref_points.margins.bottom.y
        ),
      },
      y_axis: {
        width: this.config.canvas.height * 0.65,
        start: createVector(
          this.ref_points.margins.left.x,
          this.ref_points.margins.bottom.y
        ),
      },
    };
    this.labels = [];
    this.label = function (pos, val) {
      this.pos = pos;
      this.value = val;
      this.draw_label = function () {
        push();
        angleMode(DEGREES);
        textAlign(CENTER, CENTER);
        fill(255);
        noStroke();
        if (self.config.chart.chart_config.labels.rotate) {
          translate(this.pos.x, this.pos.y);
          rotate(self.config.chart.chart_config.labels.rotate);
          text(this.value, 0, 0);
        } else {
          translate(this.pos.x, this.pos.y);
          rotate(self.config.chart.chart_config.labels.rotate);
          text(this.value, 0, 0);
        }
        pop();
      };
      this.get_pos = function () {
        return this.pos;
      };
    };
    this.bars = [];
    this.bar = function (pos, lab, dat) {
      this.pos = pos;
      this.label = lab;
      this.data = dat;
    };
    // Calling chart boot methods. They build this.labels, bars, etc. which are then used to draw the graph.
    this.build_chart_objects();
  }
  build_chart_objects() {
    // Building the labels.
    push();
    let lab = this.config.chart.data.labels;
    let i;
    let x_axis_width = this.ref_points.axis.x_axis.width;
    let x_scalar = x_axis_width / lab.length;
    let x_start = this.ref_points.axis.x_axis.start.x + x_axis_width * 0.05;
    let y_start = this.ref_points.axis.x_axis.start.y + this.config.canvas.height*0.05;
    for (i of lab) {
      this.labels.push(new this.label(createVector(x_start, y_start), i));
      x_start += x_scalar;
    }
    pop();
    // Building the bars.
    push();
    let x_start = this.ref_points.axis.x_axis.start.x + x_axis_width * 0.05;
    let x_scalar = x_axis_width / lab.length;
    
    
    pop();
  }
  draw_axis() {
    push();
    fill(255);
    stroke(255);
    // X AXIS
    line(
      this.ref_points.axis.x_axis.start.x,
      this.ref_points.axis.x_axis.start.y,
      this.ref_points.axis.x_axis.start.x + this.ref_points.axis.x_axis.width,
      this.ref_points.axis.x_axis.start.y
    );
    // Y AXIS
    line(
      this.ref_points.axis.y_axis.start.x,
      this.ref_points.axis.y_axis.start.y,
      this.ref_points.axis.y_axis.start.x,
      this.ref_points.axis.y_axis.start.y - this.ref_points.axis.y_axis.width
    );
    pop();
    let lab;
    for (lab of this.labels) {
      lab.draw_label();
    }
  }
}
