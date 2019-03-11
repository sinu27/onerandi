function resizetextarea(textareaid,samestyledivid){
    if(navigator.userAgent.toLowerCase().indexOf('safari')!=-1) return;
    var isie=(navigator.userAgent.toLowerCase().indexOf('msie')!=-1)? true : false;
    var textarea=document.getElementById(textareaid);
    textarea.style.overflow='hidden';
    if(isie) var samestylediv=document.createElement('<div id="'+samestyledivid+'">');
    else{
        var samestylediv=document.createElement('div');
        samestylediv.setAttribute('id',samestyledivid);
    }
    textarea.parentNode.appendChild(samestylediv);
    with(samestylediv.style){
        position='absolute';
        left='-20000px';
        top='-20000px';
        paddingTop=0;
        paddingBottom=0;
        borderTop=0;
        borderBottom=0;
        overflow='visible';
    }
    var originalheight=samestylediv.offsetHeight;
    samestylediv.style.height='auto';
    samestylediv.innerHTML='&nbsp;';
    var range=samestylediv.offsetHeight;
    textarea.onkeydown=function(e){
        if(isie) e=window.event;
        if(e.keyCode==13) this.style.height=(originalheight<samestylediv.offsetHeight+range)? samestylediv.offsetHeight+range+'px' : originalheight+'px';
    }
    textarea.onkeyup=function(){
        samestylediv.innerHTML=this.value.replace(/\n/g,'<br \/>');
        if(this.value.match(/\n.?$/)) samestylediv.innerHTML+='<br \/>';
        this.style.height=(originalheight<samestylediv.offsetHeight)? samestylediv.offsetHeight+'px' : originalheight+'px';
    }
    textarea.oncontextmenu=function(){
        var maxtime=5000,nowtime=0;
        var savecontent=textarea.value;
        var action=function(){
            clearTimeout(textarea.pastetimer);
            if(savecontent==textarea.value && maxtime>nowtime){
                nowtime+=10;
                textarea.pastetimer=setTimeout(action,10);
            }else{
                textarea.onkeyup();
                nowtime=0;
            }
        }
        action();
    }
    textarea.onkeyup();
    if(navigator.userAgent.toLowerCase().indexOf('opera')!=-1){
        textarea.onfocus=function(){
            var action=function(){
                textarea.onkeyup();
                textarea.foropera=setTimeout(action,10);
            }
            action();
        }
        textarea.onblur=function(){
            clearInterval(this.foropera);
        }
    }
}
