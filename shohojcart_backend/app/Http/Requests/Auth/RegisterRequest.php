<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'     => ['required','string','max:150'],
            'email'    => ['required','email','max:191','unique:users,email'],
            'phone'    => ['nullable','string','max:40'],
            'password' => ['required', Password::min(8)->letters()->mixedCase()->numbers()->uncompromised()],
            'shop_id'  => ['nullable','integer','exists:shops,id'],
            'device'   => ['nullable','string','max:60'],
        ];
    }
}
