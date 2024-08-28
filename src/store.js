import {reactive} from "vue"

export const store = reactive({
    tripsList: null,
    userQuery: "",
    modalInfo: null,
    modalOpen: false,
    stages: [],
    curDate: null,
    days: null
    
});