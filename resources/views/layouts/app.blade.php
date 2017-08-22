<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/vendor.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <a class="navbar-brand" href="{{ url('/') }}">
                        <img src="{{ asset('/imgs/logo.png') }}"/> 
                        <span class='navbar-brand-text'>{{ config('app.name', 'KnowledgeSpace') }}</span>
                    </a>
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="{{ route('about') }}">About</a></li> 
                        <li><a href="{{ route('data_sources') }}">Data Sources</a></li> 
                        <li><a href="{{ route('categories') }}">Categories</a></li> 
                        <li><a href="{{ route('atlas') }}">Atlas</a></li> 
                        <li><a href="{{ route('documentation') }}">Documentation</a></li> 

                        <!-- Authentication Links -->
                        @if (Auth::guest())
                            <li><a href="{{ route('login') }}">Login</a></li>
                            <li><a href="{{ route('register') }}">Register</a></li>
                        @else
                            <li class="dropdown">
                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <ul class="dropdown-menu" role="menu">
                                    <li>
                                        <a href="{{ route('logout') }}"
                                            onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                            Logout
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </li>
                                </ul>
                            </li>
                        @endif
                    </ul>
                </div>
            </div>
        </nav>

        @yield('content')
    
        <footer class='container-fluid'>
          <div class='row'> 
            <div class='container'> 
              <div class='col-md-10'>
                <h3>Partners</h3>
                <ul class='nav navbar-nav logo-list'>
                  <li><a href='http://bluebrain.epfl.ch'><img src='/imgs/bbp-logo.png' alt='BBP'></a></li>
                  <li><a href='https://www.humanbrainproject.eu'><img src='/imgs/hbp-logo.png' alt='HBP'></a></li>
                  <li><a href='https://incf.org'><img src='/imgs/incf-logo.png' alt='INCF'></a></li>
                  <li><a href='http://www.neuinfo.org'><img src='/imgs/nif-logo.png' alt='NIF'></a></li>
                </ul>
              </div>
            
              <div class='col-md-2'>
                <h3>Contact Us</h3>
                <address class="md-margin-bottom-40">
                      Hosted at the University of California, San Diego <br>
                      9500 Gilman Drive <br>
                      La Jolla, CA 92093 <br>
                      Email: <a href="mailto:wwong@ncmir.ucsd.edu" class="">wwong@ncmir.ucsd.edu</a>
                </address> 
              </div>
            </div> 
          </div> 
          <div class='copyright row'>
						<p class='text-center'>
								2017 © All Rights Reserved.
								<a href="/about#privacy-policy">Privacy Policy</a> | <a href="/about#terms-of-service">Terms of Service</a>
						</p>	
					</div> 
        </footer>

      </div> <!-- APP -->



      <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}"></script>
  </body>
</html>
