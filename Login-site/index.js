import { supabase } from '../supabase/supabase.js'

let emailInput = document.getElementById('email')
let passwordInput = document.getElementById('password')
let loginBtn = document.getElementById('login-btn')
let signupBtn = document.getElementById('signup-btn')
let forgotPasswordBtn = document.getElementById('forgot-password')
let statusText = document.getElementById('status')

alert("Under udvikling - Brug ikke")

function visBesked(tekst, erFejl) {
    statusText.textContent = tekst

    if (erFejl) {
        statusText.style.color = 'red'
    } else {
        statusText.style.color = 'lightgreen'
    }
}

async function login() {
    let email = emailInput.value.trim()
    let password = passwordInput.value.trim()

    if (email === '' || password === '') {
        visBesked('Udfyld alle felter', true)
        return
    }

    let svar = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if (svar.error) {
        visBesked(svar.error.message, true)
    } else {
        visBesked('Du er nu logget ind', false)
        window.location.href = '../Main-site/main.html'
    }
}

async function opretBruger() {
    let email = emailInput.value.trim()
    let password = passwordInput.value.trim()

    if (email === '' || password === '') {
        visBesked('Udfyld alle felter', true)
        return
    }

    let svar = await supabase.auth.signUp({
        email: email,
        password: password
    })

    if (svar.error) {
        visBesked(svar.error.message, true)
    } else {
        visBesked('Bruger oprettet', false)
    }
}

async function glemtKodeord() {
    let email = emailInput.value.trim()

    if (email === '') {
        visBesked('Skriv din email', true)
        return
    }

    let svar = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://bilmpz.github.io/2.-SemesterProjekt/'
    })

    if (svar.error) {
        visBesked(svar.error.message, true)
    } else {
        visBesked('Mail sendt', false)
    }
}

async function tjekSession() {
    let svar = await supabase.auth.getSession()

    if (svar.data.session) {
        window.location.href = '../main.html'
    }
}

loginBtn.addEventListener('click', login)
signupBtn.addEventListener('click', opretBruger)
forgotPasswordBtn.addEventListener('click', glemtKodeord)

passwordInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        login()
    }
})

tjekSession()