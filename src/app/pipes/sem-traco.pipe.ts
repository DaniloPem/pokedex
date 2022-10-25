import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'semTraco',
})
export class SemTracoPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    return value.replace('-', ' ');
  }
}
