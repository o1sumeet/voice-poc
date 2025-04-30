import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { CheckCircle, Circle, ChevronRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { ChecklistItem } from '@/types';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

interface ChecklistSectionProps {
  checklist: ChecklistItem[];
}

export default function ChecklistSection({ checklist }: ChecklistSectionProps) {
  const [items, setItems] = useState(checklist);

  const toggleItem = (id: string) => {
    // Haptic feedback when toggled (only on native)
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = items.filter((item) => item.completed).length;
  const progress = items.length > 0 ? completedCount / items.length : 0;

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>Today's Checklist</Text>
        <Text style={styles.progress}>
          {completedCount}/{items.length} complete
        </Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      <View style={styles.checklistContainer}>
        <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
        <View style={styles.checklistContent}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.checklistItem}
              onPress={() => toggleItem(item.id)}
              activeOpacity={0.8}
            >
              <TouchableOpacity
                onPress={() => toggleItem(item.id)}
                hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
              >
                {item.completed ? (
                  <CheckCircle size={24} color={Colors.primary[500]} />
                ) : (
                  <Circle size={24} color={Colors.gray[400]} />
                )}
              </TouchableOpacity>

              <View style={styles.itemTextContainer}>
                <Text
                  style={[
                    styles.itemTitle,
                    item.completed && styles.itemTitleCompleted,
                  ]}
                >
                  {item.title}
                </Text>
                {item.description && (
                  <Text style={styles.itemDescription}>{item.description}</Text>
                )}
                {item.time && <Text style={styles.itemTime}>{item.time}</Text>}
              </View>

              <ChevronRight size={20} color={Colors.gray[400]} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: Colors.gray[800],
  },
  progress: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.gray[600],
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: Colors.gray[200],
    borderRadius: 3,
    marginBottom: 16,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary[500],
    borderRadius: 3,
  },
  checklistContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checklistContent: {
    padding: 16,
  },
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 231, 235, 0.5)',
  },
  itemTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  itemTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: Colors.gray[800],
    marginBottom: 2,
  },
  itemTitleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.gray[500],
  },
  itemDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 2,
  },
  itemTime: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
  },
  viewAllButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  viewAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: Colors.primary[600],
  },
});
