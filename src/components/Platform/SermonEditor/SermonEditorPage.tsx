import React, { useState, useEffect, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IonSpinner } from "@ionic/react";
import { SermonEditor } from "./SermonEditor";
import {
  useGetSermon,
  useLazyGetSermon,
  useCreateSermon,
  useUpdateSermon,
} from "../../../hooks/SermonHooks";
import { SermonStatus } from "../../../__generated__/graphql";

interface SermonEditorPageProps {}

export const SermonEditorPage: React.FC<SermonEditorPageProps> = () => {
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const isNew = !id || id === "new";

  // State for the current sermon ID (used after creating a new sermon)
  const [currentSermonId, setCurrentSermonId] = useState<string | null>(
    isNew ? null : id || null
  );
  const [initialTitle, setInitialTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // API hooks
  const [getSermon, { loading: loadingSermon }] = useLazyGetSermon();
  const [createSermon, { loading: isCreating }] = useCreateSermon();
  const [updateSermon, { loading: isUpdating }] = useUpdateSermon();

  // Load sermon data if editing
  useEffect(() => {
    const loadSermon = async () => {
      if (!isNew && id) {
        const result = await getSermon({ variables: { id } });
        const sermon = result.data?.getSermon?.results;
        if (sermon) {
          setInitialTitle(sermon.title);
          setInitialContent(sermon.content);
          setCurrentSermonId(sermon._id);
        }
      }
      setIsInitialLoad(false);
    };

    loadSermon();
  }, [id, isNew, getSermon]);

  const handleSave = useCallback(
    async (title: string, content: string) => {
      try {
        if (currentSermonId) {
          // Update existing sermon
          await updateSermon({
            variables: {
              id: currentSermonId,
              options: {
                title,
                content,
                status: SermonStatus.Draft,
              },
            },
          });
        } else {
          // Create new sermon
          const result = await createSermon({
            variables: {
              options: {
                title,
                content,
                status: SermonStatus.Draft,
              },
            },
          });

          const newSermon = result.data?.createSermon?.results;
          if (newSermon?._id) {
            // Update state with new ID
            setCurrentSermonId(newSermon._id);
            // Replace the URL from /sermons/new to /sermons/:id
            history.replace(`/sermons/${newSermon._id}`);
          }
        }
      } catch (err) {
        console.error("Error saving sermon:", err);
      }
    },
    [currentSermonId, createSermon, updateSermon, history]
  );

  const handleBack = useCallback(() => {
    history.push("/sermons");
  }, [history]);

  // Show loading while fetching existing sermon
  if (isInitialLoad && !isNew) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <IonSpinner name="crescent" />
      </div>
    );
  }

  return (
    <SermonEditor
      initialTitle={initialTitle}
      initialContent={initialContent}
      onSave={handleSave}
      onBack={handleBack}
      isSaving={isCreating || isUpdating}
      isNew={isNew && !currentSermonId}
    />
  );
};
