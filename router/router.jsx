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
import PanelAdmin from "../src/pages/panelAdmin";

/*ESTO ES PARA LAS PAGINAS DE VALIDACIONES*/
import AguasCalientesValidacion from "../src/pages/validacionLicencias/aguasCalientes";
import CampecheVal from "../src/pages/validacionLicencias/campecheVal";
import ChiapasVal from "../src/pages/validacionLicencias/chiapasVal";
import ChihuahuaVal from "../src/pages/validacionLicencias/chihuahuaVal";
import CoahuilaVal from "../src/pages/validacionLicencias/coahuilaVal";
import ColimaVal from "../src/pages/validacionLicencias/colimaVal";
import DurangoVal from "../src/pages/validacionLicencias/durangoVal";
import GuerreroVal from "../src/pages/validacionLicencias/guerreroVal";
import HidalgoVal from "../src/pages/validacionLicencias/hidalgoVal"
import MorelosVal from "../src/pages/validacionLicencias/morelosVal"
import NayaritVal from "../src/pages/validacionLicencias/nayaritVal";
import NuevoLeonVal from "../src/pages/validacionLicencias/nuevoLeonVal";
import QuintanaVal from "../src/pages/validacionLicencias/quintanaVal";
import SanLuisVal from "../src/pages/validacionLicencias/sanLuisVal";
import SinaloaVal from "../src/pages/validacionLicencias/sinaloaVal";
import SonoraVal from "../src/pages/validacionLicencias/SonoraVal"
import TabascoVal from "../src/pages/validacionLicencias/tabascoVal";
import TamaulipasVal from "../src/pages/validacionLicencias/tamaulipasVal";
import TlaxcalaVal from "../src/pages/validacionLicencias/tlaxcalaVal";
import YucatanVal from "../src/pages/validacionLicencias/yucatanVal";
import ZacatecasVal from "../src/pages/validacionLicencias/zacatecasVal";
import BajaCaliforniaNorteVal from '../src/pages/validacionLicencias/bajaCaliforniaNorteVal'
import BajaCaliforniaSurVal from "../src/pages/validacionLicencias/bajaCaliforniaSurVal";
import JaliscoVal from "../src/pages/validacionLicencias/jaliscoVal";
import GuanajuatoVal from "../src/pages/validacionLicencias/guanajuatoVal";
import QueretaroVal from '../src/pages/validacionLicencias/queretaroVal'
import EdomexVal from '../src/pages/validacionLicencias/edomexVal'
import OaxacaVal from '../src/pages/validacionLicencias/oaxacaVal'
import VeracruzVal from '../src/pages/validacionLicencias/veracruzVal'
import PueblaVal from "../src/pages/validacionLicencias/pueblaVal";
import MichoacanVal from '../src/pages/validacionLicencias/michoacanVal'
import CdmxVal from '../src/pages/validacionLicencias/cdmxVal'

const router = createBrowserRouter([
    {
        path:"/",
        element:<Index/>
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
        path:"/consulta/quintanaRoo",
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
    {
        path:"/panelAdministrador",
        element:<PanelAdmin/>,
    },
    {
        path: "/validacion/aguasCalientes/:folio",
        element: <AguasCalientesValidacion />,
    },
    
    {
        path:"/validacion/campeche/:folio",
        element:<CampecheVal/>,
    },
    {
        path:"/validacion/chiapas/:folio",
        element:<ChiapasVal/>,
    },
    {
        path:"/validacion/chihuahua/:folio",
        element:<ChihuahuaVal/>,
    },
    {
        path:"/validacion/coahuila/:folio",
        element:<CoahuilaVal/>,
    },
    {
        path:"/validacion/colima/:folio",
        element:<ColimaVal/>,
    },
    {
        path:"/validacion/guerrero/:folio",
        element:<GuerreroVal/>,
    },
    {
        path:"/validacion/durango/:folio",
        element:<DurangoVal/>,
    },
    {
        path:"/validacion/morelos/:folio",
        element:<MorelosVal/>,
    },
    {
        path:"/validacion/hidalgo/:folio",
        element:<HidalgoVal/>,
    },
    {
        path:"/validacion/nayarit/:folio",
        element:<NayaritVal/>,
    },
    {
        path:"/validacion/nuevoLeon/:folio",
        element:<NuevoLeonVal/>,
    },
    {
        path:"/validacion/quintanaRoo/:folio",
        element:<QuintanaVal/>,
    },
    {
        path:"/validacion/sanLuisPotosi/:folio",
        element:<SanLuisVal/>,
    },
    {
        path:"/validacion/sonora/:folio",
        element:<SonoraVal/>,
    },
    {
        path:"/validacion/sinaloa/:folio",
        element:<SinaloaVal/>,
    },
    {
        path:"/validacion/tabasco/:folio",
        element:<TabascoVal/>,
    },
    {
        path:"/validacion/tamaulipas/:folio",
        element:<TamaulipasVal/>,
    },
    {
        path:"/validacion/tlaxcala/:folio",
        element:<TlaxcalaVal/>,
    },
    {
        path:"/validacion/yucatan/:folio",
        element:<YucatanVal/>,
    },
    {
        path:"/validacion/zacatecas/:folio",
        element:<ZacatecasVal/>,
    },
    {
        path:"/validacion/bajaCaliforniaNorte/:folio",
        element:<BajaCaliforniaNorteVal/>,
    },
    {
        path:"/validacion/bajaCaliforniaSur/:folio",
        element:<BajaCaliforniaSurVal/>,
    },
    {
        path:"/validacion/jalisco/:folio",
        element:<JaliscoVal/>,
    },
    {
        path:"/validacion/guanajuato/:folio",
        element:<GuanajuatoVal />,
    },
    {
        path:"/validacion/queretaro/:folio",
        element:<QueretaroVal/>,
    },
    {
        path:"/validacion/edomex/:folio",
        element:<EdomexVal/>,
    },
    {
        path:"/validacion/oaxaca/:folio",
        element:<OaxacaVal/>,
    },
    {
        path:"/validacion/veracruz/:folio",
        element:<VeracruzVal/>,
    },
    {
        path:"/validacion/puebla/:folio",
        element:<PueblaVal/>,
    },
    {
        path:"/validacion/michoacan/:folio",
        element:<MichoacanVal/>,
    },
    {
        path:"/validacion/cdmx/:folio",
        element:<CdmxVal/>,
    },
    ])
export default router