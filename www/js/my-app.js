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
        
        
var idioma="E"
var municipio;
var clima;
var restaurant;//nombre del restaurante
var idrest;//id del restaurante
var id;

//$$('#eng').on('click', function (e) {
//    idioma=$$(this).attr('idioma');
//});
//$$('#esp').on('click', function (e) {
//   idioma=$$(this).attr('idioma'); 
//});
$$(".item-link").on("click",function(e){
    municipio=$$(this).attr('mun');
    clima=$$(this).attr('clima');
    //mainView.load('principal.html');
})


myApp.onPageInit('principal', function (page) {
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM imagen where clave=?',[municipio],
        function(tx,results){
            if(online==1){
$$.get("http:www.tutiempo.net/widget/eltiempo_"+results.rows.item(0).clima, function (json) {
    var link=json.split('"');
  $$(".clima").html('<iframe src="'+link[3]+'" frameborder="0" scrolling="no" width="100%" height="100%" allowtransparency="allowtransparency" style="overflow:hidden;z-index:-2"></iframe>');
});
}
            $$("#municipio_title").html("<img src='www/img/"+results.rows.item(0).imagen+"' style='height:48px;margin:auto;display:block'/>");
            $$("#portada").attr('src','www/img/'+results.rows.item(0).portada);
            
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
             $$("#portada_gas").attr('src','www/img/'+results.rows.item(0).imagen);            
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
myApp.onPageAfterAnimation('restaurantes', function (page) {
    //$$("#name-rest").html(get);
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM gastronomia where id=? ',[id],
        function(tx,results){ 
            
            $$(".datos_restaurante").html("<h1 style='text-align:center'>"+results.rows.item(0).restaurante+"</h1>"+
            "<div style='background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAA4CAIAAABMjOIcAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTNFNkNGNEVFOEVEMTFFMjk3RjlDRDUzREYzNDYxN0QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTNFNkNGNEZFOEVEMTFFMjk3RjlDRDUzREYzNDYxN0QiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBM0U2Q0Y0Q0U4RUQxMUUyOTdGOUNENTNERjM0NjE3RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBM0U2Q0Y0REU4RUQxMUUyOTdGOUNENTNERjM0NjE3RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Po7Rx3gAAAeuSURBVHja7F3Zdts2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)no-repeat,red;width:100%;height:100px;background-size:100% 100%;padding:10px 0'>"+
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
            "<div id='calificaciones'><h2 style='text-align:center;'>Calificación de los visitantes</h2></div>"+
            "<div id='reviews'></div>"+
            "<p><a href='#' id='seetriphotos' class='button button-big button-round active color-green' style='display:none'><i class='flaticon-tripadvisor'></i> Ver imagenes y opiniones</a></p> "+
            "<p>Dirección: "+results.rows.item(0).direccion+"</p>"+
            '<div id="map-canvas" style="width: 100%;height: 50%;"></div>');
            
            var id=results.rows.item(0).tripadvisor;
            if(online==1 && id!=''){                
                $$.getJSON("http:innovaciongubernamental.gob.mx/turismo/app/info.php",{id:id},function(json){
                 for(x=0;x<json.subratings.length;x++){
                    $$("#calificaciones").append("<p style='padding:0 10px;'><img src='"+json.subratings[x].rating_image_url+"'> "+json.subratings[x].localized_name+"</p>"); 
                 }
                 $$("#reviews").html("<h2 style='text-align:center;'>Reseñas de los visitantes</h2><p style='padding:0 10px'>"+json.reviews[0].title+"<br/>"+json.reviews[0].text+"</p><p style='padding:0 10px'>"+json.reviews[1].title+"<br/>"+json.reviews[1].text+"</p><p style='padding:0 10px'>"+json.reviews[2].title+"<br/>"+json.reviews[2].text+"</p>");
                 $$("#seetriphotos").attr('onclick',"window.open('"+json.see_all_photos+"','_blank','location=yes')");
                 $$("#seetriphotos").css('display','block');
                 $$("#writereview").attr('onclick',"window.open('"+json.write_review+"','_blank','location=yes')");
                 $$("#writereview").css('display','block');
                });
            }
            initialize(results.rows.item(0).coordenadas);

        });
    });

});

