<?php

    class ViewUtil
    {
        function getLayoutArray($templates,$category)
        {
            if(is_null($templates))
                return;
            
            $layout_map = array();
            $selected = NULL;
            $layouts = $templates->layout_templates;
            //echo "--------layout count:".count($layouts);
            for($i=0;$i<count($layouts);$i++)
            {
                $name = $layouts[$i]->name;
                $array = $layouts[$i]->value;
                $layout_map[$name] = $array;
                
                if(strcmp($name, $category)==0)
                        $selected = $array;
                
                //echo "<br/>-------------------Name:".$name;
                //var_dump($array);
                //echo "<br/>----------------------------------";
            }
            if(is_null($selected))
            {
                //echo "<br/>-----Use default-----";
                $selected = $layout_map['default'];
            }
            /*echo "<br/>-------------------selected:";
            var_dump($selected);
            echo "<br/>----------------------------------";*/
            return $selected;
        }
    
    }

?>

