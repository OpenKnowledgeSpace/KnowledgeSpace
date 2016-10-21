<?php

class Categories extends CI_Controller 
{
    
    public  function index()
    {
        require_once 'Config.php';
        $myConfig = new Config();
        $myConfig->loadJsonConfig($data);
        $data['page_title'] = "Categories";
        $data['enable_config'] = true;
         $this->load->view('templates/header2', $data);
         $this->load->view('pages/DisplayCategories', $data);
         $this->load->view('templates/footer2', $data);
    }
    
}


?>