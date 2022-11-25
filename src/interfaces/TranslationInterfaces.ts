export interface ITranslation {
  __typename?: "Translation" | undefined;
  _id: string;
  name: string;
  abbreviation: string;
  language: string;
  lang: string;
  books: {
    __typename?: "TranslationBook" | undefined;
    bookName: string;
    bibleId: string;
  }[];
}
