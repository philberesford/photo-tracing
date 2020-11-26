export const Throw = {
    if: (bool: boolean, message: string) => {
        if (bool) {
            throw new Error(message);
        }
    } 
};