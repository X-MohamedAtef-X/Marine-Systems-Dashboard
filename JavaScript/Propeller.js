function suggestPropeller() {
    const type = document.getElementById('st-ship').value;
    const cylinders = parseInt(document.getElementById('Cylinder').value);
    const speed = parseFloat(document.getElementById('speed-ship').value);
    const rpm = parseFloat(document.getElementById('rpm-ship').value);
    const power = parseFloat(document.getElementById('engine-power').value);

    if (isNaN(cylinders) || isNaN(speed) || isNaN(rpm) || isNaN(power) ) {
        alert("Input Error");
        return;
    }

    if(cylinders <= 0 || speed <= 0 || rpm <= 0 || power <= 0)
    {
        alert("Error Value")
        return;
    }

    let cFactor;
    switch(type){
    case 'cargo':
        cFactor = 1.12;
        break;

    case 'tanker':
        cFactor = 1.18;
        break;

    case 'bulk':
        cFactor = 1.16;
        break;

    case 'container':
        cFactor = 1.05;
        break;

    case 'lng':
        cFactor = 1.10;
        break;

    case 'roro':
        cFactor = 1.08;
        break;

    default:
        cFactor = 1.12;
}
    
    let bladeCount = 0;

    let rawDiameter = cFactor * Math.pow((power / Math.pow(rpm, 3)), 0.2) * 20;

    let diameter = rawDiameter.toFixed(2);   

    if (cylinders % 2 === 0) {
        bladeCount = (speed > 15) ? 5 : 3; 
    } else {
        bladeCount = (speed > 15) ? 6 : 4;
    }
    if (speed > 18) {
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

    const shipSelect = document.getElementById('st-ship');
    const options = shipSelect.options;
    const randomIndex = Math.floor(Math.random() * options.length);
    shipSelect.selectedIndex = randomIndex;


    document.getElementById("Cylinder").value = Math.floor(Math.random() * (20 - 2 + 1)) +2;
    document.getElementById("speed-ship").value = Math.floor(Math.random() * (30 - 10 + 1)) +10;
    document.getElementById("rpm-ship").value = Math.floor (Math.random() * (150 - 60 + 1)) +60;
    document.getElementById("engine-power").value = Math.floor (Math.random() * (20000 - 1000 + 1)) +1000;
    
}