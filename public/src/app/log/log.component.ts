import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { takeUntil, map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Log } from '../log';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'
import { VIZ_TYPES, SNOW_TYPES } from "../const";


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  public logSkiFormGroup: FormGroup;
  public lesson: boolean = false;
  public logsDataSource: MatTableDataSource<Log> = new MatTableDataSource();
  public displayedColumns: string[] = ["date", "location", "rating", "visibility", "snowType", "skiType", "lesson"];
  public vizTypes: string[] = VIZ_TYPES;
  public snowTypes: string[] = SNOW_TYPES;
  public defSnowType ="Powder";
  
  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {
    this.logSkiFormGroup = this.formBuilder.group({
      location: ["Astun", Validators.required],
      date: [Validators.required],
      rating: ["3", Validators.required],
      viz: [0, Validators.required],
      snowType: [Validators.required],
      skiType: ["1", Validators.required],
      lesson: ["0",  Validators.required],
    });

    this.logSkiFormGroup.controls["date"].setValue(new Date());
    this.logSkiFormGroup.controls["snowType"].setValue(this.snowTypes[0]);
    this.logSkiFormGroup.controls["viz"].setValue(this.vizTypes[0]);

  }

  ngOnInit() {
    this.get()
      .pipe(
        map((logs: Array<Log>): Array<Log> =>
          logs.map((log: Log): Log => {
            log.date = this.formatDateToLocalString(log.date);
            log.lesson = this.formatLessonToString(log.lesson);
            log.skiType = this.formatSkiTypeToString(log.skiType);
            return log;
          })
        )
      )
      .subscribe(data => {
        this.logsDataSource.data = data;
      });
  }

  formatSkiTypeToString(skiType: string): string {
    if (!skiType) {
      return "";
    }

    return skiType == "1" ? "Alpine" : "Skimo" 
  }

  formatLessonToString(lesson: string): string {
    if (!lesson) {
      return "";
    }
    return lesson == "1" ? "Yes" : "No"; 
  }

  ngAfterViewInit() {
    this.logsDataSource.sort = this.sort;
  }

  submit(): void {
    if (!this.logSkiFormGroup.valid) {
      return;
    }
    console.log("Attempting to POST...");
    this.add();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  addStars(value: number) {
    this.logSkiFormGroup.controls["rating"].setValue(value.toString());
  }

  private get(): Observable<any> {
    return this.appService.getLogs();
  }

  private add() {
    //create new dto with stars to push to server'
    this.appService.addLog(this.logSkiFormGroup.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log("Logged:::", data);
      //this.logSkiFormGroup.reset();
      this.logsDataSource.connect;
    });
  }

  private formatDateToLocalString(date: string): string {
    return new Date(date).toLocaleDateString();
  }
}
