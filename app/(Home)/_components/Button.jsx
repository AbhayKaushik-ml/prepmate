import React from 'react';

const Button = ({ text, onClick, color = 'bg-white', size = 'px-6 py-3', type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${color} ${size} text-purple-500 font-semibold rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:scale-95`}
    >
      {text}
    </button>
  );
};

export default Button;
