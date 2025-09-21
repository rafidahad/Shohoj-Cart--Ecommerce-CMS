<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'shop_id'   => ['nullable','integer','exists:shops,id'],
            'name'      => ['required','string','max:150'],
            'email'     => ['required','email','max:191','unique:users,email'],
            'phone'     => ['nullable','string','max:40'],
            'password'  => ['required','string','min:8'],
            'device'    => ['nullable','string','max:60'],
        ];
    }

    public function messages(): array
    {
        return [
            'email.unique' => 'This email is already registered.',
        ];
    }
}
