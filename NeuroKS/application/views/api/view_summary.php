<?php
header('Content-Type: application/json');

////var_dump($config_array);
//var_dump($category_count_array);
$categories =  $config_array->categories;

$root = array();

foreach($categories as $category)
{
    //$root[$category] = array();
    //array_push($root, $category);
    //var_dump($category);
    $sources = $category_to_source[$category];
    //var_dump($sources);
    //echo "<br/>----------".$category."-------------";
    //echo "<br/>----------".$curie."-----------------";
    
    
    foreach($sources as $source)
    {
        $result = $source_search_result[$source->curie];
        
        $root[$category][$source->curie]['name'] = $source->source_name;
        $root[$category][$source->curie]['count'] = $result->result->resultCount;
        $root[$category][$source->curie]['description'] = $source->description;
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
        $domainName = $_SERVER['HTTP_HOST'];
        
        $root[$category][$source->curie]['link'] = $protocol.$domainName."/".$config_array->local_context_name."/pages/view/".$curie;
        
        /*echo "<br/>Name".$source->source_name;
        $result = $source_search_result[$source->curie];
        echo "<br/>Count:".$result->result->resultCount;
        echo "<br/>Curie:".$source->curie;*/
    }
    
   
}
$json = json_encode($root,JSON_UNESCAPED_SLASHES);
echo $json;
?>

