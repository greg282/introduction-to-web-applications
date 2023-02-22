window.onload = function() {
    const a = webApp.init();
    
}

let webApp = {
    order_of_execute:false,
    propagate: false,
    flag:false,
    sum:0,
 
    init: function() {
        this.addEventListeners();
        this.buttonsListeners();
        return this;
    },
    addEventListeners: function(){
        const list=document.getElementsByClassName("button");
        
        for(let item of list){
            item.addEventListener("click",(e) => this.myClick(e,item,this),this.order_of_execute);
            item.enabled=true;

        }
    },
    myClick: function(event,item,that){
        console.log(event);
        console.log(item);

        
        if(!event.target.enabled){
            return
        }
   

 
        if(item.id==event.target.id){
            document.getElementById("infobox").innerHTML="";
        }
        const temp=that.propagate ? item: event.target;
        
        switch(temp.id){

            case "first":
                if(temp.enabled){
                    that.sum+=1;
                    document.getElementById("infobox").innerHTML+="nacisnąłeś niebieski o wartości 1 <br>";
                }
                break;
            case "second":
                if(temp.enabled){
                    that.sum+=2;
                    document.getElementById("infobox").innerHTML+="nacisnąłeś czerwony o wartości 2 <br>";
                }
                break;
            case "third":
                if(temp.enabled){
                    that.sum+=5;
                    document.getElementById("infobox").innerHTML+="nacisnąłeś żółty o wartości 5 <br>";
                }

                break;
            
        }
        document.getElementById("counter").innerText=that.sum;

        if(that.sum>30){
            document.getElementById("second").enabled=false;
         }
         if(that.sum>50){
             document.getElementById("third").enabled=false;
         }
 
        if(!that.propagate){
            event.stopPropagation();
        }

       
    },
    buttonsListeners: function(){
        document.getElementById("reset").addEventListener("click",(e) => {
            this.sum=0;
            document.getElementById("counter").innerText=0;
            document.getElementById("infobox").innerHTML="";
            document.getElementById("second").enabled=true;
            document.getElementById("third").enabled=true;
         });

        document.getElementById("propagate-button").addEventListener("click",(e) => {
            if(this.propagate){
                e.target.innerText="StartPropagation"
            }
            else{
                e.target.innerText="StopPropagation"
            }
            this.propagate=!this.propagate;
            
        });

        document.getElementById("reverse").addEventListener("click",this.reverse.bind(this));
    },
    reverse: function(){
        this.order_of_execute= !this.order_of_execute;
    },
 

}