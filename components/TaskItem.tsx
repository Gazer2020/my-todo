import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Task } from '../models/task';
import { formatRelativeTime } from '../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: string, currentStatus: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggleStatus, onDelete }: TaskItemProps) {
  const isDone = task.status === 'DONE';

  const getPriorityColor = (priority: number) => {
    switch(priority) {
      case 1: return 'bg-red-500 border-red-500';
      case 2: return 'bg-orange-500 border-orange-500';
      case 3: return 'bg-blue-500 border-blue-500';
      default: return 'bg-gray-400 border-gray-400';
    }
  };

  const renderRightActions = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity 
        className="bg-red-500 justify-center items-center w-20 mb-3 rounded-r-2xl"
        onPress={() => onDelete(task.id)}
      >
        <Animated.Text style={{ transform: [{ scale }] }} className="text-white font-bold text-lg">
          Delete
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View className={`flex-row items-center p-4 mb-3 rounded-2xl bg-white shadow-sm border border-gray-100 ${isDone ? 'opacity-60' : ''}`}>
        {/* Checkbox */}
        <TouchableOpacity 
          className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${isDone ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
          onPress={() => onToggleStatus(task.id, task.status)}
        >
          {isDone && <View className="w-3 h-3 rounded-full bg-white" />}
        </TouchableOpacity>
        
        {/* Content */}
        <View className="flex-1">
          <Text className={`text-lg font-semibold text-gray-800 ${isDone ? 'line-through' : ''}`}>
            {task.title}
          </Text>
          <View className="flex-row items-center mt-1">
            <View className={`w-2 h-2 rounded-full mr-2 ${getPriorityColor(task.priority)}`} />
            <Text className="text-gray-500 text-sm mr-3">
              Due {formatRelativeTime(task.due_date)}
            </Text>
            {/* Tags Pills via NativeWind */}
            {task.tags && task.tags.length > 0 && (
              <View className="flex-row flex-wrap">
                {task.tags.map((tag, idx) => (
                  <View key={idx} className="bg-gray-100 px-2 py-0.5 rounded-md mr-1 mt-1 border border-gray-200">
                    <Text className="text-xs text-gray-600 font-medium">{tag}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </Swipeable>
  );
}
