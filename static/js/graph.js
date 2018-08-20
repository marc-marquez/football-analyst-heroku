queue()
    .defer(d3.json, "/pbp_2017")
    .await(makeGraphs);

function print_filter(filter){
	var f=eval(filter);
	if (typeof(f.length) != "undefined") {}else{}
	if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
	if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
	console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
}

function getTeamColors(team){
    //Had to replace #FFFFFF with #DCDCDC to make white visible
    var teamColors = [
        ["ARI",["#97233F","#FFB612","#000000"]],
        ["ATL",["#A71930","#A5ACAF","#000000"]],
        ["BAL",["#241773","#9E7C0C","#000000"]],
        ["BUF",["#00338D","#C60C30"]],
        ["CAR",["#0085CA","#BFC0BF","#000000"]],
        ["CHI",["#F26522","#00143F"]],
        ["CIN",["#FB4F14","#000000"]],
        ["CLE",["#22150C","#FB4F14"]],
        ["DAL",["#0C264C","#B0B7BC"]],
        ["DEN",["#002244","#FB4F14"]],
        ["DET",["#046EB4","#B0B7BC","#000000"]],
        ["GB",["#24423C","#FCBE14"]],
        ["HOU",["#00143F","#C9243F"]],
        ["IND",["#003D79","#DCDCDC"]],
        ["JAX",["#D8A328","#136677","#000000","#9E7A2C"]],
        ["KC",["#CA2430","#FFB612","#000000"]],
        ["LA",["#95774C","#002147"]],
        ["LAC",["#0A2342","#2072BA","#FDB515"]],
        ["MIA",["#0091A0","#FF8500","#002760"]],
        ["MIN",["#4F2E84","#FEC62F","#000000"]],
        ["NE",["#0A2342","#C81F32","#B0B7BD"]],
        ["NO",["#A08A58","#000000"]],
        ["NYG",["#192E6C","#B20032"]],
        ["NYJ",["#203731","#DCDCDC"]],
        ["OAK",["#C4C9CC","#000000"]],
        ["PHI",["#014A53","#BBC4C9","#000000"]],
        ["PIT",["#FFC20E","#DA2128","#000000","#00529B","#B2BABF"]],
        ["SF",["#C9243F","#C8AA76","#000000"]],
        ["SEA",["#002A5C","#7AC142","#B2B7BB","#2D5980"]],
        ["TB",["#D40909","#B0B9BF","#000000","#FF7900"]],
        ["TEN",["#4095D1","#00295B","#DA2128","#BCC4C9"]],
        ["WAS",["#FFC20F","#7C1415","#000000","#693213"]]
    ];
    var returnColors = ["#C96A23", "#66AFB2", "#D3D1C5", "#F5821F","#79CED7"];
    //var returnColors = ["#FFC20E","#DA2128","#000000","#00529B","#B2BABF"];
    var nflColors = ["#013369","#D50A0A"];
    //var teamFound = false;
    var i = 0;
    while (i < teamColors.length){
        if (teamColors[i][0] == team){
            //if returnColors length < 5, append nfl default colors then return.
           returnColors = teamColors[i][1];
           if (returnColors.length < 5) {
               returnColors.push(nflColors[0]);
               returnColors.push(nflColors[1]);
           }
           //console.log("returnColors = " + returnColors);
           break;
        } else {
           i++;
        }
    }
    //console.log("getTeamColors() = " + returnColors);
    return returnColors;
}

