$(document).ready(function(){
    
    // variables 
    var canvas = $("#canvas"); 
    var context = canvas[0].getContext("2d");
    var brushMouse = false;
    var cursorX, cursorY; 
    var started = false; 
    
    var brushButton = $("#brush");
    var brushColor = $("#myColor");   
    var brushSize = $("#mySize"); 
   
    
    // rounded line 
    context.lineJoin = "round";
    context.lineCap = "round";
    
    //size canvas 
    canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    
    
    /////////////////// brush work ///////////////
    function ClickBrush() {
        context.strokeStyle = brushColor.val(); 
        brushButton.css({"border":" 2px solid black", "border-radius":"5px"});
        
        // Click souris enfoncé sur le canvas, je dessine :
        canvas.mousedown(function(e) {
            brushMouse = true;
            
            // Coordonnées de la souris :
            cursorX = (e.pageX - this.offsetLeft);
            cursorY = (e.pageY - this.offsetTop);
        });
        
        // Relachement du Click sur tout le document, j'arrête de dessiner :
        canvas.mouseup(function() {
            brushMouse = false;
            started = false;
        });
        
        // Mouvement de la souris sur le canvas :
        canvas.mousemove(function(e) {
            // Si je suis en train de dessiner (click souris enfoncé) :
            if (brushMouse) {
                // Set Coordonnées de la souris :
                cursorX = (e.pageX - this.offsetLeft) ; // 10 = décalage du curseur
                cursorY = (e.pageY - this.offsetTop);
                
                // Dessine une ligne :
                drawLine();
            }
        });
 
    }

     // Fonction qui dessine une ligne :
     function drawLine() {
        // Si c'est le début, j'initialise
        if (!started) {
            // Je place mon curseur pour la première fois :
            context.beginPath();
            context.moveTo(cursorX, cursorY);
            started = true;
        } 
        // Sinon je dessine
        else {
            context.lineTo(cursorX, cursorY);
            //context.lineWidth = SizeLine;
            context.stroke();
        }
    }
    // button change color
    $("#brush").on("click", ClickBrush);
    
    brushColor.on("input", function () {
       var myColor = brushColor.val(); 
        context.strokeStyle = myColor;
    });
    
    // change size 
    brushSize.on("input", function () {
       var SizeLine =  brushSize.val();
        context.lineWidth = SizeLine;
    });

    function eraserClick() {

    }

});
