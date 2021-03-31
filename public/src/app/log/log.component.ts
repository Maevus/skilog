import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  public logSkiFormGroup: FormGroup;
  public lesson: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
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


  private destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {}
  
  submit(): void {
    if (!this.logSkiFormGroup.valid) {
      return;
    }
    console.log("Attempting to POST...");

    this.appService.addLog(this.logSkiFormGroup.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log("Logged:::", data);
      this.logSkiFormGroup.reset();
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
