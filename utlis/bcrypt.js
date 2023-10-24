import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash
    } catch (error) {
        if (error) throw error;
    }
};
export const comparePassword = async (fristPassword, secondPassword) => {
    try {
        const compare = await bcrypt.compare(fristPassword, secondPassword);
        return compare
    } catch (error) {
        if (error) throw error;
    }
};