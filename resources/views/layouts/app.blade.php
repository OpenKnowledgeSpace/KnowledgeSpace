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
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="white" role='navigation'>
            <div class="nav-wrapper container">
                <!-- Branding Image -->
                <a id='logo-container' class="brand-logo" href="{{ url('/') }}">
                  <img src="/imgs/logo.png" alt='KnowledgeSpace Logo' class='hide-on-small-only'>
                  {{ config('app.name', 'KnowledgeSpace') }}
                </a>
                <!-- Right Side Of Navbar -->
                <ul class="right hide-on-med-and-down">
                    <li><a href="{{ Request::path() == "/" ? "#AboutUs" : "/#AboutUs" }}">About</a></li> 
                    <li><a href="{{ Request::path() == "/" ? "#DataSources" : "/#DataSources" }}">Data Sources</a></li> 
                    <li><a href="{{ route('categories') }}">Categories</a></li> 
                   <!-- <li><a href="{{ route('atlas') }}">Atlas</a></li> --> 
                    <li><a href="{{ Request::path() == "/" ? "#Documentation" : "/#Documentation" }}">Documentation</a></li> 
                   	<li>
												<a href="/search?q="><i class="material-icons blue-text right">search</i></a>
        						</li>  
                </ul>
            </div>
        </nav>

        @yield('content')
    
        <footer class='page-footer grey darken-4'>
          <div class='row'> 
            <div class='container'> 
              <div class='col l9 s12'>
                <h3>Partners</h3>
                <ul class='nav navbar-nav logo-list'>
                  <li><a href='https://www.humanbrainproject.eu'><img src='/imgs/hbp-logo.png' alt='HBP'></a></li>
                  <li><a href='https://incf.org'><img src='/imgs/incf-logo.png' alt='INCF'></a></li>
                  <li><a href='http://www.neuinfo.org'><img src='/imgs/nif-logo.png' alt='NIF'></a></li>
                </ul>
              </div>
            
              <div class='col l3 s12'>
                <h3>Contact Us</h3>
                <address class="md-margin-bottom-40">
                      Hosted by <a href='https://incf.org'>INCF</a> <br>
                      Karolinska Institutet
                      Nobels väg 15 A
                      SE-171 77 Stockholm
                      Sweden <br/> 
                      Email: <a href="mailto:knowledgespace@incf.org" class="">knowledgespace@incf.org</a>
                </address> 
              </div>
            </div> 
          </div> 
          <div class='footer-copyright'>
						<div class='container'>
								2017 © All Rights Reserved.
								<a href="/about#privacy-policy">Privacy Policy</a> | <a href="/about#terms-of-service">Terms of Service</a>
						</div>	
					</div> 
        </footer>

      </div> <!-- APP -->



      <!-- Scripts -->
    <script src="{{ mix('js/app.js') }}"></script>
    <script async defer src="https://hypothes.is/embed.js"></script> 
 </body>
</html>
