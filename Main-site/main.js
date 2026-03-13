import { supabase } from '../supabase/supabase.js'

let userEmailText = document.getElementById('user-email')
let logoutBtn = document.getElementById('logout-btn')
let createPostBtn = document.getElementById('create-post-btn')

let titleInput = document.getElementById('title')
let subjectInput = document.getElementById('subject')
let dateInput = document.getElementById('date')
let timeInput = document.getElementById('time')
let locationInput = document.getElementById('location')
let descriptionInput = document.getElementById('description')

let postsList = document.getElementById('posts-list')
let roomsList = document.getElementById('rooms-list')

let posts = [
    {
        title: 'Søger gruppe til webudvikling',
        subject: 'Webudvikling',
        date: '2026-03-15',
        time: '13:00',
        location: 'Rum B204',
        description: 'Vi skal arbejde med HTML, CSS og JavaScript.'
    },
    {
        title: 'Nogen der vil læse database?',
        subject: 'Database',
        date: '2026-03-16',
        time: '10:00',
        location: 'Biblioteket',
        description: 'Vil gerne øve SQL og normalisering.'
    }
]

let rooms = [
    {
        name: 'Rum A101',
        time: 'Ledig fra 12:00 - 14:00'
    },
    {
        name: 'Rum B204',
        time: 'Ledig fra 14:00 - 16:00'
    },
    {
        name: 'Grupperum C12',
        time: 'Ledig hele dagen'
    }
]

function visOpslag() {
    postsList.innerHTML = ''

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i]

        postsList.innerHTML += `
            <div class="card">
                <h3>${post.title}</h3>
                <p><strong>Fag:</strong> ${post.subject}</p>
                <p><strong>Dato:</strong> ${post.date}</p>
                <p><strong>Tid:</strong> ${post.time}</p>
                <p><strong>Sted:</strong> ${post.location}</p>
                <p>${post.description}</p>
            </div>
        `
    }
}

function visRum() {
    roomsList.innerHTML = ''

    for (let i = 0; i < rooms.length; i++) {
        let room = rooms[i]

        roomsList.innerHTML += `
            <div class="card">
                <h3>${room.name}</h3>
                <p>${room.time}</p>
            </div>
        `
    }
}

function opretOpslag() {
    let title = titleInput.value.trim()
    let subject = subjectInput.value.trim()
    let date = dateInput.value
    let time = timeInput.value
    let location = locationInput.value.trim()
    let description = descriptionInput.value.trim()

    if (
        title === '' ||
        subject === '' ||
        date === '' ||
        time === '' ||
        location === '' ||
        description === ''
    ) {
        alert('Udfyld alle felter')
        return
    }

    let nytOpslag = {
        title: title,
        subject: subject,
        date: date,
        time: time,
        location: location,
        description: description
    }

    posts.unshift(nytOpslag)

    visOpslag()

    titleInput.value = ''
    subjectInput.value = ''
    dateInput.value = ''
    timeInput.value = ''
    locationInput.value = ''
    descriptionInput.value = ''
}

async function tjekBruger() {
    let svar = await supabase.auth.getSession()

    if (!svar.data.session) {
        window.location.href = 'index.html'
        return
    }

    let email = svar.data.session.user.email
    userEmailText.textContent = 'Logget ind som: ' + email
}

async function logUd() {
    await supabase.auth.signOut()
    window.location.href = 'index.html'
}

createPostBtn.addEventListener('click', opretOpslag)
logoutBtn.addEventListener('click', logUd)

tjekBruger()
visOpslag()
visRum()