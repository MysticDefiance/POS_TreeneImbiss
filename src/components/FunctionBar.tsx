import React from 'react';
import {
  Ticket,
  Users,
  BarChart,
  Printer,
  Clock,
  Gift,
  ShoppingBag,
  CreditCard,
  Wallet
} from 'lucide-react';

const FUNCTIONS = [
  { icon: Ticket, label: 'Ticket' },
  { icon: Users, label: 'Kunden' },
  { icon: BarChart, label: 'Stats' },
  { icon: Printer, label: 'Druck' },
  { icon: Clock, label: 'Zeit' },
  { icon: Gift, label: 'Bonus' },
  { icon: ShoppingBag, label: 'Shop' }
];

const PAYMENT_FUNCTIONS = [
  { label: 'Diverses\n7%', color: 'bg-white' },
  { label: 'Diverses\n19%', color: 'bg-white' },
  { icon: ShoppingBag, color: 'bg-mint-500 text-white' },
  { icon: CreditCard, color: 'bg-white' },
  { icon: Wallet, color: 'bg-white' },
  { icon: Ticket, color: 'bg-white' }
];

export function FunctionBar() {
  return (
    <div className="flex gap-5">
      <div className="flex gap-5">
        {FUNCTIONS.map(({ icon: Icon, label }) => (
          <button
            key={label}
            className="h-[80px] w-[150px] bg-white rounded-lg p-4 hover:bg-gray-50"
          >
            <div className="flex flex-col items-center gap-2">
              <Icon className="w-5 h-5" />
              <span className="text-sm">{label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex gap-5">
        {PAYMENT_FUNCTIONS.map((fn, i) => (
          <button
            key={i}
            className={`
              h-[80px] w-[100px] rounded-lg p-4 flex items-center justify-center
              ${fn.color}
              hover:opacity-90
            `}
          >
            {fn.icon ? (
              <div className="flex flex-col items-center gap-2">
                <fn.icon className="w-5 h-5" />
              </div>
            ) : (
              <div className="text-sm whitespace-pre-line text-center">
                {fn.label}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
