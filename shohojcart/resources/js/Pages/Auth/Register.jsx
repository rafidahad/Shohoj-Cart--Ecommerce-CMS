// resources/js/Pages/Auth/Register.jsx
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


/*
import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />

                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
*/