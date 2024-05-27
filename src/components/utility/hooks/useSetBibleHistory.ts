import { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { useUserBibleHistory } from "../../../hooks/UserHooks";
import { BibleReadParams } from "../../../assets/ts/types";

const useSetBibleHistory = () => {
  const urlParams = useParams<BibleReadParams>();
  const history = useHistory();
  const { data: userBibleHistoryData } = useUserBibleHistory();

  useEffect(() => {
    // check for needed values
    if (!userBibleHistoryData) return;
    if (Object.keys(urlParams).length) return;

    // get the current user bible history
    const currentUserBibleHistory =
      userBibleHistoryData?.me?.user?.bibleHistory?.find(
        (history) => history.current
      );

    // get it's latest history
    const latestHistory = currentUserBibleHistory?.history[0];

    // Get the current URL
    const currentUrl = history.location.pathname;

    history.push(
      `${currentUrl}/${latestHistory?.language}/${latestHistory?.bibleAbbr}/${latestHistory?.bookId}/${latestHistory?.chapterNumber}`
    );
  }, [userBibleHistoryData]); // eslint-disable-line react-hooks/exhaustive-deps

  return { userBibleHistoryData };
};

export default useSetBibleHistory;
