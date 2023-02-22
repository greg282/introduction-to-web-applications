window.onload=function(){
    loadEverything();

}

//global variables for script
let globalCountryArray=[];
let subregionsArray=[];
let sortArray=[];
let perPagePositions=20;
let curr_page;
let static=false;

function loadEverything(){
    fetch("https://restcountries.com/v3.1/all").then(response =>response.json()).then(data => dataReady(data));
}
/////////////////subregion view code
function generateSubregionrow(sub_name,total_area,total_popul){
    return `
    <td>${sub_name}</td>
    <td><div class="moreinfo" id="${sub_name}">rozwiń</div></td>
    <td>${total_popul}</td>
    <td>${total_area}</td>
    `;
}

function calculateSubregions(){



    for(i in subregionsArray){
        let result=globalCountryArray.filter(({subregion}) => subregion==subregionsArray[i]);
        let sum_area=0;
        let sum_popul=0;
        for( j in result){
            sum_area+=result[j].area;
            sum_popul+=result[j].population;
        }
        let tmp=document.createElement("tr");
        tmp.innerHTML=generateSubregionrow(subregionsArray[i],sum_area,sum_popul);
        document.getElementById("my_table").append(tmp);
    }
    addListener();

}


function addListener(){
    const tmp=document.getElementsByClassName("moreinfo");
    for(let i=0;i<tmp.length;i++){
        tmp[i].enabled=false;
        document.getElementById(tmp[i].id).addEventListener("click",function(e){
            if(e.target.enabled){
                const tmpbutton=e.target;
                const parent= e.target.parentNode;
                parent.innerHTML="";
                parent.append(tmpbutton);
                e.target.enabled=false;
                return;
            }
            else{
                const newEl=document.createElement("tr");
                newEl.innerHTML=`
                <th >Name</th>
                <th >Capital</th>
                <th >Population</th>
                <th >Area</th>
                `
                
                let result=globalCountryArray.filter(({subregion}) => subregion== e.target.id);
                for(let j=0;j<result.length;j++){
                    let tmp2=document.createElement("tr");
                    tmp2.innerHTML=  generateTableRow(result[j].name.common,result[j].capital,result[j].population,result[j].area,result[j].flags.png);
                   
                    document.getElementById( e.target.id).after(tmp2);
                    
                }   
                e.target.enabled=true;
                document.getElementById( e.target.id).after(newEl);
            }
       
        });
        
    }
}

function changeView(){
    
    if(document.getElementById("form").style.display=="none")
    {
        document.getElementById("second-column").style.width="20%";
        document.getElementById("third-column").style.width="20%";
        document.getElementById("four-column").style.width="20%";
        document.getElementById("form").style.display="";
        const butn=document.getElementsByClassName("sorting");
        for(let i=0;i<butn.length;i++){
            butn[i].style.display="";
        }
        document.getElementById("name-sort").reverse=false;
        document.getElementById("capital-sort").reverse=false;
        document.getElementById("population-sort").reverse=false;
        document.getElementById("area-sort").reverse=false;
        dataReady(globalCountryArray);
    }
    else{
        document.getElementById("form").style.display="none";
        document.getElementById("second-column").style.width="40%";
        document.getElementById("third-column").style.width="10%";
        document.getElementById("four-column").style.width="10%";
        document.getElementById("my_table").innerHTML="";
        document.getElementById("pages_l").innerHTML="";
        const butn=document.getElementsByClassName("sorting");
        for(let i=0;i<butn.length;i++){
            butn[i].style.display="none";
        }
        
        calculateSubregions();
    }
   
}
//////////////////////////////////

//loading page ang pagination
function dataReady(data){//starting array
    if(!static){
        staticListeners();
        static=true;
    }
    
    sortArray=data;
    globalCountryArray=data;
    generatePageMap(globalCountryArray);
    addEventListeners();
    curr_page=1;
    loadPage(1,globalCountryArray);
    extractSubregions(data);
    subregionList();  
}

function generateTableRow(name,capital,population,area,img_src){
    return `
    <td><div class="flex"><img src="${img_src}" alt="">${name}</div></td>
    <td>${capital}</td>
    <td>${population}</td>
    <td>${area}</td>
    `;
}

function insert_Row_append(row_data){
    const tmp=document.createElement("tr");
    tmp.innerHTML=generateTableRow(row_data.name.common,row_data.capital,row_data.population,row_data.area,row_data.flags.png);
    document.getElementById("my_table").append(tmp);
}

function loadPage(page_number,data_array=globalCountryArray){
    const lower_range=(page_number-1)*perPagePositions;
    const higher_range=(page_number)*perPagePositions;
    document.getElementById("my_table").innerHTML="";
    for (let i = lower_range; i < higher_range; i++) {
        if(i==data_array.length){
            break;
        }
        insert_Row_append(data_array[i]);
        
    }
    if(document.getElementById(`p${curr_page}`)==null){
        return
    }
    document.getElementById(`p${curr_page}`).style.backgroundColor="";
    document.getElementById(`p${page_number}`).style.backgroundColor="#327cad";
    curr_page=page_number;
}

function generatePageMap(data_array=sortArray){
    const n_of_page=data_array.length % perPagePositions == 0 ? data_array.length/perPagePositions:  (data_array.length/perPagePositions)+1;

    let pages=`<div id="left">&laquo;</div>`;
    
    for (let i = 1; i <= n_of_page; i++) {
        pages+=`<div class="page-btn" id="p${i}">${i}</div> \n`;
    }
    pages+=`<div id="right">&raquo;</div>`;
    document.getElementById("pages_l").innerHTML=pages;
}
//end of loading page and pagination

