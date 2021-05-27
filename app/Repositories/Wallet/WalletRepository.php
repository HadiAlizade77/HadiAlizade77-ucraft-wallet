<?php

namespace App\Repositories\Wallet;


use App\Models\Wallet;
use App\Repositories\EloquentRepository;
use Exception;
use Illuminate\Support\Collection;

class WalletRepository extends EloquentRepository implements WalletRepositoryInterface
{
    /**
     * Get model.
     *
     * @return string
     */
    public function getModel(): string
    {
        return Wallet::class;
    }

    /**
     * @param array $data
     *
     * @return bool
     * @throws Exception
     */
    public function store($data): bool
    {
        try {
            $newWallet = !isset($data['id']);
            $attributes = [
                'name' => $data['name'],
                'type_id' => $data['type_id'],
                'user_id' => $data['user_id'],
            ];
            if (!$newWallet) {
                $attributes['id'] = $data['id'];
            }
            return $this->save($attributes);
        } catch (Exception $e) {
            throw $e;
        }
    }

    public function userWallets($userId)
    {
        return $this->model->whereHas('user',function ($q) use($userId){
            $q->where('user_id',$userId);
        })->get();
    }

    public function getWalletTransactions($walletId) : Collection
    {
        return $this->find($walletId)->transactions;
    }
}
