<div class="tab-v1">
    <ul class="nav nav-tabs">
	<li id="lit3" class="active"><a href="#litContent3" data-toggle="tab" onclick="updateLitTab(3);">Most recent</a></li>
	<li id="lit4"><a href="#litContent4" data-toggle="tab" onclick="updateLitTab(4);">Year graph</a></li>
							
    </ul>
    <div class="tab-content">
	<!-- <div id="litContent3" class="tab-pane fade in active" id="full-most-recent"> -->
         <div id="litContent3" class="tab-pane fade in active" >   
        <?php
        if($latestResult->response->numFound == 0 )
        {
            echo "<div class=\"row\">";
            echo "No publications found!";
            echo "</div><br/>";
        }
        
        
        foreach($latestResult->response->docs as $row )
        {
            echo "<div class=\"row\">";
            echo "  <div class=\"col-md-12\">";
            
            echo "<u><a  style=\"font-size:16\"  target=\"_blank\" href=\"http://www.ncbi.nlm.nih.gov/pubmed?term=". 
                    $row->pmid."\">".$row->title."</a></u><br/>";
            
            echo "<span style=\"color:green\">";   
            if(count($row->author) > 0)
                echo $row->author[0]." - ";
            echo $row->journal."<br/>";
            echo "</span>";
            
            echo "<span style=\"color:green\">";   
            echo $row->month."-".$row->day."-".$row->year."<br/>";
            echo "</span>";
            //echo $row->abstract."<br/>";
            echo "<span style=\"color:brown\">";   
            echo "PMID:".$row->pmid;
            echo "</span>";
            echo "  </div>";
            echo "</div><br/>";

        }
        if($latestResult->response->numFound > 0 )
        {
            echo "<div class=\"row\">";
            
            echo "<center><a  style=\"font-size:16\"  target=\"_blank\" href=\""."/index.php/LatestPublications/view/".$title."/1\">See more</a></center>";

            echo "</div><br/>";
        }
?>  
        </div>
        
<?php
    if($latestResult->response->numFound > 0 )
    {
?>
        
	<!-- <div id="litContent4" class="tab-pane fade in" id="full-year-graph"> -->
        <div id="litContent4" class="tab-pane fade in">
            <div class="row">
                <div  id="litContent2Row2"   class="col-md-12" >

            <!-- <div id="container2" style="min-width: auto; height: 380px; margin: 0 auto"></div> -->
                 <center><img src="/img/loading_spinner.gif" alt="Loading" height="150" width="150"></center>
                </div>
            </div>
            <br/>
	</div>
<?php } ?>
							
    </div>
    </div>
    <!-- End Tab v1 -->
   



