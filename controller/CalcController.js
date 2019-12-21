class CalcController {
    
    constructor(){

        this._displayCalc = "0"; //atributos privatos (utiliza o "_" para representar metodos privados no JS)
        this._currentDate; //atributos privatos
        this.initialize();
    }


    initialize(){

        let displayCalcEl = document.querySelector("#display")
        let dateEl = document.querySelector("#data")
        let timeEl = document.querySelector("#hora")

        displayCalcEl.innerHTML = "4567";
        dateEl.innerHTML = new Date().toLocaleDateString("pt-BR");
        timeEl.innerHTML = new Date().toLocaleTimeString("pt-BR");

    }

    get displayCalc(){

        return  this._displayCalc;

    }

    set displayCalc(value){

        this._displayCalc = value;
    
    }

    get currentDate(){

        return this._currentDate;

    }

    set currentDate(date){
        
        this._currentDate = date;

    }

}