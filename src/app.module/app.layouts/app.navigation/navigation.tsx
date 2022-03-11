import {ActionIcon, Text, Center, Group, Header as MantineHeader} from "@mantine/core";
import {Link} from "react-router-dom";
import {AvatarIcon, CameraIcon, CardStackIcon, HomeIcon, PaperPlaneIcon, PersonIcon} from "@radix-ui/react-icons";
import {CommonModules} from "../../../modules";


const Navigation = () => {

    const ICON_SIZE = { height: 25, width: 25 }

    return(
        <MantineHeader height={50} fixed={true} position={{ bottom: -1, left: 0, right: 0 }}>
            <Group grow>
                <Link to={"/map"}>
                    <Center>
                        <Group position={"center"} direction="column" spacing={1}>
                        <ActionIcon size={'md'}>
                            <PaperPlaneIcon style={ICON_SIZE}/>
                        </ActionIcon>
                            <Text color={"black"} underline={false} size={"xs"}>Карта</Text>
                        </Group>
                    </Center>
                </Link>
                <Link to={"/handbook"}>
                    <Center>
                        <Group position={"center"} direction="column" spacing={1}>
                            <ActionIcon size={'md'}>
                                <CardStackIcon style={ICON_SIZE}/>
                            </ActionIcon>
                            <Text color={"black"} underline={false} size={"xs"}>Справочник</Text>
                        </Group>
                    </Center>
                </Link>
                <Link to={"/profile"}>
                    <Center>
                        <Group position={"center"} direction="column" spacing={1}>
                            <ActionIcon size={'md'}>
                                <AvatarIcon style={ICON_SIZE}/>
                            </ActionIcon>
                            <Text color={"black"} underline={false} size={"xs"}>Профиль</Text>
                        </Group>
                    </Center>
                </Link>
                <Link style={{position:"absolute", height:"60px", width:"60px", bottom: "5px", right: "5%"}} to={"/scanner"}>
                    <Center>
                        <ActionIcon color="green" size={60} radius="xl" variant="filled">
                            <CameraIcon style={ICON_SIZE} />
                        </ActionIcon>
                    </Center>
                </Link>
                {/*<Center>
                    <ActionIcon size={'lg'} onClick={() => stor eCashBacks.setIsOpen(true)}>
                        <CardStackIcon style={ICON_SIZE}/>
                    </ActionIcon>
                </Center>*/}
            </Group>
        </MantineHeader>
    )

}
export default Navigation;