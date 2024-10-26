  import { Component, OnInit } from '@angular/core';
  import { Marcas } from 'src/app/models/marcas';
  import { Modelos } from 'src/app/models/modelos';
  import { FipeService } from 'src/app/services/fipe.service';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
  })
  export class HomeComponent {
    inputMarca = '';
    resultInputMarca = [] as Marcas [];
    marcaFoiSelecionada: boolean = false;
    codigoMarcaSelecionada = '';

    inputModelo = '';
    resultInputModelo: any = [];
    modeloFoiSelecionado: boolean = false;
    codigoModeloSelecionado = '';

    inputAno = ''
    resultInputAno: any = [];
    anoFoiSelecionado: boolean = false;
    codigoAnoSelecionado = '';

    constructor(private fipe: FipeService) {}

    listaMarcas = [] as Marcas [];
    listaModelos: any = [];
    listaAnos: any = [];
    resultadoFipe: any = []
    resultadoObtido: boolean = false;


    ngOnInit(): void {
      this.carregarMarcas();
    }

    carregarMarcas(){
      this.fipe.getMarcas().subscribe((marcasRecebidas: Marcas[]) =>{
        this.listaMarcas = marcasRecebidas;
      })
    }
    filtrarMarcas(){
      this.resultInputMarca = this.listaMarcas
      .filter(marca => marca.nome.toLowerCase().includes(this.inputMarca.toLowerCase()));
    }
    verificarInputMarca(): boolean{
      if(this.inputMarca.length > 0 && this.marcaFoiSelecionada == false){
        return true;
      }
      else {
        return false;
      }
    }
    confirmarMarcaSelecionada(nome: string){
      this.marcaFoiSelecionada = true;
      this.inputMarca = nome;
    }

    carregarModelos(codigo: string){
      this.fipe.getModelos(codigo).subscribe((modelosRecebidos) =>{
        this.listaModelos = modelosRecebidos.modelos;
      })
      this.codigoMarcaSelecionada = codigo;
    }
    filtrarModelos(){
      this.resultInputModelo = this.listaModelos
      .filter((modelo: { nome: string; }) => modelo.nome.toLowerCase().includes(this.inputModelo.toLowerCase()))
    }
    confirmarModeloSelecionado(modelo: string){
      this.modeloFoiSelecionado = true;
      this.inputModelo = modelo;
    }
    verificarInputModelo(): boolean{
      if(this.inputModelo.length > 0 && this.modeloFoiSelecionado == false){
        return true;
      } else {
        return false;
      }
    }

    carregarAnos(codigoModelo: string){
      this.fipe.getAnos(this.codigoMarcaSelecionada, codigoModelo).subscribe((anosRecebidos) => {
        this.listaAnos = anosRecebidos;
      })
      this.codigoModeloSelecionado = codigoModelo;
    }
    filtrarAnos(){
      this.resultInputAno = this.listaAnos
      .filter((ano: { nome: string; }) => ano.nome.toLowerCase().includes(this.inputAno.toLowerCase()))
    }
    confirmarAnoSelecionado(ano: string, codigo: string){
      this.anoFoiSelecionado = true;
      this.inputAno = ano;
      this.codigoAnoSelecionado = codigo;
    }
    verificarInputAnos(){
      if(this.inputAno.length > 0 && this.anoFoiSelecionado == false){
        return true;
      } else {
        return false;
      }
    }

    varrerInputSeguinte(nomeInput: string){
      if(nomeInput == "marca"){
        this.inputModelo = '';
        this.inputAno = '';
        this.marcaFoiSelecionada = false;
      }
      if(nomeInput == "modelo"){
        this.inputAno = '';
        this.modeloFoiSelecionado = false;
      }
      this.resultadoObtido = false;
    }
    conferirInputAnterior(nomeInput: string){
      if(nomeInput == 'modelo'){
        if(this.marcaFoiSelecionada==false){
          this.inputMarca = '';
        }
      } 
      else if (nomeInput == 'ano'){
        if(this.modeloFoiSelecionado==false){
          this.inputModelo = '';
        }
      }
    }

    conferirTodasSelecoes(): boolean{
      if(this.marcaFoiSelecionada && this.modeloFoiSelecionado && this.anoFoiSelecionado){
        return true;
      } else {
        return false;
      }
    }
    carregarResultado(){
      if(this.conferirTodasSelecoes()){
        this.fipe.getFipe(this.codigoMarcaSelecionada, this.codigoModeloSelecionado, this.codigoAnoSelecionado).subscribe((resultadoRecebido) =>{
          this.resultadoFipe = resultadoRecebido;
        })
        this.resultadoObtido = true;
      } else {
        alert("As informações precisam ser selecionadas")
      }
    }

  }
