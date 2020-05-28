<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::get('/testingFirestore', function (Request $request) {
    $firestore = app('firebase.firestore');
    $database = $firestore->database();
    $docRef = $database->collection('users');
    $docRef->document('SF')->set([
        'name' => 'San Francisco',
        'state' => 'CA',
        'country' => 'USA',
        'capital' => false,
    ]);



    $docRef2 = $database->collection('users')->document('SF');
    $snapshot = $docRef2->snapshot();    
    if ($snapshot->exists()) {
        printf('Document data:' . PHP_EOL);
        dd($snapshot->data());
    } else {
        printf('Document %s does not exist!' . PHP_EOL, $snapshot->id());
    }
});





Route::get('{path}', function(){
    return view('welcome');
})->where('path','([A-z\d\/_.]+)?');


