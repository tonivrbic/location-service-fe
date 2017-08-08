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
    18.661136627197266,
    45.56388364174337
  ]
]

var data = coordinates.map((c, i) => {
  return {
    longitude: c[0],
    latitude: c[1],
    deviceId: 5,
    date: new Date(Date.now() + i * 1000 * 60 * 6).toISOString()
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
