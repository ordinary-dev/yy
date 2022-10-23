// Encode string for url.
// This function replaces all spaces with dashes
// and makes letters lowercase.
// Example: "Ivan Reshetnikov" -> "ivan-reshetnikov"
export const toUrl = (s: string) => {
    return s.replace(/ /g, "-").toLowerCase()
}
