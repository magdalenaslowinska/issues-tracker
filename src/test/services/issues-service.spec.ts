import { mock, instance, reset, verify, anyString } from 'ts-mockito/lib/ts-mockito';
import { IssuesDataProvider } from '../../app/services/issues-data-provider-service';
import { TestBed, inject } from '@angular/core/testing';
import { IssuesService } from '../../app/services/issues-service';
import { statusClosed, statusOpen, statusPending } from '../../app/model/issue';

describe('Issues Service', () => {

    const issueDataProviderMock = mock(IssuesDataProvider);
    const issueDataProvider = instance(issueDataProviderMock);
    let openIssue;
    let pendingIssue;
    let closedIssue;

    beforeEach(() => {
        openIssue = { title: 'title', description: 'desc', status: statusOpen };
        pendingIssue = { title: 'title', description: 'desc', status: statusPending };
        closedIssue = { title: 'title', description: 'desc', status: statusClosed };

        TestBed.configureTestingModule({
            providers: [IssuesService,
                { provide: IssuesDataProvider, useValue: issueDataProvider }]
        });

        reset(issueDataProviderMock);
    });

    it('should get available issues from issues data provider', inject([IssuesService], async (service: IssuesService) => {
        await service.getAvailableIssues();
        verify(issueDataProviderMock.getData(anyString())).once();
    }));

    it('should close pending or open issue', inject([IssuesService], (service: IssuesService) => {
        service.closeIssue(openIssue);
        service.closeIssue(pendingIssue);

        expect(openIssue.status).toEqual(statusClosed);
        expect(pendingIssue.status).toEqual(statusClosed);
    }));

    it('should not change closed issue state when closing', inject([IssuesService], (service: IssuesService) => {
        service.closeIssue(closedIssue);
        expect(closedIssue.status).toEqual(statusClosed);
    }));

    it('should start only open issue', inject([IssuesService], (service: IssuesService) => {
        service.startIssue(openIssue);
        service.startIssue(closedIssue);

        expect(openIssue.status).toEqual(statusPending);
        expect(closedIssue.status).toEqual(statusClosed);
    }));

    it('should not change pending issue state when starting', inject([IssuesService], (service: IssuesService) => {
        service.startIssue(pendingIssue);
        expect(pendingIssue.status).toEqual(statusPending);
    }));
});
