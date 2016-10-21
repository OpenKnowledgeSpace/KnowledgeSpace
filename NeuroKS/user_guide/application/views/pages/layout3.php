
<script type="text/javascript">
    var Physiology_count = 0;//getCookie('Physiology_count');
    var Expression_count = 0;//getCookie('Expression_count');
    var Models_count = 0;//getCookie('Models_count');
    var Anatomy_count = 0;//getCookie('Anatomy_count');
    var Morphology_count = 0;//getCookie('Morphology_count');
</script>

<?php

    require_once 'ViewUtil.php';
    $vutil = new ViewUtil();
    $template_array = $vutil->getLayoutArray($layout_array,$category);
?>


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
            
        // echo "----".$original_name."----";  
            
        /*$pos = strpos($original_name,":");
        $prefix = "default";
        if($pos > 0)
        {
            $prefix = substr($original_name, 0, $pos);
            $prefix = strtolower($prefix);
        }
        echo  "----".$prefix."----"; */
        //echo "---CAT:---".$category."-------";
            
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
                include "fullLiteratureSmartLoading.php";
                /* if($config_array->enable_caching)
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
                    include "FullLiterature.php";
                    
                    $c = ob_get_contents();
                    file_put_contents($cacheFullLitfile, $c);
                    ob_end_clean();
                    echo $c;
                } */
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
            <?php 
                if(strpos($curie, 'MBA:') === 0)
                {
                    
             ?>
            <div id="atlasOutter"    class="col-md-12" >
            <?php
                 include "innerAtlas.php";
            ?>
            </div>
            <?php
                }
            ?>
            <div id="summaryOutter"    class="col-md-12" >
            <?php 
                
               if(!is_null($template_array) && in_array("summary", $template_array))
                include "innerWiki_1.php";
            ?>       
            </div>
            
            <div id="imageGalleryOutter"    class="col-md-12" >
            <?php 
            
                if(!is_null($template_array) && in_array("image_gallery", $template_array))
                    include "ImageGallery2.php";
            ?>  
            </div>
            
            <div  id="innerLiterature" class="col-md-12">
            <?php   
                $c = "";
                if(!is_null($template_array) && in_array("literature", $template_array))
                    include "literatureSmartLoading.php";
                
            ?>        
                <!-- <script type="text/javascript">
                var litURL = "http://localhost/NeuroKS/index.php/LiteratureOnly/view/<?php echo $curie; ?>";
                alert(litURL);
                loadLiteratureJS(litURL);
                </script> -->
                
        
            </div>
            
            <div id="lexionOutter"  class="col-md-12">
            <?php   
            
                if(!is_null($template_array) && in_array("lexicon", $template_array))
                    include "innerLexicon_2.php";
            ?>       
            </div>
            
        </div>
    </div>
    <div id="rightCol"    class="col-md-4" >
        <div class="row">
 
            <?php 
                    if(!is_null($template_array) && in_array("data_space", $template_array))
                    {
            ?>
            <div id="dataspaceOutter" class="col-md-12" >
                <div class="panel panel-grey">

                <div class="panel-heading">
             
                <h3 class="panel-title">
                <a class="pull-right" href="#" id="panel-fullscreen" role="button" title="Toggle fullscreen" onclick="return ksTrackEvent('Link', 'Expand', 'Expand Dataspace panel');">
                    <i class="glyphicon glyphicon-zoom-in"></i></a>Data space</h3>
								
                </div>

                <div id="dataspace_panel" class="panel-body" style="min-height: 50%; max-height: 19%;overflow-y: scroll"></div>
               
                <?php   
                    
                        include "DataSpacePopup_1.php";
                ?>   
  
                </div>
            </div>
            <?php
                }
            ?>
            <div id="innerRelation"  class="col-md-12">
            <?php   
             //include "innerRelations.php";
            if(!is_null($template_array) && in_array("relations", $template_array))
             include "innerRelationList.php";
            ?>       
            </div>
            <script type="text/javascript">loadButtons();</script> 
            
            
        </div>
    </div>
</div>
    
</div>
