


let slideInicial = 0;  // almacena el índice (posición) de la diapositiva que está actualmente activa en el slider.
const slides  = document.querySelectorAll(".slide, .slideActive"); //a función querySelectorAll() en JavaScript es un método poderoso que se utiliza para seleccionar uno o más elementos HTML  en este caso la clase slide y slideActive
const puntos = document.querySelectorAll(".punto, .puntoActivo");

function mostrarImagen(index) //index se utiliza para  identificar el indice de la   imagen  que vamos a usar (mostrar)

//Se aplica la restriccion al tamaño del slide
{
if (index >= slides.length){
    slideInicial = 0;
}else if (index < 0){
    slideInicial = slides.length -1;
} else {
    slideInicial  = index;
}



//se realiza un for each para remover la clase "slideActive de la imagen"

  slides.forEach(slide => slide.classList.remove("slideActive"));

//garantiza que cada elemento que consideras una "diapositiva" tenga la clase base slide y poder aplicar  estilos del css
slides.forEach(slide => {slide.classList.add("slide")});

// Muestra la imagen actual  
slides[slideInicial].classList.add("slideActive")
slides[slideInicial].classList.remove("slide")

// realizamos el mismo proceso  para los puntos  
puntos.forEach(punto => punto.classList.remove("puntoActivo"));
        puntos.forEach(punto => punto.classList.add("punto"));
        puntos[slideInicial].classList.add("puntoActivo");
        puntos[slideInicial].classList.remove("punto");

}

function moveSlide(n) {
        mostrarImagen(slideInicial + n);
    }

    function setSlide(n) {
        mostrarImagen(n);
    }


    //setInterval es una función de JavaScript que ejecuta un bloque de código repetidamente cada cierto tiempo, en milisegundos.


    // Auto-deslizar cada 6 segundos
    setInterval(() => {
        moveSlide(1);
         /*() => { moveSlide(1); }
Es una función flecha Lo que hace es llamar a moveSlide(1) cada vez que se ejecuta el intervalo.
En este caso, moveSlide(1) avanza el slider a la siguiente imagen.*/

    }, 6000);  // 6000 milisegundos = 6 segundos.