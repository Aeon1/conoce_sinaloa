  document.addEventListener("deviceready", onDeviceReady, false);
  var db = window.openDatabase("Database", "1.0", "Cordova Demo", 1000000);
  function onDeviceReady() {
        db.transaction(populateDB);         
        checkConnection(); 
        
 }



 var online;
 function checkConnection() {
        var networkState = navigator.network.connection.type;
        var states = {};
    states[Connection.UNKNOWN]  = '1';
    states[Connection.ETHERNET] = '1';
    states[Connection.WIFI]     = '1';
    states[Connection.CELL_2G]  = '1';
    states[Connection.CELL_3G]  = '1';
    states[Connection.CELL_4G]  = '1';
    states[Connection.NONE]     = '0';
    online=states[networkState];
    if (online=='0'){showAlert();}else{
        db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM version',[],
        function(tx,results){
            var len = results.rows.length;
            //alert("se verifico la tabla version");
            if(len!=0){
                for(n=0;n<len;n++){
                   var tabla=results.rows.item(n).tabla;
                                       
$$.post('http://innovaciongubernamental.gob.mx/turismo/app/checar.php', {version: results.rows.item(n).version, tabla: results.rows.item(n).tabla },
 function (data) { 
    var datos=JSON.parse(data);
    if(datos.length>0){
         db.transaction(
        function(tx) {
 	if(datos[0]=="diversion"){
                tx.executeSql('DROP TABLE IF EXISTS diversion');
                tx.executeSql('CREATE TABLE IF NOT EXISTS diversion(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,codigo,actividad,horario,direccion,contacto,telefono1,telefono2,email,web,coordenadas,descripcion)'); 
            }else if(datos[0]=="gastronomia"){
                tx.executeSql('DROP TABLE IF EXISTS gastronomia');
                tx.executeSql('CREATE TABLE IF NOT EXISTS gastronomia(id INTEGER PRIMARY KEY AUTOINCREMENT,tripadvisor, clave, codigo, restaurante, direccion, coordenadas, horario, telefono1, telefono2, email, web, especialidad, otros)'); 
            }else if(datos[0]=='historicos'){ 
                tx.executeSql('DROP TABLE IF EXISTS historicos');
                tx.executeSql('CREATE TABLE IF NOT EXISTS historicos(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,codigo,lugar,horario,direccion,coordenadas,web,descripcion)');
            }else if(datos[0]=='hoteles'){
                tx.executeSql('DROP TABLE IF EXISTS hoteles');
                tx.executeSql('CREATE TABLE IF NOT EXISTS hoteles(id INTEGER PRIMARY KEY AUTOINCREMENT,tripadvisor,clave,codigo,hotel,direccion,telefono1,telefono2,email,web,estrellas,habitaciones,coordenadas)');
            }else if(datos[0]=="servicios"){ 
                tx.executeSql('DROP TABLE IF EXISTS servicios'); 
                tx.executeSql('CREATE TABLE IF NOT EXISTS servicios(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,categoria,codigo,servicio,contacto,telefono1,ext1,telefono2,ext2,horario,direccion,coordenadas,email,web)');
            }                    
        for(x=1;x<datos.length;x++){ 
           tx.executeSql(datos[x]);             
             }
          });
    }
});
                }                
            }else{  
tx.executeSql('INSERT INTO version(version,tabla) VALUES(?,?)',['0','diversion']);
tx.executeSql('INSERT INTO version(version,tabla) VALUES(?,?)',['0','gastronomia']);
tx.executeSql('INSERT INTO version(version,tabla) VALUES(?,?)',['0','historicos']);
tx.executeSql('INSERT INTO version(version,tabla) VALUES(?,?)',['0','hoteles']);
tx.executeSql('INSERT INTO version(version,tabla) VALUES(?,?)',['0','servicios']);
//alert("se inserto un registro en la tabla version");
tx.executeSql('SELECT * FROM version',[],
        function(tx,results){
            var len = results.rows.length;
            for(n=0;n<len;n++){
                   var tabla=results.rows.item(n).tabla;
                                       
$$.post('http://innovaciongubernamental.gob.mx/turismo/app/checar.php', {version: results.rows.item(n).version, tabla: results.rows.item(n).tabla },
 function (data) { 
    var datos=JSON.parse(data);
    if(datos.length>0){
         db.transaction(
        function(tx) {
 	if(datos[0]=="diversion"){
                tx.executeSql('DROP TABLE IF EXISTS diversion');
                tx.executeSql('CREATE TABLE IF NOT EXISTS diversion(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,codigo,actividad,horario,direccion,contacto,telefono1,telefono2,email,web,coordenadas,descripcion)'); 
            }else if(datos[0]=="gastronomia"){
                tx.executeSql('DROP TABLE IF EXISTS gastronomia');
                tx.executeSql('CREATE TABLE IF NOT EXISTS gastronomia(id INTEGER PRIMARY KEY AUTOINCREMENT,tripadvisor, clave, codigo, restaurante, direccion, coordenadas, horario, telefono1, telefono2, email, web, especialidad, otros)'); 
            }else if(datos[0]=='historicos'){ 
                tx.executeSql('DROP TABLE IF EXISTS historicos');
                tx.executeSql('CREATE TABLE IF NOT EXISTS historicos(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,codigo,lugar,horario,direccion,coordenadas,web,descripcion)');
            }else if(datos[0]=='hoteles'){
                tx.executeSql('DROP TABLE IF EXISTS hoteles');
                tx.executeSql('CREATE TABLE IF NOT EXISTS hoteles(id INTEGER PRIMARY KEY AUTOINCREMENT,tripadvisor,clave,codigo,hotel,direccion,telefono1,telefono2,email,web,estrellas,habitaciones,coordenadas)');
            }else if(datos[0]=="servicios"){ 
                tx.executeSql('DROP TABLE IF EXISTS servicios'); 
                tx.executeSql('CREATE TABLE IF NOT EXISTS servicios(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,categoria,codigo,servicio,contacto,telefono1,ext1,telefono2,ext2,horario,direccion,coordenadas,email,web)');
            }                    
        for(x=1;x<datos.length;x++){ 
           tx.executeSql(datos[x]);             
             }
          });
    }
});
                }
            });
}
        });
    });
    }
    }
