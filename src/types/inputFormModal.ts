export type Props = {
  id: string;
  balance_type: string;
  date: string | null;
  amount: number;
  item: string;
  isDisabled: boolean;
  close: () => void;
  addData: () => void;
  updateData: () => void;
  deleteData: () => void;
};
