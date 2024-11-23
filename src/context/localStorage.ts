import { Database, Storage } from "@ionic/storage";

class StorageService {
  private static instance: Database | null = null;

  static async getInstance(): Promise<Storage> {
    if (!StorageService.instance) {
      const store = new Storage();
      StorageService.instance = await store.create();
    }
    return StorageService.instance;
  }
}

export default StorageService;
