import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";
import { BandAdapter } from './band-adapter';
import { Festival } from './festival.model';

@Injectable({
  providedIn: "root",
})
/**FestivalAdapter class
 * using Model-Adapter pattern, reduce coupling between API and front end and increase reusability.
 * adapt() takes a festival item and build a Festival model instance out of it.
 */
export class FestivalAdapter implements Adapter<Festival> {

    constructor(private bandAD:BandAdapter){}
    
    adapt(item:any):Festival{
        const bandArray =item.bands as any[];
        bandArray.map(b => this.bandAD.adapt(b));
        return new Festival(item.name,bandArray);
    }
}
