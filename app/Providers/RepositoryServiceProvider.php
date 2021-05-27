<?php

namespace App\Providers;


use App\Repositories\Transaction\TransactionRepository;
use App\Repositories\Transaction\TransactionRepositoryInterface;
use App\Repositories\User\UserRepository;
use App\Repositories\User\UserRepositoryInterface;
use App\Repositories\Wallet\WalletRepository;
use App\Repositories\Wallet\WalletRepositoryInterface;
use App\Repositories\Wallet\WalletTypeRepository;
use App\Repositories\Wallet\WalletTypeRepositoryInterface;
use Illuminate\Support\ServiceProvider;

/**
 * Class RepositoriesServiceProvider
 * @package App\Providers
 */
class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->bind(TransactionRepositoryInterface::class, TransactionRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(WalletTypeRepositoryInterface::class, WalletTypeRepository::class);
        $this->app->bind(WalletRepositoryInterface::class, WalletRepository::class);
    }
}
