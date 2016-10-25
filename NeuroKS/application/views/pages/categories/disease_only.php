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
                                                    <div class="tab-pane fade in active" id="disease">
                                                        <?php
                                                            include_once 'disease.php';
                                                        ?>
                                                    </div>
                                                </div>
					</div>
					<!-- End Tab v1 -->
            </div>
    </div>
</div>
