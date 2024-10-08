<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ExportController;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

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

Route::get('/uploads-errors/{filename}', function ($filename) {
    $path = public_path('uploads-errors/' . $filename);

    if (!File::exists($path)) {
        abort(404);
    }

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});

Route::get('/download-statement/{subject}/{group}', [ExportController::class, 'downloadStatement']);

Route::get('{any?}', fn () =>  view('index'))->where('any', '.*');


