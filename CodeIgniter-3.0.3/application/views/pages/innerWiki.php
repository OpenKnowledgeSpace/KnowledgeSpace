
    <div class="panel panel-default">
        <div class="panel-heading" style="min-height: 80; max-height: 80"><h3><?php echo "$title";  ?></h3>
                    <ul class="list-inline panel-actions">
                        <li><a href="#" id="summary-fullscreen" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
                    </ul>
        </div>
    <div id="summary-panel"   class="panel-body" style="min-height: 50%; max-height: 50%;overflow-y: scroll">
    <!-- <div class="panel-body" style="min-height: 300; max-height: 300;overflow-y: scroll">
       -->
        
        <!-- Principal neuron of the cerebral cortex (not including hippocampus or olfactory cortex). The pyramidal cell of the neocortex is located in layers 2-3 and 5-6, has a pyramidal-shaped cell body which gives off a number of laterally-directed basal dendrites and usually a single apical dendrite which ascends to branch and terminate in layer 1; these dendrites are covered in dendritic spines. -->

        <?php

        if(isset($description) &&  !is_null($description))
        {
            echo "<b>Description</b>:<br/>";
            echo $description;
        }
        else if(isset($definition) && !is_null($definition))
        {
            echo "<b>Definition</b>:<br/>";
            echo $definition;
        }
        else
        {
            echo "No description or definition yet.";
        }    
        
        
           // $content = getDescriptionByCurie("NIFCELL:sao2128417084");
           // echo $content;
        ?>
    <!-- <br/>
    <br/>
    <b>Features</b>:
    <br/>

    <p>
    <ul>    
        <li>Triangular shaped cell body after which the neuron is named.</li> 
        <li>Large apical <a href="#">dendrite</a>,</li> 
        <li>Multiple basal dendrites</li> 
        <li>High density of <a href="#">dendritic spines</a>.</li> 
    </ul>
    </p>

Neurotransmitter:  <a href="#">Glutamate</a>
<br/>
Key molecules:  <a href="#">AMPA receptor</a>
<br/>
Organisms:  <a href="#">Mammal</a>   -->
    </div>
    </div>

