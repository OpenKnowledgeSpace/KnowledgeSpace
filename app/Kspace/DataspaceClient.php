<?php

namespace App\Kspace;

use GuzzleHttp\Exception\GuzzleException;
use GuzzleHttp\Client;

class DataspaceClient 
{
    protected $client;
    public function __construct()
    {
        $client =  new Client([ 'base_uri' => config('services.nif.host') ]); 
        $this->client = $client;
    }
    
    public function searchInSource($source, $query)
    {
        $res = $this->client->request("GET", "/servicesv1/v1/federation/data/".$source.'.json', [ 
                  'query' => $query
                ]);
        return json_decode( $res->getBody() ); 
         
    
    }
    
    public function searchImages($query)
    {
      $images = array(); 
      foreach ( config('services.dataspace_sources') as $source  ) { 
        if ( $source["has_images"] == true ) {   
          $sourceCurie = $source["curie"]; 
          $res = $this->client->request("GET", "/servicesv1/v1/federation/data/".$sourceCurie.'.json', [ 
                    'query' => $query
                  ]);
          
          foreach ( json_decode( $res->getBody() )->{"result"}->{"result"} as $result ) { 
            $image =  str_replace("grackle.crbs.ucsd.edu:8001", "am.celllibrary.org", $result->{"Image"});
            array_push($images, $image );
          }; 
          
        }
      };
      return  $images; 
    }


}
