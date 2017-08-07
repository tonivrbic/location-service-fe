var http = require("http");

var options = {
  "method": "POST",
  "hostname": "localhost",
  "port": "52591",
  "path": "/api/locations",
  "headers": {
    "content-type": "application/json",
    "cache-control": "no-cache",
    'Authorization': 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJhZDc1YjU2NDU5YjczZjJkYzg2NDgwNjBkMDgzMmNmNWI3ZmRiMDkifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbWFwcy1lOGI1YSIsImF1ZCI6Im1hcHMtZThiNWEiLCJhdXRoX3RpbWUiOjE1MDIxMDU0OTUsInVzZXJfaWQiOiIyNEtmTlE0NXNtWTJpSjlMaDZXSTNiZHdjMFkyIiwic3ViIjoiMjRLZk5RNDVzbVkyaUo5TGg2V0kzYmR3YzBZMiIsImlhdCI6MTUwMjExNjk2NCwiZXhwIjoxNTAyMTIwNTY0LCJlbWFpbCI6ImRlbW9AZGVtby5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZGVtb0BkZW1vLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.eJXcR7N9aoWH-7570AX3sI7PcvGPvNicupWryDj2_aUFstKzC4TOQJ27MV6VlBgUavYqNGmUCsWDVq_X0DzAiRwxQi5FM1oBeuMPjZKQ3hDb4bW8fffKKkWnb-Ccsi8nDIaeVI2d5wS0tDSfyP0ymJ5-A8kNtGwyear9a1ayep5DPMldaLe3naFR0qYoLTypcaM-dk9OBYfOsZ-3ilnaeMoB2ig9GeSlyuTT-wt3TSN2SIMSvJqVim429NUPTanPIhhVg1U7Dig_SzvefLQ5c9752M65GetsLYEfksUAh5S8BhTaHL4Ftej4FIbdJFpkcBrOKxf0PJlvQnQrn70NEw'
  }
};


var coordinates = [
  [
    18.68001937866211,
    45.56129965944617
  ],
  [
    18.68250846862793,
    45.56093909432824
  ],
  [
    18.685684204101562,
    45.56030809980391
  ],
  [
    18.694653511047363,
    45.558775655027816
  ],
  [
    18.693408966064453,
    45.555289938715816
  ],
  [
    18.695383071899414,
    45.55480913329005
  ],
  [
    18.6970192193985,
    45.554794108054224
  ],
  [
    18.696890473365784,
    45.55434710545043
  ],
  [
    18.697292804718018,
    45.55411796828352
  ],
  [
    18.697614669799805,
    45.55333664108362
  ],
  [
    18.699181079864502,
    45.55336669233064
  ],
  [
    18.700876235961914,
    45.55269053538612
  ],
  [
    18.702378273010254,
    45.55288587045013
  ]
]

var data = coordinates.map((c, i) => {
  return {
    longitude: c[0],
    latitude: c[1],
    deviceId: 3,
    date: new Date(Date.now() + i * 1000 * 60 * 5).toISOString()
  }
})


data.forEach(d => {
  var req = http.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  console.log(d.date)
  req.write(JSON.stringify(d))

  req.end();
})
