import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { BugService } from '../service/bug.service';

import { Bug } from '../model/bug';

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
  @Input() currentBug = new Bug(null, null, 1, 3, null, null, null, null, null);

  constructor(private formB: FormBuilder, private bugService: BugService) { }

  ngOnInit() {
    this.configureForm();
  }

  configureForm(bug?: Bug) {
    if (bug) {
      this.currentBug = bug;
    }

    // this.bugForm = new FormGroup({
    //   // NOTE: dummy regex in forbiddenStringValidtor
    //   title: new FormControl(this.currentBug.title, [ Validators.required, forbiddenStringValidator(/puppy/i) ]),
    //   status: new FormControl(this.currentBug.status, Validators.required),
    //   severity: new FormControl(this.currentBug.severity, Validators.required),
    //   description: new FormControl(this.currentBug.description, Validators.required)
    // });

    // Form Builder form example
    this.bugForm = this.formB.group({
      title: [this.currentBug.title, [ Validators.required, forbiddenStringValidator(/puppy/i) ]],
      status: [this.currentBug.status, Validators.required],
      severity: [this.currentBug.severity, Validators.required],
      description: [this.currentBug.description, Validators.required]
    });

    this.cleanBug();
  }

  submitForm() {
    console.log(this.bugForm); // TODO: remove
    this.addBug();
  }

  addBug() {
    this.currentBug.title = this.bugForm.value['title'];
    this.currentBug.status = this.bugForm.value['status'];
    this.currentBug.severity = this.bugForm.value['severity'];
    this.currentBug.description = this.bugForm.value['description'];
    this.bugService.addBug(this.currentBug);
    this.freshForm();
  }

  freshForm() {
    this.bugForm.reset({ status: 1, severity: 3 });
    this.cleanBug();
  }

  cleanBug() {
    this.currentBug = new Bug(null, null, 1, 3, null, null, null, null, null);
  }
};
