export const currentLobbyCodeStorageKey = "CURRENT_LOBBY_CODE";
export const playerNameStorageKey = "playerName";

export function storeLocalString(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getLocalString(key: string): string | null {
  const storedItem = localStorage.getItem(key);
  if (storedItem) {
    return storedItem;
  }
  return null;
}
