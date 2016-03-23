<?php

class Results extends CI_Controller 
{
	public function view($sourceID, $term,$pageID)
	{
                //require_once  'JsonClientUtil.php';  
                //require_once 'Config.php'; 
                require_once 'ServiceUtil.php';
                require_once 'Config.php';
                $util = new ServiceUtil();
                $myConfig = new Config();
                $myConfig->loadJsonConfig($data);
                $data['test'] = NULL;
               
                $term = str_replace("_", "%20", $term);
                $newName =$term;
                $searchName = $term;
                if(strcasecmp($searchName,"cell")==0)
                {
                    $newName=$searchName;
                }
                else if(strcasecmp($searchName,"neuron")==0)
                {
                    $newName=$searchName;
                }
                else if($util->endsWith($searchName, "%20cell"))
                {
                    $tempName = substr($searchName, 0, strlen($searchName)-strlen("%20cell"));
                    $newName = $tempName;
                }
                else if($util->endsWith($searchName, "%20neuron"))
                {
                    $tempName = substr($searchName, 0, strlen($searchName)-strlen("%20neuron"));
                    $newName = $tempName;
                }
                
                
                $offset = 0;
                //echo "\nSourceID------".$sourceID;
                //echo "\nTerm:".$term;
                if(!isset($pageID) || $pageID <= 1)
                    $offset = 0;
                else
                {
                    $offset =($pageID-1)*20;
                }
                //echo "---------------".$newName;
                $data['resultObj'] = $util->searchWithinSource($newName, $sourceID, 20,$offset);
               // $data['resultObj'] = searchWithinSource2($term, $sourceID, 20,$offset);
               /*if(endsWith($term, "%20cell"))
               {
                   
                   $tempName = substr($term, 0, strlen($term)-strlen("%20cell"));
                   //echo "-------------tempName:".$tempName."----".strlen($term)."--------";
                   $tempResult = searchWithinSource2($tempName, $sourceID, 20,$offset);
                   if($tempResult->result->resultCount > $data['resultObj']->result->resultCount)
                       $data['resultObj'] = $tempResult;
               }*/
                
                
                
                $data['sourceID'] = $sourceID;
                $data['pageID'] = $pageID;
                $data['term'] = $term;

		$protocol = "http";
		if(isset($_SERVER['HTTPS']))
		{
			$protocol = "https";	
		}
                $surl = $protocol."://".
                        $_SERVER['SERVER_NAME']
                        ."/".Config::$localContextName."/resources/source_description/".$sourceID;
                //echo "\n".$surl;
		$responseCode =  @get_headers($surl);
    //echo "CODE:".$file_headers[0]."---------";
                if($responseCode[0] == 'HTTP/1.1 404 Not Found')
                    $data['description'] = "";
                else
		{
			
                    $data['description'] = file_get_contents($surl);
                }
                //var_dump($data['resultObj']);
                $data['page_title'] = "Search:".str_replace("%20", " ", $term);
               $data['enable_config'] = true;
                
                $this->load->view('templates/header2', $data);
        	
                $this->load->view('pages/resultDisplay', $data);
        	$this->load->view('templates/footer', $data);
                
        }
        
}   
?>

