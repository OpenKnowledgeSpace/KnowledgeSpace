<?php







?>

    <br/>
    <br/>
    <br/>
    
    <div class="container">

        <div class="row">
            <div class="col-md-12">
              <?php
              
               $startItem = ($pageID-1)*20+1;
               $endItem = $startItem+19;
               if($endItem > $resultObj->result->resultCount)
                   $endItem = $resultObj->result->resultCount;
               
              
               
               
              
               echo $description;
               echo "<p></p>";
               echo "Displaying results ".$startItem." - ".$endItem." out of ".$resultObj->result->resultCount." total results.";
               ?>
            </div>
        </div>
       
        
        <div class="row">
            <div class="col-md-12">
<?php
            $resultCount = $resultObj->result->resultCount;
            $num = intval($resultCount/20);
            if($num > 0)
            {
                $remaining = $resultCount%20;
                if($remaining > 0)
                    $num = $num+1;
            }
            //echo "NUMBER OF Pages:".$num;
            echo "<center><ul class=\"pagination\">";
            
            if(($pageID-1) > 0)
            {
                
                 echo "<li><a href=\"/SciCrunchKS/index.php/Results/view/"
                .$sourceID."/".$term."/".($pageID-1).
                "\">&laquo;</a></li>";
                
                
            }
            else 
            {
               echo "<li class=\"disabled\"><a href=\"#\">&laquo;</a></li>";
            }
            
            $interval = 7;

            $startPage= 1;
            if($pageID-$interval > 0)
            {
                $startPage = $pageID - $interval;
            }
            
            if(($startPage + (2*$interval)) < $num)
            {
                $num = ($startPage + (2*$interval));
            }
            
            
            for($i=$startPage;$i<=$num;$i++)
            {
                if($i == $pageID)
                    echo "<li class=\"disabled\"><a href=\"#\">".$i."</a></li>";
                else
                    echo "<li><a href=\"/SciCrunchKS/index.php/Results/view/"
                    .$sourceID."/".$term."/".$i
                        ."\">".$i."</a></li>";
                
            }
            
            
            if(($pageID+1) <= $num)
            {
                echo "<li><a href=\"/SciCrunchKS/index.php/Results/view/"
                .$sourceID."/".$term."/".($pageID+1).
                "\">&raquo;</a></li>";
            
            }
            else
            {
                echo "<li class=\"disabled\"><a href=\"#\">&raquo;</a></li>";
            
            }    
            echo "</ul></center>";
?>
            </div>
        </div>        
         <div class="row">
         <div class="col-md-12">
             
 
                <table class="table sortable-theme-bootstrap" data-sortable>   
                <thead>
                <tr>
                <?php
                    $result = $resultObj->result;
                    foreach($result->result as $row )
                    {
                        foreach($row as $key => $val)
                        {
                            echo "<th>". $key. "</th>";
                            
                        }
                        break;
                    }

                ?>

                </tr>
                </thead>
                <?php
                    foreach($result->result as $row )
                    {
                        //echo "<tr valign=\"top\">\n";
                        echo "<tr>\n";
                        foreach($row as $key => $val)
                        {
                            if(strlen($val) > 400)
                                $val = substr ($val, 0,400)."...";
                            echo "<td>". $val. "</td>";
                            
                        }
                       
                        
                        echo "</tr>\n";
                    }
                
                ?>
                
                
                </thead>

                </table>
                
             
         </div>
         </div>
        
        
        <div class="row">
            <div class="col-md-12">
<?php
            $resultCount = $resultObj->result->resultCount;
            $num = intval($resultCount/20);
            if($num > 0)
            {
                $remaining = $resultCount%20;
                if($remaining > 0)
                    $num = $num+1;
            }
            //echo "NUMBER OF Pages:".$num;
            echo "<center><ul class=\"pagination\">";
            
            if(($pageID-1) > 0)
            {
                
                 echo "<li><a href=\"/SciCrunchKS/index.php/Results/view/"
                .$sourceID."/".$term."/".($pageID-1).
                "\">&laquo;</a></li>";
                
                
            }
            else 
            {
               echo "<li class=\"disabled\"><a href=\"#\">&laquo;</a></li>";
            }
            
            
            $startPage= 1;
            if($pageID-$interval > 0)
            {
                $startPage = $pageID - $interval;
            }
            
            if(($startPage + (2*$interval)) < $num)
            {
                $num = ($startPage + (2*$interval));
            }
            
            
            for($i=$startPage;$i<=$num;$i++)
            {
                if($i == $pageID)
                    echo "<li class=\"disabled\"><a href=\"#\">".$i."</a></li>";
                else
                    echo "<li><a href=\"/SciCrunchKS/index.php/Results/view/"
                    .$sourceID."/".$term."/".$i
                        ."\">".$i."</a></li>";
                
            }
            
            
            if(($pageID+1) <= $num)
            {
                echo "<li><a href=\"/SciCrunchKS/index.php/Results/view/"
                .$sourceID."/".$term."/".($pageID+1).
                "\">&raquo;</a></li>";
            
            }
            else
            {
                echo "<li class=\"disabled\"><a href=\"#\">&raquo;</a></li>";
            
            }    
            echo "</ul></center>";
?>
            </div>
        </div>
        
        
        
        
    </div>