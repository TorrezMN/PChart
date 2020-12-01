/*
 
 ██████╗  ██████╗██╗  ██╗ █████╗ ██████╗ ████████╗    ██╗     ██╗██████╗ 
 ██╔══██╗██╔════╝██║  ██║██╔══██╗██╔══██╗╚══██╔══╝    ██║     ██║██╔══██╗
 ██████╔╝██║     ███████║███████║██████╔╝   ██║       ██║     ██║██████╔╝
 ██╔═══╝ ██║     ██╔══██║██╔══██║██╔══██╗   ██║       ██║     ██║██╔══██╗
 ██║     ╚██████╗██║  ██║██║  ██║██║  ██║   ██║       ███████╗██║██████╔╝
 ╚═╝      ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚══════╝╚═╝╚═════╝ 
                                                                         
 
*/


class Chart{
    constructor(cfg){
        this.config = cfg;

        this.build_graphic ();
    }
    build_graphic(){
        console.log("este es un grafico!");
    }
}































var chart;
var chart_config;
p5.prototype.P_Chart = function () {
    //   Checking the values ​​that the function receives.
    if(arguments.length>0){
        chart_config = arguments[0];
    }else{
        console.error("It is not possible to draw anything without a configuration.\nPlease specify a configuration object.")
    }
    

    chart = new Chart(chart_config);
    


  };