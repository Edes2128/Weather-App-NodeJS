console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input');
const p1 = document.querySelector('#p1')
const p2 = document.querySelector('#p2')



weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    const location = search.value;
    clearInput()

    fetch(`http://localhost:3005/weather?address=${location}`).then(res => res.json())
        .then(data => {
            console.log(data)
            p1.textContent = data.forecast.weather[0].description
            p2.textContent = data.location

        })
        .catch(err => console.log(err))

})

const clearInput = () => {
    search.value = ''
}
