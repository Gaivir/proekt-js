
const API_KAY = "WGDdP3YAAk6i0WXbExybZ5iiF1gr1Jl5";
const URL = "https://app.ticketmaster.com/discovery/v2/events.json";


export default class EventsApiService {
    constructor() {
        this.searchQuery = '';
    }

fetchEvents() {
     $.ajax({
  type:"GET",
  url:`${URL}?keyword=${searchQuery}&countryCode=${countrieShotName}&apikey=${API_KAY}`,
  async:true,
  dataType: "json",
        success: function (response) {
    //         if (searchQuery !== response._embedded.events) {
    //     console.log("OYYYYY");
    // }
             return response._embedded.events;
             
            
           },
  error: function(error) {
       console.log("ERROR");
   
           }
    })

}


fetchDefoltEvents () {
      $.ajax({
  type:"GET",
  url:`${URL}?apikey=${API_KAY}`,      
  async:true,
  dataType: "json",
  success: function(response) {
     return response._embedded.events;
    
             
           },
  error: function(error) {
      console.log("ERROR");
              
           }
   })
    
    }
    
}





