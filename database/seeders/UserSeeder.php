<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $howMany = 100;
      $users = [];

      for ($i=0; $i < $howMany; $i++) { 
        $faker = \Faker\Factory::create();
        $users[] = [
          "hash" => Str::random(rand(24,32)),
          "first_name" => $faker->name(),
          "last_name" => $faker->name(),
          "email" => $faker->safeEmail,
          "password" => "NULLFORNOW",
        ];
      }

      // $users = [
      //   [ "hash" => Str::random(rand(24,32)), "first_name" => "Cecelia", "last_name" => "Marshall", 
      //     "email" => "anerul@ce.ky", "password" => "null_for_now" ],
      //   [ "hash" => Str::random(rand(24,32)), "first_name" => "Tyler", "last_name" => "Ingram", 
      //     "email" => "enevale@va.ge", "password" => "null_for_now" ],
      //   [ "hash" => Str::random(rand(24,32)), "first_name" => "Lela", "last_name" => "Hodges", 
      //     "email" => "picuup@welu.gr", "password" => "null_for_now" ],
      //   [ "hash" => Str::random(rand(24,32)), "first_name" => "Roy", "last_name" => "Holt", 
      //     "email" => "wucnispe@jinvavaku.la", "password" => "null_for_now" ],
      //   [ "hash" => Str::random(rand(24,32)), "first_name" => "Gregory", "last_name" => "Ramos", 
      //     "email" => "suhwi@hinjukneg.bb", "password" => "null_for_now" ],
      //   [ "hash" => Str::random(rand(24,32)), "first_name" => "Lizzie", "last_name" => "Alvarado", 
      //     "email" => "evresut@afbiasa.ad", "password" => "null_for_now"]
      // ];

      $result = DB::table('users')->insert($users);


    }
}
