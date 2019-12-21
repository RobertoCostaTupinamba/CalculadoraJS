class CalcController {
  constructor() {
    //(utiliza o "_" para representar metodos privados no JS)
    // Pegando os elementos da DOM
    this._displayCalcEl = document.querySelector("#display");
    this._dateEl = document.querySelector("#data");
    this._timeEl = document.querySelector("#hora");
    this._locale;
    this._currentDate;
    this._operation = [];
    this.initialize();
    this.initButtonsEvents();
  }
  //inicializando display da calculadora
  initialize() {
    this.locale = "pt-BR";
    this.setDisplayDateTime();
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
  }
  //Criando um escutador de eventos (Generico) para que possa reagir a eventos diferentes e não a um unico
  addEventListenerAll(element, events, fn) {
    events.split(" ").forEach(event => {
      element.addEventListener(event, fn, false);
    });
  }
  //Metodo de limpar tudo AC
  clearAll() {
    this._operation = [];
  }
  //Metodo de limpar a ultima entrada
  clearEntry() {
    this._operation.pop();
  }
  //Metodo para pegar ultima operação feita na calculadora
  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }
  //Setando o ultimo valor da operação
  setLastOperation(value){
    this._operation[this._operation.length - 1] = value
  }
  //Metodo para verificar se é um operador
  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }
  //Metodo para adicionar um operador
  addOperation(value) {
    //Verificando se a ultima operação é ou não um numero
    if (isNaN(this.getLastOperation())) {
      //String
      if (this.isOperator(value)) {
        //Trocar o operador
        this.setLastOperation(value)
      } else if (isNaN(value)) {
        //Outra coisa
      } else {
        this._operation.push(value);
      }
    } else {
      //Number
      let newvalue = this.getLastOperation().toString() + value.toString();
      this.setLastOperation(parseInt(newvalue));
      
    }
    console.log(this._operation);
    this.displayCalc = this.getLastOperation();
  }
  //Metodo para setar um erro
  setError() {
    this.displayCalc = "Error";
  }
  //Executa a função do Botão
  execBtn(value) {
    switch (value) {
      case "ac":
        this.clearAll();
        break;
      case "ce":
        this.clearEntry();
        break;
      case "soma":
        this.addOperation("+");
        break;
      case "subtracao":
        this.addOperation("-");
        break;
      case "divisao":
        this.addOperation("/");
        break;
      case "multiplicacaoo":
        this.addOperation("*");
        break;
      case "porcento":
        this.addOperation("%");
        break;
      case "igual":
        this.clearEntry();
        break;
      case "ponto":
        this.addOperation(".");
        break;
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        this.addOperation(parseInt(value));
        break;
      default:
        this.setError();
        break;
    }
  }
  //inicializando botões da calculadora
  initButtonsEvents() {
    //Pega todos os botões da calculadora
    let buttons = document.querySelectorAll("#buttons > g, #parts > g");
    //Corre por todos os botões da calculadora
    buttons.forEach((btn, index) => {
      //Adiciona um escutador de eventos em cada um deles
      this.addEventListenerAll(btn, "click drag", e => {
        let textBtn = btn.className.baseVal.replace("btn-", "");
        this.execBtn(textBtn);
      });

      this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {
        btn.style.cursor = "pointer";
      });
    });
  }

  setDisplayDateTime() {
    this.displayDate = this.currentDate.toLocaleDateString(this.locale, {
      day: "2-digit", // ou numeric (e.g., 1)
      month: "2-digit", // ou long
      year: "numeric" //ou 2-digit  (e.g., 12)
    });
    this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
  }
  //GETTERS AND SETTERS
  get locale() {
    return this._locale;
  }

  set locale(locale) {
    this._locale = locale;
  }

  get displayTime() {
    return this._timeEl.innerHTML;
  }

  set displayTime(time) {
    this._timeEl.innerHTML = time;
  }

  get displayDate() {
    return this._dateEl.innerHTML;
  }

  set displayDate(date) {
    this._dateEl.innerHTML = date;
  }

  get displayCalc() {
    return this._displayCalcEl.innerHTML;
  }

  set displayCalc(value) {
    this._displayCalcEl.innerHTML = value;
  }

  get currentDate() {
    return new Date();
  }

  set currentDate(date) {
    this._currentDate = date;
  }
}
