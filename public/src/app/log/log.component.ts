import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Log } from '../log';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  public logSkiFormGroup: FormGroup;
  public lesson: boolean = false;
  public logsDataSource: MatTableDataSource<Log> = new MatTableDataSource();
  public displayedColumns: string[] = ["date", "location", "rating", "visibility", "snowType", "skiType", "lesson"];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(MatSort) sort: MatSort = new MatSort();

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

  ngOnInit() {
    this.get().subscribe(data => {
      this.logsDataSource.data = data;
    });
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

  private get(): Observable<any> {
    return this.appService.getLogs();
  }
  
  private add() {
    this.appService.addLog(this.logSkiFormGroup.value).pipe(takeUntil(this.destroy$)).subscribe(data => {
      console.log("Logged:::", data);
      this.logSkiFormGroup.reset();
      this.logsDataSource.connect
    });
  }
}
