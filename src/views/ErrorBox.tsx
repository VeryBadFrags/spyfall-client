import { create } from "zustand";
interface errorState {
  errorMessage: string;
  setErrorMessage: (error: string) => void;
}
export const useErrorMessageStore = create<errorState>((set) => ({
  errorMessage: "",
  setErrorMessage: (error: string) =>
    set(() => {
      return { errorMessage: error };
    }),
}));

// TODO make the message disapear after a few seconds
export default function ErrorBox() {
  const errorMessage = useErrorMessageStore((state) => state.errorMessage);

  if (errorMessage) {
    return <div className="alert alert-danger mb-3">{errorMessage}</div>;
  } else {
    return null;
  }
}
