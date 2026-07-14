import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {API_BASE_URL} from '../authConfig';

const {width} = Dimensions.get('window');

// ─── Icon Components ─────────────────────────────────────────────────────────

const BellIcon = () => (
  <View style={{width: 22, height: 22, alignItems: 'center'}}>
    <View style={{
      width: 14, height: 12,
      borderWidth: 2, borderColor: '#111', borderRadius: 7,
      borderBottomWidth: 0, marginTop: 4,
    }} />
    <View style={{width: 2, height: 4, backgroundColor: '#111', marginTop: -1}} />
    <View style={{width: 6, height: 2, borderRadius: 2, borderWidth: 1.5, borderColor: '#111', marginTop: 0}} />
  </View>
);

const HomeIconActive = () => (
  <View style={{width: 24, height: 22, alignItems: 'center'}}>
    <View style={{
      width: 24, height: 14, marginTop: 4,
      borderLeftWidth: 2, borderRightWidth: 2, borderBottomWidth: 2,
      borderColor: '#111', position: 'relative',
    }}>
      <View style={{
        position: 'absolute', bottom: 0, left: 7,
        width: 10, height: 10, borderTopLeftRadius: 1, borderTopRightRadius: 1,
        borderTopWidth: 0,
      }} />
    </View>
    {/* Roof */}
    <View style={{
      position: 'absolute', top: 0,
      width: 0, height: 0,
      borderLeftWidth: 13, borderRightWidth: 13, borderBottomWidth: 8,
      borderLeftColor: 'transparent', borderRightColor: 'transparent',
      borderBottomColor: '#111',
    }} />
  </View>
);

const CardNavIcon = () => (
  <View style={{
    width: 22, height: 16, borderWidth: 1.8,
    borderColor: '#9CA3AF', borderRadius: 3,
  }}>
    <View style={{height: 4, backgroundColor: '#9CA3AF', marginTop: 2}} />
  </View>
);

const ContactsIcon = () => (
  <View style={{width: 26, height: 20, flexDirection: 'row', alignItems: 'flex-end'}}>
    <View style={{
      width: 12, height: 12, borderRadius: 6,
      borderWidth: 1.8, borderColor: '#9CA3AF',
    }} />
    <View style={{
      width: 12, height: 12, borderRadius: 6,
      borderWidth: 1.8, borderColor: '#9CA3AF', marginLeft: 2,
    }} />
  </View>
);

const SettingsIcon = () => (
  <View style={{width: 22, height: 22, justifyContent: 'center', alignItems: 'center'}}>
    <View style={{
      width: 18, height: 18, borderRadius: 9,
      borderWidth: 1.8, borderColor: '#9CA3AF',
      justifyContent: 'center', alignItems: 'center',
    }}>
      <View style={{width: 6, height: 6, borderRadius: 3, backgroundColor: '#9CA3AF'}} />
    </View>
  </View>
);

const ScanNavIcon = () => (
  <View style={{width: 26, height: 26, justifyContent: 'center', alignItems: 'center'}}>
    <View style={{
      width: 20, height: 20,
      borderColor: '#fff',
      borderTopWidth: 2.5, borderLeftWidth: 2.5,
      position: 'absolute', top: 0, left: 0,
    }} />
    <View style={{
      width: 20, height: 20,
      borderColor: '#fff',
      borderTopWidth: 2.5, borderRightWidth: 2.5,
      position: 'absolute', top: 0, right: 0,
    }} />
    <View style={{
      width: 20, height: 20,
      borderColor: '#fff',
      borderBottomWidth: 2.5, borderLeftWidth: 2.5,
      position: 'absolute', bottom: 0, left: 0,
    }} />
    <View style={{
      width: 20, height: 20,
      borderColor: '#fff',
      borderBottomWidth: 2.5, borderRightWidth: 2.5,
      position: 'absolute', bottom: 0, right: 0,
    }} />
    <View style={{
      width: 9, height: 9,
      borderRadius: 4.5,
      borderWidth: 2,
      borderColor: '#fff',
    }} />
  </View>
);

// ─── Circular Progress ────────────────────────────────────────────────────────

