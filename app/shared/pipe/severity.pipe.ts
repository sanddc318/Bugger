import { Pipe, PipeTransform } from '@angular/core';

import { SEVERITY } from '../constant/constants';

@Pipe({
  name: 'severity'
})

export class SeverityPipe implements PipeTransform {
  private severityLevels = SEVERITY;

  transform(severityNum: number) {
    return this.severityLevels[severityNum];
  };
};
