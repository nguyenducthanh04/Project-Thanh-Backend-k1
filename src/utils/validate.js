module.exports = {
    getError: (errors, field) => {
        const error =  errors.find(({ path }) => path === field); //find giúp trả về phần tử đầu tiên của mảng
        if(error) {
            return error.msg;
        }
    }
}