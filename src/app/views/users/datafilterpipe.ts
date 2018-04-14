import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
    if (query) {
   	  console.log(query);
      return _.filter(array, row=>((row.fullName.toLowerCase().indexOf(query.toLowerCase()) > -1) (row.countryname.toLowerCase().indexOf(query.toLowerCase()) > -1)  );  
      
    }
    return array;
  }
}
