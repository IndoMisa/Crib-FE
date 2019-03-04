export function setNajavljeniKvarovi(listaKvarova){
    if(listaKvarova.length == 0)
    {
        clearNajavljeniKvarovi()
        return
    }
    listaKvarova = listaKvarova.map(x => x.id_ostecenje)
    localStorage.setItem('najavljeniKvarovi', listaKvarova)
}
export function getNajavljeniKvarovi(){
    var lista = localStorage.getItem('najavljeniKvarovi')
    if(lista == null)
        return []
    return lista.split(',')

}
export function clearNajavljeniKvarovi(){
    localStorage.removeItem('najavljeniKvarovi')
}
export function setUserInfo(userId, userType) {
    localStorage.setItem('userId', userId),
        localStorage.setItem('userType', userType)
}
export function getUserInfo() {
    return{
        userId: localStorage.getItem('userId'),
        userType: localStorage.getItem('userType')
    }
}
export function clearUserInfo(){
    localStorage.removeItem('userId'),
        localStorage.removeItem('userType')
}
export function setPageShown(pageShown) {
    sessionStorage.setItem('pageShown', pageShown)
}
export function getPageToShow(){
    return{
        pageShown: sessionStorage.getItem('pageShown')
    }
}
export function clearPageShown() {
    sessionStorage.removeItem('pageShown')
}
export function setFormMode(formMode) {
    sessionStorage.setItem('formMode', formMode)
}
export function getFormMode() {
    return{
        formMode: sessionStorage.getItem('formMode')
    }
}
export function clearFormMode(){
    sessionStorage.removeItem('formMode')
}
export function setEditingStanar(id) {
    sessionStorage.setItem('editingStanarID', id)
}
export function getEditingStanar() {
    return{
        stanarID: sessionStorage.getItem('editingStanarID')
    }
}
export function clearEditingStanar(){
    sessionStorage.removeItem('editingStanarID')
}