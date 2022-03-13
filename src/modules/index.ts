import Camera from './camera.module/camera.module';
import Dashboard from './dashboard.module/dashboard.module';
import Feed from './feed.module/feed.module';
import Handbook from './handbook.module/handbook.module';
import MapComponent from './map.module/map.module';
import Profile from './profile.module/profile.module';
import WelcomeGuide from './welcome-guide.module/welcome-guide.module';
import barcodeHandler from "./camera.module/Handlers/barcodeHandler";
import qrHandler from "./camera.module/Handlers/qrHandler";
import ExchangeModule from "./exchange.module/exchange.module";
import InfoModal from "./handbook.module/infoModal";
import EmulatorModule from "./emulator.module/emulator.module";

export const CommonModules = [
    Profile,
    Camera,
    Dashboard,
    Feed,
    Handbook,
    MapComponent,
    WelcomeGuide,
    barcodeHandler,
    qrHandler,
    ExchangeModule,
    InfoModal,
    EmulatorModule
]