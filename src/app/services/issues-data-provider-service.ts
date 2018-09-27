import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Issue } from '../model/issue';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class IssuesDataProvider {

    constructor(private http: HttpClient) {
    }

    public getData(dataUri: string): Observable<Issue[]> {
        return this.http.get<Issue[]>(dataUri);
    }
}
