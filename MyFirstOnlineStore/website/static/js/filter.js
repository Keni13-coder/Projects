const list = document.querySelector('.list'),
    items = document.querySelectorAll('.box')


function sendRequest(method='GET',url='http://127.0.0.1:5000/info'){
    return new Promise( (resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.responseType = 'json'

        xhr.onload = () => {
            if (xhr.status >= 400){
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        }

        xhr.onerror = () => {
            reject(xhr.response)
        }

        xhr.send()
    })
}


function filter() {
    list.addEventListener('click', event => {
        const targetId = event.target.dataset.id
        console.log(targetId)
        sendRequest()
        .then( data => {
            // console.log(data)
           for ( el in data ) {

        switch(targetId) {
            case 'all':
                getItems('box')
                break
            case el:
                getItems(targetId)
                break

        }}})
    })
};
filter()

function getItems(className){
    items.forEach(item =>{
        if (item.classList.contains(className)) {
            item.style.display = 'flex'
        }
        else {
            item.style.display = 'none'
        }
    })
}