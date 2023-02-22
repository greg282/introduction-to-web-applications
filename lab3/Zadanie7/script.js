window.onload=async function(){
    const app=await webApp.init();
    app.exA();
    app.exB();
    app.exC();
    app.exD();
    app.exE();
    app.exF();
    app.exG();
}


let webApp = {
    data:null,

    init: async function(){
        await fetch('http://localhost:3000/cities')
        .then((response) => response.json())
        .then((data) => this.data=data);
        return this;
    },

    exA:function(){
        const result=this.data.filter(({province}) => province ==="małopolskie");
        let string_result="";
        for(let item in result){
            string_result+=result[item].name;
            string_result+=", ";
        }
        string_result=string_result.replace(/.$/,"");
        string_result=string_result.replace(/.$/,".");
        document.getElementById("a-result").textContent=string_result;
    },

    exB:function(){
        const result=this.data.filter(({name}) => this.exB_help(name));
        let string_result="";
        for(let item in result){
            string_result+=result[item].name;
            string_result+=", ";
        }
        string_result=string_result.replace(/.$/,"");
        string_result=string_result.replace(/.$/,".");
        document.getElementById("b-result").textContent=string_result;
    },
    exB_help:function(name){
        return (name.match(new RegExp("a","g")) || []).length == 2;
    },
    exC:function(){
        const arr=this.data;
        arr.sort(function(a,b){
            if(a.dentensity<b.dentensity){
                return 1;
            }
            if(b.dentensity<a.dentensity){
                return -1;
            }
            return 0;
        });
        
        const result=arr[4].name;
        document.getElementById("c-result").textContent=result;
    },
    exD:function(){
        let string_result="";
        const result=this.data.filter(({people}) => people>100000 );
        for(let item in result){
            string_result+=result[item].name+" City, ";
        }
        string_result=string_result.replace(/.$/,"");
        string_result=string_result.replace(/.$/,".");
        document.getElementById("d-result").textContent=string_result;
    },
    exE:function(){
        const over=this.data.filter(({people}) => people>80000);
        const under=this.data.filter(({people}) => people<80000);
        let string_result=null;
        if(over.length>under.length){
            string_result=`
            Więcej jest miast powyżej 80000,<br>
            Liczba miast z liczbą powyżej 80000: ${over.length},<br>
            Liczba miast z liczbą poniżej 80000: ${under.length}
            `
        }
        else{
            string_result=`
            Więcej jest miast poniżej 80000,<br>
            Liczba miast z liczbą powyżej 80000: ${over.length},<br>
            Liczba miast z liczbą poniżej 80000: ${under.length}
            `
        }
        
        document.getElementById("e-result").innerHTML=string_result.trim();
       
    },
    exF:function(){
        const result=this.data.filter(({township}) => township[0]=="P");
        let sum=0;
        for(let item in result){
            sum+=result[item].area;
        }
        document.getElementById("f-result").textContent=(sum/result.length).toFixed(2);
    },
    exG:function(){
        const result=this.data.filter(({province}) => province=="pomorskie");
        const result2=result.filter(({people}) => people>5000);
        const string_result=`
        Nie wszystkie miasta województwa pomorskiego są większe od 5000 osób.<br>
        Liczba miast Województwa pomorskiego to: ${result.length}.<br>
        Liczba miast Województwa pomorskiego powyżej 5000 osób to: ${result2.length}.
        `;

        document.getElementById("g-result").innerHTML=string_result;
    }

}
