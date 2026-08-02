import { Stack, router, usePathname } from 'expo-router';
import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ComponentProps } from 'react';
import { Shadow } from 'react-native-shadow-2';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

const FOOTER_ITEMS: { icon: IoniconsName; href: string; isCenter: boolean }[] = [
    { icon: 'home-outline', href: '/home', isCenter: false },
    { icon: 'add', href: '/new-bookmark', isCenter: true },
    { icon: 'albums-outline', href: '/album', isCenter: false },
];

// フッターを表示しない画面
const HIDDEN_FOOTER_PATHS = [ '/' ];

export default function RootLayout() {
    const pathname = usePathname();
    const insets = useSafeAreaInsets();
    const showFooter = !HIDDEN_FOOTER_PATHS.includes(pathname);

    return (
        <View style={styles.container}>
            <Stack>
                <Stack.Screen name="index"        options={{ title: 'Welcome' }} />
                <Stack.Screen name="home"         options={{ title: 'Home' }} />
                <Stack.Screen name="hello-world"  options={{ title: 'Hello World' }} />
                <Stack.Screen name="album"        options={{ title: 'アルバム' }} />
                <Stack.Screen name="new-bookmark" options={{ title: 'しおりを残す' }} />
            </Stack>

            {showFooter && (
                <View style={[styles.footerWrapper, { paddingBottom: insets.bottom }]}>
                    <View style={styles.footerBorder} />
                    <View style={styles.footer}>
                        {FOOTER_ITEMS.map(({ icon, href, isCenter }) => {
                            return (
                                <Pressable
                                    key={href}
                                    onPress={() => router.navigate(href)}
                                    style={[
                                        styles.footerItem,
                                    ]}
                                >
                                    {isCenter ? (
                                        <View style={styles.centerButtonWrapper}>
                                            <Shadow
                                                distance={32} 
                                                offset={[0, 14]}
                                                startColor='#6a83c34c'
                                            >
                                                <View style={styles.centerButtonShadow} />
                                            </Shadow>
                                            <View style={styles.centerButton}>
                                                <Ionicons
                                                    name={icon}
                                                    size={28}
                                                    style={styles.footerIcon} 
                                                />
                                            </View>
                                        </View>
                                    ) : (
                                        <Ionicons
                                            name={icon}
                                            size={24}
                                            style={styles.footerIcon}
                                        />
                                    )}
                                </Pressable>
                            );
                        })}
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footerWrapper: {
        backgroundColor: '#ffffff00',
    },
    footerBorder: {
        height: 0.2,
        backgroundColor: '#E5E7EB',
    },
    footer: {
        flexDirection: 'row',
        height: 78,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: '#FFFFFF',
    },
    footerItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    footerItemActive: {
        backgroundColor: '#E5E7EB',
    },
    footerIcon: {
        fontSize: 22,
        color: '#647393',
    },
    centerButtonWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    centerButton: {
        position: 'absolute',
        width: 68,
        height: 68,
        borderRadius: 34,
        backgroundColor: '#e4f3ff',
        borderTopColor: '#bebebe38',
        borderColor: '#ffffff6b',
        borderBottomColor: '#f0f0f0',
        borderWidth: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerButtonShadow: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#000000',
    },
    footerLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginTop: 4,
    },
    footerLabelActive: {
        color: '#4F7DF7',
    },
});