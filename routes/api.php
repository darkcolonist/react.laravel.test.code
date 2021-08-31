<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
  return $request->user();
});

Route::get("/test/users", function(){
  return [
    [ "hash" => "1ae350e6-4e17-5b8b-a341-09e08a9762bf", "first_name" => "Cecelia", "last_name" => "Marshall", "email" => "anerul@ce.ky"  ],
    [ "hash" => "dbd6a70b-c8ad-5403-ae4f-c4e24a80b361", "first_name" => "Tyler", "last_name" => "Ingram", "email" => "enevale@va.ge"  ],
    [ "hash" => "05dbceee-f748-5733-898d-836fe0f36741", "first_name" => "Lela", "last_name" => "Hodges", "email" => "picuup@welu.gr"  ],
    [ "hash" => "525b0ed2-a303-5299-bfdc-77e3fd96c66b", "first_name" => "Roy", "last_name" => "Holt", "email" => "wucnispe@jinvavaku.la"  ],
    [ "hash" => "47d251a5-98f6-5a04-84af-34bd46360f3b", "first_name" => "Gregory", "last_name" => "Ramos", "email" => "suhwi@hinjukneg.bb"  ],
    [ "hash" => "fd179cf6-9d6e-57ef-846d-dc18f4b470ca", "first_name" => "Lizzie", "last_name" => "Alvarado", "email" => "evresut@afbiasa.ad"  ]
  ];
});