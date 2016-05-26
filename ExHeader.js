'use strict';

const React = require('react-native');
const {
    Animated,
    Easing,
    StyleSheet,
    View,
} = React;

const BODY_HEIGHT = 44;
const TITLE_MARGIN_TOP = 12;
const STATUS_BAR_HEIGHT = 20;

class ExHeader extends React.Component {
    render() {
        const {
            title,
            scrollDistance,
            ...props,
        } = this.props;

        const bodyStyle = {
            opacity: scrollDistance.interpolate({
                inputRange: [0, BODY_HEIGHT],
                outputRange: [1, 0],
                easing: Easing.in(Easing.linear),
                extrapolate: 'clamp',
            }),
            height: scrollDistance.interpolate({
                inputRange: [0, BODY_HEIGHT],
                outputRange: [BODY_HEIGHT, 0],
                extrapolate: 'clamp',
            }),
        };

        const titleStyle = {
            transform: [{
                scale: scrollDistance.interpolate({
                    inputRange: [0, BODY_HEIGHT],
                    outputRange: [1, 0],
                    extrapolate: 'clamp',
                }),
            }],
            marginTop: scrollDistance.interpolate({
                inputRange: [0, BODY_HEIGHT],
                outputRange: [TITLE_MARGIN_TOP, -STATUS_BAR_HEIGHT],
                extrapolate: 'clamp',
            }),
        };

        return (
            <View {...props} style={[styles.container, props.style]}>
            <View style={styles.statusBarStrut} />
            <Animated.View style={[styles.body, bodyStyle]}>
            <Animated.Text style={[styles.titleText, titleStyle]}>
            {title}
            </Animated.Text>
            </Animated.View>
            </View>
        );
    }
}

ExHeader.HEIGHT = BODY_HEIGHT;

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    statusBarStrut: {
        height: STATUS_BAR_HEIGHT,
    },
    body: {
        height: BODY_HEIGHT,
    },
    titleText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: TITLE_MARGIN_TOP,
        alignSelf: 'center',
    },
});

module.exports = ExHeader;
