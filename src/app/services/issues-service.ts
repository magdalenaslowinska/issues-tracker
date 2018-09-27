import { Injectable } from '@angular/core';
import {Issue, statusOpen, statusPending, statusClosed} from '../model/issue';
import { IssuesDataProvider } from './issues-data-provider-service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IssuesService {

    public constructor(private issuesDataProvider: IssuesDataProvider) {
    }

    public getAvailableIssues(): Observable<Issue[]> {
         return this.issuesDataProvider.getData(environment.dataUri);
    }

    public closeIssue(issue: Issue): void {
        if (issue.status === statusOpen || issue.status === statusPending) {
            issue.status = statusClosed;
        }
    }

    public startIssue(issue: Issue): void {
        if (issue.status === statusOpen) {
            issue.status = statusPending;
        }
    }

}
