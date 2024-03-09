class User {
    constructor(id, nombre, user, pass, fechaNacimiento, email, info, genero, direccion) {
        this._id = id;
        this._nombre = nombre;
        this._direccion = direccion;
        this._email = email;
        this._fechaNacimiento = fechaNacimiento;
        this._genero = genero;
        this._info = info;
        this._email = email;
        this._pass = pass;
        this._user = user;
      }
    
    get id() {return this._id;}
    get nombre() {return this._nombre;}    
    get direccion() {return this._direccion;}    
    get fechaNacimiento() {return this._fechaNacimiento;}    
    get genero() {return this._genero;}    
    get info() {return this._info;}    
    get email() {return this._email;}    
    get pass() {return this._pass;}    
    get user() {return this._user;}    

    set nombre(value) {this._nombre = value;}
    set direccion(value) {this._direccion = value;}
    set fechaNacimiento(value) {this._fechaNacimiento = value;}    
    set genero(value) {this._genero = value;}
    set info(value) {this._info = value;}
    set email(value) {this._email = value;}    
    set pass(value) {this._pass = value;}
    set user(value) {this._user = value;}
  }

const validateName = () => {
    let name=nameInput.value; 
    if (verificarNoVacio(name)){
        if(verificarCaracteresAlfabeticos_LM_Espacio(name)){
            if(validarLongitudCadena(nameInput.value, 3, 20)){
                cleanMsgError(nameInput,msgNameInput);
            }
            else {
                let msg="Mínimo 3 caracteres y Máximo 10";
                showMsgError(nameInput,msgNameInput,msg);
                validForm=false;
            }
        }
        else
        {
            let msg="Solo se permiten caracteres alfabéticos y las únicas letras que pueden ser mayúscula son las primeras";
            showMsgError(nameInput,msgNameInput,msg);
            validForm=false;
        }
    }
    else
    {
        let msg="Campo Obligatorio";
        showMsgError(nameInput,msgNameInput,msg);
        validForm=false;
    }
}

const validateUser = () => {
    let name=idUser.value; 
    if (verificarNoVacio(name)){
        if(verificarCaracteresAlfabeticos_SE(name)){
            if(validarLongitudCadena(idUser.value, 3, 20)){
                cleanMsgError(idUser,msgUserInput);
            }
            else {
                let msg="Mínimo 3 caracteres y Máximo 20";
                showMsgError(idUser,msgUserInput,msg);
                validForm=false;
            }
        }
        else
        {
            let msg="Solo se permiten caracteres alfabéticos sin espacios";
            showMsgError(idUser,msgUserInput,msg);
            validForm=false;
        }
    }
    else
    {
        let msg="Campo Obligatorio";
        showMsgError(idUser,msgUserInput,msg);
        validForm=false;
    }
}

const validateDireccion = () => { 
    let name=direccionInput.value; 
    if (verificarNoVacio(name)){
        if(verificarCaracteresAlfabeticos_LM_Espacio(name)){
            if(validarLongitudCadena(direccionInput.value, 3, 150)){
                cleanMsgError(direccionInput,msgDireccionInput);
            }
            else {
                let msg="Mínimo 3 caracteres y Máximo 150";
                showMsgError(direccionInput,msgDireccionInput,msg);
                validForm=false;
            }
        }
        else
        {
            let msg="Solo se permiten caracteres alfabéticos y las únicas letras que pueden ser mayúscula son las primeras";
            showMsgError(direccionInput,msgDireccionInput,msg);
            validForm=false;
        }
    }
    else
    {
        let msg="Campo Obligatorio";
        showMsgError(direccionInput,msgDireccionInput,msg);
        validForm=false;
    }
}

const validateEmail = () => {
    let email=emailInput.value;
    if (verificarNoVacio(email)){
        if(validarEmail(email)){
            cleanMsgError(emailInput,msgEmailInput);
        }
        else {
            let msg="E-mail inválido";
            showMsgError(emailInput,msgEmailInput,msg);
            validForm=false;
        }
    }else{        
        let msg="Campo Obligatorio";
        showMsgError(emailInput,msgEmailInput,msg);
        validForm=false;
    }
}

