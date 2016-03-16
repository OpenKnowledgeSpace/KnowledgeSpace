<?php


class Term extends CI_Controller 
{
    public function view($page)
    {
        require_once  'ServiceUtil.php';  
        require_once 'Config.php';
        
        $pageName = $page;
        
        $pageName = str_replace(str_split('_'), '%20',$pageName );
        $pageName = str_replace(str_split(','), '%2c', $pageName );
        
        $util = new ServiceUtil;
        $termObj = $util->getTerm($pageName);
        //var_dump($termObj);
        if(!is_null($termObj)  && count($termObj) > 0)
        {
            $data['termObj'] = $termObj;
            $page_title = $pageName = str_replace(str_split('_,'), ' ', $pageName );
            $data['page_title'] = "Term:".$page_title;
            $data['enable_config'] = false;
            
            $this->load->view('templates/header2', $data);
            $this->load->view('pages/DisplayTermLanding', $data);
            $this->load->view('templates/footer2', $data);
        }
        else
        {
            show_404 (); 
        }
    }
}


?>
