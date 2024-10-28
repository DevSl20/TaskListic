export function titlecase(str) {
    return str
    .trm()
    .split(" ")
    .map ((w) => w[0].toUpperCase() + w.slice(1).toLowerCase)
}