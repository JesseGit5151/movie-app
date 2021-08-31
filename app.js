let body = document.querySelector('.body')
let outputDiv = document.querySelector('.container')
let form = document.querySelector('#form')
let searchBoxValue = ''
let nextPage = document.querySelectorAll('.button')[1]
let prevPage = document.querySelector('.button')
let searchBox = document.querySelector('.searchBox')
let pageNumber = 1
const authKey = `55f2e4ca3866dce747984e296baa6a06`

const APIURL = `https://api.themoviedb.org/3/discover/movie?api_key=${authKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}&with_watch_monetization_types=flatrate`

let searchAPI =`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&page=${pageNumber}&query=${searchBox.value}`

const getData = async (url) => {
    const resp = await fetch(url)
    const respData = await resp.json()
    outputDiv.innerHTML = ""

    respData.results.forEach(element => {
        outputDiv.innerHTML += `<div class="movie">
                            <img src="https://image.tmdb.org/t/p/w500${element.poster_path}">
                            <h3>${element.title}</h3>
                            <span>${element.release_date.substring(0,4)}</span>
                            <div class="hover_content">
                            <h2>Overview</h2>
                            <p>${element.overview}</p>
                            </div>
                            </div>
                        `
    })

}
getData(APIURL)

form.addEventListener('submit', (e) => {
    e.preventDefault()
    searchBoxValue = searchBox.value
    if(searchBoxValue) {
        //console.log(searchAPI + searchBoxValue)
        getData(searchAPI + searchBoxValue)
        searchBoxValue = ''
        
    }

})

nextPage.addEventListener('click', () => {
    if(searchBox.value) {
        pageNumber++
        getData(`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&page=${pageNumber}&query=${searchBox.value}`)
        if(pageNumber > 1) {
            prevPage.classList.remove('hideBtn')
        }
    }
})

prevPage.addEventListener('click', () => {
    pageNumber--
    if(pageNumber === 1) {
        prevPage.classList.add('hideBtn')
    }
    getData(`https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&page=${pageNumber}&query=${searchBox.value}`)
})