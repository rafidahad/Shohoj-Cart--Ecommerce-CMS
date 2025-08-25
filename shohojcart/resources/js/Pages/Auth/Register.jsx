import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';

export default function Register() {
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  function submit(e) {
    e.preventDefault();
    form.post(route('register'));
  }

  return (
    <AuthLayout title="Create your account">
      <p className="mt-2 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href={route('login')} className="font-medium text-indigo-600 hover:text-indigo-500">
          Sign in
        </Link>
      </p>

      <form onSubmit={submit} className="mt-6 space-y-6" noValidate>
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.data.name}
            onChange={e => form.setData('name', e.target.value)}
            autoComplete="name"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-sm ${form.errors.name ? 'border-red-500' : ''}`}
          />
          {form.errors.name && (
            <p className="mt-1 text-sm text-red-600">{form.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.data.email}
            onChange={e => form.setData('email', e.target.value)}
            autoComplete="email"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-sm ${form.errors.email ? 'border-red-500' : ''}`}
          />
          {form.errors.email && (
            <p className="mt-1 text-sm text-red-600">{form.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.data.password}
            onChange={e => form.setData('password', e.target.value)}
            autoComplete="new-password"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-sm ${form.errors.password ? 'border-red-500' : ''}`}
          />
          {form.errors.password && (
            <p className="mt-1 text-sm text-red-600">{form.errors.password}</p>
          )}
        </div>

        {/* Password Confirmation */}
        <div>
          <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={form.data.password_confirmation}
            onChange={e => form.setData('password_confirmation', e.target.value)}
            autoComplete="new-password"
            required
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
              focus:ring-indigo-500 sm:text-sm ${form.errors.password_confirmation ? 'border-red-500' : ''}`}
          />
          {form.errors.password_confirmation && (
            <p className="mt-1 text-sm text-red-600">{form.errors.password_confirmation}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={form.processing}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md
              shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {form.processing ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
