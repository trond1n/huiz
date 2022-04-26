import axios from "axios";

export default axios.create({
  baseURL: "https://quizwhoizz-default-rtdb.firebaseio.com/",
});
