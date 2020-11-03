import { Component, OnInit } from '@angular/core';
import { Festival } from '../core/festival.model';
import { FestivalService } from '../core/festival.service';



@Component({
  selector: 'app-record-list',
  templateUrl: './record-list.component.html',
  styleUrls: ['./record-list.component.css']
})
export class RecordListComponent implements OnInit {
  festivals:Festival[];
  //sample records array for testing.
  // defaultRecords:{ name: string; band: {name:string,festival:string[]}[] }[]=[
  //   {
  //     name:"Outerscope",
  //     band:[
  //       {name:"Squint-281",festival:["Small Night In","Twisted Tour"]},
  //       {name:"Summon",festival:["Twisted Tour"]}
  //     ]},
  //   {
  //     name:"XS Recordings",
  //     band:[
  //       {name:"Werewolf Weekday",festival:["LOL-palooza"]}
  //     ]
  //   }
  // ];
  records: { name: string; band: {name:string,festival:string[]}[] }[]=[];

  constructor(private festivalService:FestivalService) { 
    this.festivals=[];
  }

  ngOnInit() {
    //getting JSON data from API
    this.festivalService.list().subscribe((festivals:Festival[])=>{
      this.festivals=festivals;
      //make sure there is value returned
      if(this.festivals)
        if(this.festivals.length>0){
          //console.log(this.festivals);
          //reordering the array based on our requirement
          this.setRecordList();
          this.sortRecordList();
        }
          
      //console.log(this.records);
    });

    //calling test function to get JSON data from assets/sampleFestival.json
    // this.festivalService.testFestival().subscribe((festivals:Festival[])=>{
    //   this.festivals=festivals;
    //   this.setRecordList();

      //using defaultRecords for testing.
      //this.records=this.defaultRecords;
    //   console.log(this.records);
    // });

  }
  
  //convert original data structure to the structure we need
  setRecordList(){
      for (let f of this.festivals){
        const festName = f.name;

        f.bands.forEach(b => {
          let newRecord:boolean=true;
          //push to band array if record already exits
          this.records.forEach(r=>{
            let newBand:boolean=true;
            if(r.name==b.recordLabel){
              //push to festival array if record+band already exists
              r.band.forEach(rb=>{if (rb.name==b.name) {rb.festival.push(festName); newBand=false;}});
              //push to band array if band is new
              if(newBand)
                r.band.push({name:b.name,festival:[festName]});
              newRecord=false;
            }
              
          });
          //push to records array if record is new
          if (newRecord){
            this.records.push({name:b.recordLabel,band:[{name:b.name,festival: [festName] }]});
            
          }
        });
      }
  }

  sortRecordList(){
    //sort records name & band name & festival name
    this.records.sort((a, b) => (a.name > b.name) ? 1 : -1);
    this.records.forEach(r=>{
      r.band.sort((a, b) => (a.name > b.name) ? 1 : -1);
      r.band.forEach(fest=>{
        fest.festival.sort();
      })
    });
  }
}
