function drawLiterature(mydata,contextName,title) 
{
    //alert("drawLiterature:"+mydata);
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

                                 var url = "/index.php/publications/view/"+title+"/"+this.x+"/1";
        
        
                                 window.open(url);
                            }
                        }
                    }
                }

        },
        
   
   
        

        series: [{
            name: "Publications",
            data: mydata
        }]
    });
}

function drawLiterature2(mydata,contextName,title) 
{
    //alert("drawLiterature:"+mydata);
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

                                 var url = "/index.php/publications/view/"+title+"/"+this.x+"/1";
        
        
                                 window.open(url);
                            }
                        }
                    }
                }

        },
        
   
   
        

        series: [{
            name: "Publications",
            data: mydata
        }]
    });
}





function loadLiteratureJS(theUrl,contextName,title)
{
    //alert(theUrl);
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var text = xmlhttp.responseText;
            //alert(text);
            //document.getElementById("literature-loading").innerHTML=xmlhttp.responseText+
            //        "";
            //drawLiterature(mydata);
            var text = text.trim(); 
            var myData = text.split(",");
            
            //alert("Count:"+myData.length);
            var mySeries = [];
            var testing = "";
            for (var i = 0; i < myData.length; i++) 
            {
                //testing = testing+"<br/>"+myData[i]+","+ myData[i + 1];
                mySeries.push([Number(myData[i]), Number(myData[i + 1])]);
                i++
            }
            
            
           /* for(var i=0;i<mySeries.length;i++)
            {
                var temp =mySeries[i];
                testing = testing+"<br/>\n"+temp[0]+","+temp[1];
            }
            alert("testing:"+testing);
            
            
            alert("Count:"+mySeries.length); */
            document.getElementById("litContent2Row").innerHTML=
                    "<div id=\"container\" style=\"min-width: auto; height: 50%; margin: 0 auto\"></div>";
            
            document.getElementById("litContent2Row2").innerHTML=
            "<div id=\"container2\" style=\"min-width: auto; height: 380px; margin: 0 auto\"></div>";
            
            drawLiterature(mySeries,contextName,title);
            drawLiterature2(mySeries,contextName,title);
            /*var chart = $('#container').highcharts();
            chart.series[0].setData(mySeries);*/
            // chart.series[0].setData([[1978,1],[1979,2]]);
            //var chart=$("#container").highcharts();
            //chart.series[0].setData(mySeries);
            
            /*var index=$("#container").data('highchartsChart');
            var chart=Highcharts.charts[index];
            //alert(chart);
            chart.series[0].setData(mySeries,true);*/
            
        }
    }
    xmlhttp.open("GET", theUrl, true );
    xmlhttp.send();    
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}



/**
 * Tracking the UI event on webpages.
 * 
 * @param {type} category
 * @param {type} action
 * @param {type} value
 * @returns {Boolean}
 */
function ksTrackEvent(category, action, value)
{
    //alert("Category:"+category+"----action:"+action+"------value:"+value);
    ga('send', 'event', category, action, value);
    //return true;
    return true;
}


