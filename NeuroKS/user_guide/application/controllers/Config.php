<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Config
 *
 * @author ncmir
 */
class Config {
    
    public static $localContextName = "";//NeuroKS"; 
    public static $literatureHost = "";//starburst.crbs.ucsd.edu";
    public static $sciGraphHost = "";//matrix.neuinfo.org";
    public static $gitHubRawHost = "";//raw.githubusercontent.com";
    public static $nifServiceForData = "";//nif-services.neuinfo.org";
    
    public function loadJsonConfig(&$data)
    {
            $configJson = file_get_contents(getcwd()."/application/config/config.json");
            $array = json_decode($configJson);
            //var_dump($array);
            $category_to_source = array();
            $sources = $array->sources;
            $data["config_array"] = $array;
            $ksSources = array();
            $sourceNameArray = array();
            foreach($sources as $source)
            {
                $categories = $source->categories;
                array_push($ksSources,$source->curie);
                $sourceNameArray[$source->curie] = $source->source_name;
                foreach($categories as $category)
                {
                    //echo $category;
                    if(!isset($category_to_source[$category]))
                    {
                        $category_to_source[$category] = array();
                    }
                    $cArray = &$category_to_source[$category];
                    array_push($cArray, $source);
                }
            }
            //var_dump($category_to_source);
            $data["category_to_source"] = $category_to_source;
            $data['ks_sources'] = $ksSources;
            $data["ks_selected_sources"] = implode(',',$ksSources);
            //echo "---------".$data["ks_selected_sources"];
            $data["ks_selected_categories"] = implode(',',$array->categories);
            //echo "---------".$data["ks_selected_categories"];
            $data['categories'] = $array->categories;
            $data['sourceNameArray'] = $sourceNameArray;
            $data['enable_config'] = false;
            //////////Loading server config///////////////
            Config::$localContextName=$array->local_context_name;
            Config::$literatureHost=$array->literature_host;
            Config::$sciGraphHost=$array->scigraph_host;
            Config::$gitHubRawHost=$array->github_host;
            Config::$nifServiceForData=$array->nif_service_host;
            //////////Ending loading server config///////////////
            
            $this->loadLayoutTemplates($data);
            $this->loadCategories($data);
    }
    
    public function loadLayoutTemplates(&$data)
    {
        $layoutJson = file_get_contents(getcwd()."/application/config/layout.json");
        $array = json_decode($layoutJson);
        $data["layout_array"] = $array;
        ///echo "--------------------loadLayoutTemplates-----------------------";
        //var_dump($array);
        //echo "-------------------------------------------";
    }
    
    public function loadCategories(&$data)
    {
        $layoutJson = file_get_contents(getcwd()."/application/config/category_organism.json");
        $array = json_decode($layoutJson);
        $data["category_organism"] = $array;
        
        
        $layoutJson = file_get_contents(getcwd()."/application/config/category_disease.json");
        $array = json_decode($layoutJson);
        $data["category_disease"] = $array;
        
        $layoutJson = file_get_contents(getcwd()."/application/config/category_anatomical.json");
        $array = json_decode($layoutJson);
        $data["category_anatomical"] = $array;
        
        $layoutJson = file_get_contents(getcwd()."/application/config/category_technique.json");
        $array = json_decode($layoutJson);
        $data["category_technique"] = $array;
        
        $layoutJson = file_get_contents(getcwd()."/application/config/category_biological_process.json");
        $array = json_decode($layoutJson);
        $data["category_biological_process"] = $array;
        
        $layoutJson = file_get_contents(getcwd()."/application/config/category_subcellular.json");
        $array = json_decode($layoutJson);
        $data["category_subcellular"] = $array;
        
        $layoutJson = file_get_contents(getcwd()."/application/config/category_quality.json");
        $array = json_decode($layoutJson);
        $data["category_quality"] = $array;
        
        $layoutJson = file_get_contents(getcwd()."/application/config/category_institution.json");
        $array = json_decode($layoutJson);
        $data["category_institution"] = $array;
        
        $layoutJson = file_get_contents(getcwd()."/application/config/category_resource.json");
        $array = json_decode($layoutJson);
        $data["category_resource"] = $array;
    }
}
