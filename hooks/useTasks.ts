import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Task, TaskStatus } from '../models/task';

// Dynamically use the correct Firebase instance
const { db } = Platform.OS === 'web' 
  ? require('../lib/firebase.web') 
  : require('../lib/firebase');

import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    updateDoc
} from 'firebase/firestore';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Composite query: order by due_date ascending, then priority ascending
    // NOTE: This typically requires an index in Firestore!
    const q = query(
      collection(db, 'tasks'),
      orderBy('due_date', 'asc'),
      orderBy('priority', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot: any) => {
      const tasksData: Task[] = snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
      setLoading(false);
    }, (error: any) => {
      console.error("Firestore Error:", error);
      if (error.message && error.message.includes('requires an index')) {
        alert("Firestore Index Required: Please check your web developer console or terminal to click the link and create the required index for sorting tasks.");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addTask = useCallback(async (
    title: string, 
    priority: number, 
    due_date: number, 
    tags: string[] = []
  ) => {
    try {
      await addDoc(collection(db, 'tasks'), {
        title,
        status: 'TODO',
        priority,
        due_date,
        tags,
        created_at: Date.now()
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }, []);

  const updateTaskStatus = useCallback(async (taskId: string, newStatus: TaskStatus) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, {
        status: newStatus
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }, []);

  const deleteTask = useCallback(async (taskId: string) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }, []);

  return { tasks, loading, addTask, updateTaskStatus, deleteTask };
};
