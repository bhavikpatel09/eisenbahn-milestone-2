import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoogleSpeechApiService {

  private API_KEY = 'AIzaSyABJXWIYPU3x0B_G3-EMdmwXzpoPG0KWlM';
  private SPEECH_API_URI = 'https://speech.googleapis.com/v1/speech:recognize?key=' + this.API_KEY;

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
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(): Observable<any> {
    // Add safe, URL encoded_page parameter
    const options = { params: new HttpParams({ fromString: '_page=1&_limit=20' }) };

    return this.httpClient.get(this.SPEECH_API_URI, options).pipe(retry(3), catchError(this.handleError));
  }
  public postSpeechRecognision(requestParams: any): Observable<any> {
    console.log(requestParams);
   // const headers = { 'Content-Type': 'application/json', 'My-Custom-Header': 'foobar' };
    return this.httpClient.post(this.SPEECH_API_URI, requestParams).pipe(catchError(this.handleError));
  }
}
