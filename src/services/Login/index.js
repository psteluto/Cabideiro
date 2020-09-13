import api from "../../utils/api";

const login = async (email_cpf, password) => {
    const params = {email_cpf, password};
    return await api
.post("/sessions", params);
}

export default {
    login
}
