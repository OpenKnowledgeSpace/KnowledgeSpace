<div class="container">
    <div class="row">
        <div class="col-md-12">
<!-- Tab v1 -->
           <div class="headline"><h2>Categories</h2></div>
					<div class="tab-v1">
						<ul class="nav nav-tabs">
							<?php include_once 'menu_categories.php' ?>
						</ul>
						<div class="tab-content">
                                                    <div class="tab-pane fade in active" id="<?php echo $category; ?>">
                                                        <?php
                                                            if(strcmp($category, "organism") ==0 )
                                                                include_once 'organism.php';
                                                            else if(strcmp($category, "disease") ==0 )
                                                                include_once 'disease.php';   
                                                            else if(strcmp($category, "anatomical") ==0 )
                                                                include_once 'anatomical.php';   
                                                            else if(strcmp($category, "technique") ==0 )
                                                                include_once 'technique.php';   
                                                            else if(strcmp($category, "biological_process") ==0 )
                                                                include_once 'biological_process.php';   
                                                            else if(strcmp($category, "subcellular") ==0 )
                                                                include_once 'subcellular.php'; 
                                                            else if(strcmp($category, "quality") ==0 )
                                                                include_once 'quality.php'; 
                                                            else if(strcmp($category, "institution") ==0 )
                                                                include_once 'institution.php'; 
                                                            else if(strcmp($category, "resource") ==0 )
                                                                include_once 'resource.php'; 
                                                        ?>
                                                    </div>
                                                </div>
					</div>
					<!-- End Tab v1 -->
            </div>
    </div>
</div>
