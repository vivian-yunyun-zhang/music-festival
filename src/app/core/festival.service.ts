import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Festival } from "./festival.model";
import { Observable,of } from "rxjs";
import { map } from "rxjs/operators";
import sampleFestival from '../../assets/sampleFestival.json';
import { FestivalAdapter } from './festival-adapter';

@Injectable({
  providedIn: 'root'
})
export class FestivalService {

  //proxy is setting up in proxy.conf.json to avoid CORS issue.
  private baseUrl="api/v1/festivals";

  constructor(private http:HttpClient,private festivalAD:FestivalAdapter) { }

  // getting JSON response using HTTP request from API.
  list(): Observable<Festival[]> {
    const url = `${this.baseUrl}/`;
    
    return this.http.get(url).pipe(map(response => {
      
      if(response){
        const array =response as any[];
      
        const details = array.map(data => {
          //adapt each festival item in JSON
          this.festivalAD.adapt(data);
          return data;
        });

        return details;
      }
      
  }));
                                         
  }

  // mocking JSON response. Loading JSON from assets/sampleFestival.json
  testFestival():Observable<Festival[]>{
    
      return of(sampleFestival).pipe(map(response => {
        const array =response as any[];
        
        const details = array.map(data => {
          //adapt each festival item in JSON
          this.festivalAD.adapt(data);
          return data;
        });

        return details;
    }));
  }

}
