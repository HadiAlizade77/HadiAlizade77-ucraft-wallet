<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use Exception;
use Symfony\Component\HttpFoundation\RedirectResponse as RedirectResponseAlias;

/**
 * Class SocialController
 * @package App\Http\Controllers\Front
 */
class SocialController extends Controller
{
    /**
     * @param $provider
     * @return RedirectResponseAlias
     */
    public function redirectSocial($provider): RedirectResponseAlias
    {
        return Socialite::driver($provider)->redirect();
    }

    /**
     * @param Request $request
     * @param $provider
     * @return JsonResponse
     */
    public function loginWithSocial(Request $request,$provider): JsonResponse
    {
        $user = Socialite::driver($provider)->user();
        $isUser = User::where('provider_id', $user->id)->first();
        try {
            if ($isUser) {
                $user = $isUser;
            } else {
                $user = User::create([
                    'name' => $user->name,
                    'email' => $user->email,
                    'avatar' => $user->avatar,
                    'provider_id' => $user->id,
                    'password' => \Hash::make('12345678')
                ]);

                $user->email_verified_at = Carbon::now();
                $user->save();
            }
                Auth::login($user);
                Auth::user()->tokens()->delete();
                $token = Auth::user()->createToken("api_token");
                return response()->json(['api_token' => $token->plainTextToken],200);

        } catch (Exception $exception) {
            response()->json($exception->getMessage(),500);
        }
    }
}
