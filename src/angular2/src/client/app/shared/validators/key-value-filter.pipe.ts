import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyValueFilter'
})

export class KeyValueFilterPipe implements PipeTransform {
  transform(value: any, args: any[] = null): any {
    return Object.keys(value).map(function(key) {
      return {key: key, value: value[key]};
    });
  }

}
