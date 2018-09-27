export class Issue {
    public title: string;
    public description: string;
    public status: string;
    public uiState?: {
        isExpanded: boolean
    };
}
export const statusOpen = 'Open';
export const statusPending = 'Pending';
export const statusClosed = 'Closed';

