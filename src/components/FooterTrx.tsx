import React from 'react';

export function FooterTrx() {
  const functionButtons = Array.from({ length: 7 }, (_, i) => ({
    icon: `/icons/0${i + 1}.png`,
    width: 150,
  }));

  const paymentButtons = [
    { label: 'Diverses\n7%', width: 100 },
    { label: 'Diverses\n19%', width: 100 },
    ...Array.from({ length: 4 }, (_, i) => ({
      icon: `/icons/${(i + 8).toString().padStart(2, '0')}.png`,
      width: 100,
    })),
  ];

  return (
    <div className="flex gap-[19.5px] w-fit">
      {/* Left section - Function buttons */}
      <div className="flex gap-[19.5px]">
        {functionButtons.map((button, index) => (
          <button
            key={index}
            style={{
              height: '80px',
              width: `${button.width}px`,
              backgroundColor: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0fdf4'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
          >
            <img src={button.icon} alt={`Function ${index + 1}`} className="w-8 h-8" />
          </button>
        ))}
      </div>

      {/* Right section - Payment buttons */}
      <div className="flex gap-[19.5px]">
        {paymentButtons.map((button, index) => (
          <button
            key={index}
            style={{
              height: '80px',
              width: `${button.width}px`,
              backgroundColor: 'white',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0fdf4'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'white'}
          >
            {button.label ? (
              <span className="text-sm whitespace-pre-line text-center">
                {button.label}
              </span>
            ) : (
              <img src={button.icon} alt={`Payment ${index + 1}`} className="w-8 h-8" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
