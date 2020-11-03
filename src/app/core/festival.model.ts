import { Band } from './band.model';

// define festival model
export class Festival {
    constructor(public name:string,public bands:Band[]){}
}
