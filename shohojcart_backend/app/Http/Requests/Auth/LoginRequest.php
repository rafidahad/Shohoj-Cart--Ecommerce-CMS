<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            // email or phone in a single field:
            'login'    => ['required','string','max:191'],
            'password' => ['required','string'],
            'device'   => ['nullable','string','max:60'],
        ];
    }
}
