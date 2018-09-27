import { AppPage } from './app.po';

describe('issues-tracker App', () => {
  let page: AppPage;

  beforeEach(async () => {
    page = new AppPage();
    await page.navigateTo();
  });

  async function verifyStateTransition(initialState: string, finalState: string, action: 'Start' | 'Close') {
    page.fetchRows();
    const rowNumber = page.findFirstRowNumberWithStatus(initialState);
    if (action === 'Start') {
      await page.startIssue(rowNumber);
    } else {
      await page.closeIssue(rowNumber);
    }
    page.fetchRows();
    const data = page.getJsonData();
    const issue = Object.assign({}, data[rowNumber]);
    issue.status = finalState;
    await page.verifyRow(rowNumber, issue);
  }

  it('should display data with correct UI representation', async () => {
    page.fetchRows();
    await page.verifyIssues();
  });

  it('should change state from open to pending', async() => {
    await verifyStateTransition('Open', 'Pending', 'Start');
  });

  it('should change state from open to closed', async() => {
    await verifyStateTransition('Open', 'Closed', 'Close');
  });

  it('should change state from pending to closed', async() => {
    await verifyStateTransition('Pending', 'Closed', 'Close');
  });
});
