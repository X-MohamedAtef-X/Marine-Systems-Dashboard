function suggestPropeller() {
    const cylinders = parseInt(document.getElementById('Cylinder').value);
    const speed = parseFloat(document.getElementById('speed-ship').value);

    if (isNaN(cylinders) || isNaN(speed) ) {
        alert("Input Error");
        return;
    }

    if(cylinders <= 0 || speed <= 0)
    {
        alert("Error Value")
        return;
    }

    let bladeCount = 0;
    let diameter = (speed * 0.22).toFixed(2);

    if (cylinders % 2 === 0) {
        bladeCount = (speed > 15) ? 5 : 3; 
    } else {
        bladeCount = (speed > 15) ? 6 : 4;
    }
    if (speed > 22) {
        material = "Ni-Al Bronze";
    } else {
        material = "Manganese Bronze";
    }
    document.getElementById('res-diameter').innerText = diameter + " m";
    document.getElementById('res-blades').innerText = bladeCount;
    document.getElementById('res-material').innerText = material;
    
    init3DModel(bladeCount); 
}

function generateRandom() {
    document.getElementById("Cylinder").value = (Math.random() * 8).toFixed(0);
    document.getElementById("speed-ship").value = (Math.random() * 30).toFixed(0);
    
}