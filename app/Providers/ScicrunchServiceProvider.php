<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class ScicrunchServiceProvider extends ServiceProvider
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
       $this->app->bind('ScicrunchClient', function () {
          return new \App\Kspace\ScicrunchClient; 
       }); 
    }
}
