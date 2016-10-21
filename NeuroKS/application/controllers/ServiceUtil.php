<?php

 /**
   * This class provides all utility functions to query the services.
   * 
   * 
   * @package    NeuroKS
   * @subpackage Utility
   * @author     Willy Wong <wwong@ncmir.ucsd.edu>
   */
class ServiceUtil 
{

    /**
       * 
       * Get JSON object using an URL.
       *
       * @param string $surl  URL to query the service
       * @return JSON object
       */
    public function getJsonObj($surl)
    {
        //echo "<br/>".$surl;
	$endpoint = $surl;

        //  Initiate curl
        $ch = curl_init();

        // Set The Response Format to Json
        curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));
        // Disable SSL verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT ,5); 

        // Will return the response, if false it print the response
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Set the url
        curl_setopt($ch, CURLOPT_URL,$endpoint);

        // Execute
        $result=curl_exec($ch);

        // Closing
        curl_close($ch);

        //echo "<p>\n".$result. "<p>\n";

        $obj = json_decode($result);
        return $obj;

    }
    public function loadSourcesConfig(&$data)
        {
            //echo "--------------loadSourcesConfig-----------";
            // Open the file
            $sourceIDs = "";array();
            $sources= array();
            $array = explode("\n", file_get_contents(getcwd()."/application/controllers/sources.txt"));
            foreach ($array as $line) {
                $items= explode( ',', $line );
                array_push($sources,$items);
                
                if(strcmp(trim($items[2]), "true")==0)
                {
                    if(strcmp($sourceIDs, "")==0)
                      $sourceIDs = $items[1];
                    else
                      $sourceIDs = $sourceIDs.",".$items[1];
                }
                     
            }
      

            return $sources;
        }
        
    function getObjByCurie($curie)
    {
        $surl = "http://".Config::$sciGraphHost.":9000/scigraph/vocabulary/id/".$curie;
        //$surl = "http://matrix.neuinfo.org:9000/scigraph/vocabulary/id/".$curie;
        //echo 'getObjByCurie-------'.$surl."\n";
        $obj = $this->getJsonObj($surl);
        //var_dump($obj);
        return $obj;
    }    
    public function startsWith($haystack, $needle) {
    // search backwards starting from haystack length characters from the end
        return $needle === "" || strrpos($haystack, $needle, -strlen($haystack)) !== FALSE;
    }
    public function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
        return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== FALSE);
    }    
        
    function getDescriptionByCurie($curie)
    {
        $postfix = str_replace(":","/", $curie);
        //$prefix = "https://raw.githubusercontent.com/tgbugs/ksdesc/master/";
        $prefix = "https://".Config::$gitHubRawHost."/tgbugs/ksdesc/master/";
        $surl = $prefix.$postfix.".md";
        $file_headers = @get_headers($surl);
        
	if(is_null($file_headers[0]))
		return NULL;
	//echo "CODE:".$file_headers[0]."---------";
        if($file_headers[0] == 'HTTP/1.1 404 Not Found')
            return NULL;

	try
	{
        $content = file_get_contents($surl);
	}
	catch(Exception $e)
	{
	   return NULL;
	}

            //echo $content;



            return $content;
        //echo $surl;
        /*if(get_http_response_code($url)!=404 || get_http_response_code($url)!=200 )
        {
            $content = file_get_contents($surl);
            //echo $content;
            return $content;
        }
        else
            return NULL;*/
    }

    public function searchTerm($name)
    {
        require_once('Config.php');
        $name = str_replace(" ", "%20",$name); 
        $surl = "http://matrix.neuinfo.org:9000/scigraph/vocabulary/search/".$name."?limit=100&searchSynonyms=true&searchAbbreviations=false&searchAcronyms=false";
        //echo $surl."<br/>\n";
        $obj = $this->getJsonObj($surl); 
        return $obj;
        
    }
    public function getTerm($name)
    {
        require_once('Config.php');
        $name = str_replace(" ", "%20",$name); 

        $surl = "http://".Config::$sciGraphHost.":9000/scigraph/vocabulary/term/".$name."?limit=20&searchSynonyms=false&searchAbbreviations=false&searchAcronyms=false";
        //echo $surl."<br/>\n";
        $obj = $this->getJsonObj($surl); 
        return $obj;
    }    
        
    public function searchWithinSource($searchTerm, $sourceID, $rcount, $offset)
    {
        require_once('Config.php');
        $surl = "http://".Config::$nifServiceForData."/servicesv1/v1/federation/data/" . $sourceID . "?q=" . $searchTerm . "&count=" . $rcount. "&offset=".$offset;
	//echo "\n<br/>Source:".$surl;
        return $this->getJsonObj($surl); 
    }
    
    public function searchLiteratureByYearUsingSolr($terms, $start, $rows, $fl, $year)
    {
    
        require_once('Config.php');
        $surl="http://".Config::$literatureHost.":8080/literature/collection1/select?q=%7B!lucene%20q.op=OR%7D".
            $terms."&start=".$start."&fl=".$fl."&rows=".$rows."&wt=json&indent=true&fq=year:".$year;
    
       echo "<br/><br/>".$surl;
    
        $obj = $this->getJsonObj($surl);
        //$obj = file_get_contents($surl);
        //echo "----------Returned:".$obj;
    
    
        return $obj;    
    
    }
    
    
    public function expandTerm($term)
    {
        $surl = "http://nif-services.neuinfo.org/servicesv1/v1/query.json?q=".$term;
        $obj = $this->getJsonObj($surl);
        return $obj;     
    }

    
    public function parseExpandedTerm($result,$term)
    {
        $exp ="\"".$term."\"";

        if(count($result->clauses)>0)
        {
            foreach($result->clauses[0]->expansion as $expansion)
            {
                $expansion = str_replace(" ", "%20", $expansion);
                $exp = $exp."\"".$expansion."\"";
            }
        }
    
        return $exp;
    }
    
    public function processLiteratureObj($litObj)
    {
        $myMap = array();
        if(is_null($litObj))  //If empty result is returned
            return $myMap;

       //var_dump($litObj); 
        $result = $litObj->response;


        foreach($result->docs as $doc)
        {
            if(!array_key_exists("".$doc->year, $myMap))
            {
                $myMap[''.$doc->year] = 1;
            }
            else 
            {
                $myMap[''.$doc->year] = $myMap[''.$doc->year]+1;
            }
        }

        ksort($myMap);
        //var_dump($myMap);

        return $myMap;
    
    }
    function processLiteratureObj2($litObj)
    {
        $myMap = array();
        if(is_null($litObj))  //If empty result is returned
            return $myMap;

       //var_dump($litObj); 
        $result = $litObj->response;


        foreach($result->docs as $doc)
        {
            if(!array_key_exists("".$doc->year, $myMap))
            {
                $myMap[''.$doc->year] = 1;
            }
            else 
            {
                $myMap[''.$doc->year] = $myMap[''.$doc->year]+1;
            }
        }

        ksort($myMap);
        //var_dump($myMap);

        return $myMap;
    
    }
    public function getTreeObj($curie)
    {
        require_once('Config.php');
	//$surl = "http://matrix.neuinfo.org:9000/scigraph/graph/neighbors/". $curie ."?depth=1&blankNodes=false&direction=BOTH&project=%2A";
        $surl = "http://".Config::$sciGraphHost.":9000/scigraph/graph/neighbors/". $curie ."?depth=1&blankNodes=false&direction=BOTH&project=%2A";
        //echo $surl;
	$obj = $this->getJsonObj($surl);
	return $obj;

    }
    
    public function getParentID($obj, $mainID)
    {
	foreach($obj->edges as $edge)
	{

		//var_dump($edge);
		if(strcmp("subClassOf", $edge->pred)==0)
		{

			if(strcmp($mainID,$edge->sub)==0)
				// && startsWith($edge->obj,"NIFCELL"))
			{
				//echo $edge->sub."----------->". $edge->obj."\n";

				return $edge->obj;
			}
		}		
	}
	return NULL;
    }
    
    public function getParentIDIncoming($obj, $mainID, $prop)
    {
        if(!is_null($obj) && isset($obj->edges))
        {
            foreach($obj->edges as $edge)
            {

                    //var_dump($edge);
                    if(strcmp($prop, $edge->pred)==0)
                    {

                            if(strcmp($mainID,$edge->sub)==0)
                                    // && startsWith($edge->obj,"NIFCELL"))
                            {
                                    //echo $edge->sub."----------->". $edge->obj."\n";

                                    return $edge->obj;
                            }
                    }		
            }
        }
	return NULL;
    }
    
    
    public function getOtherParentID($obj, $mainID, $prop)
    //public function getOtherChildrenIDs($obj, $mainID, $prop)
    {
        if(!is_null($obj) && isset($obj->edges))
        {
            foreach($obj->edges as $edge)
            {
                    if(strcmp($prop, $edge->pred)==0)
                    {
                            /*if(strcmp($mainID,$edge->sub)==0)
                            {
                                    return $edge->obj;
                            }*/
                            if(strcmp($mainID,$edge->obj)==0)
                            {
                                    return $edge->sub;
                            }
                    }		
            }
        }
	return NULL; 
        
    }
    
    
    /**
       * 
       * Get a node object from a tree object
       *
       * @param object $obj  tree object
       * @param string $id  curie
       */
    public function getNode($obj, $id)
    {
        if(!is_null($obj))
        {
            foreach($obj->nodes as $node)
            {
                    if(strcmp($id, $node->id) == 0)
                    {
                        return $node;
                    }
            }
        }

	return NULL;
    }
    
    
    
    public function getChildrenIDs($obj, $mainID)
    {
	$list = new SplDoublyLinkedList();
        if(!is_null($obj))
        {
            foreach($obj->edges as $edge)
            {
                    if(strcmp("subClassOf",$edge->pred)==0)
                    {
                            if(strcmp($mainID,$edge->obj)==0)
                            {
                                    $list->push($edge->sub);
                                    //echo $edge->sub;
                            }
                    }
            }
        }
	return $list;
        
        

    }
    
    
    
    public function getChildrenIDsIncoming($obj, $mainID, $prop)
    {
	$list = new SplDoublyLinkedList();
        if(!is_null($obj) && isset($obj->edges))
        {
            foreach($obj->edges as $edge)
            {
                    if(strcmp($prop,$edge->pred)==0)
                    {
                            if(strcmp($mainID,$edge->obj)==0)
                            {
                                    $list->push($edge->sub);
                                    //echo $edge->sub;
                            }
                    }
            }
        }

	return $list;
        
        

    }

    
    
    
    public function getOtherChildrenIDs($obj, $mainID, $prop)
    //public function getOtherParentID($obj, $mainID, $prop)
    {
	$list = new SplDoublyLinkedList();
        //echo "<br/>-----getOtherChildrenIDs:".$prop;
        if(!is_null($obj))
        {
            foreach($obj->edges as $edge)
            {
                    if(strcmp($prop,$edge->pred)==0)
                    {
                            /*if(strcmp($mainID,$edge->obj)==0)
                            {
                                    $list->push($edge->sub);

                            }*/
                            if(strcmp($mainID,$edge->sub)==0)
                            {
                                    $list->push($edge->obj);
                            }
                    }
            }
        }
	return $list;
       
    }
    
    public function searchLatestLiterature($terms, $start, $rows, $fl, $year)
    {
        
        //$surl = "http://".Config::$nifServiceForData."/servicesv1/v1/literature/search?count=30000&q=" . $searchTerm;
        $surl="http://".Config::$literatureHost.":8080/literature/collection1/select?sort=year+desc,month+desc,day+desc&q=%7B!lucene%20q.op=OR%7D".
            $terms."&start=".$start."&fl=".$fl."&rows=".$rows."&wt=json&indent=true&fq=year:".$year;
        echo $surl;
        return $this->getJsonObj($surl);
    
    }
    public function getImageArray($obj, $count)
    {
        if(is_null($obj))
            return array();
    
	$size = $obj->result->resultCount;	

	if($size > $count)
	   $size = $count;
	$results = $obj->result->results;

	$a = array();
	$a = array_pad($a,$size,""); 

	$index = 0;
	foreach($results->row as $myrow)
	{
		foreach($myrow->data as $data)
         	{
			//echo "-----name:".$data->name."\n";
			$name = $data->name;
			if(strcmp($name, "Image")==0)
			{
				$val = $data->value;
			        //echo $val."\n";
                                $val = str_replace("grackle.crbs.ucsd.edu:8001", "am.celllibrary.org", $val);

				$a[$index] = $val;

				break;
			}
		

		}

		$index = $index+1;
	}

	//var_dump($a);
	return $a;

    }

}




?>

