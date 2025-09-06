<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'login'    => ['required','string','max:191'], // email or phone
            'password' => ['required','string','min:8'],
            'device'   => ['nullable','string','max:60'],
        ];
    }
}
