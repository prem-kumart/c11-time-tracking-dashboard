
const btnDaily = document.querySelector('.daily');
const btnWeekly =  document.querySelector('.weekly');
const btnMonthly = document.querySelector('.monthly');


const renderHTMl = function(classAttribute,timeframes,addText){

   const  html =
        `
        <h2 class="current">${timeframes.current} hrs</h2>
        <p class="previous">${addText} - ${timeframes.previous}hrs </p>    
       `
    const HMTLtag =document.querySelector(`.${classAttribute.split(' ').join('-')}`);
   
    HMTLtag.innerHTML = html;

}

//Fetching data from data file using async/await.
const fetchJSONData =  async function(){
 try {  
    const fetchResponse =  await fetch('./data.json');
    //console.log(fetchResponse)
    if(!fetchResponse.ok){
        throw new Error('File not found 📁')
    }
    const jsonDatafile = await fetchResponse.json();

    return jsonDatafile;
    }
    catch(err){
        throw err;
    }
}


const dataExtraction = async function(timeline,addText){

        try {    
             const data = await fetchJSONData();
             for(let card in data){
                renderHTMl(data[card].title,data[card].timeframes[`${timeline}`],addText);
             }
    
        } catch(err){
            console.log(` ⚡️ Error Message is ${err.message}`);
        }

}


dataExtraction('weekly','Last Week');
btnWeekly.style.color = 'white';

btnDaily.addEventListener('click',()=>{
     
     btnDaily.style.color = 'white';

     btnMonthly.style.color = 'hsl(236, 100%, 87%)';
     btnWeekly.style.color = 'hsl(236, 100%, 87%)';
     dataExtraction('daily','Yesterday');
})

btnWeekly.addEventListener('click',()=>{
     
    btnWeekly.style.color = 'white';
    btnDaily.style.color = 'hsl(236, 100%, 87%)'
    btnMonthly.style.color ='hsl(236, 100%, 87%)'
    dataExtraction('weekly','Last Week');
})


btnMonthly.addEventListener('click',()=>{


    btnMonthly.style.color = 'white';
    btnDaily.style.color = 'hsl(236, 100%, 87%)';
    btnWeekly.style.color= 'hsl(236, 100%, 87%)';
   dataExtraction('monthly','Last Month');
})











