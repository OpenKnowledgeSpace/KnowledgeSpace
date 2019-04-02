KnowledgeSpace 3.0
--------------

This is a new new version of the knowledge-space.org application. It is a web
application that uses the following:

* [React](https://reactjs.org/) Javscript library for UI ( for the frontend )

These require some dependencies for both running the application & development. 
These include: 

* [NodeJS](https://nodejs.org/en/) Node.js runtime ( v8.12 LTS )
* [Yarn](https://github.com/yarnpkg/yarn) JS package manager 
* [ElasticSearch](https://www.elastic.co/) ElasticSearch

### Quick Start

If you do not have all the dependencies listed above installed, please see the
information below about installing them. 

You will need to point the application to your ElasticSearch index. This is
done in the .env file. Make sure that CORS is configured for your ES server.

Check out the application and then cd into it's directory.


```
$ yarn 
$ yarn run start
```

### Deploying to Production

```
$ yarn run build
```

This will package the web files in the build directory, which can be deployed
on any standard webserver.