const CircularProgress = ({percentage = 60}) => {
  const size = 72;
  const half = size / 2;
  const strokeWidth = 6;
  const inner = size - strokeWidth * 2;

  const leftDeg = percentage >= 50 ? 180 : (percentage / 50) * 180;
  const rightDeg = percentage > 50 ? ((percentage - 50) / 50) * 180 : 0;

  return (
    <View style={{width: size, height: size, justifyContent: 'center', alignItems: 'center'}}>
      {/* Gray base ring */}
      <View style={{
        position: 'absolute',
        width: size, height: size,
        borderRadius: half,
        borderWidth: strokeWidth,
        borderColor: '#E5E7EB',
      }} />

      {/* Left half fill */}
      <View style={{
        position: 'absolute', width: half, height: size,
        left: 0, overflow: 'hidden',
      }}>
        <View style={{
          width: size, height: size, borderRadius: half,
          borderWidth: strokeWidth,
          borderColor: '#8B5CF6',
          borderRightColor: 'transparent',
          borderTopColor: percentage < 25 ? 'transparent' : '#8B5CF6',
          borderBottomColor: percentage > 0 ? '#8B5CF6' : 'transparent',
          transform: [{rotate: `${leftDeg - 180}deg`}],
        }} />
      </View>

      {/* Right half fill */}
      {percentage > 50 && (
        <View style={{
          position: 'absolute', width: half, height: size,
          right: 0, overflow: 'hidden',
        }}>
          <View style={{
            position: 'absolute', right: 0,
            width: size, height: size, borderRadius: half,
            borderWidth: strokeWidth,
            borderColor: '#8B5CF6',
            borderLeftColor: 'transparent',
            transform: [{rotate: `${rightDeg - 180}deg`}],
          }} />
        </View>
      )}

      {/* White donut center */}
      <View style={{
        width: inner, height: inner,
        borderRadius: inner / 2,
        backgroundColor: '#fff',
        justifyContent: 'center', alignItems: 'center',
      }}>
        <Text style={styles.circleText}>{percentage}%</Text>
      </View>
    </View>
  );
};

// ─── Action Icon Components ───────────────────────────────────────────────────

const CreateCardIcon = () => (
  <View style={{width: 28, height: 28, alignItems: 'center', justifyContent: 'center'}}>
    <View style={{
      width: 18, height: 18, borderRadius: 9,
      borderWidth: 2, borderColor: '#7C3AED',
      justifyContent: 'center', alignItems: 'center',
    }} />
    <View style={{position: 'absolute', top: 0, right: 0,
      width: 10, height: 10, borderRadius: 5, backgroundColor: '#EDE9FE',
      justifyContent: 'center', alignItems: 'center',
    }}>
      <Text style={{fontSize: 10, fontWeight: '700', color: '#7C3AED', lineHeight: 12}}>+</Text>
    </View>
  </View>
);

const QRIcon = () => (
  <View style={{width: 28, height: 28}}>
    {[0, 1].map(row => (
      <View key={row} style={{flexDirection: 'row', marginBottom: row === 0 ? 3 : 0}}>
        {[0, 1].map(col => (
          <View key={col} style={{
            width: 10, height: 10,
            borderWidth: 1.8, borderColor: '#059669',
            borderRadius: 2,
            marginRight: col === 0 ? 5 : 0,
            justifyContent: 'center', alignItems: 'center',
          }}>
            <View style={{width: 4, height: 4, borderRadius: 1, backgroundColor: '#059669'}} />
          </View>
        ))}
      </View>
    ))}
    <View style={{
      position: 'absolute', bottom: 0, right: 0,
      width: 10, height: 10, borderWidth: 1.8, borderColor: '#059669', borderRadius: 2,
    }} />
  </View>
);

const ShareIcon = () => (
  <View style={{width: 26, height: 28, alignItems: 'center'}}>
    {/* Arrow shaft */}
    <View style={{width: 2.5, height: 16, backgroundColor: '#3B82F6', marginTop: 2}} />
    {/* Arrowhead */}
    <View style={{
      position: 'absolute', top: 0,
      width: 0, height: 0,
      borderLeftWidth: 6, borderRightWidth: 6, borderBottomWidth: 8,
      borderLeftColor: 'transparent', borderRightColor: 'transparent',
      borderBottomColor: '#3B82F6',
    }} />
    {/* Base tray */}
    <View style={{
      position: 'absolute', bottom: 0,
      width: 22, height: 12,
      borderLeftWidth: 2.5, borderBottomWidth: 2.5, borderRightWidth: 2.5,
      borderColor: '#3B82F6', borderRadius: 2,
    }} />
  </View>
);

const ContactCaptureIcon = () => (
  <View style={{width: 22, height: 22, justifyContent: 'center', alignItems: 'center'}}>
    <View style={{
      width: 14, height: 14, borderRadius: 7,
      borderWidth: 2, borderColor: '#059669',
    }} />
    <View style={{
      position: 'absolute', bottom: 0,
      width: 20, height: 8,
      borderTopLeftRadius: 10, borderTopRightRadius: 10,
      borderWidth: 2, borderBottomWidth: 0,
      borderColor: '#059669',
    }} />
  </View>
);