function transaction_error(tx, error) {
    console.log(error); 
}
        
function showAlert() {
    navigator.notification.alert(
    'Algunas caracteristicas no estaran disponibles',
    '',
    'Sin internet',
    'Cerrar'
    );
    }


function populateDB(tx) { 
//    tx.executeSql('DROP TABLE IF EXISTS version');
//    tx.executeSql('DROP TABLE IF EXISTS menu');
//    tx.executeSql('DROP TABLE IF EXISTS portada');
// 	tx.executeSql('DROP TABLE IF EXISTS gastronomia');
//    tx.executeSql('DROP TABLE IF EXISTS diversion');
//    tx.executeSql('DROP TABLE IF EXISTS emergencia');
//    tx.executeSql('DROP TABLE IF EXISTS historicos');
//   tx.executeSql('DROP TABLE IF EXISTS undia');
    tx.executeSql('DROP TABLE IF EXISTS portada_div');
    tx.executeSql('DROP TABLE IF EXISTS portada_his');
//    tx.executeSql('DROP TABLE IF EXISTS hoteles');
//    tx.executeSql('DROP TABLE IF EXISTS desimggas');
//    tx.executeSql('DROP TABLE IF EXISTS desimghis');
//    tx.executeSql('DROP TABLE IF EXISTS desimgdia');
    tx.executeSql('DROP TABLE IF EXISTS portada_gas');
//    tx.executeSql('DROP TABLE IF EXISTS imagen');
    tx.executeSql('CREATE TABLE IF NOT EXISTS version(id INTEGER PRIMARY KEY AUTOINCREMENT,version,tabla)');
   tx.executeSql('CREATE TABLE IF NOT EXISTS imagen(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,imagen,portada,clima)');
   //tx.executeSql('CREATE TABLE IF NOT EXISTS portada(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,imagen)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS menu(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,imagen)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS portada_gas(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,imagen)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS portada_div(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,imagen)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS portada_his(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,imagen)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS desimggas(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,descripcion TEXT)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS gastronomia(id INTEGER PRIMARY KEY AUTOINCREMENT,tripadvisor,clave,codigo,restaurante,direccion,coordenadas,horario,telefono1,telefono2,email,web,especialidad,otros)'); 
    tx.executeSql('CREATE TABLE IF NOT EXISTS desimghis(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,descripcion TEXT)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS desimgdia(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,titulo,imagen)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS undia(id INTEGER PRIMARY KEY AUTOINCREMENT,clave,hora,actividad)');

////////imagen de titulo
 db.transaction( 
        function(tx) {
        tx.executeSql('SELECT * FROM imagen',[],
        function(tx,results){
            var len = results.rows.length; 
            if(len!=0){
                //alert("datos cargados");
            }else{
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['01','ahome/titulo.jpg','ahome/portada.jpg','RyBkEkkEEffcdQGA7AqzjzjjDWlALfI16jhjxjcikEe']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['02','angostura/titulo.jpg','angostura/portada.jpg','tChkk1kEkBUc88IU7AqzjjDzzWuU1zD16jhjBDZyE1e']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['03','badiraguato/titulo.jpg','badiraguato/portada.jpg','vCeEEEEkEMrBnQGKKfqjDzzDDWaK1ptEpzhzxjZiEku']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['04','concordia/titulo.jpg','concordia/portada.jpg','RihE1kEkkBB9YFsUKAVjzjDDzWnUTz11JzxDxzsC11W']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['05','cosala/titulo.jpg','cosala/portada.jpg','vCBEEkE1kCjBEFGA7AqjDjzzjWaALf11JjxzxzsyEEu']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['06','culiacan/titulo.jpg','culiacan/portada.jpg','vihEEE1k1B8BYFhU7fVDjjDzD6aU1zWE6zhjhDciE1W']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['07','choix/titulo.jpg','choix/portada.jpg','tCeEk1kkknKa4FhK7AVjjjjzD6uK1pl1JjBDxzsyk1W']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['08','elota/titulo.jpg','elota/portada.jpg','Ryh11kkk18U9YFsUjfqDjjzzjWlUMzz1pjxzxjciEkW']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['09','escuinapa/titulo.jpg','escuinapa/portada.jpg','tCBEkkEkEhA9EehAKfVzjjzDDWuATfd1pzhjhjsik1W']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['10','el_fuerte/titulo.jpg','el_fuerte/portada.jpg','Rie11EEkkrrB48hK7AqDzDjzD6aK1pM1pDxDBzZCEke']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['11','guasave/titulo.jpg','guasave/portada.jpg','vihE1kkEkcY9Y8GUjAVzzzzzzWuULz8EpzBDxjcCkkW']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['12','mazatlan/titulo.jpg','mazatlan/portada.jpg','vihk1k11kaDBYFsUKAqjDjzjD6uULzzkJjBDBzcC11W']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['13','mocorito/titulo.jpg','mocorito/portada.jpg','RCe1EE1EEQMc4esKKAVjjDDjDWaK1pQE6jhjBjZC11W']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['14','el_rosario/titulo.jpg','el_rosario/portada.jpg','tieEEkkkEtSc4eGKjfqjDzzjzWlKLpM1pzBjhjsyEku']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['15','salvador_alvarado/titulo.jpg','salvador_alvarado/portada.jpg','Rih1kkkkkaYaYeGUKfVDzjzzz6lUMz8kJDhjxDZyEke']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['16','san_ignacio/titulo.jpg','san_ignacio/portada.jpg','vihkEkkE1a1aYeIU7AVzzDjjz6nUMzD1pDxjxDcC11u']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['17','sinaloa_de_leyva/titulo.jpg','sinaloa_de_leyva/portada.jpg','RCekk1EEkQ4Bp8sKKfVjjjjDjWlKMplEpzhDBzZykkW']);
tx.executeSql('INSERT INTO imagen(clave,imagen,portada,clima) VALUES(?,?,?,?)',['18','navolato/titulo.jpg','navolato/portada.jpg','vCeEE1E11KQc48GK7fVzzDzjzWlKTpQkpzhzBDsCkku']);
}
        });
    });
