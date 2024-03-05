'use strict';

/* Declaration */

let random_numbers_array = [];
let selected_options_array= [];
//array contenenti le opzioni selezionabili dall'utente
const options_array = [
    "Aggiungi l’acqua nella caldaia" , 
    "Aggiungi la miscela di caffè nel filtro a imbuto",
    "Inserisci il filtro nel bollitore",
    "Avvita il bricco sulla parte superiore stringendo bene",
    "Metti la moka sulla fonte di calore e regola la temperatura al massimo",
    "Spegni il fuoco quando l’espresso smette di fuoriuscire dal camino",
    "Incartare la macchinetta con un giornale",
    "Accendere il computer",
    "Tenere la moka al sole finchè non sale il caffè",
];

/* Functions */

//funzione per la pulizia e reset delle boards di gioco
function clearBoards(){
    document.querySelector(".result-msg").style.display = "none";
    document.getElementById("correct-msg").style.display = "none";
    document.getElementById("wrong-msg").style.display = "none";
    const elementUl = document.querySelector('ul.solution-container-ul');
    elementUl.innerHTML = "";
    const element2Ul = document.querySelector('ul.option-container-ul');
    element2Ul.innerHTML = "";
}

//funzione per la generazione di numeri casuali utilizzati per la generazione random della board superiore
function randomArrayGenerator(){
    let i = 0;
    do{
        let x = Math.floor(Math.random() * 9);
        if(!random_numbers_array.includes(x)){
            random_numbers_array[i] = x;
            i++;
        }
    }while(i<9);
}


function selectedBoardGenerator(x){
    const elementUl = document.querySelector('ul.solution-container-ul');
    const li = document.createElement('li');
    li.append(selected_options_array[x]);
    li.id = "div-" + x;
    elementUl.append(li);
}

//funzione per il controllo del risulatto
function checkResult(){
    let i=0;
    let flag; //flag che verrà settato a 1 se risulta tutto corretto o viceversa a 0 se è presente un errore
    do{
        if(selected_options_array[i] === options_array[i]){
            flag = 1;
            i++; 
        }else{
            flag = 0;
            i=6; //se viene trovato anche un solo errore il ciclo si ferma immediatamente tramit questa condizione
        }
    }while(i<6);
    if(flag === 1){
        document.getElementById("correct-msg").style.display = "block"; //visualizzazione messaggio di esito positivo
        document.querySelector('.result-msg').style.display = "flex";
        const playBtn = document.querySelector('.play-button');
        playBtn.addEventListener("click",function(){
            boardGenerator(); //il tasto rigioca resetta la board e ne rigenera un'altra casuale
        });
    }else{
        document.getElementById("wrong-msg").style.display = "block"; //visualizzazione messaggio d'esito negativo
        document.querySelector('.result-msg').style.display = "flex";
        const playBtn = document.querySelector('.play-button');
        playBtn.addEventListener("click",function(){
            boardGenerator(); //il tasto rigioca resetta la board e ne rigenera un'altra casuale
        });
    }
}

//funzione per la selezione dell'opzione e il suo spostamento dalla board superiore a quella inferiore
function optionSelection(selectedId, clickNumber){
    const elementToRemove = document.getElementById(selectedId);
    selected_options_array[clickNumber] = elementToRemove.innerHTML; //l'elemento selezionato viene rimosso dalla board superiore
    selectedBoardGenerator(clickNumber); //l'elemento selezionato viene scritto nella board inferiore
    elementToRemove.remove();
    if(clickNumber===5){
        checkResult(); //una volta selezionate 6 opzione viene richiamata checkResult per il controllo del risultato
    }
}

//funzione per la creazione della board di gioco
function boardGenerator(){
    clearBoards(); //la board viene sempre ripulita prima di ogni partita
    let clickNumber = 0; //contatore per il monitoraggio delle selezioni effettuate dall'utente (max 6)
    const elementUl = document.querySelector('ul.option-container-ul');
    elementUl.innerHTML = "";
    for( let i = 0; i<9 ; i++){
        const li = document.createElement('li');
        li.append(options_array[random_numbers_array[i]]); //la generazione e la scrittura nel DOM è casuale e dettata dalla funzione randomArrayGenerator 
        li.id = "div-" + i;
        li.addEventListener("click", function(){ 
            if(clickNumber<6){ //se l'utente ha selezionato già 6 opzioni cessano gli eventi in ascolto
                optionSelection(li.id, clickNumber);
                clickNumber++;
            }
        })
    elementUl.append(li);
    }
}

/* Main */
randomArrayGenerator();
boardGenerator();
