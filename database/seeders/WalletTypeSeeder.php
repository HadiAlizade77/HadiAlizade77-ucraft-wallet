<?php

namespace Database\Seeders;

use App\Models\WalletType;
use Illuminate\Database\Seeder;

class WalletTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $walletTypes=[
            ["name"=>"Credit Card"],
            ["name"=>"Cash"],
            ["name"=>"Perfect Money"],
            ["name"=>"Skrill"],
        ];
        foreach ($walletTypes as $data) {
            WalletType::firstOrCreate($data);
        }
    }
}