function changeDataspaceMenuHeight(tab)
{
    //alert(tab);
    dataspace_selected_tab = tab;
    var d_height = $("#menu"+tab).height()+200;
    document.getElementById("dataspace_panel0").setAttribute("style", "min-height: "+d_height+"; max-height: "+d_height+";overflow-y: scroll"); 

    
}
$(document).ready(function () 
{
    
            //Toggle fullscreen
    $("#panel-fullscreen0").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);

            
            
            try{document.getElementById("summaryOutter0").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter1").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter2").className="collapse";}catch(err) {}
            try{document.getElementById("dataspaceOutter").className="col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("summaryOutter").className = "col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("innerLiterature").className = "col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("innerRelation").className="col-md-12 row_no_gap";}catch(err) {}
        
        
        
            try{document.getElementById("dataspace_panel0").innerHTML ="";}catch(err) {}
            loadButtons();
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
        
    });
    
    
    $("#panel-fullscreen1").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);

            
            /*document.getElementById("summaryOutter0").className="collapse";
            document.getElementById("summaryOutter1").className="collapse";
            document.getElementById("summaryOutter2").className="collapse";
            document.getElementById("dataspaceOutter").className="col-md-12 row_no_gap";
            document.getElementById("summaryOutter").className = "col-md-12 row_no_gap";
            document.getElementById("innerLiterature").className = "col-md-12 row_no_gap";*/
            
            try{document.getElementById("summaryOutter0").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter1").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter2").className="collapse";}catch(err) {}
            try{document.getElementById("dataspaceOutter").className="col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("summaryOutter").className = "col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("innerLiterature").className = "col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("innerRelation").className="col-md-12 row_no_gap";}catch(err) {}

            try{document.getElementById("dataspace_panel0").innerHTML ="";}catch(err) {}
            loadButtons();
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
        
    });
    
    
    $("#panel-fullscreen2").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);

            try{document.getElementById("innerRelation").className="col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("summaryOutter0").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter1").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter2").className="collapse";}catch(err) {}
            try{document.getElementById("dataspaceOutter").className="col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("summaryOutter").className = "col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("innerLiterature").className = "col-md-12 row_no_gap";}catch(err) {}
            //document.getElementById("literature-outter").className = "panel panel-default";
            try{document.getElementById("dataspace_panel0").innerHTML ="";}catch(err) {}
            loadButtons();
            expandTree=false;
            document.getElementById("relation-panel-1").innerHTML =document.getElementById("relation-panel").innerHTML;
            document.getElementById("relation-panel").innerHTML ="";
             $('.tree li').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) { 
                
                var treeIds = e.target.id.split(',');
                if(treeIds.length == 2 && !treeIds[0].startsWith("http:"))
                {
                    var treeURL = "/index.php/Tree_with_tabs2/view/"+treeIds[0]+"/false/"+treeIds[1]+"/"+treeTabID; 
                    //alert("fullscreen_layout:"+treeURL);
                    loadTree(treeURL);
                }
                else if(treeIds.length == 2)
                {
                    alert("Unable to load:"+treeIds[0]);
                }
    
            });
            
            
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
        
    });
    
    
    /*$("#literature-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        
        
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            
            //document.getElementById("dataspace_panel").innerHTML = "Full panel!";
            document.getElementById("literature-panel").setAttribute("style", "min-height: 100%; max-height: 100%");
            window.location.hash = '#literature';
            setCookie('screen_state','literature',365);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            
            //document.getElementById("dataspace_panel").innerHTML = "Minimized panel!";
            document.getElementById("literature-panel").setAttribute("style", "min-height: 70%; max-height: 70%;overflow-y: scroll");
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
            
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');
        
        
        
    });*/
    $("#literature-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        
            try{document.getElementById("summaryOutter0").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter1").className="col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("summaryOutter2").className="collapse";}catch(err) {}
            try{document.getElementById("dataspaceOutter").className="col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("summaryOutter").className = "col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("innerLiterature").className = "collapse";}catch(err) {}
            try{document.getElementById("innerRelation").className="col-md-12 row_no_gap";}catch(err) {}
        
        //document.getElementById("literature-outter").className = "collapse";
        /*document.getElementById("innerLiterature").className = "collapse";
        document.getElementById("summaryOutter0").className = "collapse";
        document.getElementById("summaryOutter1").className = "col-md-12 row_no_gap";
        document.getElementById("dataspaceOutter").className = "col-md-12 row_no_gap";*/
        
       //var title = getCookie('title');
        //alert(title);
        document.getElementById("panel_title2").innerHTML= "Literature";
        //document.getElementById("dataspace_panel0").innerHTML = document.getElementById("literature-panel").innerHTML;
                //" <div id=\"container2\" style=\"min-width: 40%; height: 400px; margin: 0 auto\"></div> ";
         
        //alert(document.getElementById("literature-panel").innerHTML);
        
        
        document.getElementById("dataspace_panel0").setAttribute("style", "min-height:100%; max-height:100%;overflow-y: scroll"); 
        
        //var curie = getCookie('curie');
        //var pageName = getCookie('pageName'); 
        //var html = httpGet("/index.php/Literature/view/"+pageName);
                
        window.location.hash = '#literature';
        setCookie('screen_state','literature',365); 
        $('html,body').scrollTop(0);
        
    });
    
    
    
    
    $("#relation-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
            try{document.getElementById("summaryOutter0").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter1").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter2").className="col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("dataspaceOutter").className="col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("summaryOutter").className = "col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("innerLiterature").className = "col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("innerRelation").className="collapse";}catch(err) {}
        
        
        
        //var title = getCookie('title');
        document.getElementById("panel_title3").innerHTML= "Relations";
        document.getElementById("relation-panel").innerHTML = document.getElementById("relation-panel-1").innerHTML;
        document.getElementById("relation-panel-1").innerHTML="";

        /* $('.tree li').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) { 
                var treeIds = e.target.id.split(',');
                var treeURL="/index.php/Tree/view/"+treeIds[0]+"/false/"+treeIds[1];
                //alert(treeURL);
                loadTree(treeURL);
    
            });*/
        expandTree=true;
        $('.tree li').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) { 
                //alert(e.target.id);
                var treeIds = e.target.id.split(',');
                //alert(treeIds.length);
                if(treeIds.length == 2 && !treeIds[0].startsWith("http:"))
                {
                
                    var treeURL = "/index.php/Tree_with_tabs2/view/"+treeIds[0]+"/false/"+treeIds[1]+"/"+treeTabID; 
                    //alert("relation-fullscreen:"+treeURL);
                    loadTree(treeURL);
                }
                else if(treeIds.length == 2)
                {
                    alert("Unable to expand:"+treeIds[0]);
                }
    
            });


        window.location.hash = '#relations';
        setCookie('screen_state','relations',365); 
        $('html,body').scrollTop(0);
        
        
    });
    
    /* $("#relation-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        
        
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            
            //document.getElementById("dataspace_panel").innerHTML = "Full panel!";
            document.getElementById("relation-panel").setAttribute("style", "min-height: 100%; max-height: 100%");
            window.location.hash = '#relations';
            setCookie('screen_state','relations',365);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            
            //document.getElementById("dataspace_panel").innerHTML = "Minimized panel!";
            document.getElementById("relation-panel").setAttribute("style", "min-height: 35%; max-height: 35%;overflow-y: scroll");
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
            
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');
        
        
        
    }); */
    
    /*
    $("#summary-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            document.getElementById("summary-panel").setAttribute("style", "min-height: 100%; max-height: 100%");
            window.location.hash = '#definition';
            setCookie('screen_state','definition',365);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
            document.getElementById("summary-panel").setAttribute("style", "min-height: 50%; max-height: 50%;overflow-y: scroll");
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
            
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');
        
        
        
    }); */
    $("#summary-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        /*document.getElementById("summaryOutter").className = "collapse";
        document.getElementById("summaryOutter0").className = "col-md-12 row_no_gap";      
        document.getElementById("dataspaceOutter").className = "col-md-12 row_no_gap";*/
            try{document.getElementById("summaryOutter0").className="col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("summaryOutter1").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter2").className="collapse";}catch(err) {}
            try{document.getElementById("dataspaceOutter").className="col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("summaryOutter").className = "collapse";}catch(err) {}
            try{document.getElementById("innerLiterature").className = "col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("innerRelation").className="col-md-12 row_no_gap";}catch(err) {}
        
        
        
        
        //var title = getCookie('title');
        //var title = getCookie(window.location.href+'-title');
        
        
        document.getElementById("panel_title").innerHTML= " Summary";
        document.getElementById("dataspace_panel0").innerHTML = 
                document.getElementById("summary-panel").innerHTML;
        
        document.getElementById("dataspace_panel0").setAttribute("style", "min-height:100%; max-height:100%;overflow-y: scroll"); 
        
        //var curie = getCookie('curie');
        //var pageName = getCookie('pageName');
            
            
        window.location.hash = '#summary';
        setCookie('screen_state','summary',365);
        
    });
    
    

    
    //Toggle fullscreen
    $("#panel-fullscreen").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
        
        
        
    
        if ($this.children('i').hasClass('glyphicon-resize-full') ||
              $this.children('i').hasClass('glyphicon-zoom-in')  )
        {
            $('html,body').scrollTop(0);
            //$this.children('i').removeClass('glyphicon-resize-full');
            //$this.children('i').addClass('glyphicon-resize-small');
            

             //document.getElementById("summaryOutter0").className = "col-md-12 row_no_gap";
             //document.getElementById("dataspaceOutter").className = "collapse";
             
            try{document.getElementById("summaryOutter0").className="col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("summaryOutter1").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter2").className="collapse";}catch(err) {}
            try{document.getElementById("dataspaceOutter").className="collapse";}catch(err) {}
            try{document.getElementById("summaryOutter").className = "col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("innerLiterature").className = "col-md-12 row_no_gap";}catch(err) {}
            try{document.getElementById("innerRelation").className="col-md-12 row_no_gap";}catch(err) {}
             
             

             //document.getElementById("dataspace_panel0").innerHTML = document.getElementById("dataspace_panel").innerHTML;
             //var summaryOutter = document.getElementById("summaryOutter").innerHTML;
             //var dataspaceOutter = document.getElementById("dataspaceOutter").innerHTML;
             //document.getElementById("summaryOutter").innerHTML = dataspaceOutter;
             //document.getElementById("dataspaceOutter").innerHTML = summaryOutter;

            //document.getElementById("dataspace_panel0").setAttribute("style", "min-height: 400%; max-height: 400%;overflow-y: scroll");
            // var title = getCookie('title');
            document.getElementById("panel_title").innerHTML="Data space";
            //var curie = getCookie('curie');
            //var pageName = getCookie('pageName');
            
            
            //alert("/index.php/ViewAllData/view/"+pageName+"/0/0");
            pageName = pageName.replace("%2f","|");
            //alert(pageName);
            
            var html = httpGet("/index.php/ViewAllData/view/"+pageName+"/0/0");
            window.location.hash = '#dataspace';
            setCookie('screen_state','dataspace',365);
            
            dataspace_selected_tab = 0;
        }
        /* else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            
            alert("--------Minimize--------");
            //$this.children('i').removeClass('glyphicon-resize-small');
            //$this.children('i').addClass('glyphicon-resize-full');
            

            document.getElementById("summaryOutter0").className = "collapse";
            document.getElementById("dataspaceOutter").className = "col-md-12 row_no_gap";
            document.getElementById("summaryOutter0").innerHTML = ""; 
            
            //var summaryOutter = document.getElementById("summaryOutter").innerHTML;
            // var dataspaceOutter = document.getElementById("dataspaceOutter").innerHTML;
            // document.getElementById("summaryOutter").innerHTML = summaryOutter;
            // document.getElementById("dataspaceOutter").innerHTML = dataspaceOutter;
             
            document.getElementById("dataspace_panel").setAttribute("style", "min-height: 23%; max-height: 23%;overflow-y: scroll");
            
            loadButtons();
            history.pushState('', document.title, window.location.pathname);
            setCookie('screen_state','',365);
            
        }*/
        //$(this).closest('.panel').toggleClass('panel-fullscreen');
        
        
        
    });
});

