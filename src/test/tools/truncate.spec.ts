import { truncate } from '../../app/tools/truncate';

describe('Truncate', () => {
    it('should return truncated text concatenated with triple dot if it is longer than characters argument', () => {
        const truncatedText = truncate('12-char-text', 4);
        expect(truncatedText).toEqual('12-c...');
    } );

    it('should return not changed text if it is shorter than characters argument', () => {
        const truncatedText = truncate('12-char-text', 13);
        expect(truncatedText).toEqual('12-char-text');
    });

    it('should return not changed text if its length is equal to characters argument', () => {
        const truncatedText = truncate('12-char-text', 12);
        expect(truncatedText).toEqual('12-char-text');
    });
});
