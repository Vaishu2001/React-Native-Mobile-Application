const protocol = "http";
const hostname = "10.0.2.2";
const hostport = "9000";

const baseUrl = `${protocol}://${hostname}:${hostport}`
const ENDPOINT = {
    loginURL: `${baseUrl}/auth/login`
}
export default ENDPOINT;