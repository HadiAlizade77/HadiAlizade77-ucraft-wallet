<?php


namespace App\Concerns\Eloquent;


use App\Models\Transaction;
use Illuminate\Database\Query\Builder;

trait ModelWalletHasAttributesTrait
{
    /**
     *  evaluates Wallet's total balance
     * @return float
     */
    public function getBalanceAttribute(): float
    {
        $balance = 0;
        $transactions = $this->transactions()->get();
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
