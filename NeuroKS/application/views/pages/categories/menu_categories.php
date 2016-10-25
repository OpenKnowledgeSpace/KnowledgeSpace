<?php
    $organism = "";
    $disease = "";
    $anatomical = "";
    $technique = "";
    $biological_process = "";
    $subcellular = "";
    $quality = "";
    $institution = "";
    $resource = "";
    if(strcmp($category,"organism")==0)
         $organism = "active";
    else if(strcmp($category,"disease")==0)
         $disease = "active";
    else if(strcmp($category,"anatomical")==0)
         $anatomical = "active";
    else if(strcmp($category,"technique")==0)
         $technique = "active";
    else if(strcmp($category,"biological_process")==0)
         $biological_process = "active";
    else if(strcmp($category,"subcellular")==0)
         $subcellular = "active";
    else if(strcmp($category,"quality")==0)
         $quality = "active";
    else if(strcmp($category,"institution")==0)
         $institution = "active";
    else if(strcmp($category,"resource")==0)
         $resource = "active";
    
    
?>


      <li class="<?php echo $organism; ?>"><a href="/NeuroKS/index.php/Categories/view/organism">Organism</a></li>
      <li class="<?php echo $disease;  ?>"><a href="/NeuroKS/index.php/Categories/view/disease">Disease</a></li>
      <li class="<?php echo $anatomical; ?>"><a href="/NeuroKS/index.php/Categories/view/anatomical">Anatomical</a></li>
      <li class="<?php echo $technique; ?>"><a href="/NeuroKS/index.php/Categories/view/technique">Technique</a></li>
      <li class="<?php echo $biological_process; ?>"><a href="/NeuroKS/index.php/Categories/view/biological_process">Biological Process</a></li>
      <li class="<?php echo $subcellular; ?>"><a href="/NeuroKS/index.php/Categories/view/subcellular">Subcellular</a></li>
      <li class="<?php echo $quality; ?>"><a href="/NeuroKS/index.php/Categories/view/quality">Quality</a></li>
      <li class="<?php echo $institution; ?>"><a href="/NeuroKS/index.php/Categories/view/institution">Institution</a></li>
      <li class="<?php echo $resource; ?>"><a href="/NeuroKS/index.php/Categories/view/resource">Resource</a></li>
                                                        <!-- <li><a href="#messages" data-toggle="tab">Anatomical</a></li>
							<li><a href="#settings" data-toggle="tab">Technique</a></li>
                                                        <li><a href="#biological_process" data-toggle="tab">Biological process</a></li>
                                                        <li><a href="#subcellular" data-toggle="tab">Subcellular</a></li>
                                                        <li><a href="#quality" data-toggle="tab">Quality</a></li>
                                                        <li><a href="#institution" data-toggle="tab">Institution</a></li>
                                                        <li><a href="#resource" data-toggle="tab">Resource</a></li> -->