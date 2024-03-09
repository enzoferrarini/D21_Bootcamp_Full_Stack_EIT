let myToast = new bootstrap.Toast(document.getElementById('myToast'));
let myToastConfirm = new bootstrap.Toast(document.getElementById('myToastConfirm'));
let btnAddUser= document.getElementById("btnAddUser");
let btnCancelChanges= document.getElementById("btnCancelChanges");
let nameInput= document.getElementById("idName");
let emailInput= document.getElementById("idEmail");
let generoSelect= document.getElementById("idDdlGenero");
let birthDayInput= document.getElementById("idBirthDay");
let direccionInput= document.getElementById("idDireccion");
let idUser= document.getElementById("idUser");
let passInput= document.getElementById("idPass");
let passRepeatInput= document.getElementById("idPassRepeat");
let infoInput= document.getElementById("idExtraInfo");


let msgNameInput= document.getElementById("idMsgName");
let msgEmailInput= document.getElementById("idMsgEmail");
let msgDateInput= document.getElementById("idMsgBirthDay");
let msgGeneroSelect= document.getElementById("idMsgSelect");
let msgDireccionInput= document.getElementById("idMsgDireccion");
let msgUserInput= document.getElementById("idMsgUser");
let msgPassInput= document.getElementById("idMsgPass");
let msgPassRepeatInput= document.getElementById("idMsgPassRepeat");

let users= [];
let nextIdUser=0;
let contactCount=0;
let currentContactId=-1;
let deleteteIdSelection=-1;
let validForm=true;

let divAddUsers= document.getElementById("divAddUsers");
let divUsersList= document.getElementById("divUsersList");

divAddUsers.classList.add("hidden");

const saveLS=()=>{
    var usersAsString = JSON.stringify(users);
    localStorage.setItem("myUsers", usersAsString);
}

const formatDate=(date)=>{
    let fecha = new Date(date);
    let dia = fecha.getDate().toString().padStart(2, '0');
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 ya que los meses van de 0 a 11
    let anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
}

const highlightRow=(element)=>{   
    let elementoPadre = element.parentNode.parentNode;
    elementoPadre.classList.add("highlightRow");
}

const unHighlightAllRow=()=>{   
    let trsHL = document.getElementsByClassName("highlightRow");
    for (let index = 0; index < trsHL.length; index++) {
        trsHL[index].classList.remove("highlightRow");       
    } 
}

const obtenerGenero=(idGenero)=>{
    let valor="";
    switch (idGenero) {
        case 1:
            valor="FEMENINO";
            break;
        case 2:
            valor="MASCULINO";
            break;
        case 3:
            valor="OTRO";
            break;
    }
    return valor;
}

const userForm=(aUser, userNumber)=>{
    // console.log(aUser);
    let value=`<tr id=${aUser.id}>
        <td onclick='showFilmDescription(this)' class="pt-2 pb-2">${userNumber}</td>
        <td onclick='showFilmDescription(this)' class="pt-2 pb-2 text-start d-blue text-nowrap">${aUser.nombre}</td>
        <td onclick='showFilmDescription(this)' class="pt-2 pb-2 text-start d-blue text-nowrap">${aUser.user}</td>
        <td onclick='showFilmDescription(this)' class="pt-2 pb-2 ">${aUser.email}</td>
        <td onclick='showFilmDescription(this)' class="pt-2 pb-2">${formatDate(aUser.fechaNacimiento)}</td>
        <td class="pt-2 pb-2">
            <i id="${aUser.id}" class="edit fa-solid fa-pen-to-square m-1"></i>
            <i id="${aUser.id}" class="delete fa-regular fa-trash-can m-1"></i>
        </td>
    </tr>           
    <tr  id=d${aUser.id} class='fadeInRow hidden' >
        <td colspan="6" class="filmDescription p-3" style='background-color: aliceblue; border-radius:5px;'>
            <div style="width: inherit; text-align: right;">
                <button type="button" class="btn-close" aria-label="Close" onclick="closeDescBox('d${aUser.id}')"></button><br>
            </div>
            <div class="row g-2 text-start">
                <div class="col-md-12">
                    <span>Apellido y Nombre: <strong>${aUser.nombre}</strong></span>
                </div>    
            </div>    
            <div class="row g-2 text-start">
                <div class="col-md-6">
                    <span>F. Nacimiento: <strong>${aUser.fechaNacimiento}</strong></span>
                </div>     
                <div class="col-md-6">
                    <span>Genero: <strong>${obtenerGenero(aUser.genero)}</strong></span>
                </div>
            </div>
            <div class="row g-2 text-start">
                <div class="col-md-6">
                    <span>Dirección Completa: <strong>${aUser.direccion}</strong></span>
                </div>    
                <div class="col-md-6">
                    <span>E-mail de contacto: <strong>${aUser.email}</strong></span>
                </div>    
            </div>
            <div class="row g-2 text-start">
                <div class="col-md-6">
                    <span>Usuario: <strong>${aUser.user}</strong></span>
                </div>   
                <div class="col-md-6">
                    <span>Password: <strong>${aUser.pass}</strong></span>
                </div>                     
            </div>
            <div class="row g-2 text-start">
                <div class="col">
                    <span>Comentarios Adicionales: <strong>${aUser.info}</strong></span>
                </div>
            </div>
        </td>
    </tr>    
    `;
    return value;
}

const closeDesc=(element)=>{   
    element.classList.add("hidden");
}

const openDesc=(element)=>{   
    element.classList.remove("hidden");
}

