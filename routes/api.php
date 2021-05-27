<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\FrontEnd\v1\WalletController;
use App\Http\Controllers\FrontEnd\v1\TransactionController;
use App\Http\Controllers\FrontEnd\v1\WalletTransactionsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('auth/{provider}/callback',  [SocialController::class, 'loginWithSocial'])
    ->name('social.auth.callback');
Route::post('/login', [AuthenticatedSessionController::class,'login']);
Route::post('/register', [RegisteredUserController::class,'store']);
Route::post('/verify-email', [VerifyEmailController::class,'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthenticatedSessionController::class,'show']);
    Route::group(['namespace' => 'API'], function () {
        Route::group(['prefix' => 'v1', 'namespace' => 'v1'], function () {
                Route::group(['prefix' => 'wallet'], function () {
                    Route::get('transactions/{walletId}', [WalletController::class, 'walletTransactions'])->name('.index');
                    Route::get('/{walletId}', [WalletController::class, 'show'])->name('.show');
                    Route::delete('/{walletId}', [WalletController::class, 'destroy'])->name('.destroy');
                    Route::post('/', [WalletController::class, 'store'])->name('.store');
                    Route::get('/', [WalletController::class, 'index'])->name('.index');
                });
                Route::group(['prefix' => 'transaction'], function () {
                    Route::get('/{transactionId}', [TransactionController::class, 'show'])->name('.show');
                    Route::get('/', [TransactionController::class, 'index'])->name('.index');
                    Route::post('/', [TransactionController::class, 'store'])->name('.store');
                    Route::delete('/{transactionId}', [TransactionController::class, 'destroy'])->name('.destroy');
                });
        });
    });
});
