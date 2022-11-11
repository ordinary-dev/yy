// Generate a path to an image.
// Created due to the fact that I constantly
// forget to update the path on some page.
export default function getImagePath(id: number, extension: string) {
    return `/api/photos/${id}.${extension}`
}