const closeDescBox=(valor)=>{
    closeDesc(document.getElementById(valor)); 
}

const showFilmDescription=(e)=>{
    let filmDescriptionCollection=Array.from(document.getElementsByClassName("filmDescription"));
    
    filmDescriptionCollection.forEach(elto => {
        closeDesc(elto.parentNode);
    });
    const descElement=document.getElementById("d"+e.parentNode.id);
    openDesc(descElement);   
}

const loadUsers=(users)=>{
    //Ordeno alfabeticamente. 
    users.sort(function(a, b) {
        return a._nombre.localeCompare(b._nombre);
      });

    contactCount=0;
    let contactContainer=document.getElementById("contactsContainer");
    let listUsers="";
    users.forEach(function(objeto) {
        contactCount++;
        //  console.log(objeto);
        listUsers+=userForm(objeto,contactCount);
    });
        
    contactContainer.innerHTML=`
    <div class="table-responsive">
        <table class="table table-hover table-sm">
            <thead>
                <tr class=" fw-normal fs-6 ">
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">usuario</th>
                    <th scope="col">E-mail</th>
                    <th scope="col" class="text-nowrap">Fecha Nacimiento</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>${listUsers}</tbody>
        </table>
        <div id="emailHelp" class="form-text text-start text-secondary">${contactCount} usuario/s</div>
    </div>`;

    let fiEditCollection=document.getElementsByClassName("edit");
    let fiDeleteCollection=document.getElementsByClassName("delete");

    for (let index = 0; index < fiEditCollection.length; index++) {
        fiEditCollection[index].addEventListener('click', editUser);
    }

    for (let index = 0; index < fiDeleteCollection.length; index++) {
        fiDeleteCollection[index].addEventListener('click',  deleteUserFromList);
    }
}

//VERIFICO SI HAY CONTACTOS EN EL LS, SINO HAY, CREO CONTACTOS POR DEFAULT PARA MOSTRAR ALGO
if (localStorage.getItem("myUsers")) {
    let usersLs = JSON.parse(localStorage.getItem("myUsers"));
    users= usersLs.map(item => new User(item._id,item._nombre,item._user,item._pass,item._fechaNacimiento,item._email ,item._info ,item._genero,item._direccion));
    loadUsers(users);
}
else
{
    users.push(new User(1,'Ferrarini Enzo', 'eferrarini', '&/$834fh', '1980-12-05', 'ferrarini.enzo@gmail.com', "informacion complementaria",2,'MIGUEL A CAMINO 556'));
    users.push(new User(2,'Herrera Juan Carlos','herrera','&/$834fh','1985-12-10','herrera.juan@hotmail.com' , "informacion complementaria", 2,'MIGUEL A CAMINO 556'));
    users.push(new User(3,'Baschini Vanesa','baschini','&/$834fh','2000-02-02','baschini.vanesa@gmail.com' , "informacion complementaria", 1,'MIGUEL A CAMINO 556'));
    users.push(new User(4,'Veronica Gonzalez','gonzalez','&/$834fh','1995-06-12','gonzalez.veronica@yahoo.com' , "informacion complementaria", 1,'MIGUEL A CAMINO 556'));
    users.push(new User(5,'Dolci Alfredo','dolci','&/$834fh','1995-03-09','dolci.alfredo@gmail.com' , "informacion complementaria", 3,'MIGUEL A CAMINO 556'));
    users.push(new User(6,'Goltz Micaela','golt','&/$834fh','1995-09-14','goltz.micaela@hotmail.com' , "informacion complementaria",1,'MIGUEL A CAMINO 556'));
    
    saveLS();
    loadUsers(users);
}
///////////////////////////

const cancelChanges=()=>{
    unHighlightAllRow();
    cleanForm(); 
    divAddUsers.classList.add("hidden");
    divUsersList.classList.remove("hidden");
}

const enableEditing=()=>{
    
    btnAddUser.innerHTML = "Guardar Cambios";
}

const disableEditing=()=>{
   
    btnAddUser.innerHTML = "Agregar Contacto";
}

const showMessageToast=(msg)=>{
    let msgToast =document.getElementById("idMsgToast");
    msgToast.innerHTML=msg;
    myToast.show();
}

const cleanForm = () => {
    let inputCollection=document.getElementsByTagName("input");
    let errorsCollection=document.getElementsByClassName("erroMessage");
    for (let index = 0; index < inputCollection.length; index++) {
        inputCollection[index].value="";
        inputCollection[index].classList.remove("is-invalid");
    }
    for (let index = 0; index < errorsCollection.length; index++) {
        errorsCollection[index].classList.remove("animation");
        errorsCollection[index].classList.add("hidden");
        errorsCollection[index].innerText = "";
    }

    document.getElementById("idExtraInfo").value="";
    document.getElementById("idExtraInfo").classList.remove("is-invalid");

    document.getElementById("idDdlGenero").value=-1;
    document.getElementById("idDdlGenero").classList.remove("is-invalid");

    disableEditing();
    unHighlightAllRow();
    currentContactId=-1;
    deleteteIdSelection=-1;    
}

document.addEventListener("DOMContentLoaded", function () {
    btnAddUser.addEventListener('click', addUser);
    btnCancelChanges.addEventListener('click', cancelChanges);
    disableEditing();    
    let modal=new bootstrap.Modal(document.getElementById("idModal"));
    modal.show();
});

const showForm=()=>{
    divUsersList.classList.add("hidden");
    divAddUsers.classList.remove("hidden");
    
}
