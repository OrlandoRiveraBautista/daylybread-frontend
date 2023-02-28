import { Database, Storage } from "@ionic/storage";
import { useState } from "react";

export const useLocalStorage = () => {
  const [localStorage, setLocalStorage] = useState<Database | null>();

  const init = async () => {
    const store = new Storage();

    const storage = await store.create();

    setLocalStorage(storage);
  };

  return {
    init,
    localStorage,
  };
};
