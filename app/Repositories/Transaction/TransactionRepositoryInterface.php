<?php
namespace App\Repositories\Transaction;


use App\Models\Transaction;
use App\Models\User;

/**
 * Interface WalletRepositoryInterface
 * @package App\Repositories
 */
interface TransactionRepositoryInterface
{
    public function store(array $attributes);
    public function getUserTransactions(User $user);
}

