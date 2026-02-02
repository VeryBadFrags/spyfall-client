import type { Meta, StoryObj } from "@storybook/react-vite";
import { useEffect } from "react";

import Toast from "../components/Toast";
import { useToastStore } from "../store/store";

type ToastVariant = "success" | "warning" | "danger";

interface ToastStoryProps {
  message: string;
  variant: ToastVariant;
  show: boolean;
}

function ToastWithControls({ message, variant, show }: ToastStoryProps) {
  const { showToast, hideToast } = useToastStore();

  useEffect(() => {
    if (show) {
      showToast(message, variant);
    } else {
      hideToast();
    }
  }, [message, variant, show, showToast, hideToast]);

  return <Toast />;
}

const meta = {
  title: "Components/Toast",
  component: ToastWithControls,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "warning", "danger"],
    },
    show: {
      control: "boolean",
    },
    message: {
      control: "text",
    },
  },
  args: {
    message: "This is a toast message",
    variant: "success",
    show: true,
  },
} satisfies Meta<typeof ToastWithControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    message: "🕵 New round started!",
    variant: "success",
    show: true,
  },
};

export const Warning: Story = {
  args: {
    message: "⏰ 30 seconds left! Time to vote!",
    variant: "warning",
    show: true,
  },
};

export const Danger: Story = {
  args: {
    message: "An error occurred",
    variant: "danger",
    show: true,
  },
};

export const Hidden: Story = {
  args: {
    message: "You won't see this",
    variant: "success",
    show: false,
  },
};
