class CalcController {
    
    constructor(){

        this._displayCalc = "0"; //atributos privatos (utiliza o "_" para representar metodos privados no JS)
        this._dataAtual; //atributos privatos

    }

    get displayCalc(){

        return  this._displayCalc;

    }

    set displayCalc(valor){

        this._displayCalc = valor;
    
    }

    get dataAtual(){

        return this._dataAtual;

    }

    set dataAtual(data){
        
        this._dataAtual = data;

    }

}