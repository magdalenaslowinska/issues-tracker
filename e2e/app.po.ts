import { browser, by, element } from 'protractor';
import { environment } from '../src/environments/environment.e2e';
import { Issue } from '../src/app/model/issue';

export class AppPage {
  private table;
  private rows;

  public navigateTo() {
    return browser.get('/');
  }

  public getJsonData() {
    const json = require('../src' + environment.dataUri);
    return json;
  }

  public async verifyRow(rowNumber: number, data: Issue) {

    const row = this.rows.get(rowNumber);
    const title = row.all(by.tagName('th')).first();
    const cells = row.all(by.tagName('td'));
    const description = cells.get(0);
    const status = cells.get(1).element(by.tagName('span'));
    const actionStart = cells.get(2).element(by.xpath('.//button[contains(text(), "Start")]'));
    const actionClose = cells.get(2).element(by.xpath('.//button[contains(text(), "Close")]'));

    if (data.description.length > 90) {
      const descriptionShowMore = description.element(by.xpath('.//button[contains(text(), "Show more")]'));
      await descriptionShowMore.click();
    }
    expect(description.element(by.tagName('div')).getText()).toEqual(data.description);
    expect(title.getText()).toEqual(data.title);
    expect(status.getText()).toEqual(data.status);
    switch (data.status) {
      case 'Open':
        expect(actionStart.isPresent()).toBeTruthy();
        expect(actionClose.isPresent()).toBeTruthy();
        break;
      case 'Pending':
        expect(actionStart.isPresent()).toBeFalsy();
        expect(actionClose.isPresent()).toBeTruthy();
        break;
      case 'Closed':
        expect(actionStart.isPresent()).toBeFalsy();
        expect(actionClose.isPresent()).toBeFalsy();
        break;
    }
  }

  public fetchRows() {
    this.table = element(by.tagName('tbody'));
    this.rows = this.table.all(by.tagName('tr'));
  }

  public async verifyIssues() {
    const data = this.getJsonData();

    for (let i = 0; i < data.length; i++) {
      await this.verifyRow(i, data[i]);
    }
  }

  public findFirstRowNumberWithStatus(status: string): number {
    const data = this.getJsonData();
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === status) {
        return i;
      }
    }
  }

  public async startIssue(rowNumber: number): Promise<void> {
    const row = this.rows.get(rowNumber);
    const cells = row.all(by.tagName('td'));
    const actionStart = cells.get(2).element(by.xpath('.//button[contains(text(), "Start")]'));
    await actionStart.click();
  }

  public async closeIssue(rowNumber: number): Promise<void> {
    const row = this.rows.get(rowNumber);
    const cells = row.all(by.tagName('td'));
    const actionClose = cells.get(2).element(by.xpath('.//button[contains(text(), "Close")]'));
    await actionClose.click();
  }
}
