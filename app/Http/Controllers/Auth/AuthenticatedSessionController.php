<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\v1\UserResource;
use App\Repositories\User\UserRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\Request;

class AuthenticatedSessionController extends Controller
{

    /**
     * get currently logged in user's data.
     *
     * @return JsonResponse
     */
    public function show(): JsonResponse
    {
        $user = resolve(UserRepositoryInterface::class)->find(\auth()->user()->id);
        $user = new UserResource($user);
        return \response()->json($user);
    }

    /**
     * Handle an incoming authentication request.
     *
     * @throws ValidationException
     */
    public function login(LoginRequest $request): JsonResponse
    {

        $request->authenticate();

        //revoke all tokens
        Auth::user()->tokens()->delete();
        $token = Auth::user()->createToken("api_token");
        return response()->json(['api_token' => $token->plainTextToken], 200);
    }

    /**
     * Destroy an authenticated session.
     *
     * @return RedirectResponse
     */
    public function destroy(): RedirectResponse
    {
        auth()->user()->tokens()->delete();
        return redirect('/');
    }
}
