<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

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

Route::match(array('PUT', 'PATCH'), "/things/{id}", function(Request $request){
  return [
    "code" => 0,
    "message" => "done nothing, but assuming success",
    "dump" => $request->all()
  ];
});

Route::get("/test/users", function(Request $request){
  sleep(2); // for loader testing
  $userCols = ["hash","first_name","last_name","email","password"];

  $page = 0;
  $limit = 5;
  if($request->has("page"))
    $page = $request->query("page");

  if($request->has("limit"))
    $limit = $request->query("limit");

  $users = DB::table("users")->select($userCols)
    ->skip($page)
    ->take($limit)
    ->get();

  $totalUsers = DB::table('users')->count();

  return [
    "code" => 0,
    "hash" => Str::random(rand(24,32)),
    "total" => $totalUsers,
    "data" => $users
  ];
});

Route::get('/test/users/{hash}', function($hash){
  // sleep(.5);
  $userCols = ["hash","first_name","last_name","email"];
  $user = DB::table("users")
    ->select($userCols)
    ->where("hash", $hash)
    ->first();

  if($user == null)
    return [
      "code" => 1,
      "data" => "not found"
    ];
  else
    return [
      "code" => 0,
      "data" => $user
    ];

});

Route::put('/test/users/{hash}', function(Request $request, $hash){
  // sleep(2);
  // $debugCode = 202;
  // return response([
  //   "code" => $debugCode,
  //   "message" => "not yet implemented",
  //   "request" => $request->all()
  // ], $debugCode);

  $affected = DB::table("users")
    ->where("hash", $hash)
    ->update($request->all());

  if($affected == null)
    return [
      "code" => 1,
      "data" => "nothing updated"
    ];
  else
    return [
      "code" => 0,
      "data" => $affected
    ];

});

Route::delete('/test/users/{hash}', function($hash){
  $affected = DB::table("users")
    ->where("hash", $hash)
    ->delete();

  if($affected == null)
    return [
      "code" => 1,
      "data" => "nothing deleted"
    ];
  else
    return [
      "code" => 0,
      "data" => $affected
    ];

});