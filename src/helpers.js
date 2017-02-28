import { config } from './config'
import { settings } from './settings'

export function conditionallyCapitalize(currentText, character, postSpace = false) {
    let output = currentText
    if(settings.autoCapitalization && shouldCapitalize(currentText)) {
        output += character.charAt(0).toUpperCase() + character.slice(1)
    }
    else {
        output += character
    }
    if(postSpace) {
        output += ' '
    }
    return output
}

export function shouldCapitalize(testString) {
    if(!testString.length) { return true }
    for(let i = 0, len = config.capitalizedAfter.length; i < len; i++) {
        if(testString.slice(-config.capitalizedAfter[i].length) === config.capitalizedAfter[i]) {
            return true
        }
    }
    return false
}