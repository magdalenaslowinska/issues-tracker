import { mock, instance, reset, verify, anyString, anything, when } from 'ts-mockito/lib/ts-mockito';
import { IssuesDataProvider } from '../../app/services/issues-data-provider-service';
import { TestBed, inject } from '@angular/core/testing';
import { Issue } from '../../app/model/issue';
import { HttpClient, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('Issues Data Provider', () => {

    const httpClientMock = mock(HttpClient);
    const httpClient = instance(httpClientMock);
    const sampleUri = '/not-existing-uri/data.json';

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [IssuesDataProvider,
                { provide: HttpClient, useValue: httpClient }]
        });

        reset(httpClientMock);
    });

    it('should get data from http', inject([IssuesDataProvider], async (service: IssuesDataProvider) => {
        const issue: Issue = {title: 'title', description: 'description', status: 'Open'};
        when(httpClientMock.get<Issue[]>(sampleUri)).thenReturn(Observable.of([issue]));

        const receivedIssues = await service.getData(sampleUri);

        expect(receivedIssues.length).toEqual(1);
        expect(receivedIssues[0]).toBe(issue);
        verify(httpClientMock.get(sampleUri)).once();
    }));

    it('should throw error if http client responded with error', inject([IssuesDataProvider], async (service: IssuesDataProvider) => {
        let errorThrown = false;
        when(httpClientMock.get<Issue[]>(sampleUri)).thenReturn(new Observable(
            observer => observer.error(new HttpErrorResponse({}))
        ));

        try {
            await service.getData(sampleUri);
        } catch (error) {
            errorThrown = true;
        }

        expect(errorThrown).toBeTruthy();
    }));
});
