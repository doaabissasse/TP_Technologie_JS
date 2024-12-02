import { Book } from './book';

describe('Book', () => {
  it('should create an instance', () => {
    expect(new Book('book',true)).toBeTruthy();
  });
});
