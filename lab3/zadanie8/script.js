window.onload=function(){
    const app =webApp.init();
}

let webApp = {

    init:function(){
        this.addEventListeners();
        return this;
    },
    addEventListeners: function(){
        document.getElementById("hidenew").addEventListener("click",this.hidePassClick);
        document.getElementById("hiderep").addEventListener("click",this.hidePassClick);
        document.getElementById("newpassword").addEventListener("input",this.validatePassword.bind(this));
        document.getElementById("button").addEventListener("click",this.onButtonClick);

    }
    ,
    hidePassClick: function(event){
       switch(event.target.id){
            case "hidenew":
                if(document.getElementById("newpassword").type=="password"){
                    document.getElementById("newpassword").type="text";
                    document.getElementById(event.target.id).classList.remove("fa-eye-slash");
                    document.getElementById(event.target.id).classList.add("fa-eye");
                }else{
                    document.getElementById("newpassword").type="password";
                    document.getElementById(event.target.id).classList.remove("fa-eye");
                    document.getElementById(event.target.id).classList.add("fa-eye-slash");
                }
                break;
            case "hiderep":
                if(document.getElementById("reppassword").type=="password"){
                    document.getElementById("reppassword").type="text";
                    document.getElementById(event.target.id).classList.remove("fa-eye-slash");
                    document.getElementById(event.target.id).classList.add("fa-eye");
                }else{
                    document.getElementById("reppassword").type="password";
                    document.getElementById(event.target.id).classList.remove("fa-eye");
                    document.getElementById(event.target.id).classList.add("fa-eye-slash");
                }
                break;
       }
    },
    validatePassword: function(event){
        this.handler_for_id("eight",this.check_8_len(event.target.value));
        this.handler_for_id("special",this.check_special_character(event.target.value));
        this.handler_for_id("capital",this.check_captial(event.target.value));
        this.handler_for_id("digit",this.check_digit(event.target.value));
        
    },
    handler_for_id:function(id,condition){
        if(condition){
            document.getElementById(id).src="tick.png";
            document.getElementById(id).style.backgroundColor="#00FF00";
        }else{
            document.getElementById(id).src="close.png";
            document.getElementById(id).style.backgroundColor="#999999";
        }
    }
    ,
    check_8_len: function(password){
        return password.length>=8;
    },
    check_special_character:function(password){
        const pattern=/[!-\/:-@[-`{-~]/;
        return pattern.test(password);
    },
    check_captial: function(password){
        const pattern=/\p{Lu}/u;
        return pattern.test(password);
    },
    check_digit:function(password){
        const pattern=/[0-9]/;
        return pattern.test(password);
    },
    onButtonClick:function(event){
        if(document.getElementById("newpassword").value!=document.getElementById("reppassword").value){
            alert("Hasła są różne");
        }else{
            alert("Hasła zgodne");
        }

    }
    
}