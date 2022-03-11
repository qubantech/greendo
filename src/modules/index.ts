import Camera from './camera.module/camera.module';
import Dashboard from './dashboard.module/dashboard.module';
import Feed from './feed.module/feed.module';
import Handbook from './handbook.module/handbook.module';
import Map from './map.module/map.module';
import Profile from './profile.module/profile.module';
import WelcomeGuide from './welcome-guide.module/welcome-guide.module';
import barcodeHandler from "./camera.module/Handlers/barcodeHandler";
import qrHandler from "./camera.module/Handlers/qrHandler";

export const CommonModules = [
    Camera,
    Dashboard,
    Feed,
    Handbook,
    Map,
    Profile,
    WelcomeGuide,
    barcodeHandler,
    qrHandler
]