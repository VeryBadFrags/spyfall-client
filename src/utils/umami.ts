export function umamiIdentify(name: string, lobbyId: string) {
  window.umami?.identify({ name, lobbyId });
}

export function umamiTrackRoundStarted() {
  window.umami?.track("round_started");
}
