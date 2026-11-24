import { Ionicons } from '@expo/vector-icons'
import { usePathname, useRouter } from 'expo-router'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { colors, spacing } from '../src/theme/tokens'

type NavigationRoute = '/' | '/curso' | '/profile'
type NavigationItem = {
  label: string
  icon: React.ComponentProps<typeof Ionicons>['name']
  activeIcon: React.ComponentProps<typeof Ionicons>['name']
  route: NavigationRoute
}

const items: NavigationItem[] = [
  { label: 'Início', icon: 'home-outline' as const, activeIcon: 'home' as const, route: '/' },
  { label: 'Trilhas', icon: 'grid-outline' as const, activeIcon: 'grid' as const, route: '/curso' },
  {
    label: 'Perfil',
    icon: 'person-outline' as const,
    activeIcon: 'person' as const,
    route: '/profile',
  },
]

export default function BottomNav() {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <View
      style={styles.container}
      accessibilityRole="tablist"
      accessibilityLabel="Navegação principal"
    >
      {items.map((item) => {
        const active =
          pathname === item.route || (item.route === '/curso' && pathname.startsWith('/curso'))
        return (
          <Pressable
            key={item.route}
            onPress={() => router.push(item.route)}
            style={styles.item}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
          >
            <Ionicons
              name={active ? item.activeIcon : item.icon}
              size={21}
              color={active ? colors.green : colors.muted}
            />
            <Text style={[styles.label, active && styles.activeLabel]}>{item.label}</Text>
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    justifyContent: 'space-around',
  },
  item: { alignItems: 'center', gap: 5, minWidth: 72, minHeight: 44, justifyContent: 'center' },
  label: { color: colors.muted, fontSize: 11, fontWeight: '600' },
  activeLabel: { color: colors.green },
})
