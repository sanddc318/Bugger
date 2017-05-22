import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BugService } from '../service/bug.service';

import { Bug } from '../model/bug';

import { STATUS, SEVERITY } from '../../shared/constant/constants';

import { forbiddenStringValidator } from '../../shared/validation/forbidden-string.validator';


@Component({
  moduleId: module.id,
  selector: 'bug-detail',
  templateUrl: './bug-detail.component.html',
  styleUrls: [ './bug-detail.component.css' ]
})

export class BugDetailComponent implements OnInit {
  private modalId = "bugModal";
  private bugForm: FormGroup;
  private statuses = STATUS;
  private severityLevels = SEVERITY;
  private statusArr: string[] = [];
  private severityArr: string[] = [];
  private currentBug = new Bug(null, null, this.statuses.Logged, this.severityLevels.Cosmetic, null, null, null, null, null);

  constructor(private formB: FormBuilder, private bugService: BugService) { }

  ngOnInit() {
    this.statusArr = Object.keys(this.statuses).filter(Number);
    this.severityArr = Object.keys(this.severityLevels).filter(Number);
    this.configureForm();
  }

  configureForm(bug?: Bug) {
    if (bug) {
      this.currentBug = new Bug(
        bug.id,
        bug.title,
        bug.status,
        bug.severity,
        bug.description,
        bug.createdBy,
        bug.createdDate,
        bug.updatedBy,
        bug.updatedDate
      );
    }

    this.bugForm = new FormGroup({
      // NOTE: dummy regex in forbiddenStringValidtor
      title: new FormControl(this.currentBug.title, [ Validators.required, forbiddenStringValidator(/puppy/i) ]),
      status: new FormControl(this.currentBug.status, Validators.required),
      severity: new FormControl(this.currentBug.severity, Validators.required),
      description: new FormControl(this.currentBug.description, Validators.required)
    });
  }

  submitForm() {
    this.currentBug.title = this.bugForm.value['title'];
    this.currentBug.status = this.bugForm.value['status'];
    this.currentBug.severity = this.bugForm.value['severity'];
    this.currentBug.description = this.bugForm.value['description'];

    /*
      Only updated bugs have ids so that's how the
      method to use will be determined
    */
    if (this.currentBug.id) {
      this.updateBug();
    } else {
      this.addBug();
    }
  }

  addBug() {
    this.bugService.addBug(this.currentBug);
  }

  updateBug() {
    this.bugService.updateBug(this.currentBug);
  }

  deleteBug() {
    this.bugService.deleteBug(this.currentBug);
    location.reload();
  }

  freshForm() {
    this.bugForm.reset({ status: this.statuses.Logged, severity: this.severityLevels.Cosmetic });
    this.cleanBug();
  }

  cleanBug() {
    this.currentBug = new Bug(null, null, this.statuses.Logged, this.severityLevels.Cosmetic, null, null, null, null, null);
  }
};