const validateFechaNacimiento = () => {
    let bd_d=birthDayInput.value;
    if (verificarNoVacio(bd_d)){      
        if(bd_d.length==10)
        {
            cleanMsgError(birthDayInput,msgDateInput);    
        }else{
            let msg="La Fecha tiene que tener exactamente 8 Números";
            showMsgError(birthDayInput,msgDateInput,msg);
            validForm=false;
        }    
    }else{
        let msg="Campo Obligatorio";
        showMsgError(birthDayInput,msgDateInput,msg);
        validForm=false;
    }
}

const validateGenero = () => {    
    if(generoSelect.value!=-1)
        cleanMsgError(generoSelect,msgGeneroSelect);    
    else{
        let msg="Campo Obligatorio";
        showMsgError(generoSelect,msgGeneroSelect,msg);
        validForm=false;
    }    
}

const validatePass=()=>{
    let validPass=true;
    let pass=passInput.value;
    if(validarPassword(pass)){
        cleanMsgError(passInput,msgPassInput);
    }
    else{
        let msg="Al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número";
        showMsgError(passInput,msgPassInput,msg);
        validPass=false;
        validForm=false;
    }

    if(validPass)
    {
        if(passInput.value ==passRepeatInput.value)
        {
            cleanMsgError(passRepeatInput,msgPassRepeatInput);
        }
        else{
            let msg="No coiniciden las contraseñas";
            showMsgError(passRepeatInput,msgPassRepeatInput,msg);
            validForm=false;
        }
    }
}

const addUser=(e)=>{
    e.preventDefault();
    validForm=true;
    validateGenero();
    validateEmail();
    validateName();
    validateDireccion();
    validateFechaNacimiento();
    validatePass();
    validateUser();
    
    if(validForm)
    {
        let msg="agregado";
        if(currentContactId!=-1)
        {
             deleteUser(currentContactId);
            msg="editado";
        }
               
        let aNewContact= saveNewUser();
        showMessageToast(`Usuario ${msg} exitosamente <br> <strong>${aNewContact.nombre}</strong>`);
        cleanForm();
        loadUsers(users);

        divUsersList.classList.remove("hidden");
        divAddUsers.classList.add("hidden");
    }
}

const  saveNewUser=()=>{ 
    //OBTENGO LE ULTIMO ID DE LA BASE DE CONTACTOS
    for (var i = 0; i < users.length; i++) {
        var objeto = users[i];
        if(nextIdUser<objeto.id)
            nextIdUser=objeto.id;
    }
    nextIdUser++;
    let newUser=new User(nextIdUser,nameInput.value, idUser.value, passInput.value, birthDayInput.value, emailInput.value, infoInput.value,parseInt(generoSelect.value),direccionInput.value);
    users.push(newUser)
    saveLS();
    return newUser;
}

const editUser=(e)=>{
    myToastConfirm.hide();
    cleanForm();
    currentContactId=e.target.id;
    unHighlightAllRow();
    
    let selectedContact = users.find(function(objeto) {
        return objeto.id == e.target.id;
      });

      nameInput.value=selectedContact.nombre;
      idUser.value=selectedContact.user;
      passInput.value=selectedContact.pass;
      passRepeatInput.value=selectedContact.pass;
      birthDayInput.value=selectedContact.fechaNacimiento;
      emailInput.value=selectedContact.email;
      infoInput.value=selectedContact.info;
      generoSelect.value=selectedContact.genero;
      direccionInput.value=selectedContact.direccion;

    enableEditing();
    highlightRow(e.target);

    divAddUsers.classList.remove("hidden");
    divUsersList.classList.add("hidden");
}

const  deleteUser=( idUser)=>{
    var newListUsers = users.filter(function(objeto) {
        return objeto.id !=  idUser;
    });
    users=newListUsers;
}

const  deleteUserFromList=(e)=>{
    cleanForm();
    deleteteIdSelection=e.target.id;
    let sleectedUser = users.find(function(objeto) {
        return objeto.id == e.target.id;
      });

    let idMsgToastConfirmDiv=document.getElementById("idMsgToastConfirmDiv");
    idMsgToastConfirmDiv.innerHTML=`Esta seguro que desea Eliminar el usuario <br><strong> ${sleectedUser.user}</strong>`;
    myToastConfirm.show();
}

const confirmDelete=()=>{
    myToastConfirm.hide();
    deleteUser(deleteteIdSelection);  
    cleanForm();
    saveLS();   
    loadUsers(users); 
    showMessageToast("Usuario eliminado exitosamente...");
}

const cancelDelete=()=>{
    deleteteIdSelection=-1;
    myToastConfirm.hide();
    cleanForm();
}