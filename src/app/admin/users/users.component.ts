import { PreregisterService } from './../../welcome/waitlist/preregister.service';
import { Component, OnInit } from '@angular/core';
import { switchMap, take, catchError, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  total = 0;
  displayedColumns: string[] = ['type', 'count'];
  dataSource: UsersData[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private preregisterService: PreregisterService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const path1 = params.get('path1')!;
        const path2 = params.get('path2')!;
        return this.preregisterService.count(path1, path2)
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
          Object.keys(res.users).forEach(k => this.dataSource.push({ type: k, count: res.users[k as ObjectKey] }));
        }
      }
    );
  }

}

interface UsersData {
  type: string;
  count: number;
}
