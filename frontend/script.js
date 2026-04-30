function openModal(id){
    document.getElementById(id).style.display = "block";
}

function closeModal(id){
    document.getElementById(id).style.display = "none";
}

/* CLUSTERING WITHOUT BACKEND */
let finalCSV = "";

function runClustering(){

    let file = document.querySelector("input[type=file]").files[0];
    let min_samples = parseInt(document.querySelector("input[type=number]").value);

    if(!file){
        alert("Please upload a CSV file first");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e){
        let text = e.target.result;
        let rows = text.trim().split("\n").slice(1);

        let x = [];
        let y = [];

        rows.forEach(row=>{
            let values = row.split(",");
            x.push(parseFloat(values[0]));
            y.push(parseFloat(values[1]));
        });

        let labels = simpleClustering(x, y, min_samples);

        document.querySelector(".result-box p").innerText =
            labels.join(",");

        drawGraph(x, y, labels);

        finalCSV = "x,y,cluster\n";
        for(let i=0;i<x.length;i++){
            finalCSV += `${x[i]},${y[i]},${labels[i]}\n`;
        }
    };

    reader.readAsText(file);
}

/* SIMPLE DENSITY BASED CLUSTERING */
function simpleClustering(x, y, min_samples){

    let labels = new Array(x.length).fill(-1);
    let clusterId = 0;
    let eps = 5;

    for(let i=0;i<x.length;i++){

        if(labels[i] !== -1){
            continue;
        }

        let neighbors = [];

        for(let j=0;j<x.length;j++){
            let distance = Math.sqrt(
                Math.pow(x[i]-x[j],2) + Math.pow(y[i]-y[j],2)
            );

            if(distance <= eps){
                neighbors.push(j);
            }
        }

        if(neighbors.length >= min_samples){
            neighbors.forEach(index=>{
                labels[index] = clusterId;
            });
            clusterId++;
        }
    }

    return labels;
}

/* GRAPH */
function drawGraph(x,y,labels){

    let unique = [...new Set(labels)];
    let traces = [];

    unique.forEach(c=>{
        let xs=[], ys=[];

        for(let i=0;i<labels.length;i++){
            if(labels[i]===c){
                xs.push(x[i]);
                ys.push(y[i]);
            }
        }

        traces.push({
            x: xs,
            y: ys,
            mode: 'markers',
            type: 'scatter',
            name: c===-1 ? "Anomaly" : "Cluster "+c,
            marker:{ size:10 }
        });
    });

    Plotly.newPlot("graph", traces, {
        title:"OPTICS Clustering Visualization",
        paper_bgcolor:"#0a192f",
        plot_bgcolor:"#0a192f",
        font:{color:"white"}
    },{
        displayModeBar:true,
        scrollZoom:true
    });
}

/* DOWNLOAD RESULT */
function downloadFiles(){

    if(finalCSV === ""){
        alert("Please run clustering first");
        return;
    }

    let blob = new Blob([finalCSV], {type:"text/csv"});
    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "result.csv";
    link.click();
}