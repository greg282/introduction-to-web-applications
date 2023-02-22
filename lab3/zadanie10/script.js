window.onload=function(){
    const a = webApp.init();
}

let webApp ={
    init:function(){
        document.getElementById("game-container").addEventListener("click",this.changePosition.bind(this));
        document.getElementById("wrap").addEventListener("click",this.outOfBound);
        return this
    },
    changePosition:function(event){
        event.stopPropagation();
        if(event.target.id=="ball"){
            return
        }
        const handle=document.getElementById("ball");
        const compStyles = window.getComputedStyle(handle);
        
        const handle2=document.getElementById("game-container");
        const compStyles2 = window.getComputedStyle(handle2);
        
        let tempX=event.offsetX-((parseInt(compStyles.getPropertyValue('width')))/2);
        let tempY=event.offsetY-((parseInt(compStyles.getPropertyValue('height')))/2);
        
        tempX=tempX<0 ? 0 : tempX;
        tempY=tempY<0 ? 0 : tempY;

        const bound2=parseInt(compStyles2.getPropertyValue("width"))-(parseInt(compStyles.getPropertyValue('width')));
        const bound1=parseInt(compStyles2.getPropertyValue("height"))-(parseInt(compStyles.getPropertyValue('height')));

        tempX=tempX>bound2 ? bound2 : tempX;
        tempY=tempY>bound1 ? bound1 : tempY;
        
        handle.style.left=`${tempX}px`;
        handle.style.top=`${tempY}px`;
        
    },
    outOfBound: function(event){
        alert("out of bound");
    }

}