<link rel="stylesheet" type="text/css" href="https://neuinfo.org/mynif/css/main.css"> 
<?php

        $litCount = 0;
        foreach($publications->result->publications as $row )
        {

                $litCount++;
                            

                     
        }

?>
<br/>
<br/>
    <div class="container">

        <div class="row">
            <div class="col-md-12">
    <?php
        //echo "<br/><br/>";
        //echo "Lit Count:".$litCount;
        $startItem = ($pageID-1)*20+1;
        $endItem = $startItem+19;
        if($endItem > $litCount)
            $endItem = $litCount;
        echo "<br/><br/>";
        echo "Displaying results ".$startItem." - ".$endItem." out of ".$litCount." total results.";

    
    
    ?>
                
            </div>
        </div>
        
        
        <div class="row">
            <div class="col-md-12">
<?php
            $resultCount = $litCount;
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
                
                 echo "<li><a href=\"/SciCrunchKS/index.php/publications/view/"
                .$term."/".$year."/".($pageID-1).
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
                    echo "<li><a href=\"/SciCrunchKS/index.php/publications/view/"
                    .$term."/".$year."/".$i
                        ."\">".$i."</a></li>";
                
            }
            
            
            if(($pageID+1) <= $num)
            {
                echo "<li><a href=\"/SciCrunchKS/index.php/publications/view/"
                .$term."/".$year."/".($pageID+1).
                "\">&raquo;</a></li>";
            
            }
            else
            {
                echo "<li class=\"disabled\"><a href=\"#\">&raquo;</a></li>";
            
            }    
            echo "</ul></center>";
?>
            </div>
        
        
 <?php
 
        $startPoint = ($pageID-1)*20+1;
        $endPoint = $pageID*20;
        $i= 1;
        foreach($publications->result->publications as $row )
        {
            if($i < $startPoint)
            {
                $i++;
                continue;
            }
            
            if($i > $endPoint)
                break;
            
            echo "<div class=\"row\">";
            echo "  <div class=\"col-md-12\">";
            
            echo "<u><a  style=\"font-size:16\"  target=\"_blank\" href=\"http://www.ncbi.nlm.nih.gov/pubmed?term=". 
                    $row->pmid."\">".$row->title."</a></u><br/>";
            
            echo "<span style=\"color:green\">";   
            if(count($row->authors) > 0)
                echo $row->authors[0]." - ";
            echo $row->journal."<br/>";
            echo "</span>";
            
            echo "<span style=\"color:green\">";   
            echo $row->month."-".$row->day."-".$row->year."<br/>";
            echo "</span>";
            echo $row->abstract."<br/>";
            echo "<span style=\"color:brown\">";   
            echo "PMID:".$row->pmid;
            echo "</span>";
            echo "  </div>";
            echo "</div><br/>";
            
        }
 
 
 
 
 ?>
        
        
    </div>
