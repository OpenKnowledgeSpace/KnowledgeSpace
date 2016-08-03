<?php

   
        /*$litIndex=0;
        foreach ($litMap as $key => $val) 
        {
            if($key != date("Y"))
            {
                echo "[".$key.",". $val."]";

                if($litIndex !=  $count-2)
                {
                    echo ", ";
                }
                echo "\n";

                $litIndex=$litIndex+1;
            }
        }*/
        $litIndex=0;
        $content = "";
        foreach ($litMap as $key => $val) 
        {
            if($key != date("Y"))
            {
                echo $key.",". $val;
                $content = $content.$key.",". $val;

                if($litIndex !=  $count-2)
                {
                    echo ",";
                    $content=$content.",";
                }
               

                $litIndex=$litIndex+1;
            }
        } 
        //$newCurie = str_replace(":","_",$curie);
        file_put_contents("/".$config_array->cache_folder."/".$curie."-literature-String.cache", $content);
?>     