myApp.onPageInit('actividades', function (page) { 
   // $$("#rest_info").html('');
    db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM portada_div where clave=?',[municipio],
        function(tx,results){ 
             $$("#portada_div").attr('src','www/img/'+results.rows.item(0).imagen);            
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
        tx.executeSql('SELECT * FROM diversion where clave=?',["D"+municipio+idioma],
        function(tx,results){
            var len = results.rows.length;
            var anyArray = new Array(); 
            for(xd=0;xd<len;xd++){
                anyArray.push(xd);
            }
            
            function randOrd(){return (Math.round(Math.random())-0.5); } 
              anyArray.sort( randOrd ); 
                 
            for (var i=1; i<=len; i++){       
            var itemHTML ="<li>"+
                "<a href='info_diversion.html' class='item-link item-content' onclick=cargar_div("+results.rows.item(anyArray[i]).id+") >"+
                "<div class='item-media'><i class='flaticon-climbing5'></i></div>"+
                "<div class='item-inner'>"+
                "<div class='item-title'>"+results.rows.item(anyArray[i]).actividad+"</div>"+
                "</div>"+
                "</a>"+
                "</li>";
                $$('#acti_info').prepend(itemHTML);
                }
            
        });
        
    });
  
});
myApp.onPageAfterAnimation('diversion_places', function (page) {
    //$$("#name-rest").html(get);
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM diversion where id=? ',[id3],
        function(tx,results){ 
            $$(".dive_info").html("<h1 style='text-align:center'>"+results.rows.item(0).actividad+"</h1>"+            
            "<p style='width: 96%;margin:15px auto;text-align: justify;'>"+results.rows.item(0).descripcion+"</p> "+
            "<p style='padding:0 10px;'>Abierto de: "+results.rows.item(0).horario+"</p>"+
            "<p style='padding:0 10px;'><a href='#' class='button button-big button-round active color-orange' id='create-popup'><i class='flaticon-info43'></i> Proveedores de servicios</a></p>"+
            "<p style='padding:0 10px;'><b><a style='word-wrap: break-word' href='#' class='link' onclick=window.open('"+results.rows.item(0).web+"','_blank','location=yes') >"+results.rows.item(0).web+"</a></b></p>"+
            "</div><hr/>"+
            "<div id='reviews'></div>"+
            "<p><a href='#' id='seetriphotos' class='button button-big button-round active color-green' style='display:none'><i class='flaticon-tripadvisor'></i> Ver imagenes y opiniones</a></p> "+
            "<p>Dirección: "+results.rows.item(0).direccion+"</p>"+
            '<div id="map-canvas" style="width: 100%;height: 50%;"></div>');
            
            $$('#create-popup').on('click', function () {
                var acordion='';
                db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM servicios where clave=? and categoria=?',["S"+municipio+idioma,"cat01"],
        function(tx,results){        
            var len = results.rows.length;
            for (var i=0; i<len; i++){ 
            acordion+="<li class='accordion-item'><a href='#' class='item-content item-link'>"+
        "<div class='item-inner'>"+
          "<div class='item-title'>"+results.rows.item(i).servicio+"</div>"+
        "</div></a>"+
      "<div class='accordion-item-content'>"+
        "<div class='content-block'>"+
          "<p style='padding:0 10px;'><b><a href='tel:"+results.rows.item(i).telefono1+"'>"+results.rows.item(i).telefono1+" Ext."+results.rows.item(i).ext1+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a href='tel:"+results.rows.item(i).telefono2+"'>"+results.rows.item(i).telefono2+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a style='word-wrap: break-word' href='mailto:"+results.rows.item(i).email+"?subject= Solicitud de informacion'>"+results.rows.item(i).email+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a style='word-wrap: break-word' href='#' class='link' onclick=window.open('"+results.rows.item(i).web+"','_blank','location=yes') >"+results.rows.item(i).web+"</a></b></p>"+
        "</div>"+
      "</div>"+
    "</li>";    
              } 
               var popupHTML = '<div class="popup">'+
                    '<div class="content-block">'+
                      '<p><a href="#" class="button button-big button-round active color-orange close-popup">Atras</a></p>'+
                      "<div class='content-block-title'>Proveedores de servicios</div>"+
                        "<div class='list-block accordion-list'>"+
                          "<ul>"+acordion+"</ul>"+
                        "</div>"+
                    '</div>'+
                  '</div>'
                  
                  myApp.popup(popupHTML);
              });         
            });
             
 
  
});
            initialize(results.rows.item(0).coordenadas);
           
            
        });
    });

});



