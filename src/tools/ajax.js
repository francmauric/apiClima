import axios from "axios"; 

export const ajax = async option => await axios.request(option).then(response => response.data);