db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM menu',[],
        function(tx,results){
            var len = results.rows.length;
            if(len!=0){
            //alert("datos cargados");
            }else{
        tx.executeSql('INSERT INTO menu(clave,imagen) VALUES(?,?)',['m1','iVBORw0KGgoAAAANSUhEUgAAAQYAAAEGCAIAAAAIV6xrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEE0QzFGREE2MUY0MTFFMzgwRUVGNTk0RUJGNjA5RTUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEE0QzFGREI2MUY0MTFFMzgwRUVGNTk0RUJGNjA5RTUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QTRDMUZEODYxRjQxMUUzODBFRUY1OTRFQkY2MDlFNSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QTRDMUZEOTYxRjQxMUUzODBFRUY1OTRFQkY2MDlFNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpfyqZUAAAxUSURBVHja7N1rbFvl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']);
        tx.executeSql('INSERT INTO menu(clave,imagen) VALUES(?,?)',['m2','iVBORw0KGgoAAAANSUhEUgAAAQYAAAEGCAIAAAAIV6xrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUUxNDVFMjU2MUY0MTFFM0I0NjM5RTIzNjE1OEFCN0QiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUUxNDVFMjY2MUY0MTFFM0I0NjM5RTIzNjE1OEFCN0QiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRTE0NUUyMzYxRjQxMUUzQjQ2MzlFMjM2MTU4QUI3RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRTE0NUUyNDYxRjQxMUUzQjQ2MzlFMjM2MTU4QUI3RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtegHd8AABN1SURBVHja7N1ZjBz1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']); 
        tx.executeSql('INSERT INTO menu(clave,imagen) VALUES(?,?)',['m3','iVBORw0KGgoAAAANSUhEUgAAAQYAAAEGCAYAAACHNTs8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjM1NDM1MDg2MUY0MTFFM0FBN0NBNzkyQkRCNzdCRDAiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjM1NDM1MDk2MUY0MTFFM0FBN0NBNzkyQkRCNzdCRDAiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MzU0MzUwNjYxRjQxMUUzQUE3Q0E3OTJCREI3N0JEMCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MzU0MzUwNzYxRjQxMUUzQUE3Q0E3OTJCREI3N0JEMCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpWcX3IAABGCSURBVHja7N15bJvn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']); 
        tx.executeSql('INSERT INTO menu(clave,imagen) VALUES(?,?)',['m4','iVBORw0KGgoAAAANSUhEUgAAAQYAAAEGCAIAAAAIV6xrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OEJDQTU3RTEzQUFBMTFFNDhGOUZFMjA1MUFCNzU2MjYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OEJDQTU3RTIzQUFBMTFFNDhGOUZFMjA1MUFCNzU2MjYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4QkNBNTdERjNBQUExMUU0OEY5RkUyMDUxQUI3NTYyNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4QkNBNTdFMDNBQUExMUU0OEY5RkUyMDUxQUI3NTYyNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PmiGj6EAAA7JSURBVHja7N15UFT3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']); 
        tx.executeSql('INSERT INTO menu(clave,imagen) VALUES(?,?)',['m5','iVBORw0KGgoAAAANSUhEUgAAAQYAAAEGCAIAAAAIV6xrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RUMwNDNENjg2MUY0MTFFMzgzMzhGOUE1OUEwMkI0RjEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RUMwNDNENjk2MUY0MTFFMzgzMzhGOUE1OUEwMkI0RjEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpFQzA0M0Q2NjYxRjQxMUUzODMzOEY5QTU5QTAyQjRGMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpFQzA0M0Q2NzYxRjQxMUUzODMzOEY5QTU5QTAyQjRGMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pn6xWGkAACDWSURBVHja7J0JWFvX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']); 
        tx.executeSql('INSERT INTO menu(clave,imagen) VALUES(?,?)',['m6','iVBORw0KGgoAAAANSUhEUgAAAQYAAAEGCAIAAAAIV6xrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUYzMEJENEFGQUZBMTFFMzhGNDNBMUM4OEY3Q0ZDN0IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUYzMEJENEJGQUZBMTFFMzhGNDNBMUM4OEY3Q0ZDN0IiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5RjMwQkQ0OEZBRkExMUUzOEY0M0ExQzg4RjdDRkM3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5RjMwQkQ0OUZBRkExMUUzOEY0M0ExQzg4RjdDRkM3QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PixK4hoAAAngSURBVHja7N1/bJR3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']);    
}
        });
    }); 
