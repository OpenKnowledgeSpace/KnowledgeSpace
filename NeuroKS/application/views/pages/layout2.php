
<script type="text/javascript">
    var Physiology_count = 0;//getCookie('Physiology_count');
    var Expression_count = 0;//getCookie('Expression_count');
    var Models_count = 0;//getCookie('Models_count');
    var Anatomy_count = 0;//getCookie('Anatomy_count');
    var Morphology_count = 0;//getCookie('Morphology_count');
</script>

<?php
//echo "-------testing------";
echo "\n<script type=\"text/javascript\">";
echo "\n var title = '".$title."';";
echo "\n var curie = '".$curie."';";
echo "\n var pageName = '".$pageName."';";
echo "\n</script>";
    

?>
<div id="loadingFade"></div>
<div id="loadingModal" style="min-height: 18%; max-height: 18%;width: 15%;">
            <img id="loader" src="http://www.itgeared.com/demo/images/loading.gif" />
</div>
<div class="row">
<div class="col-md-12" >

   
   
</div>
</div> 

<div class="container">
    <div class="row">
        <div class="col-md-12">
            <?php
        $tempTitle = str_replace("%20", " ", $title);
        $tempTitle = str_replace("%2c", ",", $tempTitle);
        echo "<h1>".ucfirst($tempTitle).":</h1>"; 

            ?>
        </div>
        <div  id="summaryOutter0"    class="collapse" >
        <div class="panel panel-grey">

        <div class="panel-heading">
             
            <h3 class="panel-title">
            <a class="pull-right" href="#" id="panel-fullscreen0" role="button" title="Toggle fullscreen" onclick="return ksTrackEvent('Link', 'Minimize', 'Minimize dataspace panel');">
            <i class="glyphicon glyphicon-resize-small"></i></a><span id="panel_title">Data space</span></h3>
								
        </div>

	 <div id="dataspace_panel0" class="panel-body" style="min-height: 23%; max-height: 23%;overflow-y: scroll">
        
        <!--    <div id="dataspace_panel0" class="panel-body" style="min-height: auto; max-height:auto;overflow-y: scroll">
        -->
        </div>
        </div> 
        </div>
    </div>
  
     
    <div class="row">
        
        
               
            <div  id="summaryOutter1"    class="collapse" >
            <div class="panel panel-grey">

        <div class="panel-heading">
             
            <h3 class="panel-title">
            <a class="pull-right" href="#" id="panel-fullscreen1" role="button" title="Toggle fullscreen" onclick="return ksTrackEvent('Link', 'Minimize', 'Minimize literature panel');">
            <i class="glyphicon glyphicon-resize-small"></i></a><span id="panel_title2">Literature</span></h3>
								
        </div>

            <div id="dataspace_panel1" class="panel-body" style="min-height: 100%; max-height: 100%;overflow-y: scroll">
                <?php   
                    // include "FullLiterature.php";
                ?>
                <?php   
                $c = "";
               
                if($config_array->enable_caching)
                {
                    
                    if($loadCache)
                    {
                      $c = @file_get_contents($cacheFullLitfile);
                      echo $c;
                      
                    }

                }
                
                if($config_array->enable_caching && !$loadCache)
                {
                    
                    ob_start();
                ///////////////////////////////////////////////////////
                    include "FullLiterature.php";
                    
                    $c = ob_get_contents();
                    file_put_contents($cacheFullLitfile, $c);
                    ob_end_clean();
                    echo $c;
                }
            ?>       
            </div>
            </div> 
            </div>
          
        
    </div>
    
    <div class="row">   
            <div  id="summaryOutter2"    class="collapse" >
                <div class="panel panel-grey">

                <div class="panel-heading">
             
                <h3 class="panel-title">
                <a class="pull-right" href="#" id="panel-fullscreen2" role="button" title="Toggle fullscreen" onclick="return ksTrackEvent('Link', 'Minimize', 'Minimize relation panel');">
                <i class="glyphicon glyphicon-resize-small"></i></a><span id="panel_title3">Relations</span></h3>
								
                </div>
 
                <div id="relation-panel" class="panel-body" style="min-height: 100%; max-height: 100%;overflow-y: scroll">

                    
                </div>
                </div>
            </div>
    </div>
    
    
<div class="row">

    <div id="leftCol"    class="col-md-8" >
        <div class="row">
            <div id="summaryOutter"    class="col-md-12" >
            <?php   
               include "innerWiki_1.php";
            ?>       
            </div>
            
            <div id="imageGalleryOutter"    class="col-md-12" >
            <?php   
                include "ImageGallery2.php";
            ?>  
            </div>
            
            <div  id="innerLiterature" class="col-md-12">
            <?php   
                $c = "";
               
                if($config_array->enable_caching)
                {
                    
                    if($loadCache)
                    {
                      $c = @file_get_contents($cacheLitfile);
                      echo $c;
                      
                    }

                }
                
                if($config_array->enable_caching && !$loadCache)
                {
                    
                    ob_start();
                ///////////////////////////////////////////////////////
                    include "innerLiteratureWithTabs.php";
                    
                    $c = ob_get_contents();
                    file_put_contents($cacheLitfile, $c);
                    ob_end_clean();
                    echo $c;
                }
            ?>       
        
            </div>
            
            <div id="lexionOutter"  class="col-md-12">
            <?php   
              include "innerLexicon_2.php";
            ?>       
            </div>
            
        </div>
    </div>
    <div id="rightCol"    class="col-md-4" >
        <div class="row">
 
            
            <div id="dataspaceOutter" class="col-md-12" >
                <div class="panel panel-grey">

                <div class="panel-heading">
             
                <h3 class="panel-title">
                <a class="pull-right" href="#" id="panel-fullscreen" role="button" title="Toggle fullscreen" onclick="return ksTrackEvent('Link', 'Expand', 'Expand Dataspace panel');">
                    <i class="glyphicon glyphicon-zoom-in"></i></a>Data space</h3>
								
                </div>

                <div id="dataspace_panel" class="panel-body" style="min-height: 50%; max-height: 19%;overflow-y: scroll">

    
                </div>
                <?php   
                    include "DataSpacePopup_1.php";
                ?>   
  
                </div>
   
    
        
            </div>
            <div id="innerRelation"  class="col-md-12">
            <?php   
             //include "innerRelations.php";
             include "innerRelationList.php";
            ?>       
            </div>
            <script type="text/javascript">loadButtons();</script> 
            
            
        </div>
    </div>
</div>
    
</div>
