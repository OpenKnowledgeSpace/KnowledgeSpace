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
	return $this->getJsonObj($surl); 
    }
    
    
}




?>

