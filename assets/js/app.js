// let input = document.getElementById('inputData');
let input = document.querySelector('#inputData');
let searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    
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
function getData(word) {
    
}