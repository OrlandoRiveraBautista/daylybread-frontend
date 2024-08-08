import { BbVerse } from "../__generated__/graphql";

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

export interface IBookInterface {
  __typename?: "Book" | undefined;
  _id: string;
  bookName: string;
  bibleId: string;
  chapters: {
    __typename?: "BookChapter" | undefined;
    chapterName: string;
    bibleId: string;
  }[];
  translation: {
    __typename?: "TranslationField" | undefined;
    abbreviation: string;
    name: string;
  };
}

export interface IVerseInterface {
  __typename?: "ChapterVerse" | undefined;
  verse: string;
  bibleId: string;
  text: string;
}

export interface IChapterInterface {
  __typename?: "Chapter" | undefined;
  _id: string;
  chapterNumber: string;
  bibleId: string;
  bookName: string;
  verses: IVerseInterface[];
  translation: {
    __typename?: "TranslationField" | undefined;
    abbreviation: string;
    name: string;
  };
}

export interface IChosenChapterVerses {
  previous: BbVerse[];
  current: BbVerse[];
  next: BbVerse[];
}
