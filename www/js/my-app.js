// Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({
});
 
// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true,
  domCache: true
});       
        
var idioma;
var municipio;
var clima;
var restaurant;//nombre del restaurante
var idrest;//id del restaurante
var id;

$$('#eng').on('click', function (e) {
    idioma=$$(this).attr('idioma');
});
$$('#esp').on('click', function (e) {
   idioma=$$(this).attr('idioma'); 
});
myApp.onPageInit('municipios', function (page) {
$$(".item-link").on("click",function(e){
    municipio=$$(this).attr('mun');
    clima=$$(this).attr('clima');
    mainView.load('principal.html');
})  
});

myApp.onPageInit('principal', function (page) {
    
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM imagen where clave=?',[municipio],
        function(tx,results){
            $$("#municipio_title").html("<img src='data:image/jpg;base64,"+results.rows.item(0).imagen+"' style='margin:auto;display:block;height:48px'/>");
            
        });
    });
  
db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM portada where clave=?',[municipio],
        function(tx,results){  
             $$("#portada").attr('src','data:image/jpg;base64,'+results.rows.item(0).imagen);            
            });
        });
db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM menu',[],
        function(tx,results){ 
            var len = results.rows.length;
        for (var i=0; i<len; i++){
             $$(".menu .i"+i).html("<img src='data:image/png;base64,"+results.rows.item(i).imagen+"' width='100%'/>"); 
             }           
            });
        });
  
});

myApp.onPageInit('gastronomia', function (page) { 
    $$("#rest_info").html('');
    db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM portada_gas where clave=?',[municipio],
        function(tx,results){  
             $$("#portada_gas").attr('src','data:image/jpg;base64,'+results.rows.item(0).imagen);            
            });
        });
     db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM desimggas where clave=?',["DG"+municipio+idioma],
        function(tx,results){
            
             $$("#desgas").text(results.rows.item(0).descripcion);            
            });
        });
        
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM gastronomia where clave=?',["G"+municipio+idioma],
        function(tx,results){
            var len = results.rows.length;
               
            var anyArray = new Array(); 
            for(xd=0;xd<len;xd++){
                anyArray.push(xd);
            }
            
            function randOrd(){return (Math.round(Math.random())-0.5); } 
              anyArray.sort( randOrd ); 
                 
            for (var i=0; i<=len; i++){          
            var itemHTML ="<li>"+
                "<a href='info_restaurant.html' class='item-link item-content' onclick=cargar_rest("+results.rows.item(anyArray[i]).id+") >"+
                "<div class='item-media'><i class='flaticon-cutlery6'></i></div>"+
                "<div class='item-inner'>"+
                "<div class='item-title'>"+results.rows.item(anyArray[i]).restaurante+"</div>"+
                "</div>"+
                "</a>"+
                "</li>";
                $$('#rest_info').prepend(itemHTML);
                
                 
                }
            
        });
        
    });
  
});
myApp.onPageInit('restaurantes', function (page) {
    //$$("#name-rest").html(get);
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM gastronomia where id=? ',[id],
        function(tx,results){ 
            
            //$$("#name-rest").html(results.rows.item(0).restaurante);
            //console.log(mainView.router.refreshPage());
            $$(".datos_restaurante").html("<h1 style='text-align:center'>"+results.rows.item(0).restaurante+"</h1>"+
            "<div style='background:url(img/especialidad.png)no-repeat,red;width:100%;height:100px;background-size:100% 100%;padding:10px 0'>"+
            "<h2 style='text-align:center'>Especialidad</h2>"+
            "<h3 style='text-align:center; color:#FFFFFF'>"+results.rows.item(0).especialidad+"</h3>"+
            "</div>"+
            "<div><h2 style='text-align:center'>También disfruta...</h2>"+
            "<h3 style='text-align:center' >"+results.rows.item(0).otros+"</h3>"+
            "<p style='padding:0 10px;'>Abierto de: "+results.rows.item(0).horario+"</p>"+
            "<p style='padding:0 10px;'><b><a href='tel:"+results.rows.item(0).telefono1+"'>"+results.rows.item(0).telefono1+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a href='tel:"+results.rows.item(0).telefono2+"'>"+results.rows.item(0).telefono2+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a style='word-wrap: break-word' href='mailto:"+results.rows.item(0).email+"?subject= Solicitud de informacion'>"+results.rows.item(0).email+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a style='word-wrap: break-word' href='#' class='link' onclick=window.open('"+results.rows.item(0).web+"','_blank','location=yes') >"+results.rows.item(0).web+"</a></b></p>"+
            "</div><hr/>"+
            "<div id='reviews'></div>"+
            "<p><a href='#' class='button button-big button-round pb-standalone-captions' >Imagenes</a></p> "+
            "<p><a href='#' id='seetriphotos' class='button button-big button-round active' style='display:none'>Ver imagenes y opiniones de tripadvisor</a></p> "+
            "<p><a href='#' id='writereview' class='button button-big button-round active' style='display:none'>Dejar comentario en tripadvisor</a></p> "+
            "<p>Dirección;"+results.rows.item(0).direccion+"</p>"+
            '<div id="map-canvas" style="width: 100%;height: 50%;"></div>');
            
            var id=results.rows.item(0).tripadvisor;
            if(online==1 && id!=''){                
                $$.getJSON("http:innovaciongubernamental.gob.mx/turismo/app/info.php",{id:id},function(json){
                 console.log(json.write_review);
                 $$("#reviews").html("<h2 style='text-align:center;'>Reseñas de los visitantes</h2><p style='padding:0 10px'>"+json.reviews[0].text+"</p><p style='padding:0 10px'>"+json.reviews[1].text+"</p><p style='padding:0 10px'>"+json.reviews[2].text+"</p>");
                 $$("#seetriphotos").attr('onclick',"window.open('"+json.see_all_photos+"','_blank','location=yes')");
                 $$("#seetriphotos").css('display','block');
                 $$("#writereview").attr('onclick',"window.open('"+json.write_review+"','_blank','location=yes')");
                 $$("#writereview").css('display','block');
                });
            }
            initialize(results.rows.item(0).coordenadas);
            var fotos=[
        {
            url: 'http://lorempixel.com/1024/1024/sports/1/',
            caption: 'Caption 1 Text'
        },
        {
            url: 'http://lorempixel.com/1024/1024/sports/2/',
            caption: 'Second Caption Text'
        },
        // This one without caption
        {
            url: 'http://lorempixel.com/1024/1024/sports/3/',
        },
    ];
            var myPhotoBrowserPopupDark = myApp.photoBrowser({
                swipeToClose:false,
                backLinkText:'',
                ofText:'-',
    photos : fotos,
    theme: 'dark',
    type: 'standalone'
});
$$('.pb-standalone-captions').on('click', function () {
    myPhotoBrowserPopupDark.open();
});
        });
    });

});
function cargar_rest(name){id=name}
