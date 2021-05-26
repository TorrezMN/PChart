/*
 
  __    __            __                                      ________                             
 /  |  /  |          /  |                                    /        |                            
 $$ |  $$ |  ______  $$ |  ______    ______    ______        $$$$$$$$/__    __  _______    _______ 
 $$ |__$$ | /      \ $$ | /      \  /      \  /      \       $$ |__  /  |  /  |/       \  /       |
 $$    $$ |/$$$$$$  |$$ |/$$$$$$  |/$$$$$$  |/$$$$$$  |      $$    | $$ |  $$ |$$$$$$$  |/$$$$$$$/ 
 $$$$$$$$ |$$    $$ |$$ |$$ |  $$ |$$    $$ |$$ |  $$/       $$$$$/  $$ |  $$ |$$ |  $$ |$$ |      
 $$ |  $$ |$$$$$$$$/ $$ |$$ |__$$ |$$$$$$$$/ $$ |            $$ |    $$ \__$$ |$$ |  $$ |$$ \_____ 
 $$ |  $$ |$$       |$$ |$$    $$/ $$       |$$ |            $$ |    $$    $$/ $$ |  $$ |$$       |
 $$/   $$/  $$$$$$$/ $$/ $$$$$$$/   $$$$$$$/ $$/             $$/      $$$$$$/  $$/   $$/  $$$$$$$/ 
                         $$ |                                                                      
                         $$ |                                                                      
                         $$/                                                                       
 
*/

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


/*
 
  _______                                
 /       \                               
 $$$$$$$  |  ______    _______   ______  
 $$ |__$$ | /      \  /       | /      \ 
 $$    $$<  $$$$$$  |/$$$$$$$/ /$$$$$$  |
 $$$$$$$  | /    $$ |$$      \ $$    $$ |
 $$ |__$$ |/$$$$$$$ | $$$$$$  |$$$$$$$$/ 
 $$    $$/ $$    $$ |/     $$/ $$       |
 $$$$$$$/   $$$$$$$/ $$$$$$$/   $$$$$$$/ 
                                         
                                         
                                         
 
*/
class Chart {
    constructor(cfg) {
        this.config = cfg;

    }

    draw_chart() {
        push();
        if (this.config.chart.colors == 'random') {
            background(getRandomColor());
        } else {
            background(this.config.chart.colors);

        }

        ellipse(this.config.canvas_config.width * 0.20, this.config.canvas_config.height * 0.20, 40, 40);
        pop();
    }
}

/*
 
   ______   __                            __ 
  /      \ /  |                          /  |
 /$$$$$$  |$$ |  ______   __    __   ____$$ |
 $$ |  $$/ $$ | /      \ /  |  /  | /    $$ |
 $$ |      $$ |/$$$$$$  |$$ |  $$ |/$$$$$$$ |
 $$ |   __ $$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |
 $$ \__/  |$$ |$$ \__$$ |$$ \__$$ |$$ \__$$ |
 $$    $$/ $$ |$$    $$/ $$    $$/ $$    $$ |
  $$$$$$/  $$/  $$$$$$/   $$$$$$/   $$$$$$$/ 
                                             
                                             
                                             
 
*/
class Cloud extends Chart {
    constructor(cfg) {
        super(cfg);
        var cfg = this.config;
        this.cloud = function (val) {
            this.cloud_val = val;
            this.acc = createVector(Math.random() * 10 > 5 ? 2 : -2, Math.random() * 10 > 5 ? 2 : -2);
            this.pos = createVector(
                random(cfg.canvas_config.width * 0.10, cfg.canvas_config.width - cfg.canvas_config.width * 0.10),
                random(cfg.canvas_config.height * 0.10, cfg.canvas_config.height - cfg.canvas_config.height * 0.10)
            );
            this.draw_cloud = () => {
                let c = getRandomColor();
                push();
                fill(c);
                stroke(c);
                textSize(map(this.cloud_val[1], cfg.chart.data_margins.bottom, cfg.chart.data_margins.top, 10, 100));
                textAlign(CENTER, CENTER);
                text(this.cloud_val[0], this.pos.x, this.pos.y);
                pop();
                this.update_cloud();
            };
            this.update_cloud = () => {
                let with_margin = cfg.canvas_config.width * 0.10;
                let height_margin = cfg.canvas_config.height * 0.10;
                if (this.pos.x <= with_margin) {
                    this.acc.x *= -1;
                }
                if (this.pos.x > cfg.canvas_config.width - with_margin) {
                    this.acc.x *= -1;
                }
                if (this.pos.y <= height_margin) {
                    this.acc.y *= -1;
                }
                if (this.pos.y > cfg.canvas_config.height - height_margin) {
                    this.acc.y *= -1;

                }
                console.log(this.config);
                this.pos.x += this.acc.x;
                this.pos.y += this.acc.y;
            }

        }
        this.clouds = [];

        this.make_clouds();
    }
    make_clouds() {
        let data = this.config.chart.data;
        for (let i of Object.keys(data)) {
            this.clouds.push(new this.cloud([i, data[i]]))
        }

    }
    draw_chart() {
        for (let i of this.clouds) {
            i.draw_cloud();
        }
    }

}

