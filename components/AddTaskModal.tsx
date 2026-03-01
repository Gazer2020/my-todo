import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (title: string, priority: number, dueDate: number, tags: string[]) => void;
}

export default function AddTaskModal({ visible, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [priority, setPriority] = useState<number>(2); // Default Medium
  const [dueDateDays, setDueDateDays] = useState<number>(0); // Default Today

  const handleSubmit = () => {
    if (!title.trim()) return;
    const dueDate = Date.now() + dueDateDays * 24 * 60 * 60 * 1000;
    
    // Process tags: split by comma, trim whitespace, remove empty
    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onAdd(title.trim(), priority, dueDate, tagsArray);
    
    setTitle('');
    setTagsInput('');
    setPriority(2);
    setDueDateDays(0);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end bg-black/40"
      >
        <View className="bg-white rounded-t-3xl p-6 shadow-xl max-h-[90%]">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row justify-between items-center mb-6 mt-2">
              <Text className="text-2xl font-bold text-gray-800">New Task</Text>
              <TouchableOpacity onPress={onClose} className="p-2">
                <Text className="text-gray-500 font-bold text-lg">✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput 
              className="bg-gray-100 rounded-xl p-4 text-lg mb-4 border border-gray-200"
              placeholder="What needs to be done?"
              value={title}
              onChangeText={setTitle}
              autoFocus
            />

            <TextInput 
              className="bg-gray-50 rounded-xl p-3 text-base mb-6 border border-gray-200"
              placeholder="Tags (comma-separated, e.g. work, urgent)"
              value={tagsInput}
              onChangeText={setTagsInput}
            />

            <Text className="text-sm font-semibold text-gray-500 mb-3 ml-1 uppercase">Priority</Text>
            <View className="flex-row justify-between mb-6">
              {[
                { label: 'High', value: 1, color: 'red' },
                { label: 'Medium', value: 2, color: 'orange' },
                { label: 'Low', value: 3, color: 'blue' }
              ].map(p => (
                <TouchableOpacity
                  key={p.value}
                  onPress={() => setPriority(p.value)}
                  className={`flex-1 py-3 items-center border rounded-xl mx-1 ${
                    priority === p.value 
                      ? `bg-${p.color}-100 border-${p.color}-500` 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text className={`font-semibold ${priority === p.value ? `text-${p.color}-700` : 'text-gray-600'}`}>
                    {p.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text className="text-sm font-semibold text-gray-500 mb-3 ml-1 uppercase">Due Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8">
              {[
                { label: 'Today', days: 0 },
                { label: 'Tomorrow', days: 1 },
                { label: 'In 3 Days', days: 3 },
                { label: 'Next Week', days: 7 }
              ].map(d => (
                <TouchableOpacity
                  key={d.days}
                  onPress={() => setDueDateDays(d.days)}
                  className={`px-6 py-2 rounded-full mr-3 border ${
                    dueDateDays === d.days 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <Text className={`font-medium ${dueDateDays === d.days ? 'text-white' : 'text-gray-600'}`}>
                    {d.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity 
              className={`w-full py-4 rounded-xl items-center shadow-md mb-4 ${title.trim() ? 'bg-blue-600' : 'bg-gray-300'}`}
              onPress={handleSubmit}
              disabled={!title.trim()}
            >
              <Text className="text-white font-bold text-lg">Create Task</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
