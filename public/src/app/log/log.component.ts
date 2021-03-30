import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  public logSkiFormGroup: FormGroup;
  public lesson: boolean = false;

  constructor(
    private formBuilder: FormBuilder
  ) {

    this.logSkiFormGroup = this.formBuilder.group({
      location: [null],
      date: [null],
      rating: [null],
      viz: [null],
      snowType: [null],
      skiType: [null],
      lesson: [null],
    });
  }

  ngOnInit(): void { }

  submit(): void {
    if (!this.logSkiFormGroup.valid) {
      return;
    }
    console.log(this.logSkiFormGroup.value);
    // post as json 

  }
}
