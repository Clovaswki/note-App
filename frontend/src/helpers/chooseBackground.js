
//backgrounds
export const backgrounds = [
    '/img/paperBackground1.jpg', 
    '/img/paperBackground2.jpg', 
    '/img/paperBackground3.jpg',
    '#F0F2F5'
]

//store key of local storage
const key = 'background-MyNotesApp'

export const getBackground = () => {

    var background = localStorage.getItem(key)

    if(!background || typeof background == undefined || background == null){
        return backgrounds[2]
    }

    return background

}

export const applyBackground = (background) => {

    localStorage.setItem(key, background)

}