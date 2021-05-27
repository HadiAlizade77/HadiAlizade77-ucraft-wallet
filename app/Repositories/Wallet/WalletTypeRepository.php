<?php

namespace App\Repositories\Wallet;

use App\Models\WalletType;
use App\Repositories\EloquentRepository;


class WalletTypeRepository extends EloquentRepository implements WalletTypeRepositoryInterface
{
    /**
     * Get model.
     *
     * @return string
     */
    public function getModel(): string
    {
        return WalletType::class;
    }
}