function extractSubregions(data){
  
    for(i in data){
        if(!(subregionsArray.includes(data[i].subregion))){
            if(!(data[i].subregion == undefined))
            {
              subregionsArray.push(data[i].subregion);
                
            }
        }
    }
}

function capitalSearch(){//filtering array
    let input, filter;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    let result=globalCountryArray.filter(({capital}) => capital==undefined ? false:capital[0].toUpperCase().indexOf(filter)>-1);
    

    input = document.getElementById("selectRegion");
    filter = input.selectedOptions[0].outerText.toUpperCase();
    if(filter!="CHOOSE A SUBREGION"){
        result=result.filter((({subregion}) => subregion==undefined ? false:subregion.toUpperCase().indexOf(filter)>-1));

    }

    let slider = document.getElementById("myRange");
    let output = document.getElementById("demo");
    output.innerHTML = slider.value;
    result=result.filter((({population}) => population==undefined ? false:population<=slider.value));

    
    slider = document.getElementById("myRange2");
    output = document.getElementById("demo2");
    output.innerHTML = slider.value;
    result=result.filter((({area}) => area==undefined ? false:area<=slider.value));


    reloadFilteredArray(result);

}



function subregionList(){
    const select = document.getElementById("selectRegion");
    const options = subregionsArray;  
    for(let i = 0; i < options.length; i++) {
        let opt = options[i];
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}


function reloadFilteredArray(data){
    curr_page=1;
    sortArray=data;
    generatePageMap();
    addEventListeners();
    loadPage(1,data);
}


//sort functions
function addEventListeners(){
    const btns=document.getElementsByClassName("page-btn");
   
    for (let i = 0; i < btns.length; i++) {
       btns[i].addEventListener("click",function(e){
            loadPage(parseInt(e.target.innerHTML));
       });
    }

    document.getElementById("right").addEventListener("click",function(e){
        const n_of_page=sortArray.length % perPagePositions == 0 ? sortArray.length/perPagePositions:  (sortArray.length/perPagePositions)+1;

        if(curr_page+1<=n_of_page){
            loadPage(curr_page+1,sortArray);
        }
        
    })
    document.getElementById("left").addEventListener("click",function(e){
        const n_of_page=sortArray.length % perPagePositions == 0 ? sortArray.length/perPagePositions:  (sortArray.length/perPagePositions)+1;

        if(curr_page-1>0){
            loadPage(curr_page-1,sortArray);
        }
        
    })
   

}
function staticListeners(){
    document.getElementById("name-sort").reverse=false;
    document.getElementById("name-sort").addEventListener("click",function(e){
        if(document.getElementById("name-sort").reverse){
            sortArray=sortArray.reverse();
            document.getElementById("name-sort").reverse=false;
            loadPage(curr_page,sortArray);
            return;
        }
        sortArray.sort(function(a,b){
            return a.name.common.localeCompare(b.name.common);
           
        });
      
        loadPage(curr_page,sortArray);
        document.getElementById("name-sort").reverse=true;
        document.getElementById("capital-sort").reverse=false;
        document.getElementById("population-sort").reverse=false;
        document.getElementById("area-sort").reverse=false;
    });

    document.getElementById("capital-sort").reverse=false;
    document.getElementById("capital-sort").addEventListener("click",function(e){
       
        if(document.getElementById("capital-sort").reverse){
            sortArray=sortArray.reverse();
            document.getElementById("capital-sort").reverse=false;
            loadPage(curr_page,sortArray);
            return;
        }
        sortArray.sort(function(a,b){
            if(a.capital == undefined && b.capital==undefined){
                return 0;
            }
            if(a.capital == undefined){
                return 1;
            }
            if(b.capital == undefined){
                return -1;
            }
            return a.capital[0].localeCompare(b.capital[0]);

        });
      
        loadPage(curr_page,sortArray);
        document.getElementById("name-sort").reverse=false;
        document.getElementById("capital-sort").reverse=true;
        document.getElementById("population-sort").reverse=false;
        document.getElementById("area-sort").reverse=false;
    });

    document.getElementById("population-sort").reverse=false;
    document.getElementById("population-sort").addEventListener("click",function(e){
     
        if(document.getElementById("population-sort").reverse){
            sortArray=sortArray.reverse();
            document.getElementById("population-sort").reverse=false;
            loadPage(curr_page,sortArray);
            return;
        }

        sortArray.sort(function(a,b){
            if(a.population>b.population){
                return 1;
            }
            if(a.population<b.population){
                return-1;
            }
            return 0;
        });
      
        loadPage(curr_page,sortArray);
        document.getElementById("name-sort").reverse=false;
        document.getElementById("capital-sort").reverse=false;
        document.getElementById("population-sort").reverse=true;
        document.getElementById("area-sort").reverse=false;
    });

    document.getElementById("area-sort").reverse=false;
    document.getElementById("area-sort").addEventListener("click",function(e){
        
        if(document.getElementById("area-sort").reverse){
            sortArray=sortArray.reverse();
            document.getElementById("area-sort").reverse=false;
            loadPage(curr_page,sortArray);
            return;
        }

        sortArray.sort(function(a,b){
            if(a.area>b.area){
                return 1;
            }
            if(a.area<b.area){
                return-1;
            }
            return 0;
        });
      
        loadPage(curr_page,sortArray);
        document.getElementById("name-sort").reverse=false;
        document.getElementById("capital-sort").reverse=false;
        document.getElementById("population-sort").reverse=false;
        document.getElementById("area-sort").reverse=true;
    });

}
