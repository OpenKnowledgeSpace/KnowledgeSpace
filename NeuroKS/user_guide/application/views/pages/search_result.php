<div class="container">
<div class="row">
<div class="col-md-12" >
    <?php 
        
    
        if(!is_null($keywords))
        {
            $keywords = str_replace("%20", " ", $keywords);
        }
        echo "<br/>Search for \"".$keywords."\"";
        if(!is_null($searchResult))
        {
            echo "<br/>".count($searchResult). " results";
        }
        else 
        {
            echo "<br/>Zero results";
        }
    ?>

</div>
</div>

<div class="row">
<div class="col-md-12" >
    <form action="/<?php echo($config_array->local_context_name); ?>/index.php/Search" method="post"> 
    <br/>
<div class="input-group animated fadeInDown">
<input name="keywords" type="text" class="form-control" placeholder="Search" value="<?php
    echo $keywords;
?>">
<span class="input-group-btn">
<button class="btn-u btn-u-blue" type="submit">Go</button>
</span>
</div>
</form>
</div>
</div>
<?php //echo validation_errors(); ?>
<?php
    //echo "search result...";
    //var_dump($searchResult);
    if(!is_null($searchResult))
    {
        $count = count($searchResult);
        if($count > 0)
        {
            echo "<table class=\"table table-striped sortable-theme-bootstrap\" data-sortable>";   
            echo "<thead>";
            echo "<tr>";
            echo "<th class=\"col-md-2\">ID</th>";
            
            echo "<th class=\"col-md-2\">Labels</th>";
            echo "<th class=\"col-md-2\">Categories</th>";
            echo "<th class=\"col-md-6\">Definitions</th>";
            echo "</tr>";
            echo "</thead><tbody>";
        }
    
                    //$unique = array();
                    foreach($searchResult as  $row )
                    {
                        /*if(isset($unique[$row->curie]))
                            continue;
                        else
                            $unique[$row->curie] =$row->curie;*/
                        
                        echo "<tr>\n";
                        
                        echo "<td class=\"col-md-2\">". 
                                "<a href=\"/".$config_array->local_context_name."/index.php/pages/view/".$row->curie."\" target=\"_self\" >"
                                .$row->curie. "</a></td>";
                        
                        
                        echo "<td class=\"col-md-2\">". implode($row->labels,","). "</td>";
                        echo "<td class=\"col-md-2\">". implode($row->categories,","). "</td>";
                        echo "<td class=\"col-md-6\">". implode($row->definitions,","). "</td>";
                        echo "</tr>\n";
                    }
                
               
    
        
        echo "</tbody></table>";
    }
?>
</div>