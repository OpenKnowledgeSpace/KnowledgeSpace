
    <br/>
    <br/>
    <br/>
    
    <div class="container">

        <div class="row">
            <div class="col-md-12">
                
<?php
    //echo "search result...";
    //var_dump($searchResult);
    if(!is_null($termObj))
    {
        $count = count($termObj);
        if($count > 0)
        {
            echo "<table class=\"table table-striped sortable-theme-bootstrap\" data-sortable>";   
            echo "<thead>";
            echo "<tr>";
            echo "<th>ID</th>";
            
            echo "<th>Labels</th>";
            echo "<th>Categories</th>";
            echo "<th>Definitions</th>";
            echo "</tr>";
            echo "</thead>";
        }
    
                    //$unique = array();
                    foreach($termObj as  $row )
                    {
                        /*if(isset($unique[$row->curie]))
                            continue;
                        else
                            $unique[$row->curie] =$row->curie;*/
                        
                        echo "<tr>\n";
                        
                        echo "<td class=\"col-md-2\">". 
                                "<a href=\"/".$config_array->local_context_name."/index.php/pages/view/".$row->curie."\" target=\"_self\" >"
                                .$row->curie. "</a></td>"; 
                        
                        echo "<td class=\"col-md-3\">". implode($row->labels,","). "</td>";
                        echo "<td class=\"col-md-3\">". implode($row->categories,","). "</td>";
                        echo "<td class=\"col-md-4\">". implode($row->definitions,","). "</td>";
                        echo "</tr>\n";
                    }
                
               
    
        
        echo "</table>";
    }
?>
            </div>
        </div>
    </div>
