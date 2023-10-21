import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __beforeLvlName = path.dirname(__filename);
const __dirname=path.dirname(__beforeLvlName);
console.log(__filename)
export default __dirname;