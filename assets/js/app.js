let input = document.querySelector('#inputData');
let searchBtn = document.querySelector('#searchBtn');
let apiKey = '5679c7e4-d7cf-4c5d-9fc9-952830811070';
let notFound = document.querySelector('.notFound');
let def = document.querySelector('.defination');
let audioBox = document.querySelector('.audio');
let loading = document.querySelector('.loading');



searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    
    //clear data
    audioBox.innerHTML = '';
    notFound.innerText = '';
    def.innerText = '';



    //Get input Data
    let word = input.value;
    //Call API
    if (word == '') {
        alert("Write your word");
        return;
    }
    //Function Call
    getData(word);
    
})


//Api calling function
async function getData(word) {
    loading.style.display = 'block';
    const response = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();

    // check for empty result
    if (data.length == 0) {
        loading.style.display = 'none';
        notFound.innerText = 'No result found :( ';
        return;
    }

    // If not an valid word
    //Suggestion
    if (typeof data[0] === 'string') {
        loading.style.display = 'none';
        let heading = document.createElement('h5');
        heading.innerText = "Did you mean?";
        notFound.appendChild(heading);
        data.forEach(element =>{
            let suggetion = document.createElement('span');
            suggetion.classList.add('suggested');
            suggetion.innerText = element;
            notFound.appendChild(suggetion);
        })
        return;
    }

    //If result found
    loading.style.display = 'none';
    let defination = data[0].shortdef[0];
    def.innerText = defination;


    //add sound or audio
    const sound = data[0].hwi.prs[0].sound.audio;
    if (sound) {
        renderSound(sound);
        
    }

    console.log(data);
}

function renderSound(sound){

    let subFolder = sound.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subFolder}/${sound}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud); 
}