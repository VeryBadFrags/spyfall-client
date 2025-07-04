export const currentLobbyCodeStorageKey = "CURRENT_LOBBY_CODE";
export const playerNameStorageKey = "playerName";

export function storeLocalData(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getLocalData(key: string) {
  return localStorage.getItem(key);
}
