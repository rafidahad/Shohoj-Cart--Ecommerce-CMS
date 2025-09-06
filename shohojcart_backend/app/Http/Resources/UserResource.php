<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id'        => $this->id,
            'shop_id'   => $this->shop_id,
            'name'      => $this->name,
            'email'     => $this->email,
            'phone'     => $this->phone,
            'status'    => $this->status,
            'verified'  => (bool) $this->email_verified_at,
            'roles'     => $this->whenLoaded('roles', fn() => $this->roles->pluck('name')),
            'created_at'=> $this->created_at,
        ];
    }
}
