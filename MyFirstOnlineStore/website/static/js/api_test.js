// const http = new XMLHttpRequest()

// http.open("GET", "http://127.0.0.1:5000/api/product")
// http.send()

// http.onload = () => console.log(http.responseText)
'GET -version'

function sendRequest(method = 'GET', url = '/api/buy_prod') {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.responseType = 'json'

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response)
            }
            else {
                resolve(xhr.response)
            }
        }

        xhr.onerror = () => {
            reject(xhr.response)
        }

        xhr.send()
    })
}
sendRequest()
    .then(data => console.log(data))


'POST -version'

// var xhr = new XMLHttpRequest();
// xhr.open("POST", '/api/buy_prod', true);
// xhr.setRequestHeader('Content-Type', 'application/json');
// xhr.send(JSON.stringify({
//     user_id: 1,
//     summa: 4,
//     buy_prod: {'5':{'buy':true, 'buy_id':1, 'basket':0},
//                '4':{'buy':true, 'buy_id':1, 'basket':0}}
// }));

// xhr.onload = function () {
//     var data = JSON.parse(this.responseText);
//     console.log(data);
// };


'PUT -version'
// fetch('/api/user_prod/1', {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     like: true
//   })
// })
// .then(res => {
//   return res.json()
// })
// .then(data => console.log(data))


'DELETE -version'

// fetch('/api/user_prod/1', {
//   method: 'DELETE',
// })
// .then(res => {
//   return res.json()
// }) 
// .then(data => console.log(data))