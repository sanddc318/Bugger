import { Component, OnInit } from '@angular/core';

import { BugService } from '../service/bug.service';

import { Bug } from '../model/bug';


@Component({
  moduleId: module.id,
  selector: 'bug-list',
  templateUrl: 'bug-list.component.html',
  styleUrls: [ 'bug-list.component.css' ]
})

export class BugListComponent implements OnInit {
  private bugs: Bug[] = [];

  constructor(private bugService: BugService) { }

  ngOnInit() {
    this.getAddedBugs();
    this.getUpdatedBugs();
  }

  getAddedBugs() {
    this.bugService.getAddedBugs()
      .subscribe(bug => {
        this.bugs.push(bug);
      },
      err => {
        console.error("Unable to get ADDED bug - ", err);
      });
  }

  getUpdatedBugs() {
    this.bugService.onChangeListener()
      .subscribe(updatedBug => {
        /*
          Get index for updated bug based on matching ids
          Then update the bug with that index with updatedBug's values
        */
        const bugIndex = this.bugs.map(bug => bug.id).indexOf(updatedBug['id']);
        this.bugs[bugIndex] = updatedBug;
      },
      err => {
        console.error("Unable to get UPDATED bug - ", err);
      });
  }

  getDeletedBugs() {
    this.bugService.onDeleteListener()
      .subscribe(deletedBug => {
        const bugIndex = this.bugs.map(bug => bug.id).indexOf(deletedBug['id']);
        this.bugs[bugIndex] = deletedBug;
      },
      err => {
        console.error("Unable to get DELETED bug - ", err);
      });
  }
};
