<?php

namespace App\Http\Controllers;

use App\Http\Resources\v1\WalletTypeResource;
use App\Repositories\Wallet\WalletTypeRepositoryInterface;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\View\Factory;
use Illuminate\Contracts\View\View;

class ApplicationController extends Controller
{
    /**
     * render the application's main view
     * @param WalletTypeRepositoryInterface $walletTypeRepository
     * @return Application|Factory|View
     */

    public function index(WalletTypeRepositoryInterface $walletTypeRepository)
    {
        return view('application',[
            'walletTypes' =>
                WalletTypeResource::collection(
                    $walletTypeRepository->all()
                )
        ]);
    }
}
