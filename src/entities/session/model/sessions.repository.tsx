import { persistStorage } from "../../../shared/lib/persist-storage";
import { Session } from "./types";

const SESSION_STORAGE_KEY = "session_storage";
export const sessionRepository = {
  getSessions: () => {
    return persistStorage.getItemSafe<Session | undefined>(
      SESSION_STORAGE_KEY,
      undefined,
    );
  },
  saveSession: (value: Session) => {
    return persistStorage.setItemSafe<Session | undefined>(
      SESSION_STORAGE_KEY,
      value,
    );
  },
  clearSession: () => {
    return persistStorage.setItemSafe<Session | undefined>(
      SESSION_STORAGE_KEY,
      undefined,
    );
  },
};
