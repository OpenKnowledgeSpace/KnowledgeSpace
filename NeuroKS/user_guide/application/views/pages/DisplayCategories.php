<div class="container">
    <div class="row">
        <div class="col-md-12">
<!-- Tab v1 -->
           <div class="headline"><h2>Categories</h2></div>
					<div class="tab-v1">
						<ul class="nav nav-tabs">
							<li class="active"><a href="#home" data-toggle="tab">Organism</a></li>
							<li><a href="#profile" data-toggle="tab">Disease</a></li>
							<li><a href="#messages" data-toggle="tab">Anatomical</a></li>
							<li><a href="#settings" data-toggle="tab">Technique</a></li>
                                                        <li><a href="#biological_process" data-toggle="tab">Biological process</a></li>
                                                        <li><a href="#subcellular" data-toggle="tab">Subcellular</a></li>
                                                        <li><a href="#quality" data-toggle="tab">Quality</a></li>
                                                        <li><a href="#institution" data-toggle="tab">Institution</a></li>
                                                        <li><a href="#resource" data-toggle="tab">Resource</a></li>
						</ul>
						<div class="tab-content">
							<div class="tab-pane fade in active" id="home">
                                                        <?php
                                                            include_once 'categories/organism.php';
                                                        ?>
							</div>
							<div class="tab-pane fade in" id="profile">
                                                        <?php
                                                            include_once 'categories/disease.php';
                                                        ?>
                                                        </div>
							<div class="tab-pane fade in" id="messages">
                                                        <?php
                                                            include_once 'categories/anatomical.php';
                                                        ?>
                                                        </div>
							<div class="tab-pane fade in" id="settings">
                                                        <?php
                                                            include_once 'categories/technique.php';
                                                        ?>
                                                        </div>
                                                        <div class="tab-pane fade in" id="biological_process">
                                                        <?php
                                                            include_once 'categories/biological_process.php';
                                                        ?>
                                                        </div>
                                                        <div class="tab-pane fade in" id="subcellular">
                                                        <?php
                                                            include_once 'categories/subcellular.php';
                                                        ?>
                                                        </div>
                                                        <div class="tab-pane fade in" id="quality">
                                                        <?php
                                                            include_once 'categories/quality.php';
                                                        ?>
                                                        </div>
                                                        <div class="tab-pane fade in" id="institution">
                                                        <?php
                                                            include_once 'categories/institution.php';
                                                        ?>
                                                        </div>
                                                        <div class="tab-pane fade in" id="resource">
                                                        <?php
                                                            include_once 'categories/resource.php';
                                                        ?>
                                                        </div>
                                                        
						</div>
					</div>
					<!-- End Tab v1 -->
            </div>
    </div>
</div>