<?php

namespace App\Http\Controllers\FrontEnd\v1;

use App\Http\Requests\v1\TransactionRequest;
use App\Http\Resources\v1\TransactionResource;
use App\Repositories\Transaction\TransactionRepositoryInterface;
use App\Repositories\Wallet\WalletRepositoryInterface;
use Exception;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;

class TransactionController extends Controller
{
    private $transactionRepository;
    private $walletRepository;

    public function __construct(TransactionRepositoryInterface $transactionRepository,WalletRepositoryInterface $walletRepository)
    {
        $this->transactionRepository = $transactionRepository;
        $this->walletRepository = $walletRepository;
    }

    /**
     * Display the transactions report for specific user.
     *
     * @return JsonResponse
     */
    public function index() : JsonResponse
    {
        $user = auth()->user();
        $transactions = $this->transactionRepository->getUserTransactions($user);
        return $this->successResponse(TransactionResource::collection($transactions));
    }


    /**
     * update or create a new transaction
     *
     * @param TransactionRequest $request
     * @return JsonResponse
     */
    public function store(TransactionRequest $request) : JsonResponse
    {
        try {
            $data = [
                'transaction_type' => $request->transactionType,
                'wallet_id' => $request->walletId,
                'comment' => $request->comment,
                'amount' => $request->amount
            ];
            $this->transactionRepository->store($data);
            if ($request->has('id')) $data['id'] = $request->id;
            return $this->successResponse(
                [],
                'New Transaction submitted successfully!'
            );
        } catch (Exception $e) {
            return $this->errorResponse("Cannot process your request at the moment!");
        }
    }

    /**
     * show an specific transaction.
     *
     * @param $transactionId
     * @return JsonResponse
     */
    public function show($transactionId) : JsonResponse
    {
        $transaction = $this->transactionRepository->find($transactionId);
        return $this->successResponse(TransactionResource::collection(collect([$transaction])));
    }

    /**
     * Remove the specified transaction from database.
     *
     * @param $transactionId
     * @return JsonResponse
     */
    public function destroy($transactionId): JsonResponse
    {
        try {
            $this->transactionRepository->delete($transactionId);
            return $this->successResponse(
                [],
                'Transaction deleted successfully!'
            );
        } catch (Exception $e) {
            return $this->errorResponse("Cannot process your request at the moment!");
        }

    }

}
