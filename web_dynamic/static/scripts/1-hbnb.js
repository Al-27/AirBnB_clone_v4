let amens = [];
$( document ).ready(()=>{
    $(".amenities li input").on("click", ev=>{
        el = ev.target;
        if( el.checked )
        {
            amens.push(el.dataset);
        }
        else
        {
            let idx = amens.indexOf(el.dataset);
            if(idx >= 0 )
                amens.splice(idx,1);
        }
        let amentxt = "";
        for(let i = 0 ; i < amens.length ; i++)
        {
            amentxt += amens[i].name + (amens.length > 1 && i+1 < amens.length ? ", " : "");
        }
        
        if( amens.length == 0 )
        {
            $(".amenities h4").text("\xa0")
        }
        else
            $(".amenities h4").text(amentxt);
        
        
        console.log(amentxt);
        console.log($(this));
        console.log(this);
        
    });
});