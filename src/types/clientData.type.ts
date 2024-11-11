export type ClientData = {
  avatar: string;
  name: string;
  ready: boolean;

  /** Transient - Lets the local player cross a peer */
  crossed: boolean;
};
