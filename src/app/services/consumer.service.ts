import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';
import { VoucherRequest } from '../models/voucher-request';

@Injectable({
  providedIn: 'root'
})
export class ConsumerService {

  private SERVICE_URI = 'https://motor.mesdacervejaeisenbahn.com.br/';//'http://ec2-18-221-9-135.us-east-2.compute.amazonaws.com:8080/';//'http://localhost:8080/';

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error);
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public validateConsumer(documentNo: string): Observable<any> {
    // Add safe, URL encoded_page parameter
    const options = { params: new HttpParams({ fromString: 'documento=' + documentNo }) };
    return this.httpClient.get(this.SERVICE_URI + 'public/consumidor/consulta', options);//.pipe(catchError(this.handleError));
  }

  public getCities(): Observable<any> {
    // Add safe, URL encoded_page parameter
    return this.httpClient.get(this.SERVICE_URI + 'public/cliente/cidades').pipe(catchError(this.handleError));
  }

  public getRestaurants(cityId: number): Observable<any> {
    // Add safe, URL encoded_page parameter
    const options = { params: new HttpParams({ fromString: 'cidade=' + cityId }) };
    return this.httpClient.get(this.SERVICE_URI + 'public/clientes', options).pipe(catchError(this.handleError));
  }

  public postRequestVoucher(voucherRequest: VoucherRequest): Observable<any> {
    return this.httpClient.post(this.SERVICE_URI + 'public/consumidor/voucher', voucherRequest).pipe(catchError(this.handleError));
  }

}
