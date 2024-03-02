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
        
        
    });
    
    $.ajax("http://0.0.0.0:5001/api/v1/status/").done(res=>{
        if( res.status == "OK" )
            $("#api_status").addClass("available");
        else
            $("#api_status").removeClass("available");
        
    });
    
    $.ajax({url:"http://0.0.0.0:5001/api/v1/places_search/",method:"POST",contentType: "application/json",
    dataType: "json",data: "{}" }).done(res=>{
        res.forEach(place => {
            let article = $("<article/>")

            let divTitlebx =  $("<div/>" ,{"class": "title_box"});
            $( divTitlebx ).append($("<h2>").text(place.name));
            $( divTitlebx ).append($("<div>").text(place.price_by_night).addClass("price_by_night"));
          
            let divInfo = $("<div/>",{"class": "information"});
            let maxG = place.max_guest;
            $( divInfo ).append($("<div/>").addClass("max_guest").text(`${place.max_guest} Guest${maxG > 1 ? "s" : ""}`));
            let rooms = place.number_rooms;
            $( divInfo ).append($("<div/>").addClass("number_rooms").text(`${rooms} Bedroom${rooms > 1 ? "s" : ""}`));
            let brooms = place.number_bathrooms;
            $( divInfo ).append($("<div/>").addClass("number_bathrooms").append(`${brooms} Bathroom${brooms > 1 ? "s" : ""}`));

            let divDesc = $("<div/>",{"class": "description"});
            $(divDesc).append(place.description);
            
            $(article).append( divTitlebx );
            $(article).append( divInfo );
            $(article).append( divDesc );
            
            $("section.places").append(article); 
        });
            
        
    });
});
