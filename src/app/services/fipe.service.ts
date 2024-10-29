import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Marcas } from '../models/marcas';

@Injectable({
  providedIn: 'root'
})
export class FipeService {

  constructor(private httpCliente: HttpClient) { }

  url = "https://parallelum.com.br/fipe/api/v1/carros/marcas/"

  getMarcas(): Observable<Marcas[]>{
    return this.httpCliente.get<Marcas[]>(this.url);
  }
  getModelos(codigo: string): Observable<any>{
    return this.httpCliente.get<any>(this.url + codigo + "/modelos");
  }
  getAnos(codigoMarca: string, codigoModelo: string): Observable<any>{
    return this.httpCliente.get<any>(this.url + codigoMarca + "/modelos/" + codigoModelo + "/anos")
  }
  getFipe(cogidoMarca: string, codigoModelo: string, codigoAno: string): Observable<any>{
    return this.httpCliente.get<any>(this.url + cogidoMarca + "/modelos/" + codigoModelo + "/anos/" + codigoAno)
  }
}
