<?php


class LatestPublications extends CI_Controller 
{
    
        public function view($term, $pageID)
	{
                //require_once  'JsonClientUtil.php';  
                require_once 'ServiceUtil.php';
                require_once 'Config.php';
                $myConfig = new Config();
                 $myConfig->loadJsonConfig($data);
                $util = new ServiceUtil();
                $data['test'] = NULL;
                
                $term = str_replace("_", "%20", $term);
                //$term = str_replace("/", "%2F", $term);
                
                $startPoint=($pageID-1)*20;
                $result = $util->expandTerm($term);
                $terms = $util->parseExpandedTerm($result,$term);
                //$litResult = searchLiteratureByYearUsingSolr($terms,$startPoint,20,"*",$year);
                $litResult  = $util->searchLatestLiterature($terms,$startPoint,20,"*","*");
            
            
                
                
                $data['publications'] = $litResult;
                $data['term'] = $term;
                
                $data['pageID'] = $pageID;
                
               $data['page_title'] = "Literature:".str_replace("%20", " ", $term);
               $data['enable_config'] = true;
                
                $this->load->view('templates/header2', $data);
                $this->load->view('pages/latestPublicationDisplay', $data);
        	$this->load->view('templates/footer2', $data);
                
        }
    


}


?>