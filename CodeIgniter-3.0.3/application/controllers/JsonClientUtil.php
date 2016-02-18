<?php

require_once 'Config.php';

function getJsonObj2($surl)
{
    
    
        
	$endpoint = $surl;

        //  Initiate curl
        $ch = curl_init();

        // Set The Response Format to Json
        curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));
        //curl_setopt($ch,CURLOPT_TIMEOUT,60);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT ,5); 
        // Disable SSL verification
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        // Will return the response, if false it print the response
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Set the url
        curl_setopt($ch, CURLOPT_URL,$endpoint);

        // Execute
        $result=curl_exec($ch);

        // Closing
        curl_close($ch);

        //echo "<p>\nResult------------".$result. "<p>\n";

        $obj = json_decode($result);
        return $obj;

}



function getJsonObj($surl)
{
        
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

function getObjByCurie($curie)
{
    $surl = "http://".Config::$sciGraphHost.":9000/scigraph/vocabulary/id/".$curie;
    //$surl = "http://matrix.neuinfo.org:9000/scigraph/vocabulary/id/".$curie;
    //echo 'getObjByCurie-------'.$surl."\n";
    $obj = getJsonObj($surl);
    //var_dump($obj);
    return $obj;
}



function getTreeObj($curie)
{
	//$surl = "http://matrix.neuinfo.org:9000/scigraph/graph/neighbors/". $curie ."?depth=1&blankNodes=false&direction=BOTH&project=%2A";
        $surl = "http://".Config::$sciGraphHost.":9000/scigraph/graph/neighbors/". $curie ."?depth=1&blankNodes=false&direction=BOTH&project=%2A";

	$obj = getJsonObj($surl);
	return $obj;

}


function getNode($obj, $id)
{
	foreach($obj->nodes as $node)
	{

		if(strcmp($id, $node->id) == 0)
		{
		    //$node->sub;
		    return $node;
		}


	}

	return NULL;
}







function startsWith($haystack, $needle) {
    // search backwards starting from haystack length characters from the end
    return $needle === "" || strrpos($haystack, $needle, -strlen($haystack)) !== FALSE;
}
function endsWith($haystack, $needle) {
    // search forward starting from end minus needle length characters
    return $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && strpos($haystack, $needle, $temp) !== FALSE);
}


function getParentID($obj, $mainID)
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



function getChildrenIDs($obj, $mainID)
{
	$list = new SplDoublyLinkedList();

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

	return $list;

}

function searchLiteratureByYear($searchTerm, $yearFilter)
{
    //$surl = "http://nif-services.neuinfo.org/servicesv1/v1/literature/search?count=30000&q=" . $searchTerm . "&yearFilter=".$yearFilter;
    $surl = "http://".Config::$nifServiceForData."/servicesv1/v1/literature/search?count=30000&q=" . $searchTerm . "&yearFilter=".$yearFilter;

    
    return getJsonObj($surl);
}

function searchLiterature($searchTerm)
{
    //$surl = "http://nif-services.neuinfo.org/servicesv1/v1/literature/search?count=30000&q=" . $searchTerm;
    $surl = "http://".Config::$nifServiceForData."/servicesv1/v1/literature/search?count=30000&q=" . $searchTerm;

    return getJsonObj($surl);
    
}

function searchWithinSource($searchTerm, $sourceID, $rcount)
{

        $surl = "http://".Config::$nifServiceForData."/servicesv1/v1/federation/data/" . $sourceID . "?q=" . $searchTerm . "&count=" . $rcount;

	//$surl = "http://nif-services.neuinfo.org/servicesv1/v1/federation/data/" . $sourceID . "?q=" . $searchTerm . "&count=" . $rcount;
	//if($sourceID== "nif-0000-00054-3")		
        //echo "\n<br/>".$surl . "\n";

	return getJsonObj($surl); 
}

function searchWithinSource2($searchTerm, $sourceID, $rcount, $offset)
{

	//$surl = "http://nif-services.neuinfo.org/servicesv1/v1/federation/data/" . $sourceID . "?q=" . $searchTerm . "&count=" . $rcount. "&offset=".$offset;
	
        $surl = "http://".Config::$nifServiceForData."/servicesv1/v1/federation/data/" . $sourceID . "?q=" . $searchTerm . "&count=" . $rcount. "&offset=".$offset;
	//echo "\n<br/>".$surl . "\n";
        return getJsonObj($surl); 
}


