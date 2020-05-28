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


Route::get('/testFirebaseAuth', function (Request $request) {
    return (array) $request->user();
    // or u can use
    // return (array) auth()->user();

})->middleware('auth:firebase');

Route::get('/testFirebaseAuth', function (Request $request) {

    $firestore = app('firebase.firestore');
    $database = $firestore->database();
    $docRef = $database->collection('users');
    $docRef->document( $request->user()->getAuthIdentifier())->update([
        ['path' => 'loginTime', 'value' => now()]
    ]);

    return (array) $request->user();
    // or u can use
    // return (array) auth()->user();

})->middleware('auth:firebase');




