<?php
        
     
    $categories =  $config_array->categories;
    echo "<!------------------------Category count javascripts-------->";    
    foreach($categories as $category)
    {
            echo "<script type=\"text/javascript\">\n";
            echo $category."_count=".$category_count_array[$category].";\n";
            echo "</script>\n\n";
            
    }
    echo "<!------------------------End category count javascripts-------->";    


	
            
          
?>






<?php

    foreach($categories as $category)
    {
        echo "\n<!-- ".$category." Modal -->";
        echo "\n<div class=\"modal fade\" id=\"".$category."_"."Modal\" role=\"dialog\">";
        echo "\n<div class=\"modal-dialog modal-lg\">";
        echo "\n<div class=\"modal-content\">";
        echo "\n<div class=\"modal-header\">";
        echo "\n<button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>";
        echo "\n<h4 class=\"modal-title\">".$category."</h4>";
        echo "\n</div>";
        echo "\n<div class=\"modal-body\">";
        echo "\n<p>";
        /*************************Showing data*******************************/
        echo "<!------------------------Showing dataspace modals-------->"; 
        $categorySourceArray = $category_to_source[$category];
        echo "<table class=\"table table-striped\"><tbody>";
        foreach($categorySourceArray as $csource)
        {
            if(!isset($source_search_result[$csource->curie]) ||
                    $source_search_result[$csource->curie]->result->resultCount==0)
                continue;
            echo "<tr>";

            echo "<td width=\"30%\">";
            echo "      <a href=\"/".$config_array->local_context_name."/index.php?/Results/view/".$csource->curie."/".$pageName."/1\" target=\"_blank\">".
                        $csource->source_name." (".$source_search_result[$csource->curie]->result->resultCount.")</a>";
            echo "</td>";
            echo "<td width=\"70%\">";
            echo $csource->description;
            echo "</td>";
            echo "</tr>";
        }
        echo "</tbody></table>";
        echo "<!------------------------End showing dataspace modals-------->"; 
        /*$blueRow = false;
        $blueColor= "style=\"background: #b8d1f3\"";
        $rowColor = "";
        foreach($categorySourceArray as $csource)
        {
            if(!isset($source_search_result[$csource->curie]) ||
                    $source_search_result[$csource->curie]->result->resultCount==0)
                continue;
            if($blueRow)
               {
                   $rowColor = $blueColor;
                   $blueRow = false;
               }
               else
               {
                   $rowColor = "";
                   $blueRow = true;
                   
               }
        echo "<div class=\"row\" ".$rowColor.">";
        echo "   <div class=\"col-md-3\">";

        echo "      <a href=\"/".$config_array->local_context_name."/index.php?/Results/view/".$csource->curie."/".$pageName."/1\" target=\"_blank\">".
                        $csource->source_name." (".$source_search_result[$csource->curie]->result->resultCount.")</a>";
        
        
        echo "   </div>";
        echo "    <div class=\"col-md-9\">";
        echo $csource->description;
        echo "    </div>";
        echo "</div>";
        
        } */
        
        
        
        
        /***********************End showing data****************************/
        echo "\n</p>";
        echo "\n</div>";
        echo "\n<div class=\"modal-footer\">";
        echo "\n<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>";
        echo "\n</div>";
        echo "\n</div>";
        echo "\n</div>";
        echo "\n</div>";
        
    }



?>









        





          