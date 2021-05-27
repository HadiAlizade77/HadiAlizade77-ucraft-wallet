<?php


namespace App\Concerns\Eloquent;


use App\Models\Transaction;
use App\Repositories\Transaction\TransactionRepositoryInterface;

trait ModelUserHasAttributesTrait
{
    /**
     * evaluates User's total balance
     * @return float
     */
    public function getBalanceAttribute(): float
    {
        $balance = 0;
        $transactions = resolve(TransactionRepositoryInterface::class);
        $transactions =  $transactions->getUserTransactions($this);
        foreach ($transactions as $transaction) {
            if ($transaction->transaction_type == Transaction::CREDIT) {
                $balance += $transaction->amount;
            } else {
                $balance -= $transaction->amount;
            }
        }
        return (float)$balance;
    }

}
