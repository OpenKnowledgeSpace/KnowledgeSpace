<?php

namespace App\Kspace;

  use Elasticsearch\ClientBuilder;

  class DataSpaceClient 
  {
    protected $client;
    public function __construct()
    {
      
      
      $host = [[ 
        'host' => config('services.data_space.host'),
        'user' => config('services.data_space.user'), 
        'pass' => config('services.data_space.pass'),
        'port' => '80',
        'scheme' => 'http'
      ]]; 
      $this->client =  ClientBuilder::create()->setHosts($host)->build(); 
    }
    
    protected function default_params($terms)
    {
        return [  'index' => "*", 
          'from' => 0,
          'size' => 20, 
          'body' => [ 
            'query' => [ 'match' => [   '_all' => [ 'query' => join($terms, '  '), 'operator' => 'and'  ] ] ],
            'aggs' => [ 'source_count' => [ 'terms' => [ 'field' => '_index', 'size' => 10 ] ] ] 
          ]
         ]; 
    }
      
    public function search($sources, $terms, $params = array( 'size' => 5, 'from' => 0 ) ) 
    {
        $params["index"] = $sources;                 
        $params = array_merge( $this->default_params($terms), $params );
        return $this->client->search($params); 
    }
    
    
    public function searchImages($query)
    {
      $images = array(); 
      foreach ( array_values(config('services.data_space_sources')) as $category  ) { 
        foreach ( $category as $source ) {
          if ( $source["has_images"] == true ) {   
            $sourceCurie = $source["curie"]; 
            try { 
              $res = $this->client->request("GET", "/servicesv1/v1/federation/data/".$sourceCurie.'.json', [ 
                        'query' => $query
                      ]);
              
              foreach ( json_decode( $res->getBody() )->{"result"}->{"result"} as $result ) { 
                $image =  str_replace("grackle.crbs.ucsd.edu:8001", "am.celllibrary.org", $result->{"Image"});
                array_push($images, $image );
              };
            } catch ( ClientException $e ) {}
          } 
        }
      };
      return  $images; 
    }
}
