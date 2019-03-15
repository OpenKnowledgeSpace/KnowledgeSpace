<?php

use Illuminate\Database\Seeder;

class DescriptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      DB::table('descriptions')->truncate();
      factory(App\Description::class,50)->create();
    }
}
