<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Auth;
use Firebase\Auth\Token\HttpKeyStore;
use Firebase\Auth\Token\Verifier;
use App\Firebase\Guard;


class FirebaseAuthServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton(Verifier::class, function ($app) {
            return new Verifier(config('firebase.project_id'));

                
            // $keyStore = new HttpKeyStore(null, cache()->store());
            // return new Verifier(config('firebase.project_id', env('GOOGLE_CLOUD_PROJECT')), $keyStore);
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
        Auth::viaRequest('firebase', function ($request) {
            return app(Guard::class)->user($request);
        });
    }
}