myApp.onPageInit('historicos', function (page) { 
   // $$("#rest_info").html('');
    db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM portada_his where clave=?',[municipio],
        function(tx,results){ 
             $$("#portada_his").attr('src','www/img/'+results.rows.item(0).imagen);            
            });
        });
     db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM desimghis where clave=?',["DH"+municipio+idioma],
        function(tx,results){
            
             $$("#deshis").text(results.rows.item(0).descripcion);            
            });
        });
        
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM historicos where clave=?',["H"+municipio+idioma],
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
                "<a href='info_historicos.html' class='item-link item-content' onclick=cargar_his("+results.rows.item(anyArray[i]).id+") >"+
                "<div class='item-media'><i class='flaticon-greece1'></i></div>"+
                "<div class='item-inner'>"+
                "<div class='item-title'>"+results.rows.item(anyArray[i]).lugar+"</div>"+
                "</div>"+
                "</a>"+
                "</li>";
                $$('#his_info').prepend(itemHTML);
                }            
        });        
    });  
});
myApp.onPageAfterAnimation('historical_places', function (page) {
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM historicos where id=? ',[id1],
        function(tx,results){             
            $$(".datos_historicos").html("<h1 style='text-align:center'>"+results.rows.item(0).lugar+"</h1>"+
            "<p style='width: 96%;margin:15px auto;text-align: justify;'>"+results.rows.item(0).descripcion+"</p> "+
            "<p style='padding:0 10px;'>Abierto de: "+results.rows.item(0).horario+"</p>"+
            "<p style='padding:0 10px;'><b><a style='word-wrap: break-word' href='#' class='link' onclick=window.open('"+results.rows.item(0).web+"','_blank','location=yes') >"+results.rows.item(0).web+"</a></b></p>"+
            "</div><hr/>"+
            "<div id='reviews'></div>"+
            "<p><a href='#' id='seetriphotos' class='button button-big button-round active color-green' style='display:none'><i class='flaticon-tripadvisor'></i>Ver imagenes y opiniones</a></p> "+
            "<p>Dirección: "+results.rows.item(0).direccion+"</p>"+
            '<div id="map-canvas" style="width: 100%;height: 50%;"></div>');
    
            initialize(results.rows.item(0).coordenadas);

        });
    });

});


myApp.onPageInit('hoteles', function (page) {
    $$("#list_hotels").html('');
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM hoteles where clave=?',["HT"+municipio+idioma],
        function(tx,results){            
            var th = results.rows.length;
            var anyArray = new Array(); 
            for(xd=0;xd<th;xd++){
                anyArray.push(xd);
            }      
                
            function randOrd(){return (Math.round(Math.random())-0.5); } 
              anyArray.sort( randOrd );       
            for (var i=0; i<th; i++){
                var estrellas='';
                
                if(results.rows.item(anyArray[i]).estrellas.length>1){
                estrellas="<span>"+results.rows.item(anyArray[i]).estrellas+"</span>";
            }else{
           for(var x=0; x<results.rows.item(anyArray[i]).estrellas; x++){
                    estrellas +="<img src='www/img/estrella.png' />";
                }
                }
                var itemHTML ="<li><a href='info_hotel.html' class='item-link item-content' onclick=cargar_hot("+results.rows.item(anyArray[i]).id+")>"+
        "<div class='item-inner'>"+
          "<div class='item-title-row'>"+
            "<div class='item-title'></div>"+
            "<div class='item-after'>"+estrellas+"</div>"+
          "</div>"+
          "<div class='item-subtitle'>"+results.rows.item(anyArray[i]).hotel+"</div>"+
        "</div>"+
    "</a></li>";//) ;
    $$("#list_hotels").prepend(itemHTML);
                }  
        });
        });
        });