//imagenes de portada de gastronomia
db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM portada_gas',[],
        function(tx,results){
            var len = results.rows.length;
            if(len!=0){
                //alert("datos cargados");
            }else{
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['01','ahome/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['02','angostura/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['03','badiraguato/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['04','concordia/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['05','cosala/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['06','culiacan/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['07','choix/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['08','elota/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['09','escuinapa/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['10','el_fuerte/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['11','guasave/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['12','mazatlan/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['13','mocorito/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['14','el_rosario/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['15','salvador_alvarado/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['16','san_ignacio/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['17','sinaloa_de_leyva/gastronomia.jpg']);
        tx.executeSql('INSERT INTO portada_gas(clave,imagen) VALUES(?,?)',['18','navolato/gastronomia.jpg']);
        }
        });
    });  
     db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM desimggas',[],
        function(tx,results){
            var len = results.rows.length;
            if(len!=0){
                //alert("datos cargados");
            }else{
//descripciones e imagenes gastronomia completo
tx.executeSql('INSERT INTO desimggas(clave,descripcion) VALUES(?,?)',['DG01E','Los Mochis cuenta con los mejores mariscos de la región, entre ellos el camarón, pescado zarandeado, callos de hacha, por su cercanía a la costa. Además contamos con comida típica como Barbacoa, Coricos, Pan de mujer, entre otros. Ahome se distingue por su gastronomía.']);
}
        });

    }); 
db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM gastronomia',[],
        function(tx,results){
            var len = results.rows.length;
            if(len!=0){
                //alert("datos cargados");
            }else{
//nombre, descripciones, etc... de restaurantes
}
        });

    }); 
