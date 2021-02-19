const canvas = document.getElementById('canvas1');
const cte2d= canvas.getContext('2d');
const ArrayParticulas = [];
let color=0;
//console.log(cte2d); //para poder ver las opciones de edicion en console ej cte2d.fillStyle

canvas.width= window.innerWidth;
canvas.height= window.innerHeight;

window.addEventListener('resize', function(){
    canvas.width= window.innerWidth;
    canvas.height= window.innerHeight;

});

const raton = {//indican la posicion del mouse
    x: undefined,
    y: undefined,
}

canvas.addEventListener('click', function(event){

    raton.x = event.x;
    raton.y = event.y;
    for (let i = 0; i < 10; i++){ //cantidad dde particulas
        ArrayParticulas.push(new Particulas());
    }
    //dibujaCirculo();
});


canvas.addEventListener('mousemove', function(event){
    raton.x = event.x;
    raton.y = event.y;
    for (let i = 0; i < 10; i++){//cantidad de particulas
        ArrayParticulas.push(new Particulas());
    }
  /*  hue+=2;
    if (frame % 2 === 0){
      for (let i = 0; i < 7; i++){
        particlesArray.push(new Particle());
      }
    }*/
    //dibujaCirculo();
})



function dibujaCirculo(){
    cte2d.fillStyle = 'violet';
    cte2d.beginPath();
    cte2d.arc( raton.x, raton.y, 30, 0, Math.PI * 2); //x, y (puede llevar valores o variables que representen la posicion), z, tamaño  Para que complete el circulo Math.PI *2
    cte2d.fill();
}

//dibujaCirculo();

class Particulas{
    constructor(){//variando los primeros 4 obtenes diferentes efectos de animacion
/*1*/   this.x = raton.x;
/*2*/   this.y = raton.y;
/*3*/    //this.x = Math.random() * canvas.width;
/*4*/   // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1; //tamaño
        this.speedX = Math.random() * 3 - 1.5; //velocidad Y DIRECCION DEL CIRCULO respectivamente
        this.speedY = Math.random() * 3 - 1.5; //velocidad
        this.color = 'hsl(' + color + ', 100%, 50%)'; 
    }

    cargar(){
        this.x += this.speedX;
        this.y += this.speedY;
        if(this.size > 0.8) this.size -= 0.1; //Disminuye el tamaño gradualmente
    }

    Dibujar(){
        //cte2d.fillStyle = 'orange';
        cte2d.fillStyle = this.color;
        cte2d.beginPath();
        cte2d.arc( this.x, this.y, this.size, 0, Math.PI * 2); //x, y (puede llevar valores o variables que representen la posicion), z, tamaño  Para que complete el circulo Math.PI *2
        cte2d.fill();
    }
}

/*function init(){ //genera las particulas
    for (let i = 0; i < 100; i++){
        ArrayParticulas.push(new Particulas());
    }
}
init();*/
//console.log(ArrayParticulas);

function DistribuirParticulas(){
    for (let i = 0; i < ArrayParticulas.length; i++){
     ArrayParticulas[i].cargar();   
     ArrayParticulas[i].Dibujar();
     
     for (let f = i; f < ArrayParticulas.length; f++){
        const dx = ArrayParticulas[i].x - ArrayParticulas[f].x;
        const dy = ArrayParticulas[i].y - ArrayParticulas[f].y;
        const distancia = Math.sqrt(dx * dx + dy * dy);

        //Efecto con rama
        if(distancia < 100){
            cte2d.beginPath();
            cte2d.strokeStyle = ArrayParticulas[i].color;
            cte2d.lineWidth = ArrayParticulas[i].size/5;
            cte2d.moveTo(ArrayParticulas[i].x, ArrayParticulas[i].y);
            cte2d.lineTo(ArrayParticulas[f].x, ArrayParticulas[f].y);
            cte2d.stroke();
            cte2d.closePath();
        }
      }
      if(ArrayParticulas[i].size <=1.3){
        ArrayParticulas.splice(i, 1);
        i--;
      }
    }
}

function animacion(){
    //cte2d.clearRect(0, 0, canvas.width, canvas.height);
    //dibujaCirculo();
    cte2d.fillStyle = 'rgba(0,0,0,0.02)'; //a, b, c, d siendo el ultimo el que indica el tamaño en que termina la figura
    cte2d.fillRect(0, 0, canvas.width, canvas.height);
    DistribuirParticulas();
    color+=5; //para que cambie de color
    requestAnimationFrame(animacion);
}
animacion();