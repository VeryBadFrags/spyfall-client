import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";

import PlayersList from "../components/PlayersList";
import { useCrossedStore, useLobbyStore } from "../store/store";
import type { ClientData } from "../types/clientData.type";

const samplePlayers: ClientData[] = [
  { name: "Alice", avatar: "", ready: true },
  { name: "Bob", avatar: "", ready: true },
  { name: "Charlie", avatar: "", ready: false },
  { name: "Diana", avatar: "", ready: true },
  { name: "Eve", avatar: "", ready: false },
  { name: "Frank", avatar: "", ready: true },
];

interface PlayersListStoryProps {
  players: ClientData[];
  crossedIndexes: number[];
}

function PlayersListWithControls({
  players,
  crossedIndexes,
}: PlayersListStoryProps) {
  const setPeers = useLobbyStore((state) => state.setPeers);
  const setCrossedPeers = useCrossedStore((state) => state.setCrossedPeers);

  useEffect(() => {
    setPeers(players);
    setCrossedPeers(new Set(crossedIndexes));
  }, [players, crossedIndexes, setPeers, setCrossedPeers]);

  return <PlayersList />;
}

const meta = {
  title: "Components/PlayersList",
  component: PlayersListWithControls,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    crossedIndexes: {
      control: "object",
    },
  },
  args: {
    players: samplePlayers,
    crossedIndexes: [],
  },
} satisfies Meta<typeof PlayersListWithControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    players: samplePlayers,
    crossedIndexes: [],
  },
};

export const AllReady: Story = {
  args: {
    players: samplePlayers.map((p) => ({ ...p, ready: true })),
    crossedIndexes: [],
  },
};

export const WithCrossedPlayers: Story = {
  args: {
    players: samplePlayers,
    crossedIndexes: [1, 3],
  },
};

export const SmallGroup: Story = {
  args: {
    players: [
      { name: "Alice", avatar: "", ready: true },
      { name: "Bob", avatar: "", ready: true },
      { name: "Charlie", avatar: "", ready: true },
    ],
    crossedIndexes: [],
  },
};

export const LargeGroup: Story = {
  args: {
    players: [
      { name: "Alice", avatar: "", ready: true },
      { name: "Bob", avatar: "", ready: true },
      { name: "Charlie", avatar: "", ready: true },
      { name: "Diana", avatar: "", ready: true },
      { name: "Eve", avatar: "", ready: true },
      { name: "Frank", avatar: "", ready: true },
      { name: "Grace", avatar: "", ready: true },
      { name: "Henry", avatar: "", ready: false },
      { name: "Iris", avatar: "", ready: true },
      { name: "Jack", avatar: "", ready: false },
    ],
    crossedIndexes: [],
  },
};
