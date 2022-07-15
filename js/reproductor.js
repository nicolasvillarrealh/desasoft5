function cargarReloj() {

    // Haciendo uso del objeto Date() obtenemos la hora, minuto y segundo 
    var fechahora = new Date();
    var hora = fechahora.getHours();
    var minuto = fechahora.getMinutes();
    var segundo = fechahora.getSeconds();

    // Variable meridiano con el valor 'AM' 
    var meridiano = "AM";


    // Si la hora es igual a 0, declaramos la hora con el valor 12 
    if (hora == 0) {

        hora = 12;

    }

    // Si la hora es mayor a 12, restamos la hora - 12 y mostramos la variable meridiano con el valor 'PM' 
    if (hora > 12) {

        hora = hora - 12;

        // Variable meridiano con el valor 'PM' 
        meridiano = "PM";

    }

    // Formateamos los ceros '0' del reloj 
    hora = (hora < 10) ? "0" + hora : hora;
    minuto = (minuto < 10) ? "0" + minuto : minuto;
    segundo = (segundo < 10) ? "0" + segundo : segundo;

    // Enviamos la hora a la vista HTML 
    var tiempo = hora + ":" + minuto + ":" + segundo + " " + meridiano;
    document.getElementById("burbuja").innerText = tiempo;
    //document.getElementById("relojnumerico").textContent = tiempo;

}

var Rep = {
    htmlElements: {
        videoplayer: document.getElementById('videoplayer'),
        //        btnScaleDemo: document.getElementById('scale-demo')
    },
    data: {
        sources: [
            'Parcial2.mp4', 'Secuencia1.mp4'
        ],
        actual: "",
    },
    init: function() {

        console.log('Initializing Rep');

        console.log(Rep.data.sources);

        var videoplayer = Rep.htmlElements.videoplayer;
        // videoplayer.width = 1080;
        // videoplayer.height = 720;
        //videoplayer.style = 'max-width: 100%;'
        //            videoplayer.src = './recursos/video4.mp4';
        videoplayer.src = './recursos/' + Rep.data.sources[0];
        //        videoplayer.setAttribute('loop', '');
        videoplayer.setAttribute('autoplay', '');
        videoplayer.setAttribute('muted', '');
        videoplayer.setAttribute('controls', '');
        //Rep.htmlElements.videoplayer.play(); 
        videoplayer.load();

        //videoplayer.preload = 'metadata';
        videoplayer.onloadedmetadata = function() {
            console.log(this.duration + ' segundos');
            document.getElementById("circulo").style.animationDuration = this.duration + "s";
            document.getElementById("circulo").style.animationName = 'rodar';
        }


        Rep.initHandlers();

        //        videoplayer.play();

        //        videoplayer.removeAttribute('muted');
    },
    initHandlers: function() {
        var videoplayer = Rep.htmlElements.videoplayer;
        videoplayer.addEventListener('ended', function() {
            //console.log('Video Finalizado');
            var videoplayer = Rep.htmlElements.videoplayer;
            //                var btnScaleDemo = Rep.htmlElements.btnScaleDemo;

            console.table(Rep.data.sources);

            Rep.data.sources.map(function(value, index, array) {

                var strPublicURL = window.location.href; //"https://localhost/reproductorutp/public";

                //console.log("value: " + value + "index: " + index);

                console.log("strPublicURL: " + strPublicURL);
                console.log("Video SRC:" + Rep.htmlElements.videoplayer.src);

                if (Rep.htmlElements.videoplayer.src === strPublicURL + '/recursos/' + value) {

                    console.log("Video encontrado, buscando el siguiente");

                    if ((index + 1) >= Rep.data.sources.length) {
                        strVideoSrc = Rep.data.sources[0];
                    } else {
                        strVideoSrc = Rep.data.sources[index + 1];
                    }



                    console.log("strVideoSrc: [" + strVideoSrc + "]");
                    Rep.data.actual = strVideoSrc;


                }

            });

            videoplayer.src = './recursos/' + Rep.data.actual;



            /*
             if (videoplayer.src === strPublicURL + '/recursos/video3.mp4') {
             videoplayer.src = './recursos/video4.mp4';
             } else {
             videoplayer.src = './recursos/video3.mp4';
             }
             */

            console.log('Cambiando  Video');
            videoplayer.load();

            videoplayer.play();
            console.log('Video Nuevo');



            //                btnScaleDemo.classList.add('scale-in');
            //
            //                $('#scale-demo').addClass('animated bounceOutLeft');
        });
    }
};

Rep.init();