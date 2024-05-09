export const GetItem = (name) => {
    return JSON.parse(localStorage.getItem(name));
}
export const SetItem = (name, payload) => {
    localStorage.setItem(name, JSON.stringify(payload));
}