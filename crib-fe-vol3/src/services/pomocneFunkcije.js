import {apiFetch, destinationUrl} from "./authFetch";

export function dBTimeToString(time) {
    var date = new Date(time)
    var hours = date.getHours().toString().length == 1 ? "0" + date.getHours() : date.getHours()
    var minutes = date.getMinutes().toString().length == 1 ? "0" + date.getMinutes() : date.getMinutes()

    return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + ". " + hours + ":" + minutes
}

export async function pribaviImePrezimeISobuToString(id) {
    return apiFetch('GET', destinationUrl + '/korisnik/' + id.toString()).then(function (res) {
        if (typeof(res) != 'string') {
            return res.ime + " " + res.prezime + ", " + res.soba
        }
        return ""
    })
}

export function validacijaSobe(stringSoba) {
    if (stringSoba.length < 3 || stringSoba.length > 4)
        return false
    let sprat = stringSoba.slice(0, stringSoba.length - 2)
    let boks = stringSoba.slice(stringSoba.length - 2, stringSoba.length - 1)
    let soba = stringSoba.charAt(stringSoba.length - 1)
    let spratNum = Number.parseInt(sprat)
    let sobaNum = Number.parseInt(soba)
    return !isNaN(sprat) && !isNaN(soba) && spratNum > 0 && spratNum < 12 && soba > 0 && soba < 5 && boks.toLowerCase() != boks.toUpperCase()
}
export function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
