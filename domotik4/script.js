var options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
};
fetch('http://192.168.1.22/dht', options).then((resp) => resp.json()).then(data => {
    if (data.temperature) {
        document.getElementsByClassName('temp')[0].getElementsByTagName('h4')[0].innerHTML = data.temperature + '°c';
    }
    if (data.humi) {
        document.getElementsByClassName('humi')[0].getElementsByTagName('h4')[0].innerHTML = data.humi + "% d'humidité";
    }
});


options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
};
fetch('http://192.168.1.97/led', options).then((resp) => resp.json()).then(data => {
    document.getElementsByClassName('gpio')[0].classList.remove("activate");
    document.getElementsByClassName('gpio')[0].classList.remove("disable");
    if (data.currentLed) {
        document.getElementsByClassName('gpio')[0].setAttribute('data-gpio', 0);
        document.getElementsByClassName('gpio')[0].getElementsByTagName('h4')[0].innerHTML = 'Désactiver le GPIO';
        document.getElementsByClassName('gpio')[0].classList.add("disable");
    }else {
        document.getElementsByClassName('gpio')[0].setAttribute('data-gpio', 1);
        document.getElementsByClassName('gpio')[0].getElementsByTagName('h4')[0].innerHTML = 'Activer le GPIO';
        document.getElementsByClassName('gpio')[0].classList.add("activate");
    }
});


options = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
};
fetch('http://192.168.1.97/volt', options).then((resp) => resp.json()).then(data => {
    if (data.voltage) {
        document.getElementsByClassName('volt')[0].getElementsByTagName('h4')[0].innerHTML = data.voltage + 'v';
    }
});

function configLed() {

    var data = 'show=' + document.getElementsByClassName('gpio')[0].getAttribute('data-gpio');
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: data,
    };

    fetch('http://192.168.1.97/led', options).then((resp) => resp.json()).then(data => {
        document.getElementsByClassName('gpio')[0].classList.remove("activate");
        document.getElementsByClassName('gpio')[0].classList.remove("disable");
        if (data.currentLed) {
            document.getElementsByClassName('gpio')[0].setAttribute('data-gpio', 0);
            document.getElementsByClassName('gpio')[0].getElementsByTagName('h4')[0].innerHTML = 'Désactiver le GPIO';
            document.getElementsByClassName('gpio')[0].classList.add("disable");
        }else {
            document.getElementsByClassName('gpio')[0].setAttribute('data-gpio', 1);
            document.getElementsByClassName('gpio')[0].getElementsByTagName('h4')[0].innerHTML = 'Activer le GPIO';
            document.getElementsByClassName('gpio')[0].classList.add("activate");
        }

    }).catch(error => {
        console.log(error);
    });
}
