const $themes = document.querySelector('.themesSelector')

const THEMES = [
    {
        id: 1,
        value: 'dark',
        title: 'Dark',
        color: '#313638'
    },
    {
        id: 2,
        value: 'light',
        title: 'Light',
        color: '#E8E9EB'
    },
    {
        id: 3,
        value: 'red',
        title: 'Red',
    },
    {
        id: 4,
        value: 'blue',
        title: 'Blue',
        color: '#32CBFF'
    }
]

window.addEventListener('load', () => {
    THEMES.forEach(theme => {
        $themes.insertAdjacentHTML('beforeend', optionTemplate(theme))
    })
})


window.addEventListener('load', () => {
    const theme = localStorage.getItem('theme')
    
    $themes.value = theme
    setTheme(theme)

})


$themes.addEventListener('change', (event) => {
    const value = event.target.value

    localStorage.setItem('theme', value)

  setTheme(value)
})


function optionTemplate(theme) {
    return `
    <option value="${theme.value}">${theme.title}</option>`
}

function getCurrentTheme(THEMES, value) {
    return THEMES.find(theme => theme.value === value) || null
}

function setTheme(theme) {
    document.documentElement.className = theme
}