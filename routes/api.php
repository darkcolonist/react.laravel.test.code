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
  // sleep(2); // for loader testing
  $userCols = config("app.custom.fields.users.view1");

  $page = 0;
  $limit = 5;
  $search = "";
  $orderField = "id";
  $orderSort = "desc";
  if($request->has("page"))
    $page = $request->query("page");

  if($request->has("limit"))
    $limit = $request->query("limit");

  if($request->has("search"))
    $search = $request->query("search");

  if($request->has("order")){
    $order = $request->query("order");
    $orderField = $order["field"];
    $orderSort = $order["sort"];
  }


  $query = DB::table("users");

  if(trim($search) && strlen($search) > 2){
    $query->where("first_name","like","%".$search."%");
    $query->orWhere("last_name","like","%".$search."%");
    $query->orWhere("email","like","%".$search."%");
  }

  $totalUsers = $query->count();

  $users = $query->select($userCols)
    ->orderBy($orderField, $orderSort)
    ->skip($page * $limit)
    ->take($limit)
    ->get();

  // some formatting
  // $users->map(function($obj){
  //   $obj->first_name = $obj->first_name . "-" . $obj->id;
  //   return $obj;
  // });

  return [
    "code" => 0,
    "hash" => Str::random(rand(24,32)),
    "total" => $totalUsers,
    "data" => $users,
    "skip" => $page * $limit,
    "take" => $limit,
    "order" => $request->query("order")
  ];
});

Route::get('/test/users/{hash}', function(Request $request, $hash){
  // return response([
  //   "code" => 400,
  //   "message" => "not yet implemented",
  //   "request" => $request->all()
  // ], 500);

  // sleep(2);
  $userCols = config("app.custom.fields.users.view1");
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

Route::post('/test/users', function(Request $request){
  $model = $request->only(["first_name","last_name","email"]);

  $model["hash"] = Str::random(rand(24,32));
  $model["password"] = "NULLFORNOW";
  // return response([
  //   "code" => 400,
  //   "message" => "not yet implemented",
  //   "model" => $model
  // ], 500);

  $id = DB::table("users")
    ->insertGetId($model);

  $userCols = config("app.custom.fields.users.view1");
  $obj = DB::table("users")
    ->select($userCols)
    ->where("id", $id)
    ->first();

  return response([
    "code" => 0,
    "model" => $obj
  ], 200);
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