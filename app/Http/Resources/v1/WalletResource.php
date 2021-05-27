<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\v1\WalletTypeResource;

class WalletResource extends JsonResource
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
            'name' => $this->name,
            'balance' => $this->balance ? : 0,
            'wallet_type' => new WalletTypeResource($this->type),
        ];
    }
}
