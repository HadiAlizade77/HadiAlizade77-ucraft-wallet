<?php

namespace App\Models;

use App\Concerns\Eloquent\ModelWalletHasAttributesTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Wallet extends Model
{
    use HasFactory,ModelWalletHasAttributesTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'type_id',
        'user_id'
    ];

    /**
     * belongs to relationship with user
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    /**
     * belongs to relationship with type
     * @return BelongsTo
     */
    public function type(): BelongsTo
    {
        return $this->belongsTo(WalletType::class);
    }
    /**
     * belongs to relationship with transactions
     * @return HasMany
     */
    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class,'wallet_id');
    }
}
