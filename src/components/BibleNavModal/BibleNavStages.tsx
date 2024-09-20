import React, { useEffect, useState } from "react";
import {
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonCardSubtitle,
} from "@ionic/react";

/* Components */
import Skeleton from "../Loading/Skeleton";

/* Context */
import { useAppContext } from "../../context/context";

/* Types */
import { BbBook } from "../../__generated__/graphql";

export const BooksPicker: React.FC = () => {
  /* Context and state */
  const {
    setBook,
    chosenBook,
    setChapterNumber,
    chosenBibleBooks,
    setLocalChapters,
  } = useAppContext();

  /* Side Effects */
  // checks chosenBooks from context and scrolls the view to the selected book
  useEffect(() => {
    if (!chosenBook?.bookId) return;

    const element = document.getElementById(chosenBook.bookId);

    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [chosenBook]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!chosenBook?.bookId) return;
    const element = document.getElementById(chosenBook.bookId);

    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function to render loading skeleton animation
   * @augments -
   * @returns JSX.Element[]
   */
  const renderSkeleton = () => {
    const items = [];
    for (let i = 0; i < 12; i++) {
      items.push(
        <React.Fragment key={i}>
          <IonCol size="6" size-md="4" size-lg="4" key={i}>
            <Skeleton height="120px" width="100%" shape="square" />
          </IonCol>
        </React.Fragment>
      );
    }

    return items;
  };

  const handleSettingBook = (book: BbBook) => {
    setLocalChapters([]);
    setBook(book);
    setChapterNumber(1); // set the chapter to 1
  };

  return (
    <div className="nav-selection">
      <IonRow>
        {!chosenBibleBooks ? (
          <>
            <Skeleton height="24px" width="100%" shape="square" />
            {renderSkeleton()}
          </>
        ) : (
          // looping through options
          chosenBibleBooks.map((book, index) => (
            <React.Fragment key={index}>
              {/* options rendering */}
              <IonCol size="6" size-md="4" size-lg="4" key={book.bookId}>
                <IonCard
                  id={book.bookId!}
                  button
                  className={`outlined-card ${
                    book.bookId === chosenBook?.bookId ? "selected" : ""
                  }`}
                  onClick={() => handleSettingBook(book)}
                >
                  <IonCardContent>
                    <div className="book-number">{index + 1}</div>
                  </IonCardContent>
                  <IonCardHeader>
                    <IonCardTitle>{book.name}</IonCardTitle>
                    <IonCardSubtitle>{book.bookGroup}</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </React.Fragment>
          ))
        )}
      </IonRow>
    </div>
  );
};

export const ChapterPicker: React.FC = () => {
  const { chosenBook, setChapterNumber, chosenChapterNumber } = useAppContext();

  /* Use Effects */
  useEffect(() => {
    if (!chosenChapterNumber) return;
    const element = document.getElementById(chosenChapterNumber.toString());

    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [chosenChapterNumber]);

  /**
   * Function to render loading skeleton animation
   * @augments -
   * @returns JSX.Element[]
   */
  const renderSkeleton = () => {
    const items = [];
    for (let i = 0; i < 16; i++) {
      items.push(
        <>
          <IonCol size="6" size-md="4" size-lg="4" key={i}>
            <Skeleton height="66px" width="100%" shape="square" />
          </IonCol>
        </>
      );
    }

    return items;
  };

  return (
    <div className="nav-selection">
      <IonRow>
        {!chosenBook
          ? renderSkeleton()
          : // looping through options
            chosenBook.chapters?.map((chapter, index) => (
              <React.Fragment key={index}>
                {/* options rendering */}
                <IonCol size="6" size-md="4" size-lg="4" key={chapter}>
                  <IonCard
                    id={chapter.toString()}
                    button
                    className={`outlined-card ${
                      chosenChapterNumber === chapter ? "selected" : ""
                    }`}
                    onClick={() => setChapterNumber(chapter)}
                  >
                    <IonCardContent>
                      <div className="book-number">{chapter}</div>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </React.Fragment>
            ))}
      </IonRow>
    </div>
  );
};