/*
 
   ______                         __      __                         
  /      \                       /  |    /  |                        
 /$$$$$$  |  _______   ______   _$$ |_  _$$ |_     ______    ______  
 $$ \__$$/  /       | /      \ / $$   |/ $$   |   /      \  /      \ 
 $$      \ /$$$$$$$/  $$$$$$  |$$$$$$/ $$$$$$/   /$$$$$$  |/$$$$$$  |
  $$$$$$  |$$ |       /    $$ |  $$ | __ $$ | __ $$    $$ |$$ |  $$/ 
 /  \__$$ |$$ \_____ /$$$$$$$ |  $$ |/  |$$ |/  |$$$$$$$$/ $$ |      
 $$    $$/ $$       |$$    $$ |  $$  $$/ $$  $$/ $$       |$$ |      
  $$$$$$/   $$$$$$$/  $$$$$$$/    $$$$/   $$$$/   $$$$$$$/ $$/       
                                                                     
                                                                     
                                                                     
 
*/

class Scatter extends Chart {
    constructor(cfg) {
        super(cfg);
        this.scatter_cfg = {};
        this.build_axis();
        this.draw_axis();
    }
    build_axis() {
        this.scatter_cfg.canvas = this.config.canvas_config;
        this.scatter_cfg.margin_points = {
            'bottom_left': createVector(this.config.canvas_config.width * 0.10, this.config.canvas_config.height - this.config.canvas_config.height * 0.10),
            'top_left': createVector(this.config.canvas_config.width * 0.10, this.config.canvas_config.height * 0.10),
            'bottom_right': createVector(this.config.canvas_config.width - this.config.canvas_config.width * 0.10, this.config.canvas_config.height - this.config.canvas_config.height * 0.10),
            'top_right': createVector(this.config.canvas_config.width - this.config.canvas_config.width * 0.10, this.config.canvas_config.height * 0.10)

        };

    }
    draw_axis() {
        push();
        fill('#FFFFFF');
        stroke('#FFFFFF');
        ellipseMode(CENTER);
        // X Axis
        line(
            this.scatter_cfg.margin_points.bottom_left.x,
            this.scatter_cfg.margin_points.bottom_left.y,
            this.scatter_cfg.margin_points.bottom_right.x,
            this.scatter_cfg.margin_points.bottom_right.y,
        )
        // Y Axis
        line(
            this.scatter_cfg.margin_points.bottom_left.x,
            this.scatter_cfg.margin_points.bottom_left.y,
            this.scatter_cfg.margin_points.top_left.x,
            this.scatter_cfg.margin_points.top_left.y,
        )
        pop();
    }

}





var pchart;

p5.prototype.p_chart = function (cfg) {
    switch (cfg.chart.kind) {
        case 'cloud_of_words':
            pchart = new Cloud(cfg);
            break;
        case 'scatter':
            pchart = new Scatter(cfg);
            break;
        default:
            break;
    }
    // pchart = new Chart(cfg);
};


p5.prototype.draw_chart = function () {
    // pchart.draw_chart();
    pchart.draw_axis();
};



