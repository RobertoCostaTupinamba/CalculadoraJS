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
    this.initKeyBoard();
    this._audioOnOff = false;
    this._audio = new Audio ('../sounds/click.mp3')
  }
  //inicializando display da calculadora
  initialize() {
    this.locale = "pt-BR";
    this.setDisplayDateTime();
    setInterval(() => {
      this.setDisplayDateTime();
    }, 1000);
    this.pasteFromClipBoard();
    document.querySelectorAll('.btn-ac').forEach(btn =>{
      btn.addEventListener('dblclick', e=>{
        this.toggleAudio();
      })
    })
  }
  //Ligar e desligar Audio da calculadora
  toggleAudio(){
    this._audioOnOff = !this._audioOnOff;
  }
  //Tocar o som
  playAudio(){
    if (this._audioOnOff) {
      this._audio.currentTime = 0;
      this._audio.play();
    }
  }
  //Area de trandferencia COPY
  copyToClipBoard(){
    let input =  document.createElement('input');
    input.value = this.displayCalc;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    input.remove();
  }
  //PASTE COLAR
  pasteFromClipBoard(){
    document.addEventListener('paste', e =>{
      this.displayCalc = parseFloat(e.clipboardData.getData('Text'));
    })
  }
  //Incializando o evento de teclado
  initKeyBoard(){
    document.addEventListener('keyup', event =>
    {
      this.playAudio();
      switch (event.key) {
        case "Escape":
          this.clearAll();
          break;
        case "Backspace":
          this.clearEntry();
          break;
        case "+":
        case "-":
        case "/":
        case "*":
        case "%":
          this.addOperation(event.key);
          break;
        case "Enter":
        case "=":
          this.calc();
          break;
        case ".":
        case ",":
          this.addDot(".");
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
          this.addOperation(parseInt(event.key));
          break;
        case "c":
          if (event.ctrlKey) {
            this.copyToClipBoard();
          }
          break
        
      }
    })
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
    this.displayCalc = 0;
  }
  //Metodo de limpar a ultima entrada
  clearEntry() {
    this._operation.pop();
    this.displayCalc = this._operation.join("");
    if (this._operation.length == 0 ) {
        this.displayCalc= 0;
    }
  }
  //Metodo para pegar ultima operação feita na calculadora
  getLastOperation() {
    return this._operation[this._operation.length - 1];
  }
  //Setando o ultimo valor da operação
  setLastOperation(value) {
    this._operation[this._operation.length - 1] = value;
  }
  //Metodo para verificar se é um operador
  isOperator(value) {
    return ["+", "-", "*", "%", "/"].indexOf(value) > -1;
  }
  //Metodo para pegar resultados
  getResult(){
      try {
        return eval(this._operation.join(""))
      } catch (error) {
        this.setError();
        return this.displayCalc;
      } 
  }
  //Metodo para calcular
  calc() {
    //fazendo calculo de 2 a 2
    let last = '';
    if (this._operation.length > 3) {
        last = this._operation.pop();
    }
    let result =  this.getResult();
    if (last == "%") {
      result = result / 100;
      this._operation = [result];
    } else {
      this._operation = [result];
      if (last) {
          this._operation.push(last)
      }
      this.displayCalc = result
    }
  }
  //Metodo responsavel por realizar o push no array(historico da calculadora)
  pushOperation(value) {
    this._operation.push(value);
    if (this._operation.length > 3) {
      this.calc();
    }
  }
  //Metodo para adicionar um operador
  addOperation(value) {
    //Verificando se a ultima operação é ou não um numero
    if (isNaN(this.getLastOperation())) {
      //String
      if (this.isOperator(value)) {
        //Trocar o operador
        this.setLastOperation(value);
      }else {
        this.pushOperation(value);
      }
    } else if (this.isOperator(value)) {
      this.pushOperation(value);
    } else {
      //Number
      let newvalue = this.getLastOperation().toString() + value.toString();
      this.setLastOperation(newvalue);
    }
    console.log(this._operation);
    this.displayCalc = this._operation.join(""); //join - junta o array em formato de string e o formata do jeito que vc quiser
  }
  //Metodo adicionar ponto 
  addDot(){     
    let lastOperation = this.getLastOperation();
    if(typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1 ) return;
    if(this.isOperator(lastOperation) || !lastOperation ){
        this.pushOperation("0.");
    }else{
        this.setLastOperation(lastOperation.toString() + ".");
    }
     this.displayCalc = this._operation.join("");
  }
  //Metodo para setar um erro
  setError() {
    this.displayCalc = "Error";
  }
  //Executa a função do Botão
  execBtn(value) {
    this.playAudio();
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
      case "multiplicacao":
        this.addOperation("*");
        break;
      case "porcento":
        this.addOperation("%");
        break;
      case "igual":
        this.calc();
        break;
      case "ponto":
        this.addDot(".");
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