function openModal() {
    
        document.body.style.cursor='wait';
        document.getElementById('loadingModal').style.display = 'block';
        document.getElementById('loadingFade').style.display = 'block';
}

function closeModal() 
{
    document.body.style.cursor='default';
    document.getElementById('loadingModal').style.display = 'none';
    document.getElementById('loadingFade').style.display = 'none';
}
function httpGet(theUrl)
{
     openModal();
            /*var target = document.getElementById('spinner');
            var spinner = new Spinner(opts).spin(target);
            spinner.spin(); 
            alert(spinner);*/
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            //alert(xmlhttp.responseText);
            //return xmlhttp.responseText;
            //spinner.stop();
            closeModal();
            //setTimeout(closeModal,5000);

            document.getElementById("dataspace_panel0").innerHTML=xmlhttp.responseText;
            
            var ks_selected_sources = getCookie('ks_selected_sources');
            ks_selected_sources = ks_selected_sources.replace(new RegExp("%2C", 'g'), ",");
            var sourceArray = ks_selected_sources.split(',');

            //alert(dataspace_selected_tab);
            //var height = 5000;
            
            //var height = 5000;
            //document.getElementById("dataspace_panel0").setAttribute("style", "min-height: "+height+"; max-height: "+height+";overflow-y: scroll"); 
            changeDataspaceMenuHeight(dataspace_selected_tab);
        }
    }
    xmlhttp.open("GET", theUrl, true );
    xmlhttp.send();    
}




