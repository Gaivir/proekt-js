import './styles.css';
import './js/mask'; //Прелодер
import getRefs from './js/get-refs';
import countryCodes from './js/countryCodes';
// import EventsApiService from './js/apiService';
import eventCardTpl from './templates/event-card.hbs';

const refs = getRefs();
// const eventsApiService = new EventsApiService();


showDefoltEventsCardsContainer(); // запускаємо функцію рендомних івентів


refs.searchForm.addEventListener('submit', sendSubmit);    


function createCountriesSelect() {
    const options = countryCodes.map(({ alphaCode, name }) => {   // деструктуризація елементів масиву обєктів країн
        return `<option value="${alphaCode}">${name}</option>`;   //парент-строка з даними
    });
    refs.select.insertAdjacentHTML('beforeend', options);  // заганяєм це все добро в кнопку
}
createCountriesSelect(countryCodes); 




// ПРАЦЮЄМО НАД ПОШУКОМ ІВЕНТА ЗА ЗАПИТОМ В ІНПУТІ

function sendSubmit(elm) {
    elm.preventDefault();
    clearEventsContainer();
    const searchQuery = elm.currentTarget.elements.query.value;
    console.log(searchQuery);
    const countrieShotName = refs.select.value;
    console.log(countrieShotName);
    // eventsApiService.fetchEvents().then(events => {
    //     appendEventsMarkup(events);
    // });

    $.ajax({
  type:"GET",
  url:`https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchQuery}&countryCode=${countrieShotName}&apikey=WGDdP3YAAk6i0WXbExybZ5iiF1gr1Jl5`,
  async:true,
  dataType: "json",
        success: function (response) {
    //         if (searchQuery !== response._embedded.events) {
    //     console.log("OYYYYY");
    // }
            console.log(response._embedded.events);
            appendEventsMarkup(response._embedded.events);
            
           },
  error: function(error) {
       console.log("ERROR");
   
           }
    })
  
}


// Дефолтний пошук івентів (відображення івентів дефолтних на сторінці)

function showDefoltEventsCardsContainer() {
    // eventsApiService.fetchDefoltEvents().then(events => {
    //     console.log(events);
    //     appendEventsMarkup(events);
    // });
   $.ajax({
  type:"GET",
  url:`https://app.ticketmaster.com/discovery/v2/events.json?apikey=WGDdP3YAAk6i0WXbExybZ5iiF1gr1Jl5`,
  async:true,
  dataType: "json",
  success: function(response) {
     appendEventsMarkup(response._embedded.events);
             
           },
  error: function(xhr, status, err) {
      console.log("ERROR");
              
           }
   })
    
}




// створюємо колукцію карток по шаблону events

function appendEventsMarkup(data) {
    refs.eventsCards.insertAdjacentHTML('beforeend', eventCardTpl(data));

}


// Чистимо
function clearEventsContainer() {
    refs.eventsCards.innerHTML = "";
}