myApp.onPageAfterAnimation('hotel', function (page) {
    //$$("#name-rest").html(get);
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM hoteles where id=? ',[id2],
        function(tx,results){ 
            var estrellas='';
            if(results.rows.item(0).estrellas.length>1){
                estrellas="<span>"+results.rows.item(0).estrellas+"</span>";
            }else{
            for(var x=0; x<results.rows.item(0).estrellas; x++){
                    estrellas +="<img src='www/img/estrella.png' />";
                }
                }
            //$$("#name-rest").html(results.rows.item(0).restaurante);
            //console.log(mainView.router.refreshPage());
            $$(".datos_hotel").html("<h1 style='text-align:center'>"+results.rows.item(0).hotel+"</h1>"+
            "<h2 style='text-align:center'>"+results.rows.item(0).habitaciones+" Habitaciones</h2>"+
            "</div>"+
            "<h3 style='text-align:center' >"+estrellas+"</h3>"+
            "<p style='padding:0 10px;'><b><a href='tel:"+results.rows.item(0).telefono1+"'>"+results.rows.item(0).telefono1+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a href='tel:"+results.rows.item(0).telefono2+"'>"+results.rows.item(0).telefono2+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a style='word-wrap: break-word' href='mailto:"+results.rows.item(0).email+"?subject= Solicitud de informacion'>"+results.rows.item(0).email+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a style='word-wrap: break-word' href='#' class='link' onclick=window.open('"+results.rows.item(0).web+"','_blank','location=yes') >"+results.rows.item(0).web+"</a></b></p>"+
            "</div><hr/>"+
            "<div id='calificaciones'><h2 style='text-align:center;'>Calificación de los visitantes</h2></div>"+
            "<div id='reviews'></div>"+
            "<p><a href='#' id='seetriphotos' class='button button-big button-round active color-green' style='display:none'><i class='flaticon-tripadvisor'></i>Ver imagenes y opiniones</a></p> "+
            "<p>Dirección: "+results.rows.item(0).direccion+"</p>"+
            '<div id="map-canvas" style="width: 100%;height: 50%;"></div>');
            var id=results.rows.item(0).tripadvisor;
            if(online==1 && id!=''){          
                $$.getJSON("http:innovaciongubernamental.gob.mx/turismo/app/info.php",{id:id},function(json){
                 for(x=0;x<json.subratings.length;x++){
                    $$("#calificaciones").append("<p style='padding:0 10px;'><img src='"+json.subratings[x].rating_image_url+"'> "+json.subratings[x].localized_name+"</p>"); 
                 }
                 
                 $$("#reviews").html("<h2 style='text-align:center;'>Reseñas de los visitantes</h2><p style='padding:0 10px'>"+json.reviews[0].title+"<br/>"+json.reviews[0].text+"</p><p style='padding:0 10px'>"+json.reviews[1].title+"<br/>"+json.reviews[1].text+"</p><p style='padding:0 10px'>"+json.reviews[2].title+"<br/>"+json.reviews[2].text+"</p>");
                 $$("#seetriphotos").attr('onclick',"window.open('"+json.see_all_photos+"','_blank','location=yes')");
                 $$("#seetriphotos").css('display','block');
                 $$("#writereview").attr('onclick',"window.open('"+json.write_review+"','_blank','location=yes')");
                 $$("#writereview").css('display','block');
                });
            }
            initialize(results.rows.item(0).coordenadas);

        });
    });

});


myApp.onPageAfterAnimation('undia', function (page) {
    $$("#list_day").html('');
    db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM desimgdia where clave=?',["DA"+municipio+idioma],
        function(tx,results){ 
             $$("#portada_undia").attr('src','www/img/'+results.rows.item(0).imagen); 
             $$("#pp").html("<div class='content-block-title'>"+results.rows.item(0).titulo+"</div>");           
            });
        });
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM undia where clave=?',["A"+municipio+idioma],
        function(tx,results){ 
            var len = results.rows.length;
            for (var i=0; i<=len; i++){ 
            $$("#list_day").append("<li>"+
        "<div class='item-inner'>"+
          "<div class='item-title-row'>"+
            "<div class='item-title'></div>"+
            "<div class='item-after'>"+results.rows.item(i).hora+"</div>"+
          "</div>"+
          "<div class='item-subtitle'>"+results.rows.item(i).actividad+"</div>"+
        "</div>"+
    "</li>") ;
}          
            });
        }); 
         
});

