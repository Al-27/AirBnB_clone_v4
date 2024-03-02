let amens = [], cities = [], states = [];
let   filter_ids = {amenities: [], cities: [], states: []};
$(  document  ).ready( ()=>{
    
    function checked_inp(el, arr, type)
    {
        console.log(arr);
        key = ["amenities", "cities", "states"];
        if(  el.checked  )
        {
            arr.push( el.dataset );
            filter_ids[key[type]].push(el.dataset.id);
        }
        else
        {
            let idx = arr.indexOf( el.dataset );
            if( idx >= 0  )
            {
                arr.splice( idx,1 );
                filter_ids[key[type]].splice(idx,1);
            }
        }
        let text = "";
        for( let i = 0 ; i < arr.length ; i++ )
        {
            text += arr[i].name + ( arr.length > 1 && i+1 < arr.length ? ", " : "" );
        }
        
        
        if(  arr.length == 0 && type == 0 )
        {
            $( `.amenities h4` ).text( "\xa0" )
        }
        else if (type == 0)
            $( `.amenities h4` ).text( text );
    } 
    
    
    $( ".amenities li input" ).on( "click", ev=>{
        el = ev.target;
        checked_inp(el, amens, 0);
    } );
    
    $( ".locations input" ).on( "click", ev=>{
        el = ev.target; 
        if( el.dataset.type == "state" )
            checked_inp(el, states, 2);
        else
            checked_inp(el, cities, 1);
        
        if( cities.length == 0 && states.length == 0) 
        {
            $( `.locations h4` ).text( "\xa0" );
        }
        else
        {
            
            $( `.locations h4` ).text( "\xa0" );
            let text= "";
            let arrs = 2
            while(arrs > 0)
            {
                let arr = arrs == 2 ? states : cities;
                console.log(arr);
                
                for( let i = 0 ; i < arr.length ; i++ )
                {
                    
                    text += (arrs == 1 && i == 0 && text != "" ? ", " : "") + arr[i].name + ( arr.length > 1 && i+1 < arr.length ? ", " : "" );
                }
                arrs--;
            }
            $( `.locations h4` ).text( text );
        }
            
    } );
    
    $.ajax( "http://0.0.0.0:5001/api/v1/status/" ).done( res=>{
        if(  res.status == "OK"  )
            $( "#api_status" ).addClass( "available" );
        else
            $( "#api_status" ).removeClass( "available" );        
    } );
    
    let api = (amns) => $.ajax( {url:"http://0.0.0.0:5001/api/v1/places_search/",method:"POST",contentType: "application/json",
    dataType: "json",data: JSON.stringify(amns) } ).done( res=>{
        $( "section.places" ).empty();
        res.forEach( place => {
            let article = $( "<article/>" )

            let divTitlebx =  $( "<div/>" ,{"class": "title_box"} );
            $(  divTitlebx  ).append(  $( "<h2>" ).text( place.name )  );
            $(  divTitlebx  ).append(  $( "<div>" ).text( place.price_by_night ).addClass( "price_by_night" ) );
          
            let divInfo = $( "<div/>",{"class": "information"} );
            let maxG = place.max_guest;
            $(  divInfo  ).append( $( "<div/>" ).addClass( "max_guest" ).text( `${place.max_guest} Guest${maxG > 1 ? "s" : ""}` ) );
            let rooms = place.number_rooms;
            $(  divInfo  ).append( $( "<div/>" ).addClass( "number_rooms" ).text( `${rooms} Bedroom${rooms > 1 ? "s" : ""}` ) );
            let brooms = place.number_bathrooms;
            $(  divInfo  ).append( $( "<div/>" ).addClass( "number_bathrooms" ).append( `${brooms} Bathroom${brooms > 1 ? "s" : ""}` ) );

            let divDesc = $( "<div/>",{"class": "description"} );
            $( divDesc ).append( place.description );
            
            $( article ).append(  divTitlebx  );
            $( article ).append(  divInfo  );
            $( article ).append(  divDesc  );
            
            $( "section.places" ).append( article ); 
        });
        
    });
    
    $(".filters button").on("click", (e)=>
    {
        api(filter_ids);
    });
    api(filter_ids);
} );
