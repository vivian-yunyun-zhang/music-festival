import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import { Band } from './band.model';

@Injectable({
  providedIn: "root",
})
/**BandAdapter class
 * using Model-Adapter pattern, reduce coupling between API and front end and increase reusability.
 * adapt() takes a band item and build a band model instance out of it.
 */

export class BandAdapter implements Adapter<Band> {
    adapt(item:any){
      //replace undefined to empty string so that it can be sorted later.
      if(typeof item.recordLabel === 'undefined')
      {
        item.recordLabel= "";
        //console.log("This record label:"+item.recordLabel+".");
      }
        
        return new Band(item.name,item.recordLabel);
    }
}
