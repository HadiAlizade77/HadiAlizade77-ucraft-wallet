<?php
namespace App\Repositories\Wallet;


use App\Models\Wallet;

/**
 * Interface WalletRepositoryInterface
 * @package App\Repositories
 */
interface WalletRepositoryInterface
{
    public function store($data);
    public function userWallets($userId);
    public function getWalletTransactions($walletId);
}

