import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
   	  console.log(query);
      return _.filter(array, row=>((row.members.name != undefined ? row.members.name.toLowerCase().indexOf(query.toLowerCase()) > -1 : 0) || (row.artists.name != undefined ? row.artists.name.toLowerCase().indexOf(query.toLowerCase()) > -1 : 0) || (row.service.toLowerCase().indexOf(query.toLowerCase()) > -1)) );  
      
    }
    return array;
  }
}
