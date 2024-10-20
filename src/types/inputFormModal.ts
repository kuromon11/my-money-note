export type Props = {
  balance_type: string;
  date: string | null;
  amount: number;
  item: string;
  isDisabled: boolean;
  close: () => void;
};
