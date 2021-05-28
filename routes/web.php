<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\SocialController;
use App\Http\Controllers\ApplicationController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('login/{provider}',  [SocialController::class, 'redirectSocial'])
    ->name('social.auth');

Route::get('/{any}', [ApplicationController::class,'index'])->where('any', '.*');;

Route::get('/auth/verify',[ApplicationController::class,'index'])->name('verification.verify');;
Route::get('/auth/unverified',[ApplicationController::class,'index'])->name('verification.notice');;
