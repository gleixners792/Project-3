var data = {};

d3.csv("../../Cleaned/wine_data.csv").then(function (data) {
    console.log(data[0]);

    var subjectIDs = data.names;

    console.log(subjectIDs);

    updateIDList(subjectIDs);
    var selectedID = d3.select("#selDataset");

    document.getElementById("selDataset").addEventListener("change", runFilter);
    
    var theRow = {}
    function runFilter() {
        var idValue = String(d3.select("#selDataset").node().value);
        console.log("runfilter", d3.select("#selDataset"));
        console.log("here", idValue);
        data.metadata.forEach(function (row) {
            if (row.id == idValue) {
                metaData = row
                console.log(row)
            }
        })
        data.samples.forEach(function (name) {
            if (name.id == idValue) {
                theRow = name
                console.log(name)
            }
        })
        console.log(theRow)

        console.log("print keys ", Object.entries(metaData));
        populateDemo(metaData);

        var topSampleValues = theRow.sample_values.slice(0, 10).reverse();
        var topOTUIDs = theRow.otu_ids.slice(0, 10).reverse();
        var otuString = "OTU ";
        var topStringOTUIDS = topOTUIDs.map(function (item) {
            return otuString.concat(item.toString());
        })
        var topOTULabels = theRow.otu_labels.slice(0, 10).reverse();
        console.log(topSampleValues);
        console.log(topStringOTUIDS);
        console.log(topOTULabels);
        // var trace1 = {
        //     y: topStringOTUIDS,
        //     x: topSampleValues,
        //     type: "bar",
        //     orientation: "h",
        //     text: topOTULabels
        // }
        var graphData3 = [
            {
                domain:{x: [0,1], y: [0,1]},
                value: metaData.wfreq,
                title: {text: "Pies"},
                type: "pie"
                }];
        // var layout1 = {title:"",
        // xaxis: { title: "Sample Values"}};
        // var graphData = [trace1];
        // Plotly.newPlot("bar", graphData, layout1)
        
        allColors = randomColor(theRow.otu_ids.length)
        console.log(allColors);
        function randomColor(countVar) {
            var allC = [];
            for (var j = 0; j < countVar; j++) {
                var c = "";
                color1 = (Math.floor(Math.random() * 256).toString());
                color2 = (Math.floor(Math.random() * 256).toString());
                color3 = (Math.floor(Math.random() * 256).toString());
                c = `rgb(${color1}, ${color2}, ${color3})`
                allC.push(c);
                console.log("allC ", allC);
            }
            return allC;
        }
        console.log("all colors ", allColors);
        var trace2 = {
            y: theRow.sample_values,
            x: theRow.otu_ids,
            text: theRow.otu_labels,
            mode: 'markers',
            marker: {
                color: allColors,
                size: theRow.sample_values,
                sizeref: 2.0 * Math.max(theRow.sample_values) / 50 ** 2
            }
        }
        var layout = {title:"",width: 1000, height: 500, margin: {t:100, b:100},
            xaxis: { title: "OTU ID"}};
        var graphData2 = [trace2];
        Plotly.newPlot('bubble', graphData2, layout);

        // var graphData3 = [
        //     {
        //         domain:{x: [0,1], y: [0,1]},
        //         value: metaData.wfreq,
        //         title: {text: "Scrubs per Week"},
        //         type: "indicator",
        //         mode: "gauge+number",
        //         gauge: {
        //             type: 'pie',
        //             shape: "angular",
        //             'axis': {'range': [0, 10], 'tick0': 0, 'dtick': 1,
        //                     'ticklen': 10, 'tickwidth': 5,'tickfont': {'size' : 20}},
        //         }
        //     }
        // ];
        // var layout3 = {width: 600, height: 500, margin: {t:0, b:0}};
        // Plotly.newPlot('gauge', graphData3, layout);
    }





})

function populateDemo(values) {
    //d3.event.preventDefault();
    console.log(d3.select("#selDataset"));
    d3.select("#sample-metadata").selectAll("p").remove();
    Object.entries(values).forEach(([key, value]) => {
        var row = d3.select("#sample-metadata");
        row.append("p").text(`${key}: ${value}`);
    })
}


function updateIDList(subjectIDs) {
    //d3.event.preventDefault();
    console.log(d3.select("#selDataset"));
    d3.select("#selDataset").selectAll("option").remove();
    d3.select('#ID').append("option").text("empty");
    subjectIDs.forEach(function (id) {
        var row = d3.select("#selDataset");
        row.append("option").text(id);
    })
}



var canvasP = document.getElementById("pieChart");var ctxP = canvasP.getContext('2d');var myPieChart =newChart(ctxP,{   type:'pie',   data:{      labels:["Värde 1","Värde 2","Värde 3","Värde 4","Värde 5","Värde 6","Värde 7"],      datasets:[{         data:[1,5,10,20,50,70,50],         backgroundColor:["#64B5F6","#FFD54F","#2196F3","#FFC107","#1976D2","#FFA000","#0D47A1"],         hoverBackgroundColor:["#B2EBF2","#FFCCBC","#4DD0E1","#FF8A65","#00BCD4","#FF5722","#0097A7"]}]},   options:{      legend:{         display:true,         position:"right"}}});canvasP.onclick =function(e){var slice = myPieChart.getElementAtEvent(e);if(!slice.length)return;// return if not clicked on slicevar label = slice[0]._model.label;switch(label){// add case for each label/slicecase'Värde 5':         alert('clicked on slice 5');         window.open('www.example.com/foo');break;case'Värde 6':         alert('clicked on slice 6');         window.open('www.example.com/bar');break;// add rests ...}
}<scriptsrc="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script><canvasid="pieChart"></canvas>