import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Log } from '../log';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  public logSkiFormGroup: FormGroup;
  public lesson: boolean = false;
  public logsData: Log[] = [];
  public displayedColumns: string[] = ["Location", "Date", "Rating", "Visibility", "Snow Type", "Ski Type", "Lesson"];

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

  ngOnInit() {
    this.get().subscribe(data => {
      this.logsData = data;
      console.log("Retrieved logs:::", this.logsData)
    });
  }

  submit(): void {
    if (!this.logSkiFormGroup.valid) {
      return;
    }
    console.log("Attempting to POST...");
    this.add();
  }

  private get(): Observable<any> {
    return this.appService.getLogs();
  }

  private add() {
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
