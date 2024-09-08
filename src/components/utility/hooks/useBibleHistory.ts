import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useUserBibleHistory } from "../../../hooks/UserHooks";
import { BibleReadParams } from "../../../assets/ts/types";

/* Context */
import { useAppContext } from "../../../context/context";

const useBibleHistory = () => {
  // context
  const { chosenBook, chosenChapterNumber } = useAppContext();

  const urlParams = useParams<BibleReadParams>();
  const history = useHistory();
  const { data: userBibleHistoryData } = useUserBibleHistory();

  useEffect(() => {
    // check for needed values
    if (!userBibleHistoryData) return;
    if (Object.keys(urlParams).length) return;

    // get the current user bible history
    const currentUserBibleHistory =
      userBibleHistoryData.me?.user?.bibleHistory?.find(
        (history) => history.current
      );

    // check that the there is a bible history
    if (!currentUserBibleHistory) return;

    // get it's latest history
    const latestHistory = currentUserBibleHistory.history[0];

    // Get the current URL
    const currentUrl = history.location.pathname;

    history.push(
      `${currentUrl}/${latestHistory?.language}/${latestHistory?.bibleAbbr}/${latestHistory?.bookId}/${latestHistory?.chapterNumber}`
    );
  }, [userBibleHistoryData]); // eslint-disable-line react-hooks/exhaustive-deps

  // checks for change in the global state for bible changes and pushes the route with param
  useEffect(() => {
    if (!chosenBook || !chosenChapterNumber) return;

    /*--- Setting Url --- */
    // Get the current URL
    const currentUrl = history.location.pathname;

    // Split the current URL into parts
    const parts = currentUrl.split("/");

    // Check if the position exists
    if (!parts[5]) {
      history.push(
        `${currentUrl}/${chosenBook?.bookId}/${chosenChapterNumber}`
      );
      return;
    }

    // Replace the value at the third position with the new Bible ID
    parts[4] = chosenBook?.bookId!;
    parts[5] = chosenChapterNumber?.toString()!;

    // Join the parts back together to form the new URL
    const newUrl = parts.join("/");
    history.push(newUrl);
  }, [chosenChapterNumber, chosenBook]); // eslint-disable-line react-hooks/exhaustive-deps

  return { userBibleHistoryData };
};

export default useBibleHistory;
