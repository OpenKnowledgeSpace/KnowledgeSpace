<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class DataSpaceServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
       $this->app->bind( 'DataSpaceClient', function ($app) {
          return new \App\Kspace\DataSpaceClient; 
       }); 
    }
}

