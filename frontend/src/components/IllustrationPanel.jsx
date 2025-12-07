import React from 'react';

export default function IllustrationPanel() {
  return (
    <div className="h-full w-full relative overflow-hidden bg-purple-900">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-800"></div>
      <img
        src="/illustration.png"
        className="absolute inset-0 w-full h-full object-cover z-10"
        alt="Security illustration"
      />
    </div>
  );
}
