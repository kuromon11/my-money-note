import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ja } from 'date-fns/locale/ja';

registerLocale('ja', ja);

const HouseholdAccountFilter: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(
    new Date().toLocaleDateString('ja-JP').split('/').join('-')
  );
  const changeStartDate = (value: Date | null) => {
    const date = value
      ? value.toLocaleDateString('ja-JP').split('/').join('-')
      : '';
    setStartDate(date);
    if (value && new Date(value) > new Date(endDate)) {
      setEndDate(date);
    }
  };
  const changeEndDate = (value: Date | null) => {
    if (!value) return;
    const date = value.toLocaleDateString('ja-JP').split('/').join('-');
    setEndDate(date);
    if (new Date(value) < new Date(startDate)) {
      setStartDate(date);
    }
  };

  return (
    <div className="flex px-8 pt-8">
      <div className="w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          対象日
        </label>
        <div className="flex items-center">
          <DatePicker
            locale="ja"
            dateFormat="yyyy/MM/dd"
            dateFormatCalendar="yyyy年 MM月"
            selected={startDate ? new Date(startDate) : null}
            isClearable={true}
            onChange={(startDate) => {
              changeStartDate(startDate);
            }}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <span className="mx-2 text-center">〜</span>
          <DatePicker
            locale="ja"
            dateFormat="yyyy/MM/dd"
            dateFormatCalendar="yyyy年 MM月"
            selected={new Date(endDate)}
            onChange={(endDate) => changeEndDate(endDate)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
    </div>
  );
};

export default HouseholdAccountFilter;
