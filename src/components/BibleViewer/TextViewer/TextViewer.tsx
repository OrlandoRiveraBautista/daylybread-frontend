import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { IonCol } from "@ionic/react";

/* Components */
import BreadCrumbsModal from "../../BreadCrumbsModal/BreadCrumbsModal";
import Skeleton from "../../Loading/Skeleton";

/* Styles */
import "./TextViewer.scss";

/* Utils */
import { getVerseClass } from "../../../utils/support";

/* Context */
import { useAppContext } from "../../../context/context";

/* Types & Interfaces*/
import { BbVerse } from "../../../__generated__/graphql";
import useBibleMedia from "../../utility/hooks/useBibleMedia";
interface ITextViewer {
  verses: BbVerse[];
  isLoading: boolean;
}
export type TextViewerRefType = {
  handleOpenVerseModal: () => void;
};

/**
 * Function to render loading skeleton animation
 * @augments -
 * @returns JSX.Element[]
 */
const renderSkeleton = () => {
  const items = [];
  for (let i = 0; i < 24; i++) {
    items.push(
      <React.Fragment key={i}>
        <IonCol size="12" key={i}>
          <Skeleton height="20px" width="100%" shape="square" />
        </IonCol>
      </React.Fragment>
    );
  }

  return items;
};

const TextViewer = forwardRef<TextViewerRefType, ITextViewer>(
  ({ verses, isLoading }: ITextViewer, ref) => {
    /* Context */
    const {
      chosenChapterNumber,
      chosenChapterVerses,
      chosenBook,
      chosenBible,
      currentMediaTimeStamp,
      selectedVerseList,
      addVerseToList,
      removeVerseFromList,
      resetVersesInList,
    } = useAppContext();

    const [selectedElement, setSelectedElement] = useState<Array<string>>([]);
    const [openSelectedVersesModal, setOpenSelectedVersesModal] =
      useState<boolean>(false);
    const [initialModalBreakpoint, setInitialModalBreakpoint] =
      useState<number>(0.25);

    const { mediaTimestamps } = useBibleMedia();

    useEffect(() => {
      const chapterViewerWrapper = document.getElementById("chapter-viewer");

      if (chapterViewerWrapper?.style) {
        if (!openSelectedVersesModal) {
          setSelectedElement([]);
          resetVersesInList();
          chapterViewerWrapper.style.gap = "0px";
        } else {
          chapterViewerWrapper.style.gap = "120px";
        }
      }
    }, [openSelectedVersesModal]); // eslint-disable-line react-hooks/exhaustive-deps

    const handleMouseDown = (event: string) => {
      // get the desired html element
      const span = document.getElementById(event);
      // get the verse numbers
      const verseNumber = span?.innerText.split(":")[0];

      // if no text exit function
      if (!verseNumber) return;

      const verseObj = chosenChapterVerses?.current![Number(verseNumber) - 1];

      if (!verseObj) return;
      setInitialModalBreakpoint(0.25);

      // check if the state is empty
      if (selectedElement.length === 0) {
        addVerseToList(verseObj);
        setSelectedElement([verseNumber]);
        setOpenSelectedVersesModal(true);
        return;
      }

      var tempValue = [...selectedElement];
      // check if the value selected is in the list
      if (selectedElement.includes(verseNumber)) {
        const valueIndex = selectedElement.indexOf(verseNumber);
        if (valueIndex > -1) {
          tempValue.splice(valueIndex, 1);
          removeVerseFromList(verseObj);
          setSelectedElement(tempValue);
        }
        if (tempValue.length === 0) {
          setOpenSelectedVersesModal(false);
        }

        return;
      }

      tempValue.push(verseNumber);

      setSelectedElement(tempValue);
      setOpenSelectedVersesModal(true);

      addVerseToList(verseObj!);
      return;
    };

    const handleOpenVerseModal = () => {
      if (!openSelectedVersesModal) resetVersesInList();

      setOpenSelectedVersesModal(!openSelectedVersesModal);
      setInitialModalBreakpoint(0.75);
    };

    // Pass the ref to the useImperativeHandle hook
    useImperativeHandle(ref, () => ({
      handleOpenVerseModal: () => {
        handleOpenVerseModal();
      },
    }));

    return (
      <>
        <div className="text-viewer">
          <>
            <strong className="chapter-number">{verses[0].chapter}</strong>
            {isLoading ? (
              renderSkeleton()
            ) : (
              <>
                {verses.map((verse, index) => (
                  <span
                    onClick={() =>
                      handleMouseDown(
                        chosenBible?.abbr! +
                          chosenBook?.bookId! +
                          chosenChapterNumber +
                          verse.verseStart?.toString()
                      )
                    }
                    id={
                      chosenBible?.abbr! +
                      chosenBook?.bookId! +
                      chosenChapterNumber +
                      verse.verseStart?.toString()
                    }
                    key={verse.verseStart?.toString()}
                    className={`${
                      selectedVerseList.some(
                        (sv) => sv.verseStart === verse.verseStart
                      )
                        ? "verse-selected"
                        : ""
                    } 
                    ${getVerseClass(
                      chosenChapterVerses?.current[index]!,
                      currentMediaTimeStamp,
                      mediaTimestamps!
                    )}
                    `}
                  >
                    <b>{verse.verseStart}:</b> {verse.verseText}
                  </span>
                ))}
              </>
            )}
          </>
        </div>

        {/* bible assistant modal */}
        <BreadCrumbsModal
          isOpen={openSelectedVersesModal}
          onDismiss={handleOpenVerseModal}
          selectedText={selectedElement}
          initialBreakpoint={initialModalBreakpoint}
        />
      </>
    );
  }
);

export default TextViewer;
