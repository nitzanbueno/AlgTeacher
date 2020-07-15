import React, {FunctionComponent} from "react";
import {StyleSheet} from "react-native";
import {Menu, MenuTrigger, withMenuContext, MenuContext} from "react-native-popup-menu";
import Icon from "react-native-vector-icons/AntDesign";
import {TouchableNativeFeedback} from "react-native-gesture-handler";

const styles = StyleSheet.create({
    icon: {
        marginRight: 10,
        marginLeft: 10,
        height: "100%",
        textAlignVertical: "center",
    },
});

const MenuIcon: FunctionComponent<{ctx: MenuContext}> = props => {
    return (
        <>
            <TouchableNativeFeedback onPress={() => props.ctx.menuActions.openMenu("headerContext")}>
                <Icon style={styles.icon} name="ellipsis1" size={20} />
            </TouchableNativeFeedback>
            <Menu name={"headerContext"} style={{marginTop: 57}}>
                <MenuTrigger />
                {props.children}
            </Menu>
        </>
    );
};

export default withMenuContext(MenuIcon);
