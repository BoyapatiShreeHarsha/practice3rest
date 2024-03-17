import MockAdapter from "axios-mock-adapter";
import axios from "../components/axios"


const mock = new MockAdapter(axios, { onNoMatch: "throwException" });

export default mock;