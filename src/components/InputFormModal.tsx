import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { MdOutlineTaskAlt, MdDelete } from 'react-icons/md';
import { ja } from 'date-fns/locale/ja';
import 'react-datepicker/dist/react-datepicker.css';

import { api } from '../api.ts';

import { Props } from '../types/inputFormModal.ts';

import { generateRandomID } from '../utils/random.ts';

registerLocale('ja', ja);

const InputFormModal: React.FC<Props> = (props) => {
  const [balanceType, setBalanceType] = useState('expense');
  const [date, setDate] = useState(
    new Date()
      .toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/')
      .join('-')
  );
  const [amount, setAmount] = useState(0);
  const [item, setItem] = useState('');
  const isDisabled = !balanceType || !date || !item;
  const { addData, updateData, deleteData, close } = props;

  const changeBalanceType = (value: string) => {
    setBalanceType(value);
  };
  const changeDate = (value: Date | null) => {
    if (!value) return;
    const date = value
      .toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .split('/')
      .join('-');
    setDate(date);
  };
  const changeAmount = (value: number) => {
    if (String(value).replace(/[^0-9]/g, '').length === 0) return;
    setAmount(value);
  };
  const changeItem = (value: string) => {
    setItem(value);
  };

  useEffect(() => {
    (async () => {
      const { balance_type, date, amount, item } = props;

      setBalanceType(balance_type);
      setDate(date);
      setAmount(amount);
      setItem(item);
    })();
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg p-6 w-full max-w-md">
        <button
          className="absolute top-3 right-3 text-2xl text-black hover:text-gray-700"
          onClick={() => {
            close();
          }}
        >
          &times;
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {props.id ? '編集' : '登録'}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            収入/支出
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              id="income"
              name="transactionType"
              value="income"
              className="mr-2"
              checked={balanceType === 'income'}
              onChange={(e) => changeBalanceType(e.target.value)}
            />
            <label htmlFor="income" className="mr-4">
              収入(+)
            </label>
            <input
              type="radio"
              id="expense"
              name="transactionType"
              value="expense"
              className="mr-2"
              checked={balanceType === 'expense'}
              onChange={(e) => changeBalanceType(e.target.value)}
            />
            <label htmlFor="expense">支出(-)</label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            日付
          </label>
          <DatePicker
            locale="ja"
            dateFormat="yyyy/MM/dd"
            dateFormatCalendar="yyyy年 MM月"
            selected={date ? new Date(date) : null}
            onChange={(date) => changeDate(date)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            金額（円）
          </label>
          <input
            type="text"
            id="amount"
            inputMode="numeric"
            value={amount}
            onChange={(e) => changeAmount(Number(e.target.value))}
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="980"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            内容
          </label>
          <input
            type="text"
            id="category"
            value={item}
            onChange={(e) => changeItem(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="例：コンビニ、ランチ代、電気代、給与"
          />
        </div>
        <div className="flex items-center justify-end mt-8">
          <button
            onClick={async () => {
              const payload = {
                date: date.split('/').join('-'),
                amount,
                item,
                balance_type: balanceType,
              };
              const id = props.id ? props.id : generateRandomID();
              const params = { id, ...payload };
              if (props.id) {
                await api('PUT /data', params);
                await updateData();
              } else {
                await api('POST /data', params);
                await addData();
              }
              close();
            }}
            className="w-full bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-tahiti disabled:text-tahiti disabled:opacity-50"
            disabled={isDisabled}
          >
            <MdOutlineTaskAlt className="inline-block" />
            <span className="ml-1">確定</span>
          </button>
        </div>
        <div className="flex items-center justify-end mt-8">
          {props.id && (
            <button
              onClick={async () => {
                const { id } = props;
                await api(`DELETE /data`, { id });
                await deleteData();
                close();
              }}
              className="w-full bg-red hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:text-tahiti disabled:text-tahiti disabled:opacity-50"
            >
              <MdDelete className="inline-block" />
              <span className="ml-1">削除</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputFormModal;
