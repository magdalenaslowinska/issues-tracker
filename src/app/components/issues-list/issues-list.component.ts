import { Component, OnInit, Input, Inject } from '@angular/core';
import { truncate } from '../../tools/truncate';
import { IssuesService } from '../../services/issues-service';
import { Issue } from '../../model/issue';
import { query } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-issues-list',
  templateUrl: './issues-list.component.html',
  styleUrls: ['./issues-list.component.scss']
})
export class IssuesListComponent implements OnInit {

  public issues: Array<Issue>;
  private maxDescriptionLength = 90;

  public constructor(private issuesService: IssuesService) {
  }

  public async ngOnInit(): Promise<void> {
    this.issuesService.getAvailableIssues().subscribe(issues => {
      issues.forEach(issue => {
        issue.uiState = { isExpanded: false };
      });
      this.issues = issues;
    });
  }

  public getShowMoreOrLessLabel(issue: Issue): string {
    return issue.uiState.isExpanded ? 'Show less' : 'Show more';
  }

  public toggleExpanded(issue: Issue): void {
    issue.uiState.isExpanded = !issue.uiState.isExpanded;
  }

  public getDescription(issue: Issue): string {
    return issue.uiState.isExpanded ? issue.description : truncate(issue.description, this.maxDescriptionLength);
  }

  public showReadMoreButton(issue: Issue): boolean {
    return issue.description.length > this.maxDescriptionLength;
  }

  public closeIssue(issue: Issue): void {
    this.issuesService.closeIssue(issue);
  }

  public startIssue(issue: Issue): void {
    this.issuesService.startIssue(issue);
  }

}
