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
    
    public static $localContextName = "NeuroKS"; 
    public static $literatureHost = "starburst.crbs.ucsd.edu";
    public static $sciGraphHost = "matrix.neuinfo.org";
    public static $gitHubRawHost = "raw.githubusercontent.com";
    public static $nifServiceForData = "nif-services.neuinfo.org";
    
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
        }
}
