<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request) : array
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'transaction_type' => $this->transaction_type,
            'wallet_id' => $this->wallet_id,
            'wallet' => $this->whenLoaded('wallet', function () {
                return [
                    'id' => $this->wallet->id,
                    'name' => $this->wallet->name
                ];
            }),
            'comment' => $this->comment
        ];
    }
}