function getImageArray($obj, $count)
{
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
function processLiteratureObj($litObj)
{
    $result = $litObj->result;
    $myMap = array();
    
    foreach($result->publications as $publication)
    {
        
        
        if(!array_key_exists("".$publication->year, $myMap))
        {
            $myMap[''.$publication->year] = 1;
        }
        else 
        {
            $myMap[''.$publication->year] = $myMap[''.$publication->year]+1;
        }
        
        //echo $publication->year."<br/>\n";
    }
    ksort($myMap);
    //var_dump($myMap);
    
    return $myMap;
    
}
function get_http_response_code($url) {
    $headers = get_headers($url);
    return substr($headers[0], 9, 3);
}
function getDescriptionByCurie($curie)
{
    $postfix = str_replace(":","/", $curie);
    //$prefix = "https://raw.githubusercontent.com/tgbugs/ksdesc/master/";
    $prefix = "https://".Config::$gitHubRawHost."/tgbugs/ksdesc/master/";
    $surl = $prefix.$postfix.".md";
    $file_headers = @get_headers($surl);
    //echo "CODE:".$file_headers[0]."---------";
    if($file_headers[0] == 'HTTP/1.1 404 Not Found')
        return NULL;
    
    $content = file_get_contents($surl);
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


function getTerm($name)
{
    $name = str_replace(" ", "%20",$name); 
    //$surl = "http://matrix.neuinfo.org:9000/scigraph/vocabulary/term/".$name."?limit=20&searchSynonyms=false&searchAbbreviations=false&searchAcronyms=false
//";
   // echo "<p>\n".$surl."<p>\n";
    $surl = "http://".Config::$sciGraphHost.":9000/scigraph/vocabulary/term/".$name."?limit=20&searchSynonyms=false&searchAbbreviations=false&searchAcronyms=false";
    
    $obj = getJsonObj($surl);
    return $obj;
}

function getSourceDescObj($curie)
{
    $surl = "http://cm-stage.neuinfo.org:8080/cm_services/sources/summary?viewNifId=".$curie;
    //echo $surl;
    $obj = getJsonObj($surl);
    return $obj;
    
}

function searchLiteratureByYearOnly($term)
{
    $surl = "http://".Config::$literatureHost.":8080/literature/collection1/select?q=".$term
            ."&start=0&fl=year&rows=25000000&wt=json&indent=true";
    //echo $surl;
    $obj = getJsonObj($surl);
    
    return $obj;
}


function searchLiteratureByYearUsingSolr($terms, $start, $rows, $fl, $year)
{
    
    //$surl="http://vivaldi.crbs.ucsd.edu:8080/literature/collection1/select?q=%7B!lucene%20q.op=OR%7D".
    //        $terms."&start=".$start."&fl=".$fl."&rows=".$rows."&wt=json&indent=true&fq=year:".$year;
    $surl="http://".Config::$literatureHost.":8080/literature/collection1/select?q=%7B!lucene%20q.op=OR%7D".
            $terms."&start=".$start."&fl=".$fl."&rows=".$rows."&wt=json&indent=true&fq=year:".$year;
    
    //echo "<br/><br/>".$surl;
    
    $obj = getJsonObj2($surl);
    //$obj = file_get_contents($surl);
    //echo "----------Returned:".$obj;
    
    
    return $obj;    
    
}

function expandTerm($term)
{
    $surl = "http://nif-services.neuinfo.org/servicesv1/v1/query.json?q=".$term;
    $obj = getJsonObj($surl);
    return $obj;     
}

function parseExpandedTerm($result,$term)
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



//$result = getObjByCurie("NIFCELL:sao212841708");

//$result = getTerm("Neocortical%20pyramidal%20cell");

//$result = expandTerm("neocortex%20pyramidal%20cell");
//$terms = parseExpandedTerm($result);
//$result2 = searchLiteratureByYearUsingSolr($terms);
//var_dump($result2);

//$result = searchLiteratureByYearOnly("neocortex%20pyramidal%20cell");
//$map = processLiteratureObj2($result);
//var_dump($map);
//$result = searchWithinSource("neocortex%20pyramidal%20neuron", "nlx_151885-1", 20);


//$sourceDesc = getSourceDescObj("nif-0000-00508-5");
//echo $sourceDesc;

//$result = searchWithinSource("pyramidal%20cell", "nlx_151885-1", 20);
//var_dump($result);


/*$name = "neocortex pyramidal cell";
$obj = getTerm($name);
$count = count($obj);
echo "<p>\nCOUNT:".$count."<p>";
var_dump($obj[0]);
echo "<p>curie----".$obj[0]->curie;
echo "<p>synonyms----". $obj[0]->synonyms;*/

//$curie = "NIFCELL:sao2128417084";
//$treeObj = getTreeObj($curie);
//var_dump($treeObj);
//$node = getNode($treeObj,"NIFCELL:sao2128417084");
//var_dump($node);
//$parentID = getParentID($treeObj, $curie);
//echo "--------".$parentID;
//$node = getNode($treeObj,$parentID);
//var_dump($node);

//$list = getChildrenIDs($treeObj,$curie);
//var_dump($list);


//$result = searchLiterature("neocortex%20pyramidal%20cell")
//$cilResult = searchWithinSource("neocortex%20pyramidal%20cell", "nif-0000-37639-1", 20);
//$test = getImageArray($cilResult);


//$result = searchWithinSource("neocortex%20pyramidal", "nif-0000-00006-1", 20);
//echo "---------" . $result->result->resultCount . "\n\n";

  //$result = searchLiteratureByYear("neocortex%20pyramidal%20cell","1998");
  //var_dump($result);
  //processLiteratureObj($result);

  //$content = getDescriptionByCurie("NIFCELL:sao2128417084");
  //echo $content;
?>
