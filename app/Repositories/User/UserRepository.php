<?php

namespace App\Repositories\User;

use App\Models\User;
use App\Repositories\EloquentRepository;
use App\Repositories\Transaction\TransactionRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;

class UserRepository extends EloquentRepository implements UserRepositoryInterface
{
    /**
     * Get model.
     *
     * @return string
     */
    public function getModel(): string
    {
        return User::class;
    }

    /**
     * update or create a user
     * @param array $data
     *
     * @return bool
     */
    public function store($data): bool
    {
        return $this->save($data);
    }
}