function makeGraphs(error, nflData2017) {
    if (error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //Convert each date string to datetime format
    //var dateFormat = d3.time.format("%m/%d/%y");
    //var timeFormat = d3.time.format("%M:%S")
    /*nflData2017.forEach(function (d) {
        d.Date = dateFormat.parse(d.Date);
        //d.time = timeFormat.parse(d.time);
        //d["GameDate"].setHours(0);
        //d["Yards"] = +d["Yards"];
    });*/


    //Create a Crossfilter instance
    var ndx = crossfilter(nflData2017);

    //Define Dimensions
    /*var dateDim = ndx.dimension(function (d) {
        return d.Date;
    });*/
    //console.log(dateDim.bottom(10));
    var weekDim = ndx.dimension(function (d) {
        return d.Week;
    });
    /*var timeUnderDim = ndx.dimension(function (d) {
           return d.TimeUnder;
    });*/
    var quarterDim = ndx.dimension(function (d) {
           return d.qtr;
    });
    /*var playAttemptedDim = ndx.dimension(function (d) {
        return d.PlayAttempted;
    });*/
    var passLocationDim = ndx.dimension(function (d) {
        //if (d.PassLocation != 'NA'){
            return d.PassLocation;
        /*}  else {
            return d.PassLocation;
        }
        return d.PassLocation;*/
    });
    var runLocationDim = ndx.dimension(function (d) {
        return d.RunLocation;
    });
    var runGapDim = ndx.dimension(function (d) {
        if (d.RunGap == 'NA') {
            return "center";
        } else {
            return d.RunGap;
        }

    });
    /*var rushAttemptDim = ndx.dimension(function (d) {
        return d.RushAttempt;
    });*/
    var passOutcomeDim = ndx.dimension(function (d) {
        //if (d.PassOutcome != 'NA') {
            return d.PassOutcome;
        //}
        //return d.PassOutcome;
    });
    var positionDim = ndx.dimension(function (d) {
        /*if(d.Position != 'None') {
            return d.Position;
        }*/
        return d.Position;
    });
    var downDim = ndx.dimension(function (d) {
       return d.down;
    });
    var passLengthDim = ndx.dimension(function (d) {
       /*if(d.PassLength != 'NA') {
            return d.PassLength;
        }*/
        return d.PassLength;
    });
    var offenseTeamDim = ndx.dimension(function (d) {
        return d.posteam;
    });
    var playTypeDim = ndx.dimension(function (d) {
        return d.PlayType;
    });

    //set up filters
    //passAttemptDim.filter("1");
    //playAttemptedDim.filter("1");

    //Calculate metrics
    var numPlaysByDate = weekDim.group();
    var totalYardsByDate = weekDim.group().reduceSum(function(d) { return d.YardsGained });
    var numRunPlaysByDate = weekDim.group().reduceSum(function(d) {return d.PlayType=="Run"});
    var numPassPlaysByDate = weekDim.group().reduceSum(function(d) {return d.PlayType=="Pass"});
    //var timeUnderGroup = timeUnderDim.group();
    var quarterGroup = quarterDim.group();
    //var passLocation = passLocationDim.group();
    var passLocation = passLocationDim.group().reduceSum(function(d) {return d.PlayType=="Pass"});
    //var runLocation = runLocationDim.group();
    var runLocation = runLocationDim.group().reduceSum(function(d) {return d.PlayType=="Run"});
    //var runGapGroup = runGapDim.group();
    var runGapGroup = runGapDim.group().reduceSum(function(d) {return d.PlayType=="Run"});
    //var passAttemptGroup = passAttemptDim.group();
    //var rushAttemptGroup = rushAttemptDim.group();
    //var passOutcomeGroup = passOutcomeDim.group();
    var passOutcomeGroup = passOutcomeDim.group().reduceSum(function(d) {return d.PlayType=="Pass"});
    var offenseTeamGroup = offenseTeamDim.group();
    //var positionGroup = positionDim.group();
    var positionGroup = positionDim.group().reduceSum(function(d) {return d.PlayType=="Pass"});
    var downGroup = downDim.group();
    var playTypeGroup = playTypeDim.group();

    //Need to modify for short/medium/long throws
    /*var airYardsGroup = airYardsDim.group(function(d){
        if (d < 10) { return 9;}
        else if (d < 20) {return 19;}
        else {return 21;}
    });*/
    var passLengthGroup = passLengthDim.group();

    var all = ndx.groupAll();
    var totalYards = ndx.groupAll().reduceSum(function (d) {
        return d.YardsGained;
    });

    //Define values (to be used in charts)
    var minDate = weekDim.bottom(1)[0]["Week"];
    var maxDate = weekDim.top(1)[0]["Week"];

    //Charts
    var playsChart = dc.compositeChart("#plays-chart");
    //var playsBarChart = dc.barChart("#plays-chart");
    var yardsChart = dc.lineChart("#yards-chart");
    //var stackedChart = dc.lineChart()
    var passLocationChart = dc.rowChart("#pass-location-row-chart");
    var numberPassPlaysND = dc.numberDisplay("#number-plays-nd");
    var totalYardsND = dc.numberDisplay("#total-yards-nd");
    var passOutcomeChart = dc.pieChart("#complete-chart");
    var passToPositionChart = dc.pieChart("#position-chart");
    var downChart = dc.rowChart("#down-row-chart");
    var quarterChart = dc.rowChart("#quarter-row-chart");
    //var timeUnderChart = dc.rowChart("#time-row-chart");
    var passLengthChart = dc.rowChart("#passlength-row-chart");
    var playTypeChart = dc.rowChart("#playtype-row-chart");
    var runLocationChart = dc.rowChart("#run-location-row-chart");
    var runGapChart = dc.rowChart("#run-gap-row-chart");
    var offensiveTeamSelectField = dc.selectMenu('#team-menu-select');
    var passOrRushSelectField = dc.selectMenu("#pass-or-rush-menu-select");
    //var passAttemptSelectField = dc.selectMenu('#pass-menu-select');
    //var rushAttemptSelectField = dc.selectMenu('#rush-menu-select');

    //console.log ("Pass/Rush:"+passOrRushSelectField.filter());

    var colorScheme = ["#C96A23", "#66AFB2", "#D3D1C5", "#F5821F","#79CED7"];
    //var colorScheme = ["#FFC20E","#DA2128","#000000","#00529B","#B2BABF"]; //base colors
    var currentTeam = null;


    offensiveTeamSelectField
        .width(150)
        .height(100)
        .dimension(offenseTeamDim)
        .group(offenseTeamGroup)
        /*.on('preRedraw',function(offensiveTeamSelectField){
            //currentTeam = offensiveTeamSelectField.filters()[0];
            //console.log("offensiveTeamSelectField = " + getTeamColors([offensiveTeamSelectField.filters()[0]]));
            console.log("Issuing a redraw...");
        })*/
        /*.onChange(function(){
            //currentTeam = offensiveTeamSelectField.filters()[0];
            console.log("Changing teams...");
        })*/
        .title(function(d) {return d.key;});

    passOrRushSelectField
        .width(150)
        .height(100)
        .dimension(playTypeDim)
        .group(playTypeGroup)
        .on('pretransition', function(passOrRushSelectField) {
                //if pass toggle/hide run
                var currentState = passOrRushSelectField.filters();
                if (currentState == "Pass"){
                    //console.log("Pass");
                    $("#runRow").hide();
                    $("#passRow").show();
                } else if (currentState == "Run") {
                    //console.log("Run");
                    $("#passRow").hide();
                    $("#runRow").show();
                } else {
                    //console.log("Select All");
                    $("#passRow").show();
                    $("#runRow").show();
                }
        })
        .title(function(d) {return d.key;});

    /*rushAttemptSelectField
        .width(150)
        .height(100)
        .dimension(rushAttemptDim)
        .group(rushAttemptGroup);
        //.title(function(d) {return d.key;});*/

    numberPassPlaysND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);

    totalYardsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(totalYards);
        //.formatNumber(d3.format(".3s"));

    playsChart
        //.ordinalColors(colorScheme)
        //.width(640)
        //.width(900)
        .height(300)
        .margins({top: 30, right: 20, bottom: 30, left: 50})
        .dimension(dateDim)
        .transitionDuration(500)
        //.x(d3.time.scale().domain([minDate, maxDate]))
        .x(d3.scale.linear().domain([minDate, maxDate]))
        .xAxisLabel("Week")
        .yAxisLabel("Total Plays")
        .elasticY(true)
        .useViewBoxResizing(true)
        .brushOn(false)
        .legend(dc.legend()
            .legendText(function (d,i) {
                legendArray = ["Run","Pass"];
                return legendArray[i];
            })
            .horizontal(true)
            .x(10)
            .y(5)
        )
        //.xAxisLabel("Week")
        .compose([
            dc.lineChart(playsChart)
                //.group(numPlaysByDate)
                .group(numRunPlaysByDate)
                .ordinalColors(colorScheme)
                .renderArea(true)
                /*.on('preRender', function(playsChart) {
                    //currentTeam = offensiveTeamSelectField.filters()[0];
                    console.log("Compose -> Render");
                    //playsChart.ordinalColors([getTeamColors(currentTeam)[0]]);
                })*/
                /*.on('preRedraw', function(playsChart) {
                    //currentTeam = offensiveTeamSelectField.filters()[0];
                    console.log("Compose -> Redraw");
                    //playsChart.ordinalColors([getTeamColors(currentTeam)[0]]);
                })*/
                /*.on('renderlet', function(playsChart) {
                    //currentTeam = offensiveTeamSelectField.filters()[0];
                    console.log("Compose -> Renderlet");
                    //playsChart.ordinalColors([getTeamColors(currentTeam)[0]]);
                })*/
                .on('pretransition', function(playsChart) {
                    //currentTeam = offensiveTeamSelectField.filters()[0];
                    //console.log("0: "+ getTeamColors(currentTeam)[0]);
                    //playsChart.ordinalColors([getTeamColors(currentTeam)[0]]);
                }),
            dc.lineChart(playsChart)
                //.group(totalYardsByDate)
                .group(numPassPlaysByDate)
                .ordinalColors(colorScheme)
                .renderArea(true)
                /*.on('preRedraw', function(playsChart) {
                    console.log("preredraw - lineChart...");
                    //currentTeam = offensiveTeamSelectField.filters()[0];
                    //console.log("1: "+ getTeamColors(currentTeam)[1]);
                    //playsChart.ordinalColors([getTeamColors(currentTeam)[1]]);
                })*/
                /*.on('preRender', function(playsChart) {
                    console.log("prerender - lineChart...");
                })*/
                .on('pretransition', function(playsChart) {
                    //console.log("pretransition - lineChart...");
                    //console.log("pretransition - lineChart - colors: ");
                    //currentTeam = offensiveTeamSelectField.filters()[0];
                    //console.log("1: "+ getTeamColors(currentTeam)[1]);
                    //playsChart.ordinalColors([getTeamColors(currentTeam)[1]]);
                })
        ])
        .on('pretransition', function(playsChart) {
            //console.log("Pretransition - playsChart...");
        })
        .on('preRedraw', function(playsChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            var i=0;
            playsChart.children().forEach(function(child){
                child.ordinalColors([getTeamColors(currentTeam)[i]]);
                i++;
            });
        })
        .on('preRender', function(playsChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            var i=0;
            playsChart.children().forEach(function(child){
                child.ordinalColors([getTeamColors(currentTeam)[i]]);
                i++;
            });
        })
        .yAxis().ticks(10);

    /*playsBarChart
        .ordinalColors(["#C96A23"])
        .width(1200)
        .height(300)
        .margins({top: 30, right: 50, bottom: 30, left: 50})
        .dimension(dateDim)
        .group(numPlaysByDate)
        //.renderArea(true)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minDate, maxDate]))
        .centerBar(true)
        .elasticX(true)
        .elasticY(true)
        .xAxisLabel("Day")
        //.xUnits(function(){return 3;})
        //.gap()
        .yAxis().ticks(8);*/

    yardsChart
        .ordinalColors(colorScheme)
        //.width(640)
        .height(300)
        .margins({top: 30, right: 20, bottom: 30, left: 50})
        .dimension(dateDim)
        .group(totalYardsByDate)
        .xyTipsOn(true)
        .renderArea(true)
        .transitionDuration(500)
        //.x(d3.time.scale().domain([minDate, maxDate]))
        .x(d3.scale.linear().domain([minDate, maxDate]))
        .elasticY(true)
        .useViewBoxResizing(true)
        .brushOn(false)
        .xAxisLabel("Week")
        .yAxisLabel("Total Yards")
        .on('preRedraw', function(yardsChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            yardsChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('pretransition', function(yardsChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            yardsChart.ordinalColors(getTeamColors(currentTeam));
        })
        //.xAxisLabel("Week")
        .yAxis().ticks(10);

    passLocationChart
        .ordinalColors(colorScheme)
        //.width(300)
        .height(300)
        .margins({top: 10, right: 10, bottom: 30, left: 40})
        .dimension(passLocationDim)
        .group(passLocation)
        .labelOffsetX(-40)
        .ordering(function(d){
            if(d.key == "left") return 0;
            else if (d.key == "middle") return 1;
            else if (d.key == "right") return 2;
            else return 3;
        })
        .elasticX(true)
        .useViewBoxResizing(true)
        .on('pretransition', function(passLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRedraw', function(passLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender', function(passLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);

    downChart
        .ordinalColors(colorScheme)
        //.width(320)
        //.width(window.innerWidth-10)
        .height(300)
        //.margins({top: 30, right: 30, bottom: 30, left: 50})
        .dimension(downDim)
        .group(downGroup)
        .labelOffsetX(-20)
        .ordering(function(d){
            if(d.key == "1") return 0;
            else if (d.key == "2") return 1;
            else if (d.key == "3") return 2;
            else return 4;
        })
        .elasticX(true)
        .useViewBoxResizing(true)
        .on('pretransition', function(downChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            downChart.ordinalColors(getTeamColors(currentTeam));
            })
        .on('preRedraw',function(downChart){
            //console.log("Redrawing Downs Chart...");
            currentTeam = offensiveTeamSelectField.filters()[0];
            downChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender',function(downChart){
            //console.log("Redrawing Downs Chart...");
            currentTeam = offensiveTeamSelectField.filters()[0];
            downChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);

    quarterChart
        .ordinalColors(colorScheme)
        //.width(320)
        .height(300)
        .dimension(quarterDim)
        .group(quarterGroup)
        .labelOffsetX(-20)
        .ordering(function(d){
            if(d.key == "1") return 0;
            else if (d.key == "2") return 1;
            else if (d.key == "3") return 2;
            else if (d.key == "4") return 3;
            else return 4;
        })
        .elasticX(true)
        .useViewBoxResizing(true)
        .on('pretransition', function(quarterChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            quarterChart.ordinalColors(getTeamColors(currentTeam));
            })
        .on('preRedraw',function(quarterChart){
            //console.log("Redrawing Downs Chart...");
            currentTeam = offensiveTeamSelectField.filters()[0];
            quarterChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender',function(quarterChart){
            //console.log("Redrawing Downs Chart...");
            currentTeam = offensiveTeamSelectField.filters()[0];
            quarterChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);

    /*timeUnderChart
        .ordinalColors(colorScheme)
        .width(300)
        .height(300)
        .dimension(timeUnderDim)
        .group(timeUnderGroup)
        //.labelOffsetX(-20)
        .elasticX(true)
        .on('pretransition', function(downChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            downChart.ordinalColors(getTeamColors(currentTeam));
            })
        .on('preRedraw',function(downChart){
            //console.log("Redrawing Downs Chart...");
            currentTeam = offensiveTeamSelectField.filters()[0];
            downChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender',function(downChart){
            //console.log("Redrawing Downs Chart...");
            currentTeam = offensiveTeamSelectField.filters()[0];
            downChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);*/

    passLengthChart
        .ordinalColors(colorScheme)
        .width(300)
        .height(300)
        .dimension(passLengthDim)
        .group(passLengthGroup)
        //.labelOffsetX(-20)
        /*.ordering(function(d){
            if(d.key == "1") return 0;
            else if (d.key == "2") return 1;
            else if (d.key == "3") return 2;
            else return 4;
        })*/
        .elasticX(true)
        .on('pretransition', function(passLengthChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passLengthChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRedraw', function(passLengthChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passLengthChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender', function(passLengthChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passLengthChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);

    playTypeChart
        .ordinalColors(colorScheme)
        .width(300)
        .height(300)
        .dimension(playTypeDim)
        .group(playTypeGroup)
        .elasticX(true)
        .on('pretransition', function(playTypeChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            playTypeChart.ordinalColors(getTeamColors(currentTeam));
            })
        .xAxis().ticks(3);

    runLocationChart
        .ordinalColors(colorScheme)
        //.width(300)
        .height(300)
        .margins({top: 10, right: 10, bottom: 30, left: 40})
        .dimension(runLocationDim)
        .group(runLocation)
        .elasticX(true)
        .useViewBoxResizing(true)
        .labelOffsetX(-40)
        .on('pretransition', function(runLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRedraw', function(runLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender', function(runLocationChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runLocationChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);

    runGapChart
        .ordinalColors(colorScheme)
        //.width(300)
        .height(300)
        .margins({top: 10, right: 10, bottom: 30, left: 40})
        .dimension(runGapDim)
        .group(runGapGroup)
        .elasticX(true)
        .useViewBoxResizing(true)
        .labelOffsetX(-40)
        .on('pretransition', function(runGapChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runGapChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRedraw', function(runGapChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runGapChart.ordinalColors(getTeamColors(currentTeam));
        })
        .on('preRender', function(runGapChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            runGapChart.ordinalColors(getTeamColors(currentTeam));
        })
        .xAxis().ticks(4);

    passOutcomeChart
        .ordinalColors(colorScheme)
        //.width(400)
        .height(300)
        .radius(170)
        .innerRadius(25)
        .transitionDuration(1500)
        .dimension(passOutcomeDim)
        .group(passOutcomeGroup)
        .legend(dc.legend()
            .legendText(function (d) {return d.name;})
            .x(0)
            .y(5)
        )
        .useViewBoxResizing(true)
        /*.on('preRender', function(passOutcomeChart) {
            var currentTeam = offensiveTeamSelectField.filters()[0];
            passOutcomeChart.ordinalColors(getTeamColors(currentTeam));
        })*/
        //.label(function(d) {return d.key + ' ' + Math.round((d.endAngle - d.startAngle) / Math.PI * 50) + '%';});
        .on('pretransition', function(passOutcomeChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passOutcomeChart.ordinalColors(getTeamColors(currentTeam));
            passOutcomeChart.selectAll('text.pie-slice').text(function (d) {
                //return d.data.key + '\n' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            })
        })
        .on('preRender', function(passOutcomeChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passOutcomeChart.ordinalColors(getTeamColors(currentTeam));
            passOutcomeChart.selectAll('text.pie-slice').text(function (d) {
                //return d.data.key + '\n' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            })
        })
        .on('preRedraw', function(passOutcomeChart) {
            currentTeam = offensiveTeamSelectField.filters()[0];
            passOutcomeChart.ordinalColors(getTeamColors(currentTeam));
            passOutcomeChart.selectAll('text.pie-slice').text(function (d) {
                //return d.data.key + '\n' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
            })
        });

    passToPositionChart
        .ordinalColors(colorScheme)
        //.width(400)
        .height(300)
        .radius(170)
        .innerRadius(25)
        .transitionDuration(1500)
        .dimension(positionDim)
        .group(positionGroup)
        //.minAngleForLabel(10)
        .slicesCap(3)
        .useViewBoxResizing(true)
        .legend(dc.legend()
            .legendText(function (d) { return d.name; })
            .x(0)
            .y(5)
        )
        //.label(function(d) {return d.key + ' ' + Math.round((d.endAngle - d.startAngle) / Math.PI * 50) + '%';});
        .on('pretransition', function(passToPositionChart) {
            //console.log(offensiveTeamSelectField.filters());
            currentTeam = offensiveTeamSelectField.filters()[0];
            //console.log("getTeamColors = " + getTeamColors(currentTeam));
            passToPositionChart.ordinalColors(getTeamColors(currentTeam));
            passToPositionChart.selectAll('text.pie-slice').text(function (d) {
                //return d.data.key + '\n' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                //console.log(d.endAngle - d.startAngle);
                if (d.endAngle - d.startAngle > .5) {
                    return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                }
            })
        })
        .on('preRender', function(passToPositionChart) {
            //console.log(offensiveTeamSelectField.filters());
            currentTeam = offensiveTeamSelectField.filters()[0];
            //console.log("getTeamColors = " + getTeamColors(currentTeam));
            passToPositionChart.ordinalColors(getTeamColors(currentTeam));
            passToPositionChart.selectAll('text.pie-slice').text(function (d) {
                //return d.data.key + '\n' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                //console.log(d.endAngle - d.startAngle);
                if (d.endAngle - d.startAngle > .5) {
                    return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                }
            })
        })
        .on('preRedraw', function(passToPositionChart) {
            //console.log(offensiveTeamSelectField.filters());
            currentTeam = offensiveTeamSelectField.filters()[0];
            //console.log("getTeamColors = " + getTeamColors(currentTeam));
            passToPositionChart.ordinalColors(getTeamColors(currentTeam));
            passToPositionChart.selectAll('text.pie-slice').text(function (d) {
                //return d.data.key + '\n' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                //console.log(d.endAngle - d.startAngle);
                if (d.endAngle - d.startAngle > .375) {
                    return dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) + '%';
                }
            })
         });


    dc.renderAll();
}