const EyeIcon = () => (
  <View style={{width: 24, height: 16, justifyContent: 'center', alignItems: 'center'}}>
    <View style={{
      width: 24, height: 14,
      borderRadius: 12,
      borderWidth: 2, borderColor: '#3B82F6',
      justifyContent: 'center', alignItems: 'center',
    }}>
      <View style={{width: 6, height: 6, borderRadius: 3, backgroundColor: '#3B82F6'}} />
    </View>
  </View>
);

// ─── HomeScreen ───────────────────────────────────────────────────────────────

type Profile = {
  name: string;
  email: string;
  roles: string[];
};

export default function HomeScreen({accessToken}: {accessToken: string}) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    })
      .then(res => res.json())
      .then(data => setProfile(data.user))
      .catch(err => console.error('Profile fetch failed:', err))
      .finally(() => setLoadingProfile(false));
  }, [accessToken]);

  const firstName = profile?.name?.split(' ')[0] ?? '';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        {/* ── Header ── */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={require('../../assets/Avatar.png')} style={styles.avatar} />
            <View>
              {loadingProfile ? (
                <ActivityIndicator size="small" color="#8B5CF6" />
              ) : (
                <>
                  <Text style={styles.greeting}>Hello, {firstName}!</Text>
                  <Text style={styles.subGreeting}>Welcome to Weana</Text>
                </>
              )}
            </View>
          </View>
          <TouchableOpacity style={styles.bellButton}>
            <BellIcon />
            <View style={styles.bellBadge} />
          </TouchableOpacity>
        </View>

        {/* ── Create Your Card ── */}
        <View style={styles.createCard}>
          <View style={styles.createCardLeft}>
            <Text style={styles.createCardTitle}>Create Your Card</Text>
            <Text style={styles.createCardSubtitle}>
              Add more details to get better{'\n'}networking result
            </Text>
            <View style={styles.progressBarTrack}>
              <View style={[styles.progressBarFill, {width: '60%'}]} />
            </View>
            <View style={styles.createCardFooter}>
              <Text style={styles.progressLabel}>
                <Text style={styles.progressBold}>60%</Text> Complete
              </Text>
              <TouchableOpacity>
                <Text style={styles.viewDetails}>View Details ›</Text>
              </TouchableOpacity>
            </View>
          </View>
          <CircularProgress percentage={60} />
        </View>

        {/* ── Quick Actions ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionCard} activeOpacity={0.75}>
            <View style={[styles.actionIconBg, {backgroundColor: '#EDE9FE'}]}>
              <CreateCardIcon />
            </View>
            <Text style={styles.actionLabel}>Create{'\n'}Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.75}>
            <View style={[styles.actionIconBg, {backgroundColor: '#ECFDF5'}]}>
              <QRIcon />
            </View>
            <Text style={styles.actionLabel}>Scan{'\n'}Contact</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionCard} activeOpacity={0.75}>
            <View style={[styles.actionIconBg, {backgroundColor: '#EFF6FF'}]}>
              <ShareIcon />
            </View>
            <Text style={styles.actionLabel}>Share{'\n'}Card</Text>
          </TouchableOpacity>
        </View>

        {/* ── Recent Activity ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View Details</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.activityCard}>
          <TouchableOpacity style={styles.activityItem} activeOpacity={0.7}>
            <View style={[styles.activityIconBg, {backgroundColor: '#ECFDF5'}]}>
              <ContactCaptureIcon />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>New Contact Capture</Text>
              <Text style={styles.activitySub}>Sarah Jhonson from Acme Corp</Text>
            </View>
            <Text style={styles.activityTime}>2m ago ›</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.activityItem} activeOpacity={0.7}>
            <View style={[styles.activityIconBg, {backgroundColor: '#EFF6FF'}]}>
              <EyeIcon />
            </View>
            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>Card Viewed</Text>
              <Text style={styles.activitySub}>Your card was viewed by 5 people</Text>
            </View>
            <Text style={styles.activityTime}>1h ago ›</Text>
          </TouchableOpacity>
        </View>

        {/* ── My Default Card ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Default Card</Text>
          <View style={styles.defaultBadge}>
            <Text style={styles.defaultBadgeText}>Default</Text>
          </View>
        </View>

        <View style={styles.defaultCard}>
          <Image source={require('../../assets/Avatar.png')} style={styles.cardAvatar} />
          <View style={styles.cardDetails}>
            <View style={styles.cardNameRow}>
              <Text style={styles.cardName}>{profile?.name ?? ''} </Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedCheck}>✓</Text>
              </View>
            </View>
            <Text style={styles.cardRole}>{profile?.email ?? ''}</Text>
          </View>
        </View>

        <View style={{height: 20}} />
      </ScrollView>

      {/* ── Bottom Navigation ── */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <HomeIconActive />
          <Text style={[styles.navLabel, styles.navLabelActive]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <CardNavIcon />
          <Text style={styles.navLabel}>Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navScanBtn} activeOpacity={0.85}>
          <ScanNavIcon />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <ContactsIcon />
          <Text style={styles.navLabel}>Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} activeOpacity={0.7}>
          <SettingsIcon />
          <Text style={styles.navLabel}>Settings</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const ACTION_CARD_WIDTH = (width - 48 - 20) / 3;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9FAFB'},
  scroll: {flex: 1},
  scrollContent: {paddingHorizontal: 16, paddingTop: 16},

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  headerLeft: {flexDirection: 'row', alignItems: 'center', gap: 12},
  avatar: {width: 48, height: 48, borderRadius: 24},
  greeting: {fontSize: 18, fontWeight: '700', color: '#111827'},
  subGreeting: {fontSize: 13, color: '#6B7280', marginTop: 1},
  bellButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: {width: 0, height: 2},
    elevation: 3,
  },
  bellBadge: {
    position: 'absolute', top: 8, right: 9,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: '#EF4444', borderWidth: 1.5, borderColor: '#fff',
  },

  // Create Card
  createCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  createCardLeft: {flex: 1, marginRight: 16},
  createCardTitle: {fontSize: 16, fontWeight: '700', color: '#111827', marginBottom: 4},
  createCardSubtitle: {fontSize: 12, color: '#6B7280', lineHeight: 18, marginBottom: 10},
  progressBarTrack: {
    height: 4, backgroundColor: '#E5E7EB', borderRadius: 2, marginBottom: 8,
  },
  progressBarFill: {
    height: 4, backgroundColor: '#8B5CF6', borderRadius: 2,
  },
  createCardFooter: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  progressLabel: {fontSize: 12, color: '#6B7280'},
  progressBold: {fontWeight: '700', color: '#111827'},
  viewDetails: {fontSize: 12, color: '#6B7280'},

  // Circular progress
  circleText: {fontSize: 13, fontWeight: '700', color: '#111827'},

  // Section headers
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 12,
  },
  sectionTitle: {fontSize: 16, fontWeight: '700', color: '#111827'},
  viewAll: {fontSize: 13, color: '#6B7280'},

  // Quick Actions
  actionsRow: {
    flexDirection: 'row', gap: 10, marginBottom: 24,
  },
  actionCard: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14,
    padding: 14, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: {width: 0, height: 1},
    elevation: 1,
  },
  actionIconBg: {
    width: 54, height: 54, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 10,
  },
  actionLabel: {fontSize: 12, fontWeight: '600', color: '#111827', textAlign: 'center', lineHeight: 17},

  // Activity
  activityCard: {
    backgroundColor: '#fff', borderRadius: 16, padding: 4,
    marginBottom: 24,
    shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, shadowOffset: {width: 0, height: 1},
    elevation: 1,
  },
  activityItem: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 14, gap: 12,
  },
  activityIconBg: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  activityInfo: {flex: 1},
  activityTitle: {fontSize: 13, fontWeight: '600', color: '#111827'},
  activitySub: {fontSize: 12, color: '#9CA3AF', marginTop: 2},
  activityTime: {fontSize: 12, color: '#6B7280'},
  divider: {height: 1, backgroundColor: '#F3F4F6', marginHorizontal: 12},

  // Default Card
  defaultBadge: {
    backgroundColor: '#111827', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20,
  },
  defaultBadgeText: {fontSize: 12, fontWeight: '600', color: '#fff'},
  defaultCard: {
    borderRadius: 16, overflow: 'hidden',
    backgroundColor: '#1a1a2e',
    flexDirection: 'row', alignItems: 'center',
    padding: 20,
    minHeight: 100,
  },
  cardAvatar: {width: 56, height: 56, borderRadius: 28, marginRight: 14},
  cardDetails: {flex: 1},
  cardNameRow: {flexDirection: 'row', alignItems: 'center'},
  cardName: {fontSize: 16, fontWeight: '700', color: '#fff'},
  verifiedBadge: {
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: '#3B82F6', justifyContent: 'center', alignItems: 'center',
  },
  verifiedCheck: {fontSize: 9, color: '#fff', fontWeight: '700'},
  cardRole: {fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 3},
  cardOrg: {fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 2},

  // Bottom Nav
  bottomNav: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#F3F4F6',
    paddingBottom: 8, paddingTop: 8,
    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, shadowOffset: {width: 0, height: -2},
    elevation: 8,
  },
  navItem: {flex: 1, alignItems: 'center', paddingTop: 4, gap: 4},
  navLabel: {fontSize: 11, color: '#9CA3AF', fontWeight: '500'},
  navLabelActive: {color: '#111827', fontWeight: '700'},
  navScanBtn: {
    width: 56, height: 56, borderRadius: 28,
    backgroundColor: '#111827', justifyContent: 'center', alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8, shadowOffset: {width: 0, height: 4},
    elevation: 6,
  },
});
