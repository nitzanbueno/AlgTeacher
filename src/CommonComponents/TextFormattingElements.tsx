import React, { FC } from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

const styles = StyleSheet.create({
    b: { fontWeight: "bold" },
    i: { fontStyle: "italic" },
    u: { textDecorationLine: "underline" },
    h1: { fontSize: 25, fontWeight: "bold", marginBottom: 10, width: "100%", textAlign: "center", marginTop: 20 },
    p: { fontSize: 20, marginTop: 5, marginBottom: 5 },
});

function GetStyledTextComponent(style: TextStyle): FC<{ style?: TextStyle }> {
    return props => <Text style={[style, props.style]}>{props.children}</Text>;
}

export const B = GetStyledTextComponent(styles.b);
export const I = GetStyledTextComponent(styles.i);
export const U = GetStyledTextComponent(styles.u);
export const H1 = GetStyledTextComponent(styles.h1);
export const P = GetStyledTextComponent(styles.p);