//servicios
myApp.onPageAfterAnimation('servicios', function (page) {
    $$("#accord1").html('');
    $$("#accord2").html('');
    $$("#accord3").html('');
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM servicios where clave=? and categoria=?',["S"+municipio+idioma,'cat01'],
        function(tx,results){ 
            var len = results.rows.length;
            for (var i=0; i<=len; i++){ 
            $$("#accord1").append("<li>"+
                "<a href='info_servicio.html' class='item-link item-content' onclick=cargar_serv("+results.rows.item(i).id+") >"+
                "<div class='item-media'><i class='flaticon-call37'></i></div>"+
                "<div class='item-inner'>"+
                "<div class='item-title'>"+results.rows.item(i).servicio+"</div>"+
                "</div>"+
                "</a>"+
                "</li>") ;
}          
            });
        }); 
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM servicios where clave=? and categoria=?',["S"+municipio+idioma,'cat02'],
        function(tx,results){ 
            var len = results.rows.length;
            for (var i=0; i<=len; i++){ 
            $$("#accord2").append("<li>"+
                "<a href='info_servicio.html' class='item-link item-content' onclick=cargar_serv("+results.rows.item(i).id+") >"+
                "<div class='item-media'><i class='flaticon-transport533'></i></div>"+
                "<div class='item-inner'>"+
                "<div class='item-title'>"+results.rows.item(i).servicio+"</div>"+
                "</div>"+
                "</a>"+
                "</li>") ;
}          
            });
        });
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM servicios where clave=? and categoria=?',["S"+municipio+idioma,'cat03'],
        function(tx,results){ 
            var len = results.rows.length;
            for (var i=0; i<=len; i++){ 
            $$("#accord3").append("<li>"+
                "<a href='info_servicio.html' class='item-link item-content' onclick=cargar_serv("+results.rows.item(i).id+") >"+
                "<div class='item-media'><i class='flaticon-car223'></i></div>"+
                "<div class='item-inner'>"+
                "<div class='item-title'>"+results.rows.item(i).servicio+"</div>"+
                "</div>"+
                "</a>"+
                "</li>") ;
}          
            });
        });
         
});
myApp.onPageAfterAnimation('servicios_places', function (page) {
    //$$("#name-rest").html(get);
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM servicios where id=? ',[id4],
        function(tx,results){ 
            //console.log("corriendo "+results.rows.item(0).servicio);
            $$(".serv_info").html("<h1 style='text-align:center'>"+results.rows.item(0).servicio+"</h1>"+
            "<p style='padding:0 10px;'>Abierto de: "+results.rows.item(0).horario+"</p>"+
            "<hr/>"+
            "<p style='padding:0 10px;'><b><a href='tel:"+results.rows.item(0).telefono1+"'>"+results.rows.item(0).telefono1+" Ext."+results.rows.item(0).ext1+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a href='tel:"+results.rows.item(0).telefono2+"'>"+results.rows.item(0).telefono2+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a style='word-wrap: break-word' href='mailto:"+results.rows.item(0).email+"?subject= Solicitud de informacion'>"+results.rows.item(0).email+"</a></b></p>"+
            "<p style='padding:0 10px;'><b><a style='word-wrap: break-word' href='#' class='link' onclick=window.open('"+results.rows.item(0).web+"','_blank','location=yes') >"+results.rows.item(0).web+"</a></b></p>"+
            
            "<p>Dirección: "+results.rows.item(0).direccion+"</p>"+
            '<div id="map-canvas" style="width: 100%;height: 50%;"></div>');
    
            initialize(results.rows.item(0).coordenadas);
           
            
        });
    });

});

function cargar_rest(name){id=name}
function cargar_his(name){id1=name}
function cargar_hot(name){id2=name}
function cargar_div(name){id3=name}
function cargar_serv(name){id4=name}