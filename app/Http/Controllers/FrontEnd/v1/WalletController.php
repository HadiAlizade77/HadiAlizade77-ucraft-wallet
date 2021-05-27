<?php

namespace App\Http\Controllers\FrontEnd\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\v1\WalletRequest;
use App\Http\Resources\v1\TransactionResource;
use App\Http\Resources\v1\WalletResource;
use App\Repositories\Wallet\WalletRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Exception;
use Illuminate\Http\Resources\Json\JsonResource;

class WalletController extends Controller
{
    private $walletRepository;

    public function __construct(WalletRepositoryInterface $walletRepository)
    {
        $this->walletRepository = $walletRepository;
    }

    /**
     * Display a listing of user's wallet.
     *
     */
    public function index(): JsonResponse
    {
        $user = auth()->user();
        $wallets = $this->walletRepository->userWallets($user->id);
        $resource = WalletResource::collection($wallets);
        return $this->successResponse($resource);
    }

    /**
     * show an specific wallet's data.
     *
     * @param $walletId
     * @return JsonResponse
     */
    public function show($walletId): JsonResponse
    {
        $transaction = $this->walletRepository->find($walletId);
        return $this->successResponse(WalletResource::collection(collect([$transaction])));
    }

    /**
     * update or create a new wallet
     *
     * @param WalletRequest $request
     * @return JsonResponse
     */
    public function store(WalletRequest $request): JsonResponse
    {

        try {
        $user = auth()->user();
        $data = [
            'name' => $request->name,
            'type_id' => $request->typeId,
            'user_id' => $user->id,
        ];
        if ($request->has('id')) $data['id'] = $request->id;
        $this->walletRepository->store($data);
        return $this->successResponse(null, 'Changes saved successfully!');
          } catch (Exception $e) {
            return $this->errorResponse("Cannot process your request at the moment!");
        }
    }

    /**
     * Remove the specified wallet from database.
     *
     * @param $walletId
     * @return JsonResponse
     */
    public function destroy($walletId): JsonResponse
    {
        try {
            $this->walletRepository->delete($walletId);
            return $this->successResponse(
                [],
                'Wallet deleted successfully!'
            );
        } catch (Exception $e) {
            return $this->errorResponse("Cannot process your request at the moment!");
        }
    }

    /**
     * Display the transactions report for specific wallet.
     *
     * @param $walletId
     * @return JsonResponse
     */
    public function walletTransactions($walletId): JsonResponse
    {
        $transactions = $this->walletRepository->getWalletTransactions($walletId);
        return $this->successResponse(TransactionResource::collection($transactions));
    }
}
