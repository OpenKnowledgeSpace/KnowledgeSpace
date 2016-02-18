
<!--  <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
-->
 <link rel="stylesheet" type="text/css" href="sckb.css"> 
 

<!--  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
  <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script> -->
   
    <script src="http://code.highcharts.com/highcharts.js"></script>
    <script src="http://code.highcharts.com/modules/exporting.js"></script>
  

<!--    <script src="/SciCrunchKS/application/views/js/highcharts.js"></script>
    <script src="/SciCrunchKS/application/views/js/exporting.js"></script>  -->
   
  <script type="text/javascript">
$(function () {
    $('#container').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Year by Number of Publications'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                text: 'Year'
            },
            min: 1976
           
        },
        yAxis: {
            title: {
                text: 'Number of publications'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: 'Year {point.x:.0f}: {point.y:.0f} publications'
        },

       /****
        * 
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        }, */
            
        plotOptions: {
            series: {
                   marker: {
                        enabled: true,
                        symbol: 'circle',
                        radius: 1,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                },    
                cursor: 'pointer',
                point: {
                    events: {
                        click: function(e) {
                                //alert(this.x);
                                //var url = this.options.url;
                                 //window.open(url);
                                 //var url = "https://neuinfo.org/mynif/search.php?q=neocortex%20pyramidal%20neuron&t=literature&r=20&yf="+e.currentTarget.x;
                                 //var url = "/SciCrunchKS/index.php/publications/view/<?php //echo $title;  ?>/"+e.currentTarget.x+"/1";
                                 var url = "/SciCrunchKS/index.php/publications/view/<?php echo $title;  ?>/"+this.x+"/1";
        
        
                                 window.open(url);
                            }
                        }
                    }
                }

        },
        
   
   
        

        series: [{
            name: "Publications",
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
             data: [
                 
            <?php
   

        //echo "-------count:".$count;
        $litIndex=0;
        foreach ($litMap as $key => $val) 
        {
            echo "[".$key.",". $val."]";
            
            if($litIndex !=  $count-1)
            {
                echo ", ";
            }
            echo "\n";
            
            $litIndex=$litIndex+1;
        }
    ?>     
            ]
        }]
    });
});

</script>



  <script type="text/javascript">
$(function () {
    $('#container2').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: 'Year by Number of Publications'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: {
                text: 'Year'
            },
            min: 1976
           
        },
        yAxis: {
            title: {
                text: 'Number of publications'
            },
            min: 0
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: 'Year {point.x:.0f}: {point.y:.0f} publications'
        },

       /****
        * 
        plotOptions: {
            spline: {
                marker: {
                    enabled: true
                }
            }
        }, */
            
        plotOptions: {
            series: {
                   marker: {
                        enabled: true,
                        symbol: 'circle',
                        radius: 1,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                },    
                cursor: 'pointer',
                point: {
                    events: {
                        click: function(e) {
                                //alert(this.x);
                                //var url = this.options.url;
                                 //window.open(url);
                                 //var url = "https://neuinfo.org/mynif/search.php?q=neocortex%20pyramidal%20neuron&t=literature&r=20&yf="+e.currentTarget.x;
                                 //var url = "/SciCrunchKS/index.php/publications/view/<?php //echo $title;  ?>/"+e.currentTarget.x+"/1";
                                 var url = "/SciCrunchKS/index.php/publications/view/<?php echo $title;  ?>/"+this.x+"/1";
        
        
                                 window.open(url);
                            }
                        }
                    }
                }

        },
        
   
   
        

        series: [{
            name: "Publications",
            // Define the data points. All series have a dummy year
            // of 1970/71 in order to be compared on the same x axis. Note
            // that in JavaScript, months start at 0 for January, 1 for February etc.
             data: [
                 
            <?php
   

        //echo "-------count:".$count;
        $litIndex=0;
        foreach ($litMap as $key => $val) 
        {
            echo "[".$key.",". $val."]";
            
            if($litIndex !=  $count-1)
            {
                echo ", ";
            }
            echo "\n";
            
            $litIndex=$litIndex+1;
        }
    ?>     
            ]
        }]
    });
});

</script>

<!--
                [1976, 2],
                [1978, 1],
                [1979, 1],
                [1980, 2],
                [1981, 6],
                [1982, 2],
                [1983, 4],
                [1984, 2],
                [1985, 2],
                [1986, 2],
                [1987, 5],
                [1988, 8],
                [1989, 6],
                [1990, 6],
                [1991, 6],
                [1992, 8],
                [1993, 16],
                [1994, 13],
                [1995, 12],
                [1996, 10],
                [1997, 17],
                [1998, 21],
                [1999, 19],
                [2000, 22],
                [2001, 18],
                [2002, 18],
                [2003, 23],
                [2004, 21],
                [2005, 23],
                [2006, 22],
                [2007, 24],
                [2008, 21],
                [2009, 32],
                [2010, 26],
                [2011, 29],
                [2012, 32],
                [2013, 28],
                [2014, 35],
                [2015, 30] -->
 <!-------------------Data space panel------------------------>
    
    <div id="literature-outter" class="panel panel-default">
    <div class="panel-heading">Literature
                <ul class="list-inline panel-actions">
                        <li><a href="#" id="literature-fullscreen" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
                </ul>
    </div>
  <!--  <div class="panel-body" style="min-height: 385; max-height: 385;overflow-y: scroll">
   -->        
    <div id="literature-panel" class="panel-body" style="min-height: 70%; max-height: 70%;overflow-y: scroll">
        
        
    <div id="container" style="min-width: 40%; height: 400px; margin: 0 auto"></div> 
    <br/>


        
    </div>
    </div>



