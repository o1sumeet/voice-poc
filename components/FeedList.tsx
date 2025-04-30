import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { 
  BellRing, 
  Info, 
  AlertTriangle, 
  Activity 
} from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { FeedItem } from '@/types';

interface FeedListProps {
  feed: FeedItem[];
}

export default function FeedList({ feed }: FeedListProps) {
  const getIcon = (type: FeedItem['type']) => {
    const size = 20;
    
    switch (type) {
      case 'alert':
        return <AlertTriangle size={size} color={Colors.error[500]} />;
      case 'notification':
        return <BellRing size={size} color={Colors.primary[500]} />;
      case 'update':
        return <Info size={size} color={Colors.info[500]} />;
      case 'activity':
        return <Activity size={size} color={Colors.success[500]} />;
    }
  };
  
  const getIconBackgroundColor = (type: FeedItem['type']) => {
    switch (type) {
      case 'alert':
        return 'rgba(254, 226, 226, 0.5)';
      case 'notification':
        return 'rgba(219, 234, 254, 0.5)';
      case 'update':
        return 'rgba(224, 242, 254, 0.5)';
      case 'activity':
        return 'rgba(220, 252, 231, 0.5)';
    }
  };
  
  const renderItem = ({ item }: { item: FeedItem }) => (
    <TouchableOpacity activeOpacity={0.8} style={styles.itemContainer}>
      <BlurView intensity={80} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.itemContent}>
        <View 
          style={[
            styles.iconContainer, 
            { backgroundColor: getIconBackgroundColor(item.type) }
          ]}
        >
          {getIcon(item.type)}
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
        
        {!item.read && <View style={styles.unreadIndicator} />}
      </View>
    </TouchableOpacity>
  );
  
  return (
    <FlatList
      data={feed}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  itemContent: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    color: Colors.gray[800],
    marginBottom: 2,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: 4,
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: Colors.gray[500],
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary[500],
    marginLeft: 8,
  },
  separator: {
    height: 8,
  },
});