//imagenes de portada de diversion
db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM portada_div',[],
        function(tx,results){
            var len = results.rows.length;
            if(len!=0){
                //alert("datos cargados");
            }else{
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['01','ahome/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['02','angostura/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['03','badiraguato/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['04','concordia/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['05','cosala/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['06','culiacan/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['07','choix/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['08','elota/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['09','escuinapa/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['10','el_fuerte/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['11','guasave/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['12','mazatlan/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['13','mocorito/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['14','el_rosario/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['15','salvador_alvarado/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['16','san_ignacio/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['17','sinaloa_de_leyva/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_div(clave,imagen) VALUES(?,?)',['18','navolato/actividades.jpg']);
        }
        });
    });
    
    
    
//imagenes de portada de historicos
db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM portada_his',[],
        function(tx,results){
            var len = results.rows.length;
            if(len!=0){
                //alert("datos cargados");
            }else{
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['01','ahome/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['02','angostura/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['03','badiraguato/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['04','concordia/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['05','cosala/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['06','culiacan/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['07','choix/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['08','elota/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['09','escuinapa/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['10','el_fuerte/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['11','guasave/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['12','mazatlan/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['13','mocorito/actividades.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['14','el_rosario/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['15','salvador_alvarado/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['16','san_ignacio/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['17','sinaloa_de_leyva/historicos.jpg']);
        tx.executeSql('INSERT INTO portada_his(clave,imagen) VALUES(?,?)',['18','navolato/historicos.jpg']);
        }
        });
    });
 db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM desimghis',[],
        function(tx,results){
            var len = results.rows.length;
            if(len!=0){
                //alert("datos cargados");
            }else{
//descripciones e imagenes historicos completo
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH01E','A pesar de su corta edad, Los Mochis cuenta con lugares históricos donde podemos encontrar evidencia de la gran historia de la ciudad, como el Ingenio Azucarero que es básicamente el motivo de creación de la ciudad, el jardín botánico casa y patio de diversión del fundador de la ciudad Benjamín F. Johnston, estamos seguro de que les va a encantar, Descúbralo']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH02E','En 1916 Angostura nace como municipio por la importancia económica que había logrado por medio de su agricultura. El General Angel Flores, gobernador del estado, apoyó la solicitud de los vecinos que querían formar su propio municipio y dejar de pertenecer a la directoría de Mocorito.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH03E','Son muchos los lugares donde la historia de este municipio se encuentra reflejada, sus emblematicos ediificios y hasta sus historicos panetones , hacen que la gente se enamore de esa pequeña region de la sierra.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH04E','Al este de Mazatlán, a raíz de las vetas de oro y plata quese descubrieran en la región, en 1565 fue fundado este pueblo como Villa de San Sebastián. Colmado de episodios que evidencian su estratégica importancia en el pasado, hoy CONCORDIA es la viva imagen del lugar que se esmera por cautivar con su añeja arquitectura, tradiciónes y recursos naturales.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH05E','La arquitectura del pueblo de cosalá se mantiene en un 90 % original y en ella no existe manipulación en las edificaciones construidas actualmente.Se dice que surgue de la naturaleza y que se integra perfectamente a ella.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH06E','A pesar de haberse fundado en el siglo XVI 29 de Septiembre de 1531 por Nuño de Beltrán de Guzmán, tuvo que esperar tres siglos más, para llegar a la categoría de ciudad y adquirir la fisonomía realmente urbana. Los tiempos coloniales no fueron benignos para el desarrollo; muy lejos del centro político de la Nueva España, perteneciente a la Nueva Galicia pero marginada de sus beneficios, era sólo lugar de paso eventual.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH07E','Debido a su geografía, historia y cultura cuentan con diversas actividades que involucran las tradiciones y costumbres de su gente.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH08E','En la tipología formal de la arquitectura construida durante el periodo novohispano de Elota, se destacan variantes del Barroco tales como, Purista, Inter estípite y Neostilo.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH09E','El centro urbano de Escuinapa transmite la sencillez y empatía de su gente, su carácter afable y ese acento característico al hablar. Es muy recomendable pasear por sus calles en bicicleta, uno de los medios de transporte más populares y conocer de cerca los más bellos rincones.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH10E','El centro histórico de El Fuerte es una bella muestra de la arquitectura colonial del siglo XIX, caracterizado por el trazo ordenado de sus calles, edificios de muros lisos rematados por cornisas, casas de ventanas simétricas y enmarcadas con portadas de estilo neoclásico. Se puede observar estos diferentes atractivos en el Mural del Palacio Municipal, Plaza de Armas, Iglesia Sagrado Corazón de Jesús, Los Portales, Casa de La Cultura o Casa de La Bóveda, Casa del Constituyente, Museo El Fuerte-Mirador, Mansión Orrantia y el Callejón del Burro.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH11E','Guasave por ser un municipio líder en la producción de alimentos ofrece una amplia oferta gastronómica en la que destacan los pescados y mariscos, teniendo como ejemplo: los chicharrones, zarandeado, aguachiles y ceviche, también cuenta con una variedad de platillos típicos como tamales, gallina pinta y barbacoa, entre otros, siendo la gastronomía un elemento fundamental en la cultura Guasavense.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH12E','En la gastronomía mazatleca abundan ingredientes procedentes del mar de la más alta calidad, creando exquisitos y auténticos platillos conocidos en todo el mundo, como el aguachile de camarón, callo de hacha y su famoso pescado zarandeado.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH13E','Mocorito, "La Atenas de Sinaloa", es una crónica que da testimonio de acontecimientos, personajes,costumbres,cultura e historia; sin faltar la gastronomía que es una de las más ricas y variadas de la Región del Évora. Cuna del chilorio, de la carne machaca, jamoncillos, palomas y una gama muy diversa de sabores que conquista con la magia de sus ingredientes hasta el paladar mas exigente.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH14E','En El Rosario se puede disfrutar una gran variedad de platillos que hacen vibrar al más exigente de los paladares. La cocina sinaloense es reconocida por su exquisito sazón y singular sabor. No hay nada igual, y es que, para creerlo, hay que probarlo. Pudiendo destacar el chorizo, el pozole rojo, el asado a la plaza, tamales salados y dulces, tacos dorados y jamoncillos, sin dejar de lado el refresco Toni Col, refresco típico y único, sabor vainilla 100% rosarense.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH15E','El platillo denominado la cazuela, pollos asados a la leña; los tamales de puerco y elote; el chilorio; la comida elaborada con base en pescados y mariscos como los famosos callos de hacha; la machaca de camarón y de marlin y el pescado zarandeado. Son tradicionales los tacos de carne asada. Dulces: Arroz con leche, pipitorias y capirotada.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH16E','San Ignacio, considerado como la gastronomía mestiza, pues sus platillos son a base de carne de res, cerdo y venado, además de productos lácteos como queso asadero, jocoque y natas. No hay visitante que no se vaya encantado de San Ignacio con el asado de res, los taquitos dorados, las gorditas, el cocido y los mariscos, sin perdonar lo dulce del jamoncillo, las conservas de frutas y la calabaza enmielada.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH17E','Sinaloa de Leyva es reconocida en su gastronomía por su gran variedad de platillos autóctonos como quelites con queso, calabacitas en colachi y el guaca baque, pozole, menudo etc. Sin duda un manjar para aquellas personas que visiten este encantador pueblo señorial.']);
tx.executeSql('INSERT INTO desimghis(clave,descripcion) VALUES(?,?)',['DH18E','Navolato cuenta con una gran variedad de platillos elaborados con productos del mar de la región como son los marlín, camarón, machaca de pescado, jaiba, almeja, almeja amarilla, callo de lobina, callo de hacha entre muchos más. Entre los postres tenemos las cocadas, jamoncillos, pan de mujer, tacuarines, y los tradicionales churros.']);

}
        });

    }); 
    
    
       
db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM desimgdia',[],
        function(tx,results){
            var len = results.rows.length;
            if(len!=0){
                //alert("datos cargados");
            }else{
////descripciones e imagenes un dia completo
/* ahome */tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA01E','Un día en Ahome','ahome/24horas.jpg']);
/*angostura*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA02E','Un día en Angostura','angostura/24horas.jpg']);
/*badiraguato*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA03E','Un día en Badiraguato','badiraguato/24horas.jpg']);
/*Concordia*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA04E','Un día en Concordia','concordia/24horas.jpg']);
/*Cosalá*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA05E','Un día en Cosalá','cosala/24horas.jpg']);
/*Culiacán*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA06E','Un día en Culiacán','culiacan/24horas.jpg']);
/*Choix*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA07E','Un día en Choix','choix/24horas.jpg']);
/*Elota*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA08E','Un día en Elota','elota/24horas.jpg']);
/*Escuinapa*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA09E','Un día en Escuinapa','escuinapa/24horas.jpg']);
/*El Fuerte*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA10E','Un día en El Fuerte','el_fuerte/24horas.jpg']);
/*Guasave*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA11E','Un día en Guasave','guasave/24horas.jpg']);
/*Mazatlán*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA12E','Un día en Mazatlán','mazatlan/24horas.jpg']);
/*Mocorito*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA13E','Un día en Mocorito','mocorito/24horas.jpg']);
/*Rosario*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA14E','Un día en Rosario','el_rosario/24horas.jpg']);
/*Salvador Alvarado*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA15E','Un día en Salvador Alvarado','salvador_alvarado/24horas.jpg']);
/*San Ignacio*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA16E','Un día en San Ignacio','san_ignacio/24horas.jpg']);
/*Sinaloa*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA17E','Un día en Sinaloa','sinaloa_de_leyva/24horas.jpg']);
/*Navolato*/tx.executeSql('INSERT INTO desimgdia(clave,titulo,imagen) VALUES(?,?,?)',['DA18E','Un día en Navolato','Navolato/24horas.jpg']);

                }
        });
        });
db.transaction(
        function(tx) {
        tx.executeSql('SELECT * FROM undia',[],
        function(tx,results){
            var len = results.rows.length;
            if(len!=0){
                //alert("datos cargados");
            }else{
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','','<b>Opción 1</b>']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','09:00 Hrs','Visita Jardín Botánico']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','10:00 Hrs','Visita al Museo Regional del Valle de El Fuerte']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','11:00 Hrs','Paseo por la Plazuela 27 Septiembre y paseo por el centro de la ciudad']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','14:00 Hrs','Comida']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','16:30 Hrs','Descanso en Hotel']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','17:00 Hrs','Paseo a la casa de la cultura Conrado Espinoza y Cerro de la Memoria']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','19:00 Hrs','Tarde libre (Visita a plazas comerciales)']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','','<b>Opción 2</b>']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','09:00 Hrs','Salida a Topolobampo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','10:00 Hrs','Recorrido por Ohuira Bay y Malecón de Topolobampo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','11:00 Hrs','Paseo en lancha por la bahía de Topolobampo, Isla de los pájaros y pechocho.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','14:00 Hrs','Regreso a Topolobampo y Salida a la Isla de El Maviri']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','14:30 Hrs','Comida']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','13:30 Hrs','Regreso a Los Mochis']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A01E','17:30 Hrs','Tarde libre (Visita a plaza comerciales)']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A02E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A02E','09:00 Hrs','Traslado a cooperativa Brianta del Pacifico']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A02E','10:00 Hrs','Bahía Santa María Isla la Coyotia']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A02E','11:00 Hrs','Bahía Santa María Dunas de Altamura']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A02E','12:00 Hrs','Bahía Santa María Isla de los Pájaros']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A02E','13:00 Hrs','Bahía Santa María avistamiento de delfines']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A02E','14:00 Hrs','Bahía Santa María comida (Isla el guadaron)']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A02E','15:00 Hrs','Bahía Santa María comida ( Isla el guadaron)']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A02E','16:00 Hrs','Bahía Santa María Isla de los pájaros azules( el rancho)']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A02E','17:00 Hrs','Regreso al Pueblo de la Reforma']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A02E','18:00 Hrs','Fin del día']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','09:00 Hrs','Traslado a Surutato']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','10:00 Hrs','Traslado a Surutato']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','11:00 Hrs','Traslado a Surutato']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','12:00 Hrs','Senderismo por los alrededores de los recintos turísticos']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','13:00 Hrs','Senderismo por los alrededores de los recintos turísticos']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','14:00 Hrs','Senderismo por los alrededores de los recintos turísticos']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','15:00 Hrs','Comida']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','16:00 Hrs','Tirolesa']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','17:00 Hrs','Mirador']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','18:00 Hrs','Coffe Break']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','19:00 Hrs','Fin del día']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A03E','20:00 Hrs','Pernota']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A04E','08:00 Hrs','Desayuno en la "Reserva de La Chara Pinta", Ejido el Palmito, Concordia.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A04E','09:00 Hrs','Recorrido por la Reserva, observación de aves y senderismo.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A04E','11:00 Hrs','Salida a Copala, Concordia.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A04E','12:00 Hrs','Traslado a Copala, Concordia.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A04E','13:00 Hrs','Comida Copala, Concordia.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A04E','15:00 Hrs','Recorrido por Copala.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A04E','16:00 Hrs','Salida a la cabecera municipal de Concordia.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A04E','17:00 Hrs','Recorrido artesanal.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A04E','18:00 Hrs','Recorrido por el boulevard de las mueblerías de Mesillas, Concordia.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A04E','19:00 Hrs','Descanso.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A04E','20:00 Hrs','Cena, Restaurant Granero.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','09:00 Hrs','Traslado a la Reserva Ecológica']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','10:00 Hrs','Tirolesa']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','11:00 Hrs','Tirolesa']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','12:00 Hrs','Senderismo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','13:00 Hrs','Visita a Museo y a las Guacamayas']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','15:00 Hrs','Regreso al pueblo y comida']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','15:30 Hrs','Traslado a Vado Hondo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','16:00 Hrs','Tiempo de recreación']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','18:00 Hrs','Regreso al pueblo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','19:00 Hrs','Paseo por las calles del pueblo, plazuela y kiosco']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A05E','20:00 Hrs','Cena y descanso']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','','<b>Opción 1</b>']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','08:00 Hrs','Traslado Zoológico']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','10:00 Hrs','Zoológico']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','11:00 Hrs','Zoológico']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','12:00 Hrs','Traslado Jardín Botánico']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','13:00 Hrs','Jardín Botánico']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','14:00 Hrs','Jardín Botánico']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','15:00 Hrs','Comida']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','16:00 Hrs','Traslado Centro de Ciencias']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','17:00 Hrs','Centro de Ciencias']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','18:00 Hrs','Traslado Parque Las Riberas']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','19:00 Hrs','Fuentes Danzantes']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','20:00 Hrs','Cena y descanso']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','','<b>Opción 2</b>']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','09:00 Hrs','Paseo Turibús']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','10:00 Hrs','Paseo Turibús']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','11:00 Hrs','Visita MIA (Módular Inés Arredondo)']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','13:00 Hrs','Comida']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','14:00 Hrs','Museo Regional de Sinaloa']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','17:00 Hrs','Museo de Arte de Sinaloa']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A06E','20:00 Hrs','Cena y pernota']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A07E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A07E','10:00 Hrs','Visitar las instalaciones de La Presa Luis Donaldo Colosio Murrieta Huites.Previa Reservación (Turismo Municipal)']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A07E','12:00 Hrs','Salir a Aguas termales de "Agua Caliente de Baca."']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A07E','13:00 Hrs','Comida.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A07E','15:00 Hrs','Llegar a la cabecera municipal.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A07E','16:00 Hrs','Salida a la comunidad indígena de Baymena.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A07E','17:00 Hrs','Muestra gastronómica.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A07E','18:00 Hrs','Demostraciónes de danzas Indígenas.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A07E','20:00 Hrs','Fin del tour.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','09:00 Hrs','Recorrido al Chorito (platica del lugar, de enamorados)']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','10:00 Hrs','Panteón de Elota (leyenda de la tumba encadenada)']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','11:00 Hrs','Visita al Museo Comunitario de Elota']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','12:00 Hrs','Traslado a la cabecera municipal de la Cruz Elota']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','13:00 Hrs','Visita la Plazuela y Museo Municipal']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','14:00 Hrs','Comida en Playa Ceuta']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','15:00 Hrs','Tiempo de esparcimiento en el malecón Playa Ceuta']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','16:00 Hrs','Visita al campamento y museo de la Tortuga Marina']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','17:00 Hrs','Platica de conservación de la Tortuga Marina y visita al museo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','18:00 Hrs','Visita al corral de incubación y muestreo de nidos']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','19:00 Hrs','Acto de liberación de crías de la tortuga marina']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A08E','20:00 Hrs','Tiempo de esparcimiento y despedida']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A09E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A09E','09:00 Hrs','Inicia recorrido por la Plazuela Corona, Parroquia, Parque Hidalgo, Área Gastronómica, Mercado y Palacio Municipal.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A09E','11:00 Hrs','Salida hacia Marismas Nacionales, Rancho Salineros, Celaya (sacado de coco) y/o visita en el CIP´s, Playa Espíritu.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A09E','13:00 Hrs','Partida hacia Teacapán, para paseos en panga a Isla de Pájaros y Bahía de Teacapán, así como a las Playas Las Lupitas y Cuatro Surcos, además del Malecón.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A09E','15:00 Hrs','Comida']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A09E','16:00 Hrs','Recorrido en Jardín Botánico Antonio Hass en Teacapán.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A09E','18:00 Hrs','Visita a la cooperativa de ecoturismo "El Mezcal", recepción con el juego del Ulama (infantil), comida, paseos en kayak y safaris fotográficos en la zona.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A09E','20:00 Hrs','Termino del recorrido en el centro de Escuinapa.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A10E','07:00 Hrs','Recorrido por el Centro Histórico de la ciudad (Museo El Fuerte-Mirador, Palacio Municipal, Iglesia, Plaza de armas, Casa de La Cultura y Malecón).']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A10E','08:30 Hrs','Desayuno (Restaurante Supremo, Diligencias, Mesón del General) especialidad machaca regional.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A10E','09:30 Hrs','Recorrido a lo largo del Río Fuerte donde se disfruta de la gran variedad de flora y fauna aprovechando para hacer una parada en el Cerro de la Máscara para apreciar los Petrograbados.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A10E','13:00 Hrs','Comida en restaurantes (Paseo de las Aves, el río), especialidades: Cauques a la Plancha, Filetes Rellenos y Zarandeados.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A10E','15:00 Hrs','Visita a la comunidad indígena de los Capomos, donde se podrán observar enramadas utilizadas para realizar danzas tradicionales (Pascola, Matachín y Venado), demostración de taller de barro y muestra gastronómica (guacabaqui).']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A10E','17:00 Hrs','Recorrido por los hoteles que son edificios históricos que ofrecen gran arquitectura y hermosos diseños pintorescos.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A10E','19:00 Hrs','Hotel posada Hidalgo ofrece show del zorro personaje animado que cobro vida en esta ciudad (hora feliz).']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A10E','20:00 Hrs','Cena Restaurantes (El Mesón del General, El Supremo, Diligencias), especialidad: Enchiladas Poblanas, Suizas, Asado y Burros de Machaca.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A11E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A11E','09:00 Hrs','Recorrido por la Plazuela Miguel Hidalgo, visita el Santuario de Nuestra Señora del Rosario, la Casa de la Cultura del Colegio de Bachilleres.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A11E','11:00 Hrs','Salida a Playa Las Glorias. La playa favorita de los guasavenses te da la más cálida recepción con sus 5 km de arena dorada y oleaje pacífico.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A11E','14:00 Hrs','Comida en Playa Las Glorias']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A11E','15:00 Hrs','Salida hacia La Pitaya y visita la granja de ostiones.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A11E','16:00 Hrs','Recorrido en lancha por la Bahía de Navachiste, estero formado por ensenadas, lagunas y un sin fín de islas, la más importante Isla de los Poetas, centro de reunión del Encuentro Literario Internacional']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A11E','19:00 Hrs','Regreso a La Pitahaya y salida a Guasave.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','09:00 Hrs','Desayuno y traslado al centro de la ciudad recorriendo el malecón a bordo de una "pulmonía", transporte típico del puerto.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','10:00 Hrs','Visite la Catedral de Mazatlán y Mercado Pino Suárez.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','11:00 Hrs','Visite El Teatro Ángela Peralta y los Museos: Arqueológico, de Arte, y Casa Machado.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','14:00 Hrs','Comida.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','15:00 Hrs','Visite el Acuario Mazatlán, en donde disfrutará de los espectáculos de Lobos Marinos, Aves, Exhibición de Buceo y Animales Cazadores.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','18:00 Hrs','Realice un paseo en caminata por el Malecón para disfrutar de atardeceres fascinantes.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','19:00 Hrs','Visite la Zona dorada donde Ud. encontrará artesanias, hoteles y finos restaurantes.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','08:00 Hrs','Salida y desayuno en El Quelite, pueblo colonial de valiosa arquitectura y famoso por su gastronomía. Distancia de Mazatlán: 33 km.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','11:00 Hrs','Recorrido por El Quelite: Visite el Templo de Nuestra Señora de Guadalupe, el mirador del Cerro de la Cruz, tiendas de artesanías, entre otros.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','13:00 Hrs','Regreso a Mazatlán.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','14:00 Hrs','Comida, visite la Zona Dorada y Marina Mazatlán, donde encontrará gran variedad de restaurantes.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','17:00 Hrs','Recorrido por el Centro Histórico de Mazatlán: Visite La Catedral, El Teatro Ángela Peralta, la Plazuela Machado y sus alrededores.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A12E','20:00 Hrs','Cena en los restaurantes estilo colonial, ubicados alrededor de la Plazuela Machado.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A13E','08:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A13E','09:00 Hrs','Vista a la Fábrica de jamoncillos y/o panadería']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A13E','11:00 Hrs','Visita al Museo de Historia Regional']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A13E','12:00 Hrs','Visita a la Presidencia Municipal']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A13E','13:00 Hrs','Comida y descanso']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A13E','15:00 Hrs','Recorrido por el Centro Histórico (visite el Templo de la Purísima Concepción, Escuela Lic. Benito Juarez, Casa de las Diligencias,Centro Cultural Dr. José Ley Domínguez)']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A13E','19:00 Hrs','Recorrido por la Plazuela Miguel Hidalgo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A13E','20:00 Hrs','Disfrute de un espectáculo de globos de papel de china, en el Callejón de Casa de la Raquel.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A14E','08:00 Hrs','Desayuno en el Restaurante El Tiro de San Antonio']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A14E','09:30 Hrs','Visita Iglesia de Nuestra Señora del Rosario, tumba y monumento de Lola Beltrán, Museo de la Virgen de Rosario, y tienda artesanal de dulces típicos']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A14E','11:00 Hrs','Visita al Panteón Español']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A14E','12:00 Hrs','Visita a los vestigios de la Iglesia y el museo Lola Beltrán']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A14E','13:00 Hrs','Visita la Laguna del Iguanero']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A14E','14:00 Hrs','Comida en el Restaurant Bellavista']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A14E','16:00 Hrs','Visita el centro de El Rosario, Fábrica el Manantial (Lugar donde se elabora el refresco de vainilla Tonicol)']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A14E','18:00 Hrs','Visita a la Capilla de la Santa Cruz']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A14E','19:00 Hrs','Visita a la Plazuela Municipal, El Palacio y la Plazuela Gabriel Leyva Solano']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A15E','08:00 Hrs','Llegada al pueblo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A15E','09:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A15E','10:00 Hrs','Visita al Museo Pedro Infante']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A15E','12:00 Hrs','Paseo por las calles del pueblo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A15E','13:00 Hrs','Comida']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A15E','14:00 Hrs','Descanso']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A15E','15:00 Hrs','Visita Museo del Évora']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A15E','17:00 Hrs','Visita Plazuela Pedro Infante']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A15E','18:00 Hrs','Recorrido por la Iglesia de Nuestra Señora de Guadalupe']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A15E','19:00 Hrs','Cena']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A15E','20:00 Hrs','Descanso']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','08:00 Hrs','Traslado al pueblo de San Javier.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','09:00 Hrs','Desayuno en el restaurante típico del lugar" El Tirito"']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','10:00 Hrs','Recorrido por la plazuela y museo, charla con los habitantes sobre historia del pueblo.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','11:00 Hrs','Salida rumbo a Cabazán.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','11:15 Hrs','Visita al Museo del Jaguar y atractivos del pueblo de Cabazán.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','12:00 Hrs','Aperitivos en el restaurant "El Mesón de Las Misiones"']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','12:30 Hrs','Salida rumbo a La Labor']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','13:00 Hrs','Recorrido por la Hacienda, Capilla y Museo de la Labor.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','14:00 Hrs','Salida a San Ignacio.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','14:30 Hrs','Comida en San Ignacio.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','15:30 Hrs','Recorrido por los lugares típicos como: El Templo de San Ignacio de Loyola, La Plazuela, El Museo, La Casa del Diablo.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','17:00 Hrs','Caminata y atardecer en el Cristo de la Mesa.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A16E','18:15 Hrs','Regreso a la ciudad de origen.']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A17E','09:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A17E','10:00 Hrs','Tour por el centro historico del Pueblo Señorial Sinaloa de Leyva']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A17E','11:00 Hrs','Recorrido por el Templo de San Felipe y Santiago y Plazuela Municipal']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A17E','12:00 Hrs','Visita a la Casa de la Cultura']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A17E','13:00 Hrs','Ruinas de Templo Viejo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A17E','14:00 Hrs','Comida']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A17E','15:00 Hrs','Visita al Centro Ceremonial Mayo-Yoreme de Ocoroni']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A17E','16:00 Hrs','Visita al Mirador del Cerro del Monje']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A17E','17:00 Hrs','Recorrido por el malecón']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A17E','18:00 Hrs','Cruza el puente colgante']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A17E','19:00 Hrs','Regreso a hotel']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A18E','08:00 Hrs','Llegada al pueblo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A18E','09:00 Hrs','Desayuno']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A18E','10:00 Hrs','Paseo por la plaza Vicente Guerrero']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A18E','11:00 Hrs','Visita a Isla Cortés']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A18E','12:00 Hrs','Actividades Isla Cortés']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A18E','14:00 Hrs','Comida en Isla Cortés']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A18E','16:00 Hrs','Regreso al centro del pueblo']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A18E','17:00 Hrs','Parada en el Ingenio La Primavera']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A18E','18:00 Hrs','Recorrido por la Iglesia de San Francisco de Asís']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A18E','19:00 Hrs','Cena y descanso']);
tx.executeSql('INSERT INTO undia(clave,hora,actividad) VALUES(?,?,?)',['A18E','19:00 Hrs','Cena y descanso']);                
}
        });

    }); 
   
}