function loadButtons()
{
    var json_str = getCookie('ks_selected_categories');
    json_str=json_str.replace(new RegExp("%2C", 'g'), ",");
    //alert("-----NEW JSON:"+json_str);
    var array = json_str.split(',');
    array.sort();
 
    var ks_selected_sources = getCookie('ks_selected_sources');
    ks_selected_sources = ks_selected_sources.replace(new RegExp("%2C", 'g'), ",");
    var sourceArray = ks_selected_sources.split(',');
    
    
    
    var html = "";
    var count = 0;
    
    
    
    if((array.indexOf("Physiology") > -1))
    {
     if(sourceArray.indexOf("nlx_151885-1") > -1)
     {
     count++;
     if(Physiology_count != null && Physiology_count > 0)
        html =  html+"\n<div class=\"row\"><center><button style=\"height:30px;width:150px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#Physiology_Modal\" onclick=\"return ksTrackEvent('Button', 'Modal', 'Physiology');\">Physiology ("+Physiology_count+")</button> </center></div><br/>";   
     else 
        html =  html+"\n<div class=\"row\"><center><button style=\"height:30px;width:150px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#Physiology_Modal\" disabled>Physiology ("+Physiology_count+")</button> </center></div><br/>";   

      }
    }    
        
    if((array.indexOf("Expression") > -1))
    {
        if(sourceArray.indexOf("nif-0000-00130-1") > -1)
        {
            count++;
            if(Expression_count != null && Expression_count > 0)
                html = html+"\n<div class=\"row\"><center><button style=\"height:30px;width:150px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#Expression_Modal\" onclick=\"return ksTrackEvent('Button', 'Modal', 'Expression');\">Expression ("+Expression_count+")</button></center></div><br/>";    
            else 
                html = html+"\n<div class=\"row\"><center><button style=\"height:30px;width:150px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#Expression_Modal\" disabled>Expression ("+Expression_count+")</button></center></div><br/>";    
        }
    }
    if((array.indexOf("Models") > -1))     
    {
        if(
                sourceArray.indexOf("scr_013705-1") > -1 ||
                sourceArray.indexOf("nif-0000-00004-1") > -1  ||
                sourceArray.indexOf("nlx_152590-1") > -1 
           )
        {
        count++;
        if(Models_count != null && Models_count > 0)
            html  = html+"\n<div class=\"row\"><center><button style=\"height:30px;width:150px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#Models_Modal\" onclick=\"return ksTrackEvent('Button', 'Modal', 'Models');\">Models ("+Models_count+")</button></center></div><br/>";
        else 
            html  = html+"\n<div class=\"row\"><center><button style=\"height:30px;width:150px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#Models_Modal\" disabled>Models ("+Models_count+")</button></center></div><br/>";
        }
    }
    if((array.indexOf("Anatomy") > -1))     
    {
       if(sourceArray.indexOf("nif-0000-00054-1") > -1)
       {
            /*if(count == 3)
            {
                html = html+"\n</div><br/><div class=\"row\"> ";

            }*/
            count++;
            if(Anatomy_count != null && Anatomy_count > 0)
             html  = html+"\n<div class=\"row\"><center><button style=\"height:30px;width:150px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#Anatomy_Modal\" onclick=\"return ksTrackEvent('Button', 'Modal', 'Anatomy');\">Anatomy ("+Anatomy_count+")</center></div></div><br/>";
            else 
             html  = html+"\n<div class=\"row\"><center><button style=\"height:30px;width:150px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#Anatomy_Modal\" disabled>Anatomy ("+Anatomy_count+")</button></center></div><br/>";
        }
    }
    if((array.indexOf("Morphology") > -1))     
    {
       if(sourceArray.indexOf("nif-0000-00006-1") > -1)
       {
            if(count == 3)
            {
                html = html+"</div><br/><div class=\"row\"> ";
            }
            count++;
            if(Morphology_count != null && Morphology_count > 0)
             html  = html+"<div class=\"row\"><center><button style=\"height:30px;width:150px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#Morphology_Modal\" onclick=\"return ksTrackEvent('Button', 'Modal', 'Morphology');\">Morphology ("+Morphology_count+")</button></center></div>";
            else 
             html  = html+"<div class=\"row\"><center><button style=\"height:30px;width:150px\" type=\"button\" class=\"btn btn-info btn-sm\" data-toggle=\"modal\" data-target=\"#Morphology_Modal\" disabled>Morphology ("+Morphology_count+")</button></center></div>";
    
        }
    }
 
    
    html = html+"</div>";
    try
    {
        document.getElementById("dataspace_panel").innerHTML=html;
    }
    catch(err) {}
    
}

