<?php

namespace App\Http\Requests\Shop;

use Illuminate\Foundation\Http\FormRequest;

class StoreShopRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name'        => ['required','string','max:180'],
            'slug'        => ['required','string','max:191','unique:shops,slug'],
            'location'    => ['nullable','string','max:180'],
            'owner_name'  => ['nullable','string','max:150'],
            'details'     => ['nullable','string'],
            'active'      => ['sometimes','boolean'],

            // optional: create/attach owner in the same call
            'owner'                       => ['sometimes','array'],
            'owner.id'                    => ['nullable','integer','exists:users,id'],
            'owner.name'                  => ['required_without:owner.id','string','max:150'],
            'owner.email'                 => ['required_without:owner.id','email','max:191','unique:users,email'],
            'owner.phone'                 => ['nullable','string','max:40'],
            'owner.password'              => ['required_without:owner.id','string','min:8'],
            'owner.assign_owner_role'     => ['sometimes','boolean'],
        ];
    }
}
