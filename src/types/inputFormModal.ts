export type Props = {
  type: string;
  date: string | null;
  amount: number;
  item: string;
  isDisabled: boolean;
  close: () => void;
};
