<?php


class ServiceUtil 
{

    public function getJsonObj($surl)
    {
        //echo $surl;
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
    public function searchWithinSource($searchTerm, $sourceID, $rcount, $offset)
    {
        require_once('Config.php');
        $surl = "http://".Config::$nifServiceForData."/servicesv1/v1/federation/data/" . $sourceID . "?q=" . $searchTerm . "&count=" . $rcount. "&offset=".$offset;
	//echo "\n\n<br/>Source:".$surl;
        return $this->getJsonObj($surl); 
    }
    
    public function searchLiteratureByYearUsingSolr($terms, $start, $rows, $fl, $year)
    {
    
        require_once('Config.php');
        $surl="http://".Config::$literatureHost.":8080/literature/collection1/select?q=%7B!lucene%20q.op=OR%7D".
            $terms."&start=".$start."&fl=".$fl."&rows=".$rows."&wt=json&indent=true&fq=year:".$year;
    
        //echo "<br/><br/>".$surl;
    
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
}




?>

