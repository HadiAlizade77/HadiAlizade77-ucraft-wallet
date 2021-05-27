<?php

namespace App\Http\Resources\v1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\JsonResource as WalletTypeResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'avatar' => $this->avatar,
            'email' => $this->email,
            'id' => $this->id,
            'name' => $this->name,
            'balance' => $this->whenAppended('balance', function () {
                return $this->balance;
            })
        ];
    }
}
