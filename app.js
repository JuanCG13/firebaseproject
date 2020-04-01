firebase.initializeApp({
    apiKey: 'AIzaSyB560MPVjSA38eSrg0IwG8wgrFPeusfpns',
    authDomain: 'proyectoprofesores-58a82.firebaseapp.com',
    projectId: 'proyectoprofesores-58a82'
  });
  
var db = firebase.firestore();



// agregar documento 

function guardar(){

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var clase = document.getElementById('clase').value;

    db.collection("Profesores").add({

        nombre,
        apellido,  
        clase
    })
    
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value ='';
        document.getElementById('apellido').value ='';
        document.getElementById('clase').value ='';
    })
    
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
}


//Leer documentos 

var tabla = document.getElementById('tabla');

db.collection("Profesores").onSnapshot((querySnapshot) => {

    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `
        
            <tr>
                <th scope="row">${doc.id}</th>
                <td>${doc.data().nombre}</td>
                <td>${doc.data().apellido}</td>
                <td>${doc.data().clase}</td>
                <td><button class="btn btn-danger" id="boton" onclick="eliminar('${doc.id}')"> Eliminar</button></td>
                <td><button class="btn btn-warning" id="boton" onclick="editar('${doc.id}','${doc.data().nombre}','${doc.data().apellido}','${doc.data().clase}')"> Editar</button></td>
            </tr>
        
        `  
    });
});


// borrar documentos

function eliminar(id){

    db.collection("Profesores").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}



//actualizar un documento

function editar(id,nombre,apellido,clase){

    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('clase').value = clase;

    var boton = document.getElementById('boton');

    boton.innerHTML = 'Editar';

    boton.onclick = function(){


        var editarprofe = db.collection("Profesores").doc(id);
        
        // Sahora se toman las variables que ya fueron modificadas al despues de apretar el boton editar en la tabla

        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var clase = document.getElementById('clase').value;

        return editarprofe.update({
            nombre,
            apellido,  
            clase
        })
        .then(function() {
            console.log("Document successfully updated!");
            boton.innerHTML = 'Guardar';
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('clase').value = '';
            boton.innerHTML='Guardar'
            boton.onclick=function(){
                guardar();
            }
            
            
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });
    }
    
}




