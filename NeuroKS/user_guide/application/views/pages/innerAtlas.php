
    <div id="summaryOutter" class="panel panel-grey">
        <div class="panel-heading">
             
	<h3 class="panel-title"><a class="pull-right" href="#" id="summary-fullscreen" role="button" title="Toggle fullscreen" ></a>
        Altas</h3>
								
        </div>
    <div id="summary-panel"   class="panel-body" style="min-height: 75%; max-height: 75%;overflow-y: scroll">
     <?php 
            
   
            if(strpos($curie, 'MBA:') === 0)
            {
                $curie_value =  str_replace("MBA:", "", $curie);
                echo "<iframe width=\"100%\" height=\"100%\"  src=\"http://atlas.brain-map.org/atlas?atlas=1&structure=".$curie_value."\"></iframe>";
            }
      ?>  
        
        </div>
    </div>
