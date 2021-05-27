<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Wallet;
use App\Models\Transaction;
use App\Models\WalletType;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\Helpers;
use Tests\TestCase;

class TransactionTest extends TestCase
{
    use RefreshDatabase;
    use Helpers;
    /**
     * A basic feature test example.
     * @group test-t
     * @return void
     */
    public function test_transaction_api_crud()
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

        $responseTransaction = $this->post('api/v1/transaction', [
            "amount" => 99.99,
            "walletId" => $Wallet->id,
            "transactionType" => "credit",
            "comment" => "testing"
        ], $requestHeader);
        $responseTransactionContent = $responseTransaction->getContent();

        $this->assertNotEmpty($responseTransactionContent);
        $this->assertStringContainsString('success', $responseTransactionContent);

        $this->assertDatabaseHas('transactions',
            [
                'comment' => 'testing',
                "amount" => 99.99
            ]);

        $Transaction = Transaction::where('comment', 'testing')->first();

        $responseUpdate = $this->post('api/v1/transaction', [
            "id" => $Transaction->id,
            "amount" => 100.11,
            "walletId" => $Wallet->id,
            "transactionType" => "credit",
            "comment" => "testing"
        ], $requestHeader);

        $responseUpdateContent = $responseUpdate->getContent();

        $this->assertNotEmpty($responseUpdateContent);
        $this->assertStringContainsString('success', $responseUpdateContent);

        $this->assertDatabaseHas('transactions',
            [
                'comment' => 'testing',
                "amount" => 100.11
            ]);

        $responseDelete = $this->delete('api/v1/transaction/' . $Transaction->id,$requestHeader);

        $this->assertDatabaseMissing('transactions',
            [
                'comment' => 'testing',
                "amount" => 100.11
            ]);

    }
}
