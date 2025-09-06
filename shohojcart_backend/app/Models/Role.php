<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     */
    protected $table = 'roles';

    /**
     * Mass assignable attributes.
     */
    protected $fillable = ['name'];

    /**
     * Default attribute casts.
     */
    protected $casts = [
        'id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Users that belong to this role.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_roles');
    }

    /**
     * Optional: canonical role names as constants for safer references.
     */
    public const OWNER   = 'Owner';
    public const ADMIN   = 'Admin';
    public const MANAGER = 'Manager';
    public const SUPPORT = 'Support';
    public const PACKER  = 'Packer';
    public const VIEWER  = 'Viewer';
}
