import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import route from 'ziggy-js';
import { Ziggy } from '@/ziggy'; 

export default function Login() {
  const form = useForm({
    email: '',
    password: '',
    remember: false,
  });

console.log('Register route:', route('register', undefined, undefined, Ziggy));  

  function submit(e) {
    e.preventDefault();
    form.post(route('login', undefined, undefined, Ziggy));
  }


  return (
    
  <AuthLayout title="Sign in to your account">
    <p className="mt-2 text-center text-sm text-gray-600">
      Or{' '}
      <Link href={route('register', undefined, undefined, Ziggy)} className="font-medium text-indigo-600 hover:text-indigo-500">
        start your free trial
      </Link>
    </p>

    <form onSubmit={submit} className="mt-6 space-y-6" noValidate>
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
          autoComplete="username"
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
          autoComplete="current-password"
          required
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
            focus:ring-indigo-500 sm:text-sm ${form.errors.password ? 'border-red-500' : ''}`}
        />
        {form.errors.password && (
          <p className="mt-1 text-sm text-red-600">{form.errors.password}</p>
        )}
      </div>

      {/* Remember me */}
      <div className="flex items-center">
        <input
          id="remember"
          type="checkbox"
          checked={form.data.remember}
          onChange={e => form.setData('remember', e.target.checked)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>

      {/* Submit Sign In */}
      <div>
        <button
          type="submit"
          disabled={form.processing}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md
            shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {form.processing ? 'Signing in...' : 'Sign in'}
        </button>
      </div>

      {/* Sign Up Button inside the form */}
     <div className="mt-4">
  <Link href={route('register', undefined, undefined, Ziggy)}>Sign Up</Link>
</div>

    </form>
  </AuthLayout>
);

}
