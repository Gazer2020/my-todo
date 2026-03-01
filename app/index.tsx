import { useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import AddTaskModal from '../components/AddTaskModal';
import TaskItem from '../components/TaskItem';
import { useTasks } from '../hooks/useTasks';

export default function IndexScreen() {
  const { tasks, loading, addTask, updateTaskStatus, deleteTask } = useTasks();
  const [modalVisible, setModalVisible] = useState(false);

  const handleToggleStatus = (id: string, currentStatus: string) => {
    updateTaskStatus(id, currentStatus === 'TODO' ? 'DONE' : 'TODO');
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="mt-4 text-gray-500 font-medium">Syncing Tasks...</Text>
      </View>
    );
  }

  // Pending tasks first, then completed ones at the bottom
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === 'TODO' && b.status === 'DONE') return -1;
    if (a.status === 'DONE' && b.status === 'TODO') return 1;
    return 0;
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-5 pt-4 pb-2">
        <Text className="text-3xl font-extrabold text-gray-900 tracking-tight">
          My Tasks
        </Text>
        <Text className="text-gray-500 mt-1 mb-4 font-medium">
          {tasks.filter(t => t.status === 'TODO').length} pending tasks
        </Text>
      </View>

      {tasks.length === 0 ? (
        <View className="flex-1 justify-center items-center px-8">
          <Text className="text-6xl mb-4">📝</Text>
          <Text className="text-xl font-bold text-gray-700 text-center mb-2">No tasks yet</Text>
          <Text className="text-gray-500 text-center">Tap the + button below to add your first task and see real-time sync magic happen.</Text>
        </View>
      ) : (
        <FlatList
          data={sortedTasks}
          keyExtractor={item => item.id}
          className="px-4"
          renderItem={({ item }) => (
            <TaskItem 
              task={item} 
              onToggleStatus={handleToggleStatus} 
              onDelete={deleteTask}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}

      {/* Floating Action Button */}
      <TouchableOpacity 
        className="absolute bottom-10 right-8 w-16 h-16 bg-blue-600 rounded-full justify-center items-center shadow-lg shadow-blue-500/50"
        onPress={() => setModalVisible(true)}
        style={{ elevation: 10 }}
      >
        <Text className="text-white text-3xl font-light mb-1">+</Text>
      </TouchableOpacity>

      <AddTaskModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onAdd={addTask} 
      />
    </SafeAreaView>
  );
}
