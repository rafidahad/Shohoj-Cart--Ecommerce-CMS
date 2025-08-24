import React from 'react';

export default function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen flex flex-col justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/*Logo*/}
        <img
          className="mx-auto h-12 w-auto"
          src="/images/logo.svg" // logo will be placed here
          alt="Your Logo"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
        <p className="mt-2 text-center text-sm text-gray-600 max-w">
          </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
