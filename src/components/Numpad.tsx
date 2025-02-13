import React from 'react';

const KEYS = [
  '1', '2', '3',
  '4', '5', '6',
  '7', '8', '9',
  ',', '0', 'del'
];

export function Numpad() {
  return (
    <div className="grid grid-cols-3 gap-5 w-fit">
      {KEYS.map((key) => (
        <button
          key={key}
          className="h-[80px] w-[100px] bg-white rounded-lg flex items-center justify-center hover:bg-mint-50"
        >
          {key === 'del' ? (
            <img src="/icons/12.png" alt="Delete" className="w-8 h-8" />
          ) : (
            <span className="text-lg font-medium">{key}</span>
          )}
        </button>
      ))}
    </div>
  );
}
