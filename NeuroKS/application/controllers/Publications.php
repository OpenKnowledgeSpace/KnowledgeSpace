<?php

class Publications extends CI_Controller 
{
    /*
	public function view($term, $year,$pageID)
	{
                require_once  'JsonClientUtil.php';  
                $data['test'] = NULL;
                
                $term = str_replace("_", "%20", $term);
                
                $result = searchLiteratureByYear($term,$year);
                $data['publications'] = $result;
                $data['term'] = $term;
                $data['year'] = $year;
                $data['pageID'] = $pageID;
                
                $this->load->view('templates/header', $data);
                $this->load->view('pages/publicationDisplay', $data);
        	$this->load->view('templates/footer', $data);
                
        }  */
        
        public function view($term, $year,$pageID)
	{
                #require_once  'JsonClientUtil.php';  
                require_once  'ServiceUtil.php'; 
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
                $litResult = $util->searchLiteratureByYearUsingSolr($terms,$startPoint,20,"*",$year);
                
                
                
                $data['publications'] = $litResult;
                $data['term'] = $term;
                $data['year'] = $year;
                $data['pageID'] = $pageID;
                
               $data['page_title'] = "Literature:".str_replace("%20", " ", $term);
               $data['enable_config'] = true;
                
                $this->load->view('templates/header2', $data);
                $this->load->view('pages/publicationDisplay2', $data);
        	$this->load->view('templates/footer', $data);
                
        }
    
        
}

?>
