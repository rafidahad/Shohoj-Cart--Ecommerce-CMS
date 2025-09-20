<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class AttachOwnerRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            // identify existing user by id OR email
            'user_id'                 => ['nullable','integer','exists:users,id'],
            'email'                   => ['required_without:user_id','email','exists:users,email'],
            'assign_owner_role'       => ['sometimes','boolean'],
        ];
    }
}
