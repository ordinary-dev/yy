// This function helps to extract error message in `catch` block.
//
// This function should never return "unknown error",
// but if something goes wrong it won't break.
export const getErrorMessage = (err: unknown) => {
    if (err instanceof Error && err.message) return err.message
    return "Unknown error"
}
