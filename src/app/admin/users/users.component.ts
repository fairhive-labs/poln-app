import { PreregisterService } from './../../welcome/waitlist/preregister.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { switchMap, take, catchError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  total = 0;
  path1: string;
  path2: string;

  displayedColumns: string[] = ['type', 'count'];
  dataSource: MatTableDataSource<UsersData> = new MatTableDataSource<UsersData>([]);
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private preregisterService: PreregisterService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.path1 = params.get('path1')!;
        this.path2 = params.get('path2')!;
        return this.preregisterService.count(this.path1, this.path2)
          .pipe(
            take(1),
            catchError(err => of({
              total: 0,
              users: undefined,
            }))
          );
      })
    ).subscribe(
      res => {
        this.total = res.total;
        if (res.users != undefined) {
          type ObjectKey = keyof typeof res.users;
          const ds: UsersData[] = []
          Object.keys(res.users).forEach(k => ds.push({ type: k, count: res.users[k as ObjectKey] }));
          this.dataSource = new MatTableDataSource<UsersData>(ds);
          this.dataSource.sort = this.sort;
        }
      }
    );
  }

  get url(): string {
    return this.preregisterService.getListEndpointURL(this.path1, this.path2);
  }
}

interface UsersData {
  type: string;
  count: number;
}
