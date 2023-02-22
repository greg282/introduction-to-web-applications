window.onload = function(){
    const app = webApp.init();
}

let webApp = {
    workers_array:null,
    current_index:0,

    init : function(){
        this.getData();

        document.getElementById("button-left").enabled=true;
        document.getElementById("button-left").used=false;
        document.getElementById("button-right").enabled=true;
        document.getElementById("button-right").used=false;


        document.getElementById("button-left").addEventListener("click",this.myClickLeft.bind(this));
        document.getElementById("button-right").addEventListener("click",this.myClickRight.bind(this));
        document.getElementById("random").addEventListener("click",this.myClickRandom.bind(this));
        document.getElementById("random").enabled=true;

        const temp = document.createElement('div');
        temp.classList.add("wrap");
        temp.innerHTML=this.workers_array[this.current_index];
        document.getElementById("worker").innerHTML="";
        document.getElementById("worker").prepend(temp);

    },

    myClickLeft : function(event){
        if(!event.target.enabled){
            return;
        }
        event.target.enabled=false;
        event.target.used=true;
        document.getElementById("button-right").enabled=false;
        this.current_index-=1;
        this.current_index=this.current_index<0 ? this.workers_array.length-1:this.current_index;

        this.setDataIndex();



    },
    myClickRight : function(event){
        if(!event.target.enabled){
            return;
        }   
        event.target.enabled=false;
        event.target.used=true;

        document.getElementById("button-left").enabled=false;

        this.current_index+=1;
        this.current_index=this.current_index > this.workers_array.length-1 ? 0:this.current_index;
        this.setDataIndex();

    }
    ,
    getData: function(){
        const arr=[
            "\n            <div class=\"round-photo\">\n                <img src=\"https://robohash.org/molestiaeeatemporibus.png?size=300x300&set=set1\" alt=\"\" class=\"photo\">\n            </div>\n            <div class=\"name\">Collin Rau</div>\n            <div class=\"position\">Investor Healthcare Administrator</div>\n            <div class=\"quote\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum officia officiis quas sequi possimus dolorem expedita labore? Excepturi doloremque odio animi, quaerat iste, nisi porro enim illo officia, impedit similique esse reprehenderit est quibusdam. Lorem ipsum dolor sit amet. </div>\n        ",
            "\n            <div class=\"round-photo\">\n                <img src=\"https://robohash.org/estquifuga.png?size=300x300&set=set1\" alt=\"\" class=\"photo\">\n            </div>\n            <div class=\"name\">Shara Heidenreich</div>\n            <div class=\"position\">Direct Administration Representative</div>\n            <div class=\"quote\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum officia officiis quas sequi possimus dolorem expedita labore? Excepturi doloremque odio animi, quaerat iste, nisi porro enim illo officia, impedit similique esse reprehenderit est quibusdam. Lorem ipsum dolor sit amet. </div>\n        ",
            "\n            <div class=\"round-photo\">\n                <img src=\"https://robohash.org/utquamid.png?size=300x300&set=set1\" alt=\"\" class=\"photo\">\n            </div>\n            <div class=\"name\">Amber Cartwright</div>\n            <div class=\"position\">Dynamic Engineer</div>\n            <div class=\"quote\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum officia officiis quas sequi possimus dolorem expedita labore? Excepturi doloremque odio animi, quaerat iste, nisi porro enim illo officia, impedit similique esse reprehenderit est quibusdam. Lorem ipsum dolor sit amet. </div>\n        ",
            "\n            <div class=\"round-photo\">\n                <img src=\"https://robohash.org/estpraesentiumautem.png?size=300x300&set=set1\" alt=\"\" class=\"photo\">\n            </div>\n            <div class=\"name\">Dustin Nicolas</div>\n            <div class=\"position\">Principal Consultant</div>\n            <div class=\"quote\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum officia officiis quas sequi possimus dolorem expedita labore? Excepturi doloremque odio animi, quaerat iste, nisi porro enim illo officia, impedit similique esse reprehenderit est quibusdam. Lorem ipsum dolor sit amet. </div>\n        ",
            "\n            <div class=\"round-photo\">\n                <img src=\"https://robohash.org/omnisprovidentaut.png?size=300x300&set=set1\" alt=\"\" class=\"photo\">\n            </div>\n            <div class=\"name\">Eladia Rau</div>\n            <div class=\"position\">Global Manufacturing Supervisor</div>\n            <div class=\"quote\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum officia officiis quas sequi possimus dolorem expedita labore? Excepturi doloremque odio animi, quaerat iste, nisi porro enim illo officia, impedit similique esse reprehenderit est quibusdam. Lorem ipsum dolor sit amet. </div>\n        ",
            "\n            <div class=\"round-photo\">\n                <img src=\"https://robohash.org/possimuseaqueblanditiis.png?size=300x300&set=set1\" alt=\"\" class=\"photo\">\n            </div>\n            <div class=\"name\">Michale Dibbert</div>\n            <div class=\"position\">Future Technology Specialist</div>\n            <div class=\"quote\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum officia officiis quas sequi possimus dolorem expedita labore? Excepturi doloremque odio animi, quaerat iste, nisi porro enim illo officia, impedit similique esse reprehenderit est quibusdam. Lorem ipsum dolor sit amet. </div>\n        ",
            "\n            <div class=\"round-photo\">\n                <img src=\"https://robohash.org/voluptatemimpeditvoluptas.png?size=300x300&set=set1\" alt=\"\" class=\"photo\">\n            </div>\n            <div class=\"name\">Colette Mitchell</div>\n            <div class=\"position\">Forward Banking Officer</div>\n            <div class=\"quote\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum officia officiis quas sequi possimus dolorem expedita labore? Excepturi doloremque odio animi, quaerat iste, nisi porro enim illo officia, impedit similique esse reprehenderit est quibusdam. Lorem ipsum dolor sit amet. </div>\n        ",
            "\n            <div class=\"round-photo\">\n                <img src=\"https://robohash.org/laboreaipsa.png?size=300x300&set=set1\" alt=\"\" class=\"photo\">\n            </div>\n            <div class=\"name\">Melvin Tremblay</div>\n            <div class=\"position\">Chief Technology Strategist</div>\n            <div class=\"quote\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum officia officiis quas sequi possimus dolorem expedita labore? Excepturi doloremque odio animi, quaerat iste, nisi porro enim illo officia, impedit similique esse reprehenderit est quibusdam. Lorem ipsum dolor sit amet. </div>\n        ",
            "\n            <div class=\"round-photo\">\n                <img src=\"https://robohash.org/minusaccusantiumnecessitatibus.png?size=300x300&set=set1\" alt=\"\" class=\"photo\">\n            </div>\n            <div class=\"name\">Dong Wolf</div>\n            <div class=\"position\">Future IT Administrator</div>\n            <div class=\"quote\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum officia officiis quas sequi possimus dolorem expedita labore? Excepturi doloremque odio animi, quaerat iste, nisi porro enim illo officia, impedit similique esse reprehenderit est quibusdam. Lorem ipsum dolor sit amet. </div>\n        ",
            "\n            <div class=\"round-photo\">\n                <img src=\"https://robohash.org/etsintlaboriosam.png?size=300x300&set=set1\" alt=\"\" class=\"photo\">\n            </div>\n            <div class=\"name\">Newton Rutherford</div>\n            <div class=\"position\">Legal Technician</div>\n            <div class=\"quote\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum officia officiis quas sequi possimus dolorem expedita labore? Excepturi doloremque odio animi, quaerat iste, nisi porro enim illo officia, impedit similique esse reprehenderit est quibusdam. Lorem ipsum dolor sit amet. </div>\n        "
        ];
        this.workers_array=arr;
    },
    generateWorker:function(photo_src,name,position){
        return `
            <div class="round-photo">
                <img src="${photo_src}" alt="" class="photo">
            </div>
            <div class="name">${name}</div>
            <div class="position">${position}</div>
            <div class="quote">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam illum officia officiis quas sequi possimus dolorem expedita labore? Excepturi doloremque odio animi, quaerat iste, nisi porro enim illo officia, impedit similique esse reprehenderit est quibusdam. Lorem ipsum dolor sit amet. </div>
        `
    },
    setDataIndex:function(){     
        const temp = document.createElement('div');
    
        temp.classList.add("wrap");
        const computedStyle=window.getComputedStyle(document.getElementById("worker").firstChild);

        const width=computedStyle.width;
        temp.style.width=width;
        temp.style.left=`${width}`;
        temp.style.top=0;
        temp.style.position="absolute";
        temp.style.transition="ease-in-out 1s";
        temp.style.background="#F0F4F7";
        temp.style.zIndex="10";

        if(document.getElementById("button-left").used){
            temp.style.left=`-${width}`;
        }
        temp.addEventListener('transitionend', (event) => {
            if(event.target != document.getElementById("worker").firstChild){
                return;
            }
            event.target.style.width="auto";
            document.getElementById("worker").lastChild.remove();
            document.getElementById("worker").firstChild.style.position="relative";
            document.getElementById("button-left").enabled=true;
            document.getElementById("button-left").used=false;
            document.getElementById("button-right").enabled=true;
            document.getElementById("button-right").used=false;
            document.getElementById("random").enabled=true;

        });
     
        temp.innerHTML=this.workers_array[this.current_index];  
        document.getElementById("worker").prepend(temp);

        requestAnimationFrame(() =>
                setTimeout(() => {
                    if(document.getElementById("button-left").used){
                        document.getElementById("worker").lastChild.style.left=`${width}`;
                    }
                    else{
                        document.getElementById("worker").lastChild.style.left=`-${width}`;
                    }
                    document.getElementById("worker").firstChild.style.left=0;

                }));
            
    },
    myClickRandom:function(event){
        if(!document.getElementById("random").enabled){
            return;
        }
        let index=Math.floor(Math.random() * 10);
        while(index == this.current_index){
            index=Math.floor(Math.random() * 10);
        }
        this.current_index=index;
        document.getElementById("button-left").click();
        
    }
}