function loadNewPage(sourceID,term,pageID)
{
    setCookie('loadNewPage','true',365);
    //alert("\nSourceID:"+sourceID);
    //alert("\nTerm:"+term);
    //var el = document.getElementById("dataspace_panel");
    //alert("el:"+el);
    //var html = "testing...";
    //document.getElementById("dataspace_panel").innerHTML=html;
     //alert("\npageID:"+pageID);
     //var html = httpGet("http://localhost/index.php/viewalldata/view/"+term+"/"+sourceID+"/"+pageID);
     var html = httpGet("/index.php/ViewAllData/view/"+term+"/"+sourceID+"/"+pageID);
}

function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

window.onhashchange = function() 
{
    var screenState = getCookie('screen_state');
    var loadNewPage = getCookie('loadNewPage');
    if(loadNewPage != null && loadNewPage == 'true')
    {
        setCookie('loadNewPage','false',365);
        window.location.hash = '#dataspace';
        return;
    }
    //if(window.location.hash == '')
    if(screenState == 'dataspace' && window.location.hash == '')
    {
        setCookie('screen_state','',365);
        //alert("hash---"+window.location.hash);
        eventFire(document.getElementById('panel-fullscreen0'), 'click');
        history.pushState('', document.title, window.location.pathname);
    }
    else if(screenState == 'definition' && window.location.hash == '')
    {
        setCookie('screen_state','',365);
        //alert("hash---"+window.location.hash);
        eventFire(document.getElementById('summaryOutter0'), 'click');
        history.pushState('', document.title, window.location.pathname);
    }
    else if(screenState == 'relations' && window.location.hash == '')
    {
        setCookie('screen_state','',365);
        //alert("hash---"+window.location.hash);
        eventFire(document.getElementById('panel-fullscreen2'), 'click');
        history.pushState('', document.title, window.location.pathname);
    }
    else if(screenState == 'literature' && window.location.hash == '')
    {
        setCookie('screen_state','',365);
        //alert("hash---"+window.location.hash);
        eventFire(document.getElementById('panel-fullscreen1'), 'click');
        history.pushState('', document.title, window.location.pathname);
    }
    
   
   
   
    
    //alert(window.location.hash);
    //document.getElementById("panel-fullscreen").innerHTML="<i class=\"glyphicon glyphicon-resize-full\"></i>";
 //blah blah blah
    //alert(window.location.hash);
    //alert();
    //
    //
    //document.getElementById("panel-fullscreen").children('i').removeClass('glyphicon-resize-small');
    //document.getElementById("panel-fullscreen").addClass('glyphicon-resize-full');
    //document.getElementById("dataspace_panel").setAttribute("style", "min-height: 23%; max-height: 23%;overflow-y: scroll");
}
