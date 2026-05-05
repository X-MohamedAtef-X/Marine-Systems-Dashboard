function calculate() {
    let tempInput = document.getElementById("temp");
    let vibInput = document.getElementById("vibration");
    let loadInput = document.getElementById("load");
    let opInput = document.getElementById("op");
    let speedInput = document.getElementById("speed");
    let distInput = document.getElementById("dist");

    if (
        tempInput.value === "" ||
        vibInput.value === "" ||
        loadInput.value === "" ||
        opInput.value === "" ||
        speedInput.value === "" ||
        distInput.value === ""
    ) {
        alert("Input Error");
        return;
    }

    let temp = Number(tempInput.value);
    let vibration = Number(vibInput.value);
    let load = Number(loadInput.value);
    let op = Number(opInput.value);
    let speed = Number(speedInput.value);
    let dist = Number(distInput.value);


    let time = (speed > 0) ? (dist / speed) : 0;


    let tempStatus = (temp > 1000) ? "Danger" :
                     (temp > 500) ? "Warning" : "Normal";

    let tempColor = (temp > 1000) ? "#ef4444" :
                    (temp > 500) ? "#f59e0b" : "#22c55e";

    document.getElementById("tempStatus").innerHTML =
        `Temp: <b>${tempStatus}</b>`;
    document.getElementById("tempStatus").style.color = tempColor;

    let vibStatus = (vibration > 10) ? "Danger" :
                    (vibration > 5) ? "Warning" : "Normal";

    let vibColor = (vibration > 10) ? "#ef4444" :
                   (vibration > 5) ? "#f59e0b" : "#22c55e";

    document.getElementById("vibStatus").innerHTML =
        `Vibration: <b>${vibStatus}</b>`;
    document.getElementById("vibStatus").style.color = vibColor;


    document.getElementById("speedStatus").innerText =
        `Speed: ${speed.toFixed(2)} km/h`;

    if (speed > 0) {
        document.getElementById("timeStatus").innerText =
            `Time: ${time.toFixed(2)} h`;

        document.getElementById("reachStatus").innerText =
            (speed < 28) ? "Route: Inefficient" : "Route: Optimal";
    } else {
        document.getElementById("timeStatus").innerText = "Time: --";
        document.getElementById("reachStatus").innerText = "Route: --";
    }

    let health = 100;

    // oil pressure critical check
    health -= (op <= 0 ? 100 :
               op < 2 ? 40 :
               op < 3 ? 20 : 0);

    health -= (temp / 1000) * 25;
    health -= (vibration / 10) * 35;
    health -= (load > 70 ? 15 : 0);
    health -= ((load / 100) * (vibration / 10)) * 20;

    if (health < 0) health = 0;

    document.getElementById("healthStatus").innerText =
        `Health: ${health.toFixed(0)}%`;


    if (typeof myChart !== "undefined") {
        myChart.data.datasets[0].data[0] = temp;
        myChart.data.datasets[0].data[1] = speed;
        myChart.data.datasets[0].data[2] = vibration;
        myChart.update();
    }


    let stress =
        (temp / 1000) * 0.4 +
        (vibration / 10) * 0.3 +
        (load / 100) * 0.2 +
        (op <= 0 ? 0.5 :
         op < 2 ? 0.3 :
         op < 3 ? 0.1 : 0);


    let remainingHours = 100 / (1 + stress * 5);

    remainingHours *= (health / 100);

    if (remainingHours < 0) remainingHours = 0;

    let lifeText = "";

    if (remainingHours < 10) {
        lifeText = "Critical";
    } else if (remainingHours < 30) {
        lifeText = "Maintenance Soon";
    } else {
        lifeText = "Healthy";
    }

    document.getElementById("lifeStatus").innerText =
        `Remaining Life: ${remainingHours.toFixed(1)} h (${lifeText})`;
}


function generateRandomData() {
    document.getElementById("temp").value = (Math.random() * 1200).toFixed(0);
    document.getElementById("vibration").value = (Math.random() * 15).toFixed(1);
    document.getElementById("load").value = (Math.random() * 100).toFixed(0);
    document.getElementById("op").value = (Math.random() * 10).toFixed(0);
    document.getElementById("speed").value = (Math.random() * 60).toFixed(0);
    document.getElementById("dist").value = (Math.random() * 300).toFixed(0);
}