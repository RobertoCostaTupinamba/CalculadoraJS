class CalcController {
    
    constructor(){
        //(utiliza o "_" para representar metodos privados no JS)
        // Pegando os elementos da DOM
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._locale;
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }
    //inicializando display da calculadora
    initialize(){

        this.locale = "pt-BR";
        this.setDisplayDateTime();
        setInterval(()=>{

            this.setDisplayDateTime();

        }, 1000);

    }
    //inicializando botões da calculadora
    initButtonsEvents(){
        //Pega todos os botões da calculadora
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");
        //Corre por todos os botões da calculadora
        buttons.forEach((btn, index) =>{
            //Adiciona um escutador de click em cada um deles
            btn.addEventListener("click", e=>{

                console.log(btn.className.baseVal.replace("btn-",""));
                

            });

        });
    }

    setDisplayDateTime(){

        this.displayDate = this.currentDate.toLocaleDateString(this.locale, {
            day: "2-digit", // ou numeric (e.g., 1)
            month: "2-digit", // ou long
            year: "numeric" //ou 2-digit  (e.g., 12)
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);

    }


    get locale(){

        return this._locale;
    
    }

    set locale(locale){

        this._locale = locale;

    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }
    
    set displayTime(time){
       this._timeEl.innerHTML = time;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(date){
        this._dateEl.innerHTML = date;
    }

    get displayCalc(){

        return  this.displayCalcEl.innerHTML;

    }

    set displayCalc(value){

        this.displayCalcEl.innerHTML = value;
    
    }

    get currentDate(){

        return new Date();

    }

    set currentDate(date){
        
        this._currentDate = date;

    }

}