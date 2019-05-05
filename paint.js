$(document).ready(function(){
    
    // variables 
    var canvas = $("#canvas"); 
    var context = canvas[0].getContext("2d");
    var brushMouse = false;
    var cursorX, cursorY; 
    var started = false; 
    var mode = "";
    
    
    // variable line work 
    var pointA = true;
    var tabCoordinate = []; 
    
    
    canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    
    /////////////////// brush work ///////////////
    
    function brushDown(e) {
        
        brushMouse = true;
        // Coordonnées de la souris :
        cursorX = (e.pageX - this.offsetLeft);
        cursorY = (e.pageY - this.offsetTop);
        
    }
    
    function brushUp(e) {
        brushMouse = false;
        started = false;
    }
    
    function brushMove(e) {
        if (brushMouse) {
            // Set Coordonnées de la souris :
            cursorX = (e.pageX - this.offsetLeft); 
            cursorY = (e.pageY - this.offsetTop);
            
            // Dessine une ligne :
            draw();
        }  
    }
    
    $("#brush").click(function(){
        context.strokeStyle = $("#myColor").val(); 
        $("#brush").css({"border":" 2px solid black", "border-radius":"5px"});
        canvas.css("cursor", "crosshair");
        $("#erase").css("border-style", "none");
        $("#line").css("border-style", "none");
        
        canvas.on("mousedown", brushDown);
        $("body").on("mouseup", brushUp);
        canvas.on("mousemove",  brushMove);
        
        mode ="pen"; 
    });
    
    
    // Fonction qui dessine une ligne :
    function draw() {
        // Si c'est le début, j'initialise
        if (!started) {
            // Je place mon curseur pour la première fois :
            context.beginPath();
            context.moveTo(cursorX, cursorY);
            started = true;
        } 
        // Sinon je dessine
        else {
            if(mode ==="pen" && mode != "line"){
                context.lineCap = "round";
                context.lineJoin = "round";
                context.globalCompositeOperation = "source-over";
                context.lineTo(cursorX, cursorY);
                context.lineWidth =  $("#mySize").val();
                context.stroke();
            } 
            else if(mode === "eraser" && mode != "line"){
                context.lineCap = "round";
                context.lineJoin = "round";
                context.lineTo(cursorX, cursorY);
                context.lineWidth =  $("#mySize").val();
                context.globalCompositeOperation = "destination-out";
                context.stroke();
            }
            
        }
    }
    
    // button change color
    $("#myColor").on("input", function () {
        var myColor = $("#myColor").val(); 
        context.strokeStyle = myColor;
    });
    
    ///// Size
    $("#showSize").html($("#mySize").val() + "px");
    
    // change size ///////////////////////////
    $("#mySize").on("input", function () {
        var SizeLine =   $("#mySize").val();
        context.lineWidth = SizeLine;
    });
    
    $("#mySize").change(function() {
        if (!isNaN($(this).val())) {
            $("#showSize").html($(this).val() + "px");
        }
    });
    
    ///////////////  eraser work //////////////
    
    $("#erase").click(function (){
        canvas.on("mousedown", brushDown);
        canvas.on("mouseup", brushUp);
        canvas.on("mousemove",  brushMove);
        
        $("#erase").css({"border":" 2px solid black", "border-radius":"5px"});
        $("#brush").css("border-style", "none");
        $("#line").css("border-style", "none");
        
        mode = "eraser"
    }); 
    
    ///////////// reset work //////////
    $("#reset").click(function(){
        context.clearRect(0, 0, canvas.width(), canvas.height());
    });
    
    ////////// save  ////////////
    
    $("#save").click(function(){
        var data = canvas[0].toDataURL();
        window.open(data, "_blank", null);
        $("#download").append("<a>Download image</a>"); 
        $("div#download a ").attr( "href", data); 
        $("div#download a ").attr( "download", "myPaint.png"); 
    });
    
    
    /// line //// 
    
    function TakeCoordonateline(e) {
        if (mode === "line"){
            if(pointA == true){
                pointA = false; 
                // take coordinate A
                
                cursorXA = (e.pageX - this.offsetLeft);
                cursorYA = (e.pageY - this.offsetTop);
                
                tabCoordinate["pointAX"] = cursorXA;
                tabCoordinate["pointAY"] = cursorYA;
                // console.log(tabCoordinate["pointAX"]);
            } 
            else{
               
                 // take coordinate B
                cursorXB = (e.pageX - this.offsetLeft);
                cursorYB = (e.pageY - this.offsetTop);
                
                tabCoordinate["pointBX"] = cursorXB;
                tabCoordinate["pointBY"] = cursorYB;
                
                pointA = true;
            }
        }

       
        
    }
    
    function createLine() {
        if (pointA  === true){

            context.lineCap = "round";
            context.lineJoin = "round";
            context.globalCompositeOperation = "source-over";
            context.moveTo(tabCoordinate["pointAX"], tabCoordinate["pointAY"]); 
            context.lineTo(tabCoordinate["pointBX"], tabCoordinate["pointBY"]);
            context.lineWidth =  $("#mySize").val();
            context.stroke();
        }
       
    }
    
    $("#line").click(function () {
        context.strokeStyle = $("#myColor").val(); 
        mode = "line";
        $("#line").css({"border":" 2px solid black", "border-radius":"5px"});
        $("#brush").css("border-style", "none");
        $("#erase").css("border-style", "none");
        canvas.css("cursor", "crosshair");
        
        canvas.on("mousedown", TakeCoordonateline);
        canvas.on("mousedown", createLine);
        
    }); 
    
    
    
});
