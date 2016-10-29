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
    
    
    public function view($category)
    {
        require_once 'Config.php';
        $myConfig = new Config();
        $myConfig->loadJsonConfig($data);
        $data['page_title'] = "Categories";
        $data['enable_config'] = true;
        $this->load->view('templates/header2', $data);
        $data['category'] = $category;
        if(strcmp($category, "organism")==0)
        {
            $layoutJson = file_get_contents(getcwd()."/application/config/category_organism.json");
            $array = json_decode($layoutJson);
            $data["category_organism"] = $array;
            
             //$this->load->view('pages/categories/organism_only', $data);
        }
        else if(strcmp($category, "disease")==0)
        {
            $layoutJson = file_get_contents(getcwd()."/application/config/category_disease.json");
            $array = json_decode($layoutJson);
            $data["category_disease"] = $array;
            
            //$this->load->view('pages/categories/disease_only', $data);
        }
        else if(strcmp($category, "anatomical")==0)
        {
            $layoutJson = file_get_contents(getcwd()."/application/config/category_anatomical.json");
            $array = json_decode($layoutJson);
            $data["category_anatomical"] = $array;
            
            //$this->load->view('pages/categories/disease_only', $data);
        }
        else if(strcmp($category, "technique")==0)
        {
            $layoutJson = file_get_contents(getcwd()."/application/config/category_technique.json");
            $array = json_decode($layoutJson);
            $data["category_technique"] = $array;
            
            //$this->load->view('pages/categories/disease_only', $data);
        }
        else if(strcmp($category, "biological_process")==0)
        {
            $layoutJson = file_get_contents(getcwd()."/application/config/category_biological_process.json");
            $array = json_decode($layoutJson);
            $data["category_biological_process"] = $array;
            
            //$this->load->view('pages/categories/disease_only', $data);
        }
        else if(strcmp($category, "subcellular")==0)
        {
            $layoutJson = file_get_contents(getcwd()."/application/config/category_subcellular.json");
            $array = json_decode($layoutJson);
            $data["category_subcellular"] = $array;
            
            //$this->load->view('pages/categories/disease_only', $data);
        }
        else if(strcmp($category, "quality")==0)
        {
            $layoutJson = file_get_contents(getcwd()."/application/config/category_quality.json");
            $array = json_decode($layoutJson);
            $data["category_quality"] = $array;
            
            //$this->load->view('pages/categories/disease_only', $data);
        }
        else if(strcmp($category, "institution")==0)
        {
            $layoutJson = file_get_contents(getcwd()."/application/config/category_institution.json");
            $array = json_decode($layoutJson);
            $data["category_institution"] = $array;
            
            //$this->load->view('pages/categories/disease_only', $data);
        }
        else if(strcmp($category, "resource")==0)
        {
            $layoutJson = file_get_contents(getcwd()."/application/config/category_resource.json");
            $array = json_decode($layoutJson);
            $data["category_resource"] = $array;
            //$this->load->view('pages/categories/disease_only', $data);
        }
        else if(strcmp($category,"cell")==0)
        {
            $layoutJson = file_get_contents(getcwd()."/application/config/category_cell.json");
            $array = json_decode($layoutJson);
            $data["category_cell"] = $array;
        }
        
        
        $this->load->view('pages/categories/category_main', $data);
        $this->load->view('templates/footer2', $data);
    }
    
}



?>