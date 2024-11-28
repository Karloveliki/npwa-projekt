import { createContext } from 'react';
const KosaricaContext = createContext({
    sadrzaj:[],
    dodajFrame: (frame) => {}
});

export default KosaricaContext