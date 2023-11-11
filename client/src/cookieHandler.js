import Cookies from 'universal-cookie';

const cookieHandler = new Cookies();
const uid = cookieHandler.get('uid');

export default uid;