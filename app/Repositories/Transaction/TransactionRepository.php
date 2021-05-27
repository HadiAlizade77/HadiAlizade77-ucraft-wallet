<?php

namespace App\Repositories\Transaction;

use App\Models\Transaction;
use App\Models\User;
use App\Repositories\EloquentRepository;
use App\Repositories\Transaction\TransactionRepositoryInterface;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;

class TransactionRepository extends EloquentRepository implements TransactionRepositoryInterface
{
    /**
     * Get model.
     *
     * @return string
     */
    public function getModel(): string
    {
        return Transaction::class;
    }

    /**
     * @param array $attributes
     *
     * @return Transaction
     * @throws Exception
     */
    public function store(array $attributes): bool
    {
        try {
            $newTransaction = isset($attributes['id']);
            if (!$newTransaction) {
                $transaction = $this->make();
            } else {
                $transaction = $this->find($attributes['id']);
            }
            $attributes = [
                'transaction_type' => $attributes['transaction_type'],
                'wallet_id' => $attributes['wallet_id'],
                'comment' => $attributes['comment'],
                'amount' => $attributes['amount']
            ];

            return $this->save($attributes);
        } catch (Exception $e) {
            throw $e;
        }
    }

    /**
     * @param User $user
     * @return Builder[]|Collection
     */
    public function getUserTransactions(User $user)
    {
        return $this->make(['wallet'])->
            whereIn('wallet_id',
                $user->wallets()->pluck('id')->toArray()
            )->get();

    }
}
