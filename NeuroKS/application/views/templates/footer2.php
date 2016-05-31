<!--=== Footer Version 1 ===-->
		<div class="footer-v1">
			<div class="footer">
				<div class="container">
					<div class="row">
						<!-- About -->
						<div class="col-md-9 md-margin-bottom-40">
                                                                           
                          <div class="headline"><h2>Partners</h2></div>                          
			<a href="http://bluebrain.epfl.ch" target="_blank">
                        <img src="/Knowledge_Space_files/BBPLogo-1.png" width="100" height="70"></a>   
                        <a href="https://www.humanbrainproject.eu/" target="_blank">
                        <img src="/Knowledge_Space_files/human-brain-project.8f47bd2d109f.jpg">
                    </a>

                         <a href="http://www.incf.org/" target="_blank">
                        <img src="/Knowledge_Space_files/INCFgrayofficiallogoshort.ee55750c46e8.png">
                    </a>

                        <a href="http://www.neuinfo.org/" target="_blank">
                            <img width="120px" height="auto" src="/Knowledge_Space_files/nif-logo.png">
                    </a>
                          <br/><br/>
                          <span id="loadTime"></span>  
						</div>
                                                
                                               

						<!-- Address -->
						<div class="col-md-3 map-img md-margin-bottom-40">
							<div class="headline"><h2>Contact Us</h2></div>
							<address class="md-margin-bottom-40">
								Hosted at the University of California, San Diego <br />
								9500 Gilman Drive <br />
								La Jolla, CA 92093 <br />
								
								Email: <a href="mailto:wwong@ncmir.ucsd.edu" class="">wwong@ncmir.ucsd.edu</a>
							</address>
						</div><!--/col-md-3-->
						<!-- End Address -->
					</div>
				</div>
			</div><!--/footer-->
                        
</div><!--/wrapper-->

</body>

<script type="text/javascript">
             /*$(document).ready(function() {
                 console.log("Time until DOMready: ", Date.now()-timerStart);
             });*/
             $(window).load(function() {
                 var d = new Date();
                 var loadTime = (d.getTime()-timerStart)/1000;
                 document.getElementById("loadTime").innerHTML = "<h6>Page load time: "+loadTime+" seconds</h6>";
             });
</script>