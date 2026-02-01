import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";

import Locations from "../components/Locations";
import { useCrossedStore, useLobbyStore } from "../store/store";
import type { LocationData } from "../types/locationData.type";

const sampleLocations: LocationData[] = [
  { name: "✈️💺 Airport" },
  { name: "🎡🎢 Amusement Park" },
  { name: "🏦💰 Bank" },
  { name: "🎰💵 Casino" },
  { name: "🎞🍿 Cinema" },
  { name: "🎪🤡 Circus Show" },
  { name: "🦸🦹 Cosplay Convention" },
  { name: "🛳🌊 Cruise Ship" },
  { name: "🏝🥥 Desert Island" },
  { name: "⚽️🏟 Football Stadium" },
  { name: "🌳🏕 Forest Camp" },
  { name: "🏪🛒 Grocery Store" },
  { name: "🏥🧑‍⚕️ Hospital" },
  { name: "🏨🛏 Hotel" },
  { name: "⛸️🧊 Ice Rink" },
  { name: "🌕🧑‍🚀 Moon Colony" },
  { name: "⛰🥾 Mountain Hike" },
  { name: "🏛🖼 Museum" },
  { name: "🏤📮 Post Office" },
  { name: "🍽👩‍🍳 Restaurant" },
  { name: "🏟🎸 Rock Concert" },
  { name: "🚄🛤 Train Station" },
  { name: "🏫🎓 University" },
];

interface LocationsStoryProps {
  locations: LocationData[];
  currentLocation: string;
  crossedIndexes: number[];
}

function LocationsWithControls({
  locations,
  currentLocation,
  crossedIndexes,
}: LocationsStoryProps) {
  const setLocations = useLobbyStore((state) => state.setLocations);
  const setCurrentLocation = useLobbyStore((state) => state.setCurrentLocation);
  const setCrossedLocations = useCrossedStore(
    (state) => state.setCrossedLocations,
  );

  useEffect(() => {
    setLocations(locations);
    setCurrentLocation(currentLocation);
    setCrossedLocations(new Set(crossedIndexes));
  }, [
    locations,
    currentLocation,
    crossedIndexes,
    setLocations,
    setCurrentLocation,
    setCrossedLocations,
  ]);

  return <Locations />;
}

const meta = {
  title: "Components/Locations",
  component: LocationsWithControls,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentLocation: {
      control: "select",
      options: ["", ...sampleLocations.map((l) => l.name)],
    },
    crossedIndexes: {
      control: "object",
    },
  },
  args: {
    locations: sampleLocations,
    currentLocation: "",
    crossedIndexes: [],
  },
} satisfies Meta<typeof LocationsWithControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    locations: sampleLocations,
    currentLocation: "",
    crossedIndexes: [],
  },
};

export const WithCurrentLocation: Story = {
  args: {
    locations: sampleLocations,
    currentLocation: "🎰💵 Casino",
    crossedIndexes: [],
  },
};

export const WithCrossedLocations: Story = {
  args: {
    locations: sampleLocations,
    currentLocation: "",
    crossedIndexes: [0, 3, 5, 8],
  },
};

export const SpyView: Story = {
  args: {
    locations: sampleLocations,
    currentLocation: "",
    crossedIndexes: [1, 4, 6, 7, 10],
  },
};

export const Empty: Story = {
  args: {
    locations: [],
    currentLocation: "",
    crossedIndexes: [],
  },
};
