window.onload=function(){
    const a = webApp.init();
}
const webApp= {
    counter:0,
    init:function(){
        document.getElementById("button").addEventListener("click",this.addRecord.bind(this));
    },
    addRecord: function(event){ 
       const name=document.getElementById('name').value;
       const phone=document.getElementById('phone').value; 

       if(this.isValid(name,phone)){
            const temp = document.createElement('div');
            temp.innerHTML=this.getRecordBoxTemplate(name,phone,this.counter).trim();
            temp.id="example-record";
            document.getElementById("phonebook").prepend(temp);
            const tmpcount=this.counter;
            document.getElementsByClassName("e"+tmpcount)[0].addEventListener("click",(e)=> this.handler(e,tmpcount));
            this.counter=this.counter+1;
       }
    },
    getRecordBoxTemplate: function(name,phone,counter) {
        return `
            <div id="record-left">
                <div id="record-name">${name}</div>
                <div id="record-tel">${phone}</div>
            </div>
            <div id="record-right" class="e${counter}">
            </div>
        `;
    },
    handler: function(event,idnumber){
        const element=document.getElementsByClassName("e"+idnumber)[0];
        element.parentElement.remove();
    },
    isValid: function(name,phone){
     
        const pattern_name = /^\p{Lu}+\p{Ll}*\s+\p{Lu}+\p{Ll}*(-\p{Lu})?\p{Ll}*$/u;
        if(!pattern_name.test(name)){
            alert("invalid name");
        }
        if(!this.phoneValidation(phone)){
            alert("invalid phone number");
        }
         
        return pattern_name.test(name) && this.phoneValidation(phone);
    },
    phoneValidation: function(phone){
        const pattern_phone =/^\+?[0-9]*$/;
        const digits=phone.replaceAll(/\s/g,'').replace(/[^0-9]/g, '').length;
        if(digits==9 || digits ==12)
        {
            return pattern_phone.test(phone.replaceAll(/\s/g,''));
        }else
        {
           return false
        }
    }
}