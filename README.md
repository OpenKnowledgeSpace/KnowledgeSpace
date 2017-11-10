KnowledgeSpace
--------------

This is a new version of the knowledge-space.org application. It is a web
application that uses the following:

* [Laravel](https://laravel.com/) MVC framework for PHP ( for the backend )
* [React](https://reactjs.org/) Javscript library for UI ( for the frontend )

These require some dependencies for both running the application & development. 
These include: 

* [PHP](http://php.net) PHP 7+
* [Composer](https://getcomposer.org) PHP package manager
* [v8](https://github.com/v8/v8) v8 Javascript engine ( development )
* [NodeJS](https://nodejs.org/en/) Node.js runtime ( v6.11 LTS ) ( development)
* [Yarn](https://github.com/yarnpkg/yarn) JS package manager ( optional, development )

### Quick Start

If you do not have all the dependencies listed above installed, please see the
information below about installing them. 

Check out the application and then cd into it's directory.

First we need to install the PHP packages listed in our composer.json
file. This will install Laravel and other PHP libraries.

```
$ compser install
```

We now do the same for the needed javascript libraries, including React:

```
$ yarn 
# or if not using yarn
$ npm install
```

We can now start the backend application:

```
$ php artisan serve
```

We can now navigate to the application using the http://127.0.0.1:8000 address. 
However, we might need to compile our frontend js/css assets. We can accomplish
this with following commands:

```
$ yarn run development
# or to watch files ( useful while developing )
$ yarn run watch
```

or if not using yarn

```
$ npm run development
$ npm run watch
```

### Installing Dependencies

On Linux platforms, most of the libraries can be installed using the standard
instructions found on their related documentation pages:

* [Composer install documentation](https://getcomposer.org/download/)
* [NodeJS using a package manager](https://nodejs.org/en/download/package-manager/)
* [Installing Yarn](https://yarnpkg.com/en/docs/install)


### Deploying to Production

There are many ways to deploy a laravel app to production. A popular way is to
use the following:

* [PHP 7](http://php.net/)
* [PHP-FMP: PHP FastCGI](http://php.net/manual/en/install.fpm.php)
* [Nginx](https://nginx.org/)


Here's an example Nginx config file. This assumes:

* The application is running at knowledge-space.org
* The application is installed in /opt/KnowledgeSpace

Here's an example nginx configuration:

```
fastcgi_cache_path /etc/nginx/cache levels=1:2 keys_zone=KSPACE:250m inactive=1w;
fastcgi_cache_key "$scheme$request_method$host$request_uri";

server {
    listen 80;
    server_name knowledge-space.org;
    root /opt/KnowledgeSpace/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";

    index index.html index.htm index.php;

    charset utf-8;

    location / {
      try_files $uri $uri/ /index.php?$query_string;
			fastcgi_cache KSPACE;
			fastcgi_cache_valid 200 1w;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_split_path_info ^(.+\.php)(/.+)$;
        fastcgi_pass 127.0.0.1:9000;
        fastcgi_index index.php;
        include fastcgi_params;
				fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

	
    location ~ /\.(?!well-known).* {
        deny all;
    }

}
```

Once you have PHP, PHP FastCGI, and Nginx installed and you've checked out the code,
you'll need to do the following to get everything ready. 

Install your PHP dependencies: 

```
$ composer install --no-dev
```

Install your JS libraries:

```
$ yarn install --production
$ yarn run prod
### or ...
$ npm install production
$ npm run production
```

Now for Laravel:

```
$ php artisan config:clear
$ php artisan key:generate
```

Start Nginx and PHP-FMP and you should be good to go. ( depends on your distro ) 

```
$ service php-fpm start
$ service nginx start
```
