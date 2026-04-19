function openModal(id){
    document.getElementById(id).style.display = "block";
}

function closeModal(id){
    document.getElementById(id).style.display = "none";
}

/* CLUSTERING */
function runClustering(){

    let file = document.querySelector("input[type=file]").files[0];
    let min_samples = document.querySelector("input[type=number]").value;

    let formData = new FormData();
    formData.append("file", file);
    formData.append("min_samples", min_samples);

    fetch("http://127.0.0.1:5000/cluster", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {

        document.querySelector(".result-box p").innerText =
            data.labels.join(",");

        drawGraph(data.x, data.y, data.labels);
    });
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
        title:"OPTICS Clustering",
        paper_bgcolor:"#0a192f",
        plot_bgcolor:"#0a192f",
        font:{color:"white"}
    },{
        displayModeBar:true,
        scrollZoom:true
    });
}

function downloadFiles(){
    window.open("http://127.0.0.1:5000/download");
}