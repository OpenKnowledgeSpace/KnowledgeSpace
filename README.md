KnowledgeSpace
--------------

This is a new version of the knowledge-space.org application. It is a web
application that uses the following:

* (Laravel)[https://laravel.com/] MVC framework for PHP ( for the backend )
* (React)[https://reactjs.org/] Javscript library for UI ( for the frontend )

These require some dependencies for both running the application & development. 
These include: 

* (PHP)[http://php.net] PHP 7+
* (Composer)[https://getcomposer.org] PHP package manager
* (v8)[https://github.com/v8/v8] v8 Javascript engine ( development )
* (v8js) PHP v8 extension ( development )
* (NodeJS)[https://nodejs.org/en/] Node.js runtime ( v6.11 LTS ) ( development)
* (Yarn)[https://github.com/yarnpkg/yarn] JS package manager ( optional,
  development )

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

* (Composer install documentation)[https://getcomposer.org/download/]
* (NodeJS using a package manager)[https://nodejs.org/en/download/package-manager/]
* (Installing Yarn)[https://yarnpkg.com/en/docs/install]

However installing v8js does require a bit more work. Instructions can be the
[v8js install page](https://github.com/phpv8/v8js/blob/php7/README.Linux.md).
The relevant steps is as follows: 



Compile libv8
-------------

```
# Install required dependencies
sudo apt-get install build-essential git python libglib2.0-dev

cd /tmp

# Install depot_tools first (needed for source checkout)
git clone https://chromium.googlesource.com/chromium/tools/depot_tools.git
export PATH=`pwd`/depot_tools:"$PATH"

# Download v8
fetch v8
cd v8

gclient sync

# Setup GN
tools/dev/v8gen.py -vv x64.release -- is_component_build=true

# Build ( this will take awhile. )
ninja -C out.gn/x64.release/

# Install to /opt/v8/
sudo mkdir -p /opt/v8/{lib,include}
sudo cp out.gn/x64.release/lib*.so out.gn/x64.release/*_blob.bin \
  out.gn/x64.release/icudtl.dat /opt/v8/lib/
sudo cp -R include/* /opt/v8/include/
```



Compile php-v8js itself
-----------------------

```
cd /tmp
git clone https://github.com/phpv8/v8js.git
cd v8js
phpize
./configure --with-v8js=/opt/v8
make
make test
sudo make install
```

Now in you php.ini file ( usually in /etc, or in a file like
/etc/php.d/20-v8js.ini if your platform uses the php.d directory for extension
configurations ), add the following line:

```
extension=v8js.so
```
