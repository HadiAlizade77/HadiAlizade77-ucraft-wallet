<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Wallet;
use App\Models\WalletType;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Tests\Helpers;
use Tests\TestCase;

class WalletTest extends TestCase
{
    use RefreshDatabase;
    use Helpers;

    /**
     * A basic feature test example.
     * @group test-uwt
     * @return void
     */
    public function test_wallet_api_crud()
    {
        $user = User::factory()->create([
            'email_verified_at' => Carbon::now(),
        ]);

        $token = $user->createToken("api_token")->plainTextToken;
        $requestHeader = $this->getRequestHeader($token);

        $walletType = WalletType::create([
            'name' => 'Cash'
        ]);

        $this->assertDatabaseHas('wallet_types', ['name' => 'Cash']);

        $response = $this->post('api/v1/wallet', [
            "name" => "new-wallet",
            "typeId" => $walletType->id
        ], $requestHeader);
        $responseContent = $response->getContent();

        $this->assertNotEmpty($responseContent);
        $this->assertStringContainsString('success', $responseContent);

        $this->assertDatabaseHas('wallets', ['name' => 'new-wallet']);

        $Wallet = Wallet::where('name', 'new-wallet')->first();

        $responseUpdate = $this->post('api/v1/wallet', [
            "id" => $Wallet->id,
            "name" => "new-wallet-updated",
            "typeId" => $walletType->id
        ], $requestHeader);

        $responseUpdateContent = $responseUpdate->getContent();
        $this->assertNotEmpty($responseUpdateContent);
        $this->assertStringContainsString('success', $responseUpdateContent);

        $this->assertDatabaseHas('wallets', ['name' => 'new-wallet-updated']);


        $responseDelete = $this->delete('api/v1/wallet/' . $Wallet->id,$requestHeader);

        $this->assertDatabaseMissing('wallets', ['name' => 'new-wallet-updated']);
    }
}
