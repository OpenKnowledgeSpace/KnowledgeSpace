<?php



class Literature extends CI_Controller 
{
    
    public function view($searchName)
    {
        $this->handleLiterature($data,$searchName);
        $data['title'] = $searchName;
        $this->load->view('templates/header2', $data);
        $this->load->view('pages/FullLiterature', $data);
        
    }
    
    
    public function handleLiterature(&$data,$searchName)
    {
        require_once('ServiceUtil.php');
        $util = new ServiceUtil;
        
        $result = $util->expandTerm($searchName);
        $terms = $util->parseExpandedTerm($result,$searchName);
        $litResult = $util->searchLiteratureByYearUsingSolr($terms,0,25000000,"year","*");

        $litMap = $util->processLiteratureObj($litResult);
            //var_dump($litMap);
        $data['litMap'] = $litMap;
           
        $count = count($litMap);
        $data['count'] = $count; 
        
        
        $data['page_title'] = "Literature:".  str_replace("%20", " ", $searchName);
        $data['enable_config'] = true;
    }
    
}


?>