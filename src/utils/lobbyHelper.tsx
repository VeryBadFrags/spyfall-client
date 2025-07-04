import {
  currentLobbyCodeStorageKey,
  getLocalString,
  storeLocalString,
} from "./storage";

export function setCurrentLobby(sessionId: string) {
  // TODO replace window.location.hash with ?code=
  window.location.hash = sessionId;
  storeLocalString(currentLobbyCodeStorageKey, sessionId);
}

export function retrieveCurrentLobby(): string | null {
  let windowHash = window.location.hash.split("#")[1];
  if (windowHash) {
    if (windowHash.length > 8) {
      windowHash = windowHash.substring(0, 8);
    }
    return windowHash.toUpperCase();
  } else {
    const storedLobbyCode = getLocalString(currentLobbyCodeStorageKey);
    if (storedLobbyCode) {
      window.location.hash = storedLobbyCode;
      return storedLobbyCode;
    }
  }
  return null;
}
