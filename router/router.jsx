import { createBrowserRouter } from "react-router-dom";
import Index from '../src/pages/index'
import AguasCalientes from "../src/pages/Estados/AguasCalientes";
import BajaCalifornia from "../src/pages/Estados/BajaCalifornia";
import BajaCaliforniaSur from "../src/pages/Estados/BajaCaliforniaSur";
import Campeche from "../src/pages/Estados/Campeche";
import Chiapas from "../src/pages/Estados/Chiapas";
import Chihuahua from "../src/pages/Estados/Chihuahua";
import CDMX from "../src/pages/Estados/CMDX";
import Coahuila from "../src/pages/Estados/Coahuila";
import Colima from "../src/pages/Estados/Colima";
import Durango from "../src/pages/Estados/Durango";
import EdoDeMexico from "../src/pages/Estados/EdoDeMexico";
import Guanajuato from "../src/pages/Estados/Guanajuato";
import Guerrero from "../src/pages/Estados/Guerrero";
import Hidalgo from "../src/pages/Estados/Hidalgo";
import Jalisco from "../src/pages/Estados/Jalisco";
import Michoacan from "../src/pages/Estados/Michoacan";
import Morelos from "../src/pages/Estados/Morelos";
import Nayarit from "../src/pages/Estados/Nayarit";
import NuevoLeon from "../src/pages/Estados/NuevoLeon";
import Oaxaca from "../src/pages/Estados/Oaxaca";
import Puebla from "../src/pages/Estados/Puebla";
import Queretaro from "../src/pages/Estados/Queretaro";
import QuintanaRoo from "../src/pages/Estados/QuintanaRoo";
import SanLuisPotosi from "../src/pages/Estados/SanLuisPotosi";
import Sinaloa from "../src/pages/Estados/Sinaloa";
import Sonora from "../src/pages/Estados/Sonora";
import Tabasco from "../src/pages/Estados/Tabasco";
import Tamaulipas from "../src/pages/Estados/Tamaulipas";
import Tlaxcala from "../src/pages/Estados/Tlaxcala";
import Veracruz from "../src/pages/Estados/Veracruz";
import Yucatan from "../src/pages/Estados/Yucatan";
import Zacatecas from "../src/pages/Estados/Zacatecas";
const router = createBrowserRouter([
    {
        path:"/",
        element:<Index/>,
    },
    {
        path:"/consulta/aguasCalientes",
        element:<AguasCalientes/>,
    },
    {
        path:"/consulta/bajaCaliforniaNorte",
        element:<BajaCalifornia/>,
    },
    {
        path:"/consulta/bajaCaliforniaSur",
        element:<BajaCaliforniaSur/>,
    },
    {
        path:"/consulta/campeche",
        element:<Campeche/>,
    },
    {
        path:"/consulta/chiapas",
        element:<Chiapas/>,
    },
    {
        path:"/consulta/chihuahua",
        element:<Chihuahua/>,
    },
    {
        path:"/consulta/cdmx",
        element:<CDMX/>,
    },
    {
        path:"/consulta/coahuila",
        element:<Coahuila/>,
    },
    {
        path:"/consulta/colima",
        element:<Colima/>,
    },
    {
        path:"/consulta/durango",
        element:<Durango/>,
    },
    {
        path:"/consulta/edomex",
        element:<EdoDeMexico/>,
    },
    {
        path:"/consulta/guanajuato",
        element:<Guanajuato/>,
    },
    {
        path:"/consulta/guerrero",
        element:<Guerrero/>,
    },
    {
        path:"/consulta/hidalgo",
        element:<Hidalgo/>,
    },
    {
        path:"/consulta/jalisco",
        element:<Jalisco/>,
    },
    {
        path:"/consulta/michoacan",
        element:<Michoacan/>,
    },
    {
        path:"/consulta/morelos",
        element:<Morelos/>,
    },
    {
        path:"/consulta/nayarit",
        element:<Nayarit/>,
    },
    {
        path:"/consulta/nuevoLeon",
        element:<NuevoLeon/>,
    },
    {
        path:"/consulta/oaxaca",
        element:<Oaxaca/>,
    },
    {
        path:"/consulta/puebla",
        element:<Puebla/>,
    },
    {
        path:"/consulta/queretaro",
        element:<Queretaro/>,
    },
    {
        path:"/consulta/quintanaroo",
        element:<QuintanaRoo/>,
    },
    {
        path:"/consulta/sanLuisPotosi",
        element:<SanLuisPotosi/>,
    },
    {
        path:"/consulta/sinaloa",
        element:<Sinaloa/>,
    },
    {
        path:"/consulta/sonora",
        element:<Sonora/>,
    },
    {
        path:"/consulta/tabasco",
        element:<Tabasco/>,
    },
    {
        path:"/consulta/tamaulipas",
        element:<Tamaulipas/>,
    },
    {
        path:"/consulta/tlaxcala",
        element:<Tlaxcala/>,
    },
    {
        path:"/consulta/veracruz",
        element:<Veracruz/>,
    },
    {
        path:"/consulta/yucatan",
        element:<Yucatan/>,
    },
    {
        path:"/consulta/zacatecas",
        element:<Zacatecas/>,
    },
    
])
